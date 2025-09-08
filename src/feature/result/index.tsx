import styled from "@emotion/styled";
import { grayscale } from "../../styles/colors/grayscale";
import Icon from '@mdi/react';
import { mdiArrowLeft } from '@mdi/js';
import { primary } from "../../styles/colors/primary";
import { useEffect, useState } from "react";
import { applyTypography } from "../../styles/typography";
import { motion } from "framer-motion";
import VoteResult from "./feature/VoteResult";
import Participant from "./feature/Participant";
import { useNavigate } from "react-router-dom";
import EditInfo from "./feature/EditInfo";
import { updateParticipant, getParticipants, ParticipantGetResponse, getMyParticipant } from "../../api";
import { useInviteCode } from "../../context/inviteCodeContext";
import { getLatLngByAddress } from "../../utils/getLng";
import { useQuery } from "@tanstack/react-query";

export default function Result() {
  const [activeTab, setActiveTab] = useState<'result' | 'participant'>('result');
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { inviteCode } = useInviteCode();

  // 참가자 정보를 가져오는 쿼리
  const { data: participants = [], refetch: refetchParticipants } = useQuery({
    queryKey: ['participants', inviteCode],
    queryFn: () => getParticipants(inviteCode),
    enabled: !!inviteCode,
    staleTime: 5 * 60 * 1000, // 5분간 데이터 유지
  });

  // 로컬스토리지에서 내 참가자 정보 가져오기
  const { data: myParticipantInfo, refetch: refetchMyParticipant } = useQuery({
    queryKey: ['myParticipant', inviteCode],
    queryFn: () => getMyParticipant(inviteCode),
    enabled: !!inviteCode,
    staleTime: 5 * 60 * 1000, // 5분간 데이터 유지
  });

  useEffect(() => {
    refetchParticipants();
    refetchMyParticipant();
  }, [inviteCode]);

  const onSave = async (name: string, address: string, transport: string) => {
    if (!inviteCode) {
      console.error("inviteCode가 없습니다.");
      return;
    }

    try {
      const coords = await getLatLngByAddress(address || '');
      if (!coords) return;
      const {lat, lng} = coords;
      
      await updateParticipant(inviteCode, {
        name,
        address,
        transportType: transport,
        lat,
        lng
      });

      // 로컬스토리지 업데이트
      if (myParticipantInfo) {
        const storedData = localStorage.getItem(inviteCode);
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          const updatedInfo = {
            ...parsedData,
            participantName: name
          };
          localStorage.setItem(inviteCode, JSON.stringify(updatedInfo));
        }
      }

      // 참가자 데이터 새로고침
      refetchParticipants();
      
      // 성공적으로 저장되면 편집 모드 종료
      setIsEditing(false);
      
    } catch (error) {
      console.error("참가자 정보 업데이트 실패:", error);
      // 에러 처리 (필요시 토스트 메시지 등)
    }
  }
  return (
    <Container>
      <Top>
        <Back onClick={() => {
          if (isEditing) {
            setIsEditing(false);
          } else {
            navigate('/map/' + inviteCode);
          }
        }}>
          <Icon path={mdiArrowLeft} size={1.5} color={grayscale[100]} /> 
        </Back>
        {isEditing && (
          <Title>내 정보 수정</Title>
        )}
      </Top>
      {isEditing && (
        <Body>
          <EditInfo 
            name={myParticipantInfo?.name || ""} 
            address={myParticipantInfo?.address || ""} 
            transport={myParticipantInfo?.transportType || "PUBLIC"} 
            onSave={onSave} 
            onCancel={() => setIsEditing(false)} 
          />
        </Body>
      )}
      {!isEditing && (
        <Body>
          <TabContainer>
              <Tab>
              <TabItem isActive={activeTab === 'result'} onClick={() => setActiveTab('result')}>
                  <span>투표 결과</span>
              </TabItem>
              <TabItem isActive={activeTab === 'participant'} onClick={() => setActiveTab('participant')}>
                  <span>참여자 현황</span>
              </TabItem>
              </Tab>
              <AnimatedBackground 
                  layoutId="tabBackground"
                  initial={false}
                  animate={{
                  x: activeTab === 'result' ? 0 : '100%',
                  }}
                  activeTab={activeTab}
                  transition={{
                  duration: 0.2,
                  ease: "easeInOut"
                  }}
              />
          </TabContainer>

          {activeTab === 'result' && (
            <>
              <VoteResult />
            </>
          )}
          {activeTab === 'participant' && (
            <Participant 
              setIsEditing={setIsEditing}
              participants={participants}
              myParticipant={myParticipantInfo}
            />
          )}
        </Body>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100dvh;
  background: #fff;
  display: flex;
  flex-direction: column;
  padding-top: 65px;
`;

const Top = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 65px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  border-bottom: 1px solid ${grayscale[30]};
  z-index: 10;
`;

const Back = styled.button`
  position: absolute;
  left: 15px;
  background: none;
  border: none;
  cursor: pointer;
`;

const Title = styled.span`
  ${applyTypography('body.large')}
  font-weight: 700;
  color: ${grayscale[100]};
`;

const Body = styled.div`
  width: 100%;
  flex: 1;
  background: #fff;
  padding: 20px 16px;
`;

const TabContainer = styled.div`
  width: 100%;
  height: 45px;
  background: #fff;
  position: relative;
  border: 2px solid ${primary[30]};
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 25px;
`;

const Tab = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 2;
`;

const TabItem = styled.div<{ isActive: boolean }>`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  ${applyTypography('body.small')}
  color: ${({ isActive }) => isActive ? '#fff' : primary[30]};
  cursor: pointer;
  position: relative;
  z-index: 3;
  transition: color 0.2s ease-in-out;
`;

const AnimatedBackground = styled(motion.div)<{ activeTab: 'result' | 'participant' }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  background: ${primary[30]};
  z-index: 1;
`;
