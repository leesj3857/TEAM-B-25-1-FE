import styled from '@emotion/styled';
import { useState } from 'react';
import { grayscale } from '../../../styles/colors/grayscale';
import { primary } from '../../../styles/colors/primary';
import { secondary } from '../../../styles/colors/secondary';
import { typography, applyTypography } from '../../../styles/typography';
import { button } from '../../../styles/button';
import Emoji from '../../../interface/Emoji';

interface Step2Props {
  onNext: () => void;
  onPrev: () => void;
  userInfo?: {
    purpose?: string;
    name?: string;
    address?: string;
    hostName?: string;
    transport?: string;
    step3Step?: number;
  };
  updateUserInfo?: (newInfo: Partial<{
    purpose?: string;
    name?: string;
    address?: string;
    hostName?: string;
    transport?: string;
    step3Step?: number;
  }>) => void;
}

export default function Step2({ onNext, onPrev, userInfo, updateUserInfo }: Step2Props) {
  const [input, setInput] = useState(userInfo?.name || '');

  const handleNext = () => {
    if (updateUserInfo) {
      updateUserInfo({ name: input });
    }
    onNext();
  };

  return (
    <Container>
      <HeaderRow>
        <Title>
          초대장 이름을 지어주세요
          <Emoji>✍️</Emoji>
        </Title>
      </HeaderRow>
      <SubTitle>
        친구들이 어떤 약속인지 알 수 있게<br />모임 이름을 작성해주세요 !
      </SubTitle>
      <CenterImg src="/make_invitation/step2_v1.webp" alt="모임 캐릭터" />
      <InputWrap>
        <Input
          placeholder="ex) 화요미식회, 제디스3 11조"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
      </InputWrap>
      <ButtonRow>
        <PrevButton onClick={onPrev}>이전</PrevButton>
        <NextButton onClick={handleNext} disabled={!input}>다음</NextButton>
      </ButtonRow>
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
  margin-bottom: 28px;
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

const CenterImg = styled.img`
  width: 180px;
  height: 175px;
  margin: 0 auto 40px auto;
  display: block;
`;

const InputWrap = styled.div`
  width: 100%;
  margin-bottom: 30px;
`;

const Input = styled.input`
  width: 100%;
  height: 46px;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid ${grayscale[60]};
  font-size: 16px;
  color: ${grayscale[100]};
  transition: border 0.2s;
  &:focus {
    outline: none;
    border: 1px solid ${primary[30]};
  }
  &::placeholder {
    color: ${grayscale[50]};
    opacity: 1;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
`;

const PrevButton = styled.button`
  flex: 1;
  height: 50px;
  ${button.Secondary}
  ${applyTypography('title.small')}
`;

const NextButton = styled.button`
  flex: 1;
  height: 50px;
  ${button.Primary}
  ${applyTypography('title.small')}
`;
