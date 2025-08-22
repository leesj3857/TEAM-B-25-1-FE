import styled from "@emotion/styled";
import BottomSheet from "../feature/bottomSheet";
import MapComponent from "../feature/map/components/Map";
import Header from "../feature/mapHeader";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useInviteCode } from "../context/inviteCodeContext";

const Map = () => {
  const [mode, setMode] = useState<"hide" | "half" | "full">("hide");
  const { inviteCode: urlInviteCode } = useParams();
  const { setInviteCode } = useInviteCode();

  useEffect(() => {
    if (urlInviteCode) {
      setInviteCode(urlInviteCode);
    }
  }, [urlInviteCode, setInviteCode]);
  
  return (
    <Container>
      <Header mode={mode} />
      <MapComponent mode={mode} setMode={setMode}/>
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
