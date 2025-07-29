import styled from '@emotion/styled';
import { Fragment, useState, useRef, useCallback } from 'react';
import { grayscale } from '../../styles/colors/grayscale';
import { Icon } from '@mdi/react';
import { mdiMenu,mdiSilverwareForkKnife,mdiTicket } from '@mdi/js';
import { applyTypography } from '../../styles/typography';
import { primary } from '../../styles/colors/primary';
import Place from './interface/place';
import SelectedPlace from './interface/selectedPlace';

export default function BottomSheet({mode, setMode}: {mode: 'hide' | 'half' | 'full', setMode: (mode: 'hide' | 'half' | 'full') => void}) {
  const [selectedCategory, setSelectedCategory] = useState('맛집');
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const slideBarRef = useRef<HTMLDivElement>(null);
  const [selectedPlace, setSelectedPlace] = useState<{name: string, rating: number, time: number} | null>(null);
  
  const onClickPlace = (place: {name: string, rating: number, time: number}) => {
    setSelectedPlace(place);
    setMode('hide');
  }

  // 터치 시작
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    setStartY(e.touches[0].clientY);
    setCurrentY(e.touches[0].clientY);
    setTranslateY(0);
  }, []);

  // 터치 이동
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const currentTouchY = e.touches[0].clientY;
    setCurrentY(currentTouchY);
    
    const diffY = currentTouchY - startY;
    const maxHeight = window.innerHeight * 0.9;
    const translatePercentage = (diffY / maxHeight) * 100;

    if (mode === 'hide' && diffY > 0) {
      setTranslateY(0);
    } else {
      setTranslateY(translatePercentage);
    }
  }, [isDragging, startY, mode]);

  // 터치 종료
  const handleTouchEnd = useCallback(() => {
    if (!isDragging) return;
    
    setIsDragging(false);
    const diffY = currentY - startY;
    const threshold = 100;
    
    if (Math.abs(diffY) >= threshold) {
      if (diffY < 0) {
        if (mode === 'hide') {
            if(diffY < -400) {
                setMode('full');
            } else {
                setMode('half');
            }
        } else if (mode === 'half') {
          setMode('full');
        }
      } else {
        if (mode === 'full') {
          if(diffY > 400) {
            setMode('hide');
          } else {
            setMode('half');
          }
        } else if (mode === 'half') {
          setMode('hide');
        }
      }
    }
    
    setTranslateY(0);
  }, [isDragging, currentY, startY, mode]);

  const onClose = () => {
    setSelectedPlace(null);
    setMode('half');
  }

  return (
    <Container>
      <ListContainer mode={mode} translateY={translateY} isDragging={isDragging}>
        {mode === 'hide' && selectedPlace === null && (
          <ListButton onClick={() => setMode('half')}>
            <Icon path={mdiMenu} size={0.9} color={grayscale[70]} />
            <ListButtonText>목록 보기</ListButtonText>
          </ListButton>
        )}
        {mode === 'hide' && selectedPlace !== null && (
          <SelectedPlace name={selectedPlace.name} rating={selectedPlace.rating} time={selectedPlace.time} onClickVote={() => {}} onClose={onClose} />
        )}
        <SlideBar 
          ref={slideBarRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div />
        </SlideBar>
        <CategoryContainer>
            <CategoryItem selected={selectedCategory === '맛집'} onClick={() => setSelectedCategory('맛집')}>
                <Icon path={mdiSilverwareForkKnife} size={0.9} color={selectedCategory === '맛집' ? primary[30] : grayscale[70]} />
                <span>맛집</span>
            </CategoryItem>
            <CategoryDivider />
            <CategoryItem selected={selectedCategory === '놀거리'} onClick={() => setSelectedCategory('놀거리')}>
                <Icon path={mdiTicket} size={0.9} color={selectedCategory === '놀거리' ? primary[30] : grayscale[70]} />
                <span>놀거리</span>
            </CategoryItem>
        </CategoryContainer>
        <PlaceContainer mode={mode}>
            {Array.from({length: 10}).map((_, index) => (
                <Fragment key={index}>
                    <Place name="맛집" time={10} imageList={['https://picsum.photos/200/300', 'https://picsum.photos/200/300', 'https://picsum.photos/200/300', 'https://picsum.photos/200/300']} onClick={() => onClickPlace({name: '맛집', rating: 10, time: 10})} />
                    {index !== 9 && <PlaceDivider />}
                </Fragment>
            ))}
        </PlaceContainer>
      </ListContainer>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  pointer-events: none;
`;

const ListContainer = styled.div<{mode: 'hide' | 'half' | 'full', translateY: number, isDragging: boolean}>`
  width: 100%;
  height: 90dvh;
  display: flex;
  flex-direction: column;
  transform: translateY(${({mode, translateY}) => {
    const baseTranslateY = mode === 'hide' ? 75 : mode === 'half' ? 35 : 0;
    return baseTranslateY + translateY;
  }}%);
  transition: ${({isDragging}) => isDragging ? 'none' : 'transform 0.3s ease-out'};
  // overflow: hidden;
  pointer-events: auto;
`;

const ListButton = styled.button`
  width: 110px;
  height: 35px;
  padding: 9px;
  background-color: #fff;
  border: 1px solid ${grayscale[70]};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin: 0 auto 15px;
`;

const ListButtonText = styled.span`
  ${applyTypography('label.small')}
`;

const SlideBar = styled.div`
  background-color: #fff;
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 0.5px solid ${grayscale[40]};
  & > div {
    width: 51px;
    height: 3px;
    background-color: ${grayscale[50]};
    border-radius: 60px;
  }
  z-index: 1000;
`;

const CategoryContainer = styled.div`
  background-color: #fff;
  width: 100%;
  height: 70px;
  padding: 5px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid ${grayscale[40]};
  z-index: 1000;
`;

const CategoryItem = styled.div<{ selected?: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  cursor: pointer;
  & > span {
    color: ${({ selected }) => selected ? primary[30] : grayscale[70]};
    ${applyTypography('label.xsmall')}
  }
`;

const CategoryDivider = styled.div`
  width: 2px;
  height: 40px;
  background-color: ${grayscale[50]};
`;

const PlaceDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${grayscale[40]};
`;

const PlaceContainer = styled.div<{mode: 'hide' | 'half' | 'full'}>`
  background-color: #fff;
  width: 100%;
  flex: 1;
  overflow-y: ${({mode}) => mode === 'hide' ? 'hidden' : 'auto'};
  padding-bottom: 10px;
  z-index: 1000;
`;