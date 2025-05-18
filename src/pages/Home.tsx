import styled from '@emotion/styled';
import { typography } from '../styles/typography';
import { grayscale } from '../styles/colors/grayscale';
import { primary } from '../styles/colors/primary';
import { spacing } from '../styles/spacing';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Heading>모임장소 추천 서비스</Heading>
      <LogoRow>
        <LogoText>어디</LogoText>
        <LogoGo>GO</LogoGo>
      </LogoRow>
      <CharacterImg src="/logo.png" alt="캐릭터" />
      <Description>
        초대장을 만들어서<br />
        친구들에게 공유해보세요
      </Description>
      <Button onClick={() => navigate('/make-invitation')}>초대장 만들기</Button>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  min-height: 100dvh;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Heading = styled.div`
  margin-top: 48px;
  margin-bottom: 8px;
  color: ${grayscale[70]};
  font-size: ${typography.heading.small.fontSize}px;
  font-weight: ${typography.heading.small.fontWeight};
  line-height: ${typography.heading.small.lineHeight};
  letter-spacing: ${typography.heading.small.letterSpacing}px;
  text-align: center;
`;

const LogoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
`;

const LogoText = styled.span`
  font-size: 30px;
  font-weight: 700;
  color: ${grayscale[80]};
`;

const LogoGo = styled.span`
  font-size: 30px;
  font-weight: 700;
  color: ${grayscale[40]};
  background: ${grayscale[10]};
  border-radius: 12px;
  padding: 0 8px;
`;

const CharacterImg = styled.img`
  width: 60%;
  max-width: 400px;
  margin: 0px 0 32px 0;
`;

const Description = styled.div`
  color: ${grayscale[50]};
  font-size: ${typography.body.large.fontSize}px;
  font-weight: ${typography.body.large.fontWeight};
  line-height: ${typography.body.large.lineHeight};
  text-align: center;
  margin-bottom: 40px;
`;

const Button = styled.button`
  width: 260px;
  height: 55px;
  background: ${primary[30]};
  color: #fff;
  font-size: ${typography.label.large.fontSize}px;
  font-weight: ${typography.label.large.fontWeight};
  line-height: ${typography.label.large.lineHeight};
  letter-spacing: ${typography.label.large.letterSpacing}px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 48px;
  box-shadow: none;
  transition: background 0.2s;
  &:hover {
    background: ${primary[40]};
  }
`;