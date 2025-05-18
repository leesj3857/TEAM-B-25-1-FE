import styled from '@emotion/styled';
import { useState } from 'react';
import { grayscale } from '../../../styles/colors/grayscale';
import { primary } from '../../../styles/colors/primary';
import { typography } from '../../../styles/typography';
import invitation1Image from '@/assets/images/invitation1.webp';
import beerImage from '@/assets/images/beer.webp';  
import notebookImage from '@/assets/images/notebook.webp';

interface Step1Props {
  onNext: () => void;
}

const CARD_LIST = [
  {
    key: 'friend',
    icon: beerImage,
    title: '친목',
    desc: '먹고 놀고 떠들고',
    color: primary[20],
  },
  {
    key: 'project',
    icon: notebookImage,
    title: '프로젝트',
    desc: '회의하고, 공부하고',
    color: primary[20],
  },
];

export default function Step1({ onNext }: Step1Props) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <Container>
      <HeaderRow>
        <Title>
          초대장을 만들어 보세요
          <InviteImg src={invitation1Image} alt="초대장" />
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
            color={card.color}
            onClick={() => setSelected(card.key)}
          >
            <Icon src={card.icon} alt={card.title} />
            <CardText>
              <CardTitle>{card.title}</CardTitle>
              <CardDesc>{card.desc}</CardDesc>
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
  font-size: ${typography.title.medium.fontSize}px;
  font-weight: ${typography.title.medium.fontWeight};
  line-height: ${typography.title.medium.lineHeight};
  display: flex;
  align-items: center;
  gap: 8px;
`;

const InviteImg = styled.img`
  width: 20px;
  height: 20px;
`;

const SubTitle = styled.div`
  color: ${grayscale[100]};
  font-size: ${typography.body.small.fontSize}px;
  font-weight: 400;
  line-height: ${typography.body.small.lineHeight};
  margin-bottom: 40px;
`;

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const SelectCard = styled.div<{ selected: boolean; color: string }>`
  display: flex;
  align-items: center;
  border: 1px solid
    ${({ selected, color }) => (selected ? color : grayscale[60])};
  border-radius: 8px;
  padding: 24px;
  background: ${({ selected, color }) =>
    selected ? color + '20' : '#fff'};
  height: 80px;
  cursor: pointer;
  transition: border 0.2s, background 0.2s;
`;

const Icon = styled.img`
  width: 30px;
  margin-right: 24px;
`;

const CardText = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.div`
  color: ${grayscale[70]};
  font-size: ${typography.title.medium.fontSize}px;
  font-weight: ${typography.title.medium.fontWeight};
  line-height: ${typography.title.medium.lineHeight};
`;

const CardDesc = styled.div`
  color: ${grayscale[60]};
  font-size: ${typography.body.small.fontSize}px;
  font-weight: ${typography.body.small.fontWeight};
  line-height: ${typography.body.small.lineHeight};
`;

const NextButton = styled.button`
  width: 100%;
  height: 50px;
  margin-top: 40px;
  background: ${primary[30]};
  color: #fff;
  font-size: ${typography.title.small.fontSize}px;
  font-weight: ${typography.title.small.fontWeight};
  line-height: ${typography.title.small.lineHeight};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  background: ${({ disabled }) =>
    disabled ? grayscale[40] : primary[30]};
  transition: all 0.2s ease;
`;
