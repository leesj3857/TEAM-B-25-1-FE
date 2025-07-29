import styled from "@emotion/styled";
import { button } from "../../../styles/button";
import { grayscale } from "../../../styles/colors/grayscale";
import { applyTypography } from "../../../styles/typography";
import { useState, useCallback } from "react";
import { Icon } from "@mdi/react";
import { mdiCheckCircleOutline } from "@mdi/js";
import { secondary } from "../../../styles/colors/secondary";
import { css } from "@emotion/react";

export default function SelectedPlace({name, rating, time, onClickVote, onClose}: {name: string, rating: number, time: number, onClickVote: () => void, onClose: () => void}) {
    const [isVoted, setIsVoted] = useState(false);
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
    const handleTouchEnd = useCallback(() => {
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
        >
            <PlaceInfo>
                <Image>
                </Image>    
                <PlaceInfoRight>
                    <PlaceName>
                        {name}
                    </PlaceName>
                    <PlaceRating>
                        네이버 평점 {rating}
                    </PlaceRating>
                    <PlaceTime>
                        소요 시간 {time}분
                    </PlaceTime>
                </PlaceInfoRight>
            </PlaceInfo>
            <Vote>
                    <VoteButton onClick={() => {
                        setIsVoted(true);
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
    bottom: 101%;
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
    gap: 25px;
`;
const Vote = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
`;

const VoteButton = styled.button<{isVoted: boolean}>`
    width: 100%;
    height: 50px;
    ${button.Secondary}
    ${({isVoted}) => isVoted && css`
        background-color: ${secondary[40]};
        color: ${grayscale[0]};
        border: transparent;
    `}
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    svg {
        margin-bottom: 2px;
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
    flex-direction: column;
    margin-bottom: 20px;
    `;

const PlaceName = styled.div`   
    ${applyTypography('title.medium')}
    color: ${grayscale[90]};
    margin-bottom: 8px;
`;

const PlaceRating = styled.div`
    ${applyTypography('label.medium')}
    color: ${grayscale[60]};
    margin-bottom: 5px;
`;

const PlaceTime = styled.div`
    ${applyTypography('label.medium')}
    color: ${grayscale[60]};
`;