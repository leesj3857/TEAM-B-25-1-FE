import styled from '@emotion/styled';
import { grayscale } from '../../../styles/colors/grayscale';
import { applyTypography } from '../../../styles/typography';
import { button } from '../../../styles/button';
import { mdiCheckCircleOutline, mdiChevronRight } from '@mdi/js';
import { Icon } from '@mdi/react';
import { secondary } from '../../../styles/colors/secondary';
import { primary } from '../../../styles/colors/primary';
 
export default function Place({name, time, imageList, onClick, isVoted, onClickVote}: {name: string, time: number, imageList: string[], onClick: () => void, isVoted: boolean, onClickVote?: () => void}) {
    const handleVoteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (onClickVote) {
            onClickVote();
        }
    }

    return (
        <Container onClick={onClick}>
            <TopContainer>
                <PlaceInfo>
                    <PinIcon>
                        <img src="/pin.svg" alt="pin" style={{width: '100%', height: '100%'}} />
                    </PinIcon>
                    <Name>{name}</Name>
                    <Icon path={mdiChevronRight} size={1} color={grayscale[60]} />
                </PlaceInfo>
                <Vote>
                    <VoteButton onClick={handleVoteClick} isVoted={isVoted}>
                        {isVoted ?  <><Icon path={mdiCheckCircleOutline} size={0.8} /> 투표완료</> : '투표하기'}
                    </VoteButton>
                </Vote>
            </TopContainer>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    padding: 17px;
`;

const TopContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
`;

const PlaceInfo = styled.div`
    display: flex;
    gap: 5px;
    flex: 1;
`;

const Name = styled.span`
    color: ${grayscale[80]};
    ${applyTypography('title.small')}
`;

const Time = styled.span`
    color: ${grayscale[60]};
    ${applyTypography('label.small')}
`;

const Vote = styled.div`
    display: flex;
    align-items: center;
`;

const VoteButton = styled.button<{isVoted: boolean}>`
    width: 120px;
    height: 40px;
    background-color: ${({isVoted}) => isVoted ? secondary[40] : grayscale[0]};
    border: 1px solid ${({isVoted}) => isVoted ? secondary[40] : secondary[70]};
    color: ${({isVoted}) => isVoted ? grayscale[0] : secondary[70]};
    ${applyTypography('label.small')}
    border-radius: 8px;
    box-shadow: none;
    transition: background-color 0.2s;
    cursor: pointer;
    &:hover {
        background-color: ${({isVoted}) => isVoted ? secondary[50] : grayscale[5]};
    }
    &:active {
        background-color: ${({isVoted}) => isVoted ? secondary[50] : primary[5]};
        border: 1px solid ${({isVoted}) => isVoted ? secondary[50] : secondary[60]};
    }
    &:disabled {
        background-color: ${({isVoted}) => isVoted ? secondary[40] : grayscale[30]};
        border: 1px solid ${({isVoted}) => isVoted ? secondary[40] : grayscale[40]};
        color: ${({isVoted}) => isVoted ? grayscale[0] : grayscale[60]};
    }
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    svg {
        position: relative;
        bottom: 1px;
    }
`;  

const PinIcon = styled.div`
    width: 25px;
    height: 25px;
`;