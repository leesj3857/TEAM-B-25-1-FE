import styled from "@emotion/styled";
import { applyTypography } from "../../../../../styles/typography";
import { grayscale } from "../../../../../styles/colors/grayscale";
import { primary } from "../../../../../styles/colors/primary";
import { secondary } from "../../../../../styles/colors/secondary";
import Icon from '@mdi/react';
import { mdiMagnify } from '@mdi/js';
import { button } from "../../../../../styles/button";
import { Fragment, useState } from "react";
import { PlaceRankingType } from "../../../type/PlaceRanking";

export default function PlaceRanking({placeRanking}: {placeRanking: PlaceRankingType[]}) {
  const [showTotalResult, setShowTotalResult] = useState<boolean>(false);

  const placeUI = ({rank, name, count}: PlaceRankingType) => {
    return (
      <Container rank={rank}>
        <RankContainer>
          <Rank rank={rank}>{rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : rank}</Rank>
        </RankContainer>
        <NameCountContainer>
          <Name rank={rank}>{name}</Name>
          <Count rank={rank}>{count}명 투표</Count>
        </NameCountContainer>
        <MoreContainer rank={rank}>
            <Icon path={mdiMagnify} size={1} color={rank === 1 ? grayscale[0] : secondary[50]} />
            <span>더보기</span>
        </MoreContainer>
      </Container>
    );
  }
    
  return (
    <TotalContainer>
      {showTotalResult ? placeRanking.map((place) => placeUI(place)) : placeRanking.slice(0, 3).map((place) => <Fragment key={place.id}>{placeUI(place)}</Fragment>)}
      {showTotalResult ? null : <ShowTotalResult onClick={() => setShowTotalResult(true)}>
        <span>전체보기</span>
      </ShowTotalResult>}
    </TotalContainer>
  );
}

const TotalContainer = styled.div`
    width: 100%;
    height: calc(100% - 190px);
    background: #fff;
    overflow-y: auto;
    padding: 0 10px;
`;

const Container = styled.div<{rank: number}>`
  width: 100%;
  background: #fff;
  padding: ${({rank}) => rank === 1 ? '20px 18px' : '16px 18px'};
  display: flex;
  align-items: center;
  background-color: ${({rank}) => rank === 1 ? secondary[5] : grayscale[5]};
  border: 1px solid ${({rank}) => rank === 1 ? secondary[10] : grayscale[50]};
  border-radius: 10px;
  margin-bottom: 12px;
`;

const RankContainer = styled.div`
  display: flex;
  align-items: center;
  width: 60px;
`;

const Rank = styled.div<{rank: number}>`
  ${({rank}) => rank < 4 && `
    font-family: 'Tossface';
  `}
  font-size: ${({rank}) => rank === 1 ? '38px' : rank === 2 ? '32px' : rank === 3 ? '32px' : '16px'};
  color: ${grayscale[0]};
  ${({rank}) => rank >= 4 && `
    margin-left: 2px;
    width: 30px;
    height: 30px;
    border: 4px solid ${grayscale[40]};
    background-color: ${grayscale[60]};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    ${applyTypography('title.small')}
  `}
`;

const NameCountContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const Name = styled.div<{rank: number}>`
  ${({rank}) => rank === 1 ? applyTypography('title.medium') : applyTypography('title.small')}
  color: ${({rank}) => rank === 1 ? primary[40] : grayscale[90]};
`;

const Count = styled.div<{rank: number}>`
  ${({rank}) => rank === 1 ? applyTypography('body.small') : applyTypography('body.xsmall')}
  color: ${grayscale[70]};
`;

const MoreContainer = styled.button<{rank: number}>`
  width: 115px;
  ${({rank}) => rank === 1 && button.Primary}
  ${({rank}) => rank > 1 && button.Secondary}
  background-color: ${({rank}) => rank === 1 && secondary[30]};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  gap: 8px;
  margin-left: auto;
  ${applyTypography('label.small')}
  height: 36px;
  white-space: nowrap;
`;

const ShowTotalResult = styled.button`
  width: 100%;
  height: 50px;
  ${button.Tertiary}
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
`;