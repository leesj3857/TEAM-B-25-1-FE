import { useRef } from "react";
import { useMap } from "../hooks/useMap";
import MapMarker from "../interface/MapMarker";
import styled from "@emotion/styled";

const MapPage = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const { map, markerData } = useMap(mapRef);

  return (
    <Container>
      <MapContainer
        ref={mapRef}
      />

      {map &&
        markerData.map((marker, i) => (
          <MapMarker
            key={i}
            map={map}
            lat={marker.lat}
            lng={marker.lng}
            iconUrl={marker.iconUrl}
          />
        ))}

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