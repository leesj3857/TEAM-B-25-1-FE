import { useEffect, useState } from "react";
import { MarkerData } from "../types/marker";
import { ParticipantGetResponse } from "../../../api/participant";

declare global {
  interface Window {
    naver: any;
  }
}

interface UseMapProps {
  mapRef: React.RefObject<HTMLDivElement | null>;
  places: MarkerData[];
  participants: ParticipantGetResponse[];
}

export const useMap = ({ mapRef, places, participants }: UseMapProps) => {
  const [map, setMap] = useState<any>(null);

  useEffect(() => {
    if (!window.naver || !mapRef.current) return;

    const naver = window.naver;

    // 마커가 있는 경우 마커들에 맞춰 지도 설정
    if (places.length > 0) {
      const bounds = new naver.maps.LatLngBounds();
      places.forEach(place => {
        bounds.extend(new naver.maps.LatLng(place.lat, place.lng));
      });

      const instance = new naver.maps.Map(mapRef.current, {
        center: bounds.getCenter(),
        zoom: 15,
      });

      // 마커들이 모두 보이도록 지도 조정
      instance.fitBounds(bounds, {
        top: 0,    // 상단 여백 (헤더 고려)
        right: 0,   // 우측 여백
        bottom: 0, // 하단 여백 (바텀시트 고려)
        left: 0     // 좌측 여백
      });

      setMap(instance);
    } else {
      // 마커가 없는 경우 기본 설정
      const instance = new naver.maps.Map(mapRef.current, {
        center: new naver.maps.LatLng(37.5665, 126.978),
        zoom: 15,
      });

      setMap(instance);
    }
  }, [mapRef, places]);

  return { map };
};
