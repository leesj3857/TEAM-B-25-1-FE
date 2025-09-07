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

    // 지도 인스턴스만 생성 (fitBounds는 상위 컴포넌트에서 처리)
    const instance = new naver.maps.Map(mapRef.current, {
      center: new naver.maps.LatLng(37.5665, 126.978), // 기본 서울 중심
      zoom: 15,
    });

    setMap(instance);
  }, [mapRef]); // places 의존성 제거

  return { map };
};
