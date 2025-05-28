import Lottie from 'lottie-react';
import styled from '@emotion/styled';
import fetchingAnimation from '../../../../public/animation/fetching.json';
import { grayscale } from '../../../styles/colors/grayscale';
import { typography } from '../../../styles/typography';

export default function FetchingAnimation() {
  return (
    <Container>
      <LoadingText>초대장을 만들고 있어요...</LoadingText>
      <LottieWrapper>
        <Lottie animationData={fetchingAnimation} loop />
      </LottieWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
  gap: 48px;
`;

const LottieWrapper = styled.div`
  width: 200px;
  height: 200px;
  margin: 0 auto;
`;

const LoadingText = styled.div`
  color: ${grayscale[90]};
  font-size: ${typography.title.medium.fontSize}px;
  font-weight: ${typography.title.medium.fontWeight};
  line-height: ${typography.title.medium.lineHeight};
  text-align: center;
`;