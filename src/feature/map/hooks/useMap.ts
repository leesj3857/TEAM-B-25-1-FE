import { useEffect, useState } from "react";
import { MarkerData } from "../types/marker";

export const useMap = (mapRef: React.RefObject<HTMLDivElement | null>) => {
  const [map, setMap] = useState<naver.maps.Map | null>(null);

  useEffect(() => {
    if (!window.naver || !mapRef.current) return;

    const naver = window.naver;

    const instance = new naver.maps.Map(mapRef.current, {
      center: new naver.maps.LatLng(37.5665, 126.978),
      zoom: 15,
    });

    setMap(instance);
  }, [mapRef]);

  const markerData: MarkerData[] = [
    { lat: 37.5665, lng: 126.978, iconUrl: "/marker/location.svg" },
    { lat: 37.57, lng: 126.9768, iconUrl: "/marker/playground.svg" },
    { lat: 37.561, lng: 126.983, iconUrl: "/marker/restaurant.svg" },
  ];

  return { map, markerData };
};
