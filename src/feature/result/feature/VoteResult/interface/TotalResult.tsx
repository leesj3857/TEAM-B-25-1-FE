import styled from "@emotion/styled";
import { applyTypography } from "../../../../../styles/typography";
import { grayscale } from "../../../../../styles/colors/grayscale";

export default function TotalResult({number}: {number: number}) {
  return (
    <Container>
      <Img src="/logo_v1.webp" alt="total_result" />
      <Title>지금까지 {number}명이 투표했어요 ! 👏</Title>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 25px;
`;

const Img = styled.img`
  width: 80px;
  margin-bottom: 10px;
`;

const Title = styled.div`
  ${applyTypography('body.medium')}
  color: ${grayscale[100]};
`;