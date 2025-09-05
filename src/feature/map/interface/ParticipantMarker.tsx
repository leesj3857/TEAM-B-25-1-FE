import styled from "@emotion/styled";
import { applyTypography } from "../../../styles/typography";

// 참가자 마커 색상 배열
const PARTICIPANT_COLORS = [
  "#0086AF",
  "#1E7900", 
  "#684804",
  "#940000",
  "#51006E",
  "#01546E"
];

interface ParticipantMarkerProps {
  name: string;
  colorIndex: number;
  position: { lat: number; lng: number };
}

export default function ParticipantMarker({ name, colorIndex }: ParticipantMarkerProps) {
  const color = PARTICIPANT_COLORS[colorIndex % PARTICIPANT_COLORS.length];
  
  return (
    <MarkerContainer color={color}>
      <MarkerText>{name}</MarkerText>
      <MarkerTail color={color} />
    </MarkerContainer>
  );
}

const MarkerContainer = styled.div<{ color: string }>`
  position: relative;
  height: 24px;
  background-color: ${({ color }) => color};
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 100;
  padding: 0 8px;
  min-width: 36px;
`;

const MarkerText = styled.span`
  color: white;
  ${applyTypography('label.xsmall')}
  font-weight: 700 !important;
  white-space: nowrap;
  text-align: center;
`;

const MarkerTail = styled.div<{ color: string }>`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 6px solid ${({ color }) => color};
`;
