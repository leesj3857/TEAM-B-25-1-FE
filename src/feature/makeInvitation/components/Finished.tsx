import styled from '@emotion/styled';
import { grayscale } from '../../../styles/colors/grayscale';
import { secondary } from '../../../styles/colors/secondary';
import { typography } from '../../../styles/typography';
import { mdiContentCopy } from '@mdi/js';
import { Icon } from '@mdi/react';
import { useState } from 'react';
import SuccessToastUI from '../../../interface/SucessToastUI';

export default function Finished() {
  const [showToast, setShowToast] = useState(false);

  function shareKakaoWithTemplate(linkUrl: string, templateId: number) {
    if (window.Kakao) {
      window.Kakao.Link.sendCustom({
        templateId: templateId, // 빌더에서 복사한 템플릿ID (숫자)
        templateArgs: {
          // 템플릿에서 변수로 지정한 값이 있다면 여기에 key-value로 전달
          linkUrl: linkUrl,
          // 예시: title: '초대장이 도착했어요!'
        }
      });
    }
  }

  return (
    <Container>
      <HeaderRow>
        <Title>
          초대장이 발급되었어요 ! <PartyIcon src="/party.webp" alt="파티" />
        </Title>
        <SubTitle>
          친구들에게 공유하고 약속 장소를 정해보세요 !
        </SubTitle>
      </HeaderRow>
      <CenterImg src="/finished.webp" alt="완료 캐릭터" />
      <ButtonList>
        <CopyButton  onClick={() => {
            setShowToast(true);
          }}>
          <Icon path={mdiContentCopy} size={0.9} color={secondary[70]} />
          <CopyText>링크 복사하기</CopyText>
        </CopyButton>
        <KakaoButton onClick={() => shareKakaoWithTemplate('https://www.google.com', 120740)}>
          <KakaoIcon src="/kakaotalk.webp" alt="카카오톡" />
          <KakaoText>카카오톡으로 공유하기</KakaoText>
        </KakaoButton>
      </ButtonList>
      <SuccessToastUI
        text="링크 복사가 완료되었어요!"
        show={showToast}
        onClose={() => setShowToast(false)}
      />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeaderRow = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-bottom: 16px;
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

const PartyIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const SubTitle = styled.div`
  color: ${grayscale[100]};
  font-size: ${typography.body.small.fontSize}px;
  font-weight: 400;
  line-height: ${typography.body.small.lineHeight};
  margin-top: 27px;
  margin-bottom: 24px;
`;

const CenterImg = styled.img`
  width: 180px;
  height: 200px;
  margin: 0 auto 40px auto;
  display: block;
`;

const ButtonList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const CopyButton = styled.button`
  width: 100%;
  height: 50px;
  padding: 13px 0;
  border-radius: 8px;
  border: 1px solid ${secondary[60]};
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
`;


const CopyText = styled.span`
  color: ${secondary[70]};
  font-size: ${typography.title.small.fontSize}px;
  font-weight: ${typography.title.small.fontWeight};
`;

const KakaoButton = styled.button`
  width: 100%;
  height: 50px;
  padding: 13px 0;
  border-radius: 8px;
  border: none;
  background: #FFE812;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
`;

const KakaoIcon = styled.img`
  width: 30px;
  height: 30px;
`;

const KakaoText = styled.span`
  color: ${grayscale[100]};
  font-size: ${typography.title.small.fontSize}px;
  font-weight: ${typography.title.small.fontWeight};
`;
