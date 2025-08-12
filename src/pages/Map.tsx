import styled from '@emotion/styled';
import BottomSheet from '../feature/bottomSheet';
import MapComponent from "../feature/map/components/Map";
import Header from '../feature/mapHeader';
import { useState } from 'react';


const Map = () => {
  const [mode, setMode] = useState<'hide' | 'half' | 'full'>('hide');

  return (
    <Container>
      <Header mode={mode} />
      <MapComponent />
      <BottomSheet mode={mode} setMode={setMode} />
    </Container>
  );
};

export default Map;

const Container = styled.div`
  width: 100%;
  height: 100dvh;
  background: #EFF2F7;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;