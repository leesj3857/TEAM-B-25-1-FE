import styled from '@emotion/styled';
import { grayscale } from '../../../styles/colors/grayscale';
import { applyTypography } from '../../../styles/typography';
import { button } from '../../../styles/button';
export default function Place({name, time, imageList, onClick}: {name: string, time: number, imageList: string[], onClick: () => void}) {
    const onClickVote = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        console.log('투표하기');
    }

    return (
        <Container onClick={onClick}>
            <TopContainer>
                <PlaceInfo>
                    <Name>{name}</Name>
                    <Time>소요시간 {time}분</Time>
                </PlaceInfo>
                <Vote>
                    <VoteButton onClick={(e) => onClickVote(e)}>
                        투표하기
                    </VoteButton>
                </Vote>
            </TopContainer>
            <ImageList>
                {imageList.map((image, index) => (
                    <Image key={index} image={image} />
                ))}
            </ImageList>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    padding: 17px;
`;

const TopContainer = styled.div`
    width: 100%;
    min-height: 40px;
    display: flex;
    margin-bottom: 20px;
`;

const PlaceInfo = styled.div`
    display: flex;
    padding-right: 10px;
    flex-direction: column;
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

const VoteButton = styled.button`
    width: 150px;
    height: 40px;
    ${button.Secondary}
`;  

const ImageList = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    overflow-x: scroll;
    overflow-y: hidden;
    padding-bottom: 10px;
    gap: 9px;
`;

const Image = styled.div<{image: string}>`
    width: 83px;
    height: 76px;
    flex-shrink: 0;
    border-radius: 8px;
    background-color: ${grayscale[40]};
    background-image: url(${({image}) => image});
    background-size: cover;
    background-position: center;
`;