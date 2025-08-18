import styled from "@emotion/styled";
import BottomSheet from "../feature/bottomSheet";
import MapComponent from "../feature/map/components/Map";
import Header from "../feature/mapHeader";
import { useState } from "react";

const Map = () => {
  const [mode, setMode] = useState<"hide" | "half" | "full">("hide");

  return (
    <Container>
      <Header mode={mode} />
      <MapComponent />
    </Container>
  );
};

export default Map;

const Container = styled.div`
  width: 100%;
  height: 100dvh;
  background: #eff2f7;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
