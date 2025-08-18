import { useRef, useState, useCallback, useEffect } from "react";
import { useMap } from "../hooks/useMap";
import MapMarker from "../interface/MapMarker";
import styled from "@emotion/styled";
import BottomSheet from "../../bottomSheet";
import {
  makeDummyPlaces,
  type MapPlace /* adaptPlacesFromApi */,
} from "../types/marker";
// import { getPlaces } from "../../../api"; // 실제 API 붙일 때 주석 해제

type SheetMode = "hide" | "half" | "full";

const MapPage = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const { map /*, markerData*/ } = useMap(mapRef); // markerData는 더 이상 사용하지 않음

  const [places, setPlaces] = useState<MapPlace[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [sheetMode, setSheetMode] = useState<SheetMode>("hide");

  // 각 마커를 제어할 수 있는 작은 API 보관 (focus, 좌표)
  const markerApiRef = useRef<
    Array<null | {
      focus: () => void;
      getLatLng: () => { lat: number; lng: number };
    }>
  >([]);

  const registerMarkerApi = useCallback(
    (
      idx: number,
      api: {
        focus: () => void;
        getLatLng: () => { lat: number; lng: number };
      } | null
    ) => {
      markerApiRef.current[idx] = api;
    },
    []
  );

  // ① 장소 데이터 로드 (지금은 더미, 나중에 API로 교체)
  useEffect(() => {
    // 더미 데이터
    setPlaces(makeDummyPlaces(10));

    // 실제 API로 바꿀 때:
    // (async () => {
    //   const res = await getPlaces(inviteCode); // inviteCode를 상위에서 prop으로 받는다면 사용
    //   setPlaces(adaptPlacesFromApi(res.data ?? []));
    // })();
  }, []);

  // ② 공통 포커스: 선택 → 맵 이동 → 마커 살짝 확대 → 시트 모드 변경
  const focusToIndex = useCallback(
    (idx: number, showOverlayOnSheet = false) => {
      setSelectedIndex(idx);

      // 마커 클릭에서 SelectedPlace 오버레이를 띄우고 싶다면 'hide'로 내리기
      // (리스트 클릭은 BottomSheet 내부에서 이미 처리함)
      setSheetMode(showOverlayOnSheet ? "hide" : "half");

      const api = markerApiRef.current[idx];
      if (!api || !map || !(window as any).naver?.maps) return;

      const { lat, lng } = api.getLatLng();
      const naver = (window as any).naver;
      map.panTo(new naver.maps.LatLng(lat, lng));
      api.focus();
    },
    [map]
  );

  // 마커 클릭 → 선택/포커스 + (오버레이 보이게) 시트 hide
  const handleMarkerClick = useCallback(
    (idx: number) => {
      focusToIndex(idx, true);
    },
    [focusToIndex]
  );

  // 바텀시트에서 장소 선택 → 같은 포커스 동작(시트는 내부에서 hide로 전환)
  const handlePlaceClickFromSheet = useCallback(
    (idx: number) => {
      focusToIndex(idx, false);
    },
    [focusToIndex]
  );

  return (
    <Container>
      <MapContainer ref={mapRef} />

      {map &&
        places.map((p, i) => (
          <MapMarker
            key={p.id}
            id={p.id}
            map={map}
            lat={p.lat}
            lng={p.lng}
            iconUrl={p.iconUrl}
            selected={selectedIndex === i}
            onClick={() => handleMarkerClick(i)}
            onMount={(api) => registerMarkerApi(i, api)}
            onUnmount={() => registerMarkerApi(i, null)}
          />
        ))}

      <BottomSheet
        mode={sheetMode}
        setMode={setSheetMode}
        places={places}
        selectedIndex={selectedIndex}
        onSelectPlace={handlePlaceClickFromSheet}
      />
    </Container>
  );
};

export default MapPage;

const Container = styled.div`
  width: 100%;
  flex: 1;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`;
