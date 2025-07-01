import styled from '@emotion/styled';
import { useState } from 'react';
import { grayscale } from '../../../styles/colors/grayscale';
import { primary } from '../../../styles/colors/primary';
import { secondary } from '../../../styles/colors/secondary';
import { applyTypography } from '../../../styles/typography';
import { button } from '../../../styles/button';
import Emoji from '../../../interface/Emoji';

interface Step1Props {
  onNext: () => void;
}

const CARD_LIST = [
  {
    key: 'friend',
    icon: '🍺',
    title: '친목',
    desc: '먹고 놀고 떠들고',
  },
  {
    key: 'project',
    icon: '💻',
    title: '프로젝트',
    desc: '회의하고, 공부하고',
  },
];

export default function Step1({ onNext }: Step1Props) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <Container>
      <HeaderRow>
        <Title>
          초대장을 만들어 보세요
          <Emoji>💌</Emoji>
        </Title>
        <Title>
          친구들과 연결될 수 있습니다 !
        </Title>
      </HeaderRow>
      <SubTitle>
        어떤 약속인지 알려주시면,<br />적합한 약속 장소를 찾아드릴게요
      </SubTitle>
      <CardList>
        {CARD_LIST.map((card) => (
          <SelectCard
            key={card.key}
            selected={selected === card.key}
            onClick={() => setSelected(card.key)}
          >
            <CardEmoji>{card.icon}</CardEmoji>
            <CardText>
              <CardTitle selected={selected === card.key}>{card.title}</CardTitle>
              <CardDesc selected={selected === card.key}>{card.desc}</CardDesc>
            </CardText>
          </SelectCard>
        ))}
      </CardList>
      <NextButton
        onClick={onNext}
        disabled={!selected}
      >
        다음
      </NextButton>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const HeaderRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
`;

const Title = styled.div`
  color: ${grayscale[90]};
  ${applyTypography('title.medium')}
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SubTitle = styled.div`
  color: ${grayscale[100]};
  ${applyTypography('body.small')}
  margin-bottom: 40px;
`;

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const SelectCard = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  border: 1px solid
    ${({ selected }) => (selected ? primary[20] : grayscale[50])};
  border-radius: 8px;
  padding: 24px;
  background: ${({ selected }) =>
    selected ? primary[5] : '#fff'};
  height: 80px;
  cursor: pointer;
  transition: border 0.2s, background 0.2s;
  
`;

const CardText = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardEmoji = styled(Emoji)`
  font-size: 30px;
  margin-right: 24px;
`;

const CardTitle = styled.div<{ selected: boolean }>`
  color: ${({ selected }) =>
    selected ? primary[30] : grayscale[70]};
  ${applyTypography('title.medium')}
`;

const CardDesc = styled.div<{ selected: boolean }>`
  color: ${({ selected }) =>
    selected ? primary[30] : grayscale[60]};
  ${applyTypography('body.small')}
`;

const NextButton = styled.button`
  width: 100%;
  height: 50px;
  margin-top: 40px;
  ${button.Primary}
  ${applyTypography('title.small')}
`;
