import { useEffect } from "react";

interface MapMarkerProps {
  map: any;
  lat: number;
  lng: number;
  iconUrl: string;
}

const MapMarker = ({ map, lat, lng, iconUrl }: MapMarkerProps) => {
  useEffect(() => {
    const naver = (window as any).naver;

    const markerHtml = document.createElement("div");
    markerHtml.style.width = "35px";
    markerHtml.style.height = "35px";
    markerHtml.style.background = "#7A87FF";
    markerHtml.style.borderRadius = "50%";
    markerHtml.style.display = "flex";
    markerHtml.style.alignItems = "center";
    markerHtml.style.justifyContent = "center";
    markerHtml.style.padding = "9px 9.75px";
    markerHtml.style.transition = "background 0.2s ease";

    const img = document.createElement("img");
    img.src = iconUrl;
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "contain";
    markerHtml.appendChild(img);

    const marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(lat, lng),
      map,
      icon: {
        content: markerHtml,
        anchor: new naver.maps.Point(17.5, 17.5),
      },
    });

    naver.maps.Event.addListener(marker, "click", () => {
      markerHtml.style.background =
        markerHtml.style.background === "#7A87FF" ? "#4759FF" : "#7A87FF";
    });
  }, [map, lat, lng, iconUrl]);

  return null;
};

export default MapMarker;
