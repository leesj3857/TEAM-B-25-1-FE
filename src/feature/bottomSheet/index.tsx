import styled from "@emotion/styled";
import type React from "react";
import { Fragment, useState, useRef, useCallback, useEffect } from "react";
import { grayscale } from "../../styles/colors/grayscale";
import { Icon } from "@mdi/react";
import { mdiMenu, mdiSilverwareForkKnife, mdiTicket } from "@mdi/js";
import { applyTypography } from "../../styles/typography";
import { primary } from "../../styles/colors/primary";
import Place from "./interface/place";
import SelectedPlace from "./interface/selectedPlace";
import type { MapPlace } from "../map/types/marker";

export default function BottomSheet({
  mode,
  setMode,
  places = [], // ← 기본값 []
  selectedIndex,
  onSelectPlace,
  onVote,
  onClearSelection,
  selectedCategory,
  setSelectedCategory,
}: {
  mode: "hide" | "half" | "full";
  setMode: (mode: "hide" | "half" | "full") => void;
  places?: MapPlace[]; // ← optional
  selectedIndex: number | null;
  onSelectPlace: (idx: number) => void;
  onVote?: (placeIndex: number) => void;
  onClearSelection?: () => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const slideBarRef = useRef<HTMLDivElement>(null);
  const [selectedPlace, setSelectedPlace] = useState<{
    name: string;
  } | null>(null);
  const touchStartTime = useRef<number>(0);
  const touchStartX = useRef<number>(0);
  const touchStartYRef = useRef<number>(0);
  const prevSelectedIndexRef = useRef<number | null>(null);

  // 마커 클릭으로 selectedIndex가 바뀌면 카드 자동 노출 (가드 포함)
  useEffect(() => {
    if (selectedIndex == null) {
      prevSelectedIndexRef.current = null;
      return;
    }
    if (!Array.isArray(places)) return;
    const p = places[selectedIndex];
    if (!p) return;
    
    setSelectedPlace({ name: p.name });
    
    // selectedIndex가 처음 설정되거나 변경된 경우에만 hide 모드로 변경
    if (prevSelectedIndexRef.current !== selectedIndex) {
      setMode("hide"); // 카드가 목록 위(시트 바깥)에 뜨는 UX 유지
      prevSelectedIndexRef.current = selectedIndex;
    }
  }, [selectedIndex, places, setMode]);

  const handleItemTouchStart = (e: React.TouchEvent) => {
    touchStartTime.current = Date.now();
    touchStartX.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleItemTouchEnd = (e: React.TouchEvent, category: string) => {
    const timeDiff = Date.now() - touchStartTime.current;
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const moveX = Math.abs(endX - touchStartX.current);
    const moveY = Math.abs(endY - touchStartYRef.current);

    if (timeDiff < 200 && moveX < 10 && moveY < 10) {
      setSelectedCategory(category as string);
    }
  };

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    setStartY(e.touches[0].clientY);
    setCurrentY(e.touches[0].clientY);
    setTranslateY(0);
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging) return;

      const currentTouchY = e.touches[0].clientY;
      setCurrentY(currentTouchY);

      const diffY = currentTouchY - startY;
      const maxHeight = window.innerHeight * 0.9;
      const translatePercentage = (diffY / maxHeight) * 100;

      if (mode === "hide" && diffY > 0) {
        setTranslateY(0);
      } else {
        setTranslateY(translatePercentage);
      }
    },
    [isDragging, startY, mode]
  );

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging) return;

      setIsDragging(false);
      const diffY = currentY - startY;
      const threshold = 100;

      if (Math.abs(diffY) >= threshold) {
        if (diffY < 0) {
          if (mode === "hide") {
            if (diffY < -400) {
              setMode("full");
            } else {
              setMode("half");
            }
          } else if (mode === "half") {
            setMode("full");
          }
        } else {
          if (mode === "full") {
            if (diffY > 400) {
              setMode("hide");
            } else {
              setMode("half");
            }
          } else if (mode === "half") {
            setMode("hide");
          }
        }
      }

      setTranslateY(0);
    },
    [isDragging, currentY, startY, mode, setMode]
  );
  
  const onClose = () => {
    setSelectedPlace(null);
    setMode("half");
    // 상위 컴포넌트에서 selectedIndex도 초기화
    if (onClearSelection) {
      onClearSelection();
    }
  };

  return (
    <Container>
      <ListContainer
        mode={mode}
        selectedIndex={selectedIndex}
        translateY={translateY}
        isDragging={isDragging}
      >
        {mode === "hide" && selectedPlace === null && (
          <ListButton onClick={() => setMode("half")}>
            <Icon path={mdiMenu} size={0.9} color={grayscale[70]} />
            <ListButtonText>목록 보기</ListButtonText>
          </ListButton>
        )}
        {mode === "hide" && selectedPlace !== null && (
          <SelectedPlace
            name={selectedPlace.name}
            votedByMe={selectedIndex !== null ? places[selectedIndex]?.votedByMe || false : false}
            url={selectedIndex !== null ? places[selectedIndex]?.url : undefined}
            onClickVote={() => {
              if (selectedIndex !== null && onVote) {
                onVote(selectedIndex);
              }
            }}
            onClose={onClose}
          />
        )}
        <SlideBar
          ref={slideBarRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ touchAction: "none" }}
        >
          <div />
        </SlideBar>
        <CategoryContainer
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ touchAction: "none" }}
        >
          <CategoryItem
            selected={selectedCategory === "맛집"}
            onClick={() => setSelectedCategory("맛집")}
            onTouchStart={handleItemTouchStart}
            onTouchEnd={(e) => handleItemTouchEnd(e, "맛집" as string)}
          >
            <Icon
              path={mdiSilverwareForkKnife}
              size={0.9}
              color={selectedCategory === "맛집" ? primary[30] : grayscale[70]}
            />
            <span>맛집</span>
          </CategoryItem>
          <CategoryDivider />
          <CategoryItem
            selected={selectedCategory === "놀거리"}
            onClick={() => setSelectedCategory("놀거리")}
            onTouchStart={handleItemTouchStart}
            onTouchEnd={(e) => handleItemTouchEnd(e, "놀거리" as string)}
          >
            <Icon
              path={mdiTicket}
              size={0.9}
              color={
                selectedCategory === "놀거리" ? primary[30] : grayscale[70]
              }
            />
            <span>놀거리</span>
          </CategoryItem>
        </CategoryContainer>

        <PlaceContainer mode={mode} style={{touchAction: "pan-y"}}>
          {(places ?? []).map((p, index) => (
            <Fragment key={p.id}>
              <Place
                name={p.name}
                onClick={() => {
                  onSelectPlace(index);
                  setSelectedPlace({
                    name: p.name,
                  });
                  setMode("hide");
                }}
                isVoted={p.votedByMe || false}
                onClickVote={() => {
                  if (onVote) {
                    onVote(index);
                  }
                }}
              />
              {index !== places.length - 1 && <PlaceDivider />}
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

const ListContainer = styled.div<{
  mode: "hide" | "half" | "full";
  selectedIndex: number | null;
  translateY: number;
  isDragging: boolean;
}>`
  width: 100%;
  height: ${({ selectedIndex, mode }) => selectedIndex && mode === "hide" ? "140px" : "90dvh"};
  display: flex;
  flex-direction: column;
  transform: ${({ mode, translateY }) => {
    const baseTranslateY = mode === "hide" ? 75 : mode === "half" ? 35 : 0;
    return `translateY(${baseTranslateY + translateY}%)`;
  }};
  transition: ${({ isDragging }) =>
    isDragging ? "none" : "transform 0.3s ease-out"};
  /* overflow: hidden; */
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
  ${applyTypography("label.small")}
  color: ${grayscale[80]};
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
    color: ${({ selected }) => (selected ? primary[30] : grayscale[70])};
    ${applyTypography("label.xsmall")}
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

const PlaceContainer = styled.div<{ mode: "hide" | "half" | "full" }>`
  background-color: #fff;
  width: 100%;
  height: ${({ mode }) => (mode === "half" ? "calc(100% - 300px)" : mode === "full" ? "100%" : "auto")};
  ${({ mode }) => mode !== "half" && "flex: 1;"}
  overflow-y: ${({ mode }) => (mode === "hide" ? "hidden" : "auto")};
  padding-bottom: 10px;
  z-index: 1000;
`;
