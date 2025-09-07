import styled from "@emotion/styled";
import { grayscale } from "../../../styles/colors/grayscale";
import { applyTypography } from "../../../styles/typography";
import { useState, useCallback, useEffect } from "react";
import { Icon } from "@mdi/react";
import { mdiCheckCircleOutline, mdiMapSearch } from "@mdi/js";
import { secondary } from "../../../styles/colors/secondary";
import { css } from "@emotion/react";
import { primary } from "../../../styles/colors/primary";

export default function SelectedPlace({name, votedByMe = false, onClickVote, onClose, url}: {name: string, votedByMe?: boolean, onClickVote: () => void, onClose: () => void, url?: string}) {
    const [isVoted, setIsVoted] = useState(votedByMe);
    
    // votedByMe가 변경되면 isVoted 상태도 업데이트
    useEffect(() => {
        setIsVoted(votedByMe);
    }, [votedByMe]);
    const [isDragging, setIsDragging] = useState(false);
    const [startY, setStartY] = useState(0);
    const [currentY, setCurrentY] = useState(0);
    const [translateY, setTranslateY] = useState(0);

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
        const translatePercentage = (diffY / 200) * 100; // 200px 기준으로 계산

        if (diffY > 0) {
            setTranslateY(translatePercentage);
        } else {
            setTranslateY(0);
        }
    }, [isDragging, startY]);

    // 터치 종료
    const handleTouchEnd = useCallback((e: React.TouchEvent) => {
        if (!isDragging) return;
        
        setIsDragging(false);
        const diffY = currentY - startY;
        const threshold = 100; // 50px 이상 드래그하면 닫기
        
        if (diffY >= threshold) {
            onClose();
        }
        
        setTranslateY(0);
    }, [isDragging, currentY, startY, onClose]);

    return (
        <Container 
            translateY={translateY} 
            isDragging={isDragging}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ touchAction: 'none' }}
        >
            <PlaceInfo>    
                <PlaceInfoRight>
                    <PinIcon>
                        <img src="/pin.svg" alt="pin" style={{width: '100%', height: '100%'}} />
                    </PinIcon>
                    <PlaceName>
                        {name}
                    </PlaceName>
                </PlaceInfoRight>
                <MapButton onClick={() => {
                    if (url) {
                        window.open(url, '_blank');
                    }
                }}>
                    <Icon path={mdiMapSearch} size={1} color={primary[30]} />
                </MapButton>
            </PlaceInfo>
            <Vote>
                    <VoteButton onClick={() => {
                        setIsVoted(!isVoted);
                        onClickVote();
                    }} isVoted={isVoted}>
                        {isVoted ? <><Icon path={mdiCheckCircleOutline} size={1} /> 투표완료</> : '투표하기'}
                    </VoteButton>
                </Vote>
        </Container>
    )
}

const Container = styled.div<{translateY: number, isDragging: boolean}>`
    width: 360px;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    bottom: 105%;
    background: white;
    left: 50%;
    transform: translateX(-50%) translateY(${({translateY}) => translateY}px);
    transition: ${({isDragging}) => isDragging ? 'none' : 'transform 0.3s ease-out'};
    border-radius: 15px;
    padding: 20px 15px;
    cursor: grab;
    &:active {
        cursor: grabbing;
    }
`;

const PlaceInfo = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    gap: 25px;
    margin-bottom: 10px;
`;
const Vote = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
`;

const VoteButton = styled.button<{isVoted: boolean}>`
    width: 100%;
    height: 50px;
    background-color: ${secondary[5]};
    border: 1px solid ${secondary[10]};
    color: ${secondary[50]};
    font-weight: 700 !important;
    ${applyTypography('label.medium')}
    border-radius: 8px;
    box-shadow: none;
    transition: background-color 0.2s;
    cursor: pointer;
    ${({isVoted}) => isVoted && css`
        background-color: ${secondary[40]};
        color: ${grayscale[0]};
        border: transparent;
    `}
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    svg {
        margin-bottom: 1px;
    }
`;  

const Image = styled.div`
    width: 90px;
    height: 90px;
    background: #fff;
    border-radius: 8px;
    background: ${grayscale[40]};
`;

const PlaceInfoRight = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 0 15px 0;
`;

const PlaceName = styled.div`   
    ${applyTypography('title.medium')}
    color: ${grayscale[90]};
`;

const MapButton = styled.button`
    width: 50px;
    height: 50px;
    border-radius: 10px;
    background-color: white;
    border: 1px solid ${secondary[10]};
    color: ${primary[30]};
    display: flex;
    align-items: center;
    justify-content: center;
`;

const PinIcon = styled.div`
    width: 25px;
    height: 25px;
`;