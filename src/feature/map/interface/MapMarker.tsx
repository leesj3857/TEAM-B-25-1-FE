import { useEffect, useRef } from "react";

interface MapMarkerProps {
  id: number | string;
  map: any;
  lat: number;
  lng: number;
  iconUrl: string;
  selected?: boolean; // ✅ 선택 상태에 따른 스타일 반영
  onClick?: () => void; // ✅ 상위로 클릭 이벤트 전달
  onMount?: (api: {
    // ✅ 상위가 제어할 수 있는 간단 API 제공
    focus: () => void;
    getLatLng: () => { lat: number; lng: number };
  }) => void;
  onUnmount?: () => void;
}

const MapMarker = ({
  id,
  map,
  lat,
  lng,
  iconUrl,
  selected = false,
  onClick,
  onMount,
  onUnmount,
}: MapMarkerProps) => {
  const markerRef = useRef<any>(null);
  const elRef = useRef<HTMLDivElement | null>(null);

  // 마커 생성 (위치 변경 시 재생성 방지)
  useEffect(() => {
    const naver = (window as any).naver;
    if (!naver?.maps || !map) return;

    const markerHtml = document.createElement("div");
    markerHtml.style.width = "28px";
    markerHtml.style.height = "28px";
    markerHtml.style.background = "#7A87FF";
    markerHtml.style.borderRadius = "50%";
    markerHtml.style.display = "flex";
    markerHtml.style.alignItems = "center";
    markerHtml.style.justifyContent = "center";
    markerHtml.style.padding = "7px 7.5px";
    markerHtml.style.transition =
      "transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease";
    markerHtml.style.transform = "scale(1)";
    markerHtml.style.boxShadow = "none";

    const img = document.createElement("img");
    img.src = iconUrl;
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "contain";
    markerHtml.appendChild(img);

    const marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(lat, lng),
      map,
      icon: { content: markerHtml, anchor: new naver.maps.Point(14, 14) },
      zIndex: 0,
    });

    elRef.current = markerHtml;
    markerRef.current = marker;

    // 클릭 → 상위에 알림
    const clickListener = naver.maps.Event.addListener(marker, "click", () => {
      onClick?.();
    });

    // 상위에 조그만 제어 API 제공
    onMount?.({
      focus: () => {
        if (!elRef.current) return;
        elRef.current.style.transform = "scale(1.18)";
        elRef.current.style.boxShadow = "0 6px 16px rgba(0,0,0,0.25)";
        setTimeout(() => {
          if (!elRef.current) return;
          elRef.current.style.transform = selected ? "scale(1.18)" : "scale(1)";
          elRef.current.style.boxShadow = selected
            ? "0 6px 16px rgba(0,0,0,0.25)"
            : "none";
        }, 160);
      },
      getLatLng: () => ({ lat, lng }),
    });

    return () => {
      naver.maps.Event.removeListener(clickListener);
      marker.setMap(null);
      onUnmount?.();
    };
  }, [map, iconUrl, onClick, onMount, onUnmount]); // lat, lng, selected 의존성 제거

  // 선택 상태 변화 시 스타일 업데이트
  useEffect(() => {
    if (!elRef.current || !markerRef.current) return;

    if (selected) {
      elRef.current.style.transform = "scale(1.18)";
      elRef.current.style.boxShadow = "0 6px 16px rgba(0,0,0,0.25)";
      elRef.current.style.background = "#4759FF";
      markerRef.current.setZIndex(999);
    } else {
      elRef.current.style.transform = "scale(1)";
      elRef.current.style.boxShadow = "none";
      elRef.current.style.background = "#7A87FF";
      markerRef.current.setZIndex(0);
    }
  }, [selected]);

  // 마커 위치 업데이트 (재생성 없이)
  useEffect(() => {
    if (!markerRef.current) return;
    
    const naver = (window as any).naver;
    if (!naver?.maps) return;

    markerRef.current.setPosition(new naver.maps.LatLng(lat, lng));
  }, [lat, lng]);

  return null;
};

export default MapMarker;
