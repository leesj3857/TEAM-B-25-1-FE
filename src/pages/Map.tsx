import styled from "@emotion/styled";
import MapComponent from "../feature/map/components/Map";
import Header from "../feature/mapHeader";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useInviteCode } from "../context/inviteCodeContext";
import { useQuery } from "@tanstack/react-query";
import { getPlaces, PlaceSection } from "../api/place";
import { getMidpoint } from "../api";
import { getMeeting } from "../api/meeting";
import { getParticipants } from "../api/participant";
import { getLineSubwayFromAPI } from "../utils/getLineSubway";
import { type MapPlace } from "../feature/map/types/marker";
import FetchingAnimation from "../feature/makeInvitation/interface/fetchingAnimation";

// PlaceItem을 MapPlace로 변환하는 함수
const adaptPlacesFromApi = (sections: PlaceSection[]): MapPlace[] => {
  const allPlaces: MapPlace[] = [];
  
  sections.forEach((section) => {
    section.items.forEach((item) => {
      // 카테고리에 따른 아이콘 설정
      let iconUrl = "/marker/location.svg"; // 기본값
      if (section.key === "FOOD") {
        iconUrl = "/marker/restaurant.svg";
      } else if (section.key === "FUN") {
        iconUrl = "/marker/playground.svg";
      }
      
      allPlaces.push({
        id: item.placeId,
        name: item.name,
        lat: item.latitude,
        lng: item.longitude,
        iconUrl,
        slotNo: item.slotNo,
        votedByMe: item.votedByMe,
        category: section.key,
        address: item.address,
        url: item.url,
        label: section.label
      });
    });
  });
  
  return allPlaces;
};

const Map = () => {
  const [mode, setMode] = useState<"hide" | "half" | "full">("hide");
  const { inviteCode: urlInviteCode } = useParams();
  const [searchParams] = useSearchParams();
  const { setInviteCode, inviteCode } = useInviteCode();
  
  // URL에서 선택된 장소 ID 가져오기
  const selectedPlaceId = searchParams.get('selectedPlaceId');

  useEffect(() => {
    if (urlInviteCode) {
      setInviteCode(urlInviteCode);
    }
  }, [urlInviteCode, setInviteCode]);

  // 장소 데이터를 가져오는 쿼리
  const { data: placesData, isLoading: isPlacesLoading, refetch: refetchPlaces } = useQuery({
    queryKey: ['places', inviteCode],
    queryFn: () => getPlaces(inviteCode),
    enabled: !!inviteCode,
    staleTime: 5 * 60 * 1000, // 5분간 데이터 유지
  });

  // 중간점 데이터를 가져오는 쿼리
  const { data: midpointData, isLoading: isMidpointLoading, refetch: refetchMidpoint } = useQuery({
    queryKey: ['midpoint', inviteCode],
    queryFn: () => getMidpoint(inviteCode, "TIME_MATRIX"),
    enabled: !!inviteCode,
    staleTime: 5 * 60 * 1000, // 5분간 데이터 유지
  });

  // 미팅 정보를 가져오는 쿼리
  const { data: meetingData, isLoading: isMeetingLoading, refetch: refetchMeeting } = useQuery({
    queryKey: ['meeting', inviteCode],
    queryFn: () => getMeeting(inviteCode),
    enabled: !!inviteCode,
    staleTime: 5 * 60 * 1000, // 5분간 데이터 유지
  });

  // 참가자 정보를 가져오는 쿼리
  const { data: participantsData, isLoading: isParticipantsLoading, refetch: refetchParticipants } = useQuery({
    queryKey: ['participants', inviteCode],
    queryFn: () => getParticipants(inviteCode),
    enabled: !!inviteCode,
    staleTime: 5 * 60 * 1000, // 5분간 데이터 유지
  });

  // midpoint 이름 추출
  const midpointName = midpointData?.name || "";

  // 호선 정보를 가져오는 쿼리
  const { data: lineData, isLoading: isLineLoading, refetch: refetchLine } = useQuery({
    queryKey: ['subwayLine', midpointName],
    queryFn: () => getLineSubwayFromAPI(midpointName),
    enabled: !!midpointName,
    staleTime: 10 * 60 * 1000, // 10분간 데이터 유지
  });

  // 장소 데이터 변환
  const places: MapPlace[] = placesData?.sections ? adaptPlacesFromApi(placesData.sections) : [];

  // 호선 정보 처리 (배열 형태로 변환)
  let subwayLines: string[] = [];
  
  if (lineData && lineData.length > 0) {
    // API에서 호선 정보를 성공적으로 가져온 경우
    subwayLines = lineData;
  } else if (midpointData?.line) {
    // API 실패 시 midpointData.line에서 호선 정보 추출
    const lineNum = midpointData.line;
    // "2호선" 형태에서 숫자만 추출
    if (lineNum && lineNum.match(/^\d+호선$/)) {
      const extractedLine = lineNum.replace(/^0+/, '').replace('호선', '');
      subwayLines = [extractedLine];
    } else if (lineNum) {
      // 다른 형태의 호선 정보도 그대로 사용
      subwayLines = [lineNum];
    }
  }

  // 헤더 데이터 준비
  const headerData = {
    meetingName: meetingData?.name || "",
    midpointName,
    participantCount: midpointData?.participantCount || 0,
    avgTime: midpointData ? Number((midpointData.avgTime / 60).toFixed(0)) : 0,
    subwayLines
  };

  // 모든 API 로딩 상태 확인
  const isLoading = isPlacesLoading || isMidpointLoading || isMeetingLoading || isLineLoading || isParticipantsLoading;
  const hasRequiredData = placesData && midpointData && meetingData && participantsData;

  // 로딩 중이거나 필수 데이터가 없는 경우
  if (isLoading || !hasRequiredData) {
    return (
      <LoadingContainer>
        <FetchingAnimation text="" />
      </LoadingContainer>
    );
  }
  
  return (
    <Container>
      <Header mode={mode} headerData={headerData} />
      <MapComponent 
        mode={mode} 
        setMode={setMode} 
        places={places} 
        participants={participantsData || []} 
        refetchPlaces={refetchPlaces} 
        refetchMidpoint={refetchMidpoint} 
        refetchMeeting={refetchMeeting} 
        refetchParticipants={refetchParticipants} 
        refetchLine={refetchLine}
        selectedPlaceId={selectedPlaceId ? selectedPlaceId : undefined}
      />
    </Container>
  );
};

export default Map;

const Container = styled.div`
  width: 100%;
  height: 100dvh;
  background: #eff2f7;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoadingContainer = styled.div`
  width: 100%;
  height: 100dvh;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
`;
