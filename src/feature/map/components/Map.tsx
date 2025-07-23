import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMap } from "../hooks/useMap";
import MapMarker from "../interface/MapMarker";

const MapPage = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const { map, markerData } = useMap(mapRef);

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      {/* 상단 고정 헤더 */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "50px",
          backgroundColor: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 16px",
          zIndex: 10,
          borderBottom: "1px solid #ccc",
          fontSize: "16px",
          fontWeight: 500,
        }}
      >
        <button onClick={() => navigate(-1)}>←</button>
        <div>성수역</div>
        <button onClick={() => navigate("/vote")}>투표함</button>
      </div>

      {/* 지도 */}
      <div
        ref={mapRef}
        style={{
          position: "absolute",
          top: "50px",
          bottom: "60px",
          left: 0,
          right: 0,
        }}
      />

      {/* 마커 렌더링 */}
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

      {/* 하단 고정 버튼 */}
      <button
        onClick={() => alert("목록 보기 기능은 추후 구현 예정입니다.")}
        style={{
          position: "absolute",
          bottom: "16px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          padding: "12px 24px",
          background: "#03c75a",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontWeight: 500,
          cursor: "pointer",
        }}
      >
        목록 보기
      </button>
    </div>
  );
};

export default MapPage;
