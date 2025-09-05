import Header from "./interface/header";
import styled from "@emotion/styled";
import MyProfile from "./interface/myProfile";
import Participants from "./interface/participants";
import { useQuery } from "@tanstack/react-query";
import { getMeeting } from "../../../../api/meeting";
import { getMidpoint } from "../../../../api";
import { getLineSubwayFromAPI } from "../../../../utils/getLineSubway";
import { ParticipantGetResponse } from "../../../../api";
import { useInviteCode } from "../../../../context/inviteCodeContext";

interface ParticipantProps {
    setIsEditing: (isEditing: boolean) => void;
    participants: ParticipantGetResponse[];
    myParticipant?: ParticipantGetResponse;
}

export default function Participant({setIsEditing, participants, myParticipant}: ParticipantProps) {
    const { inviteCode } = useInviteCode();

    // 미팅 정보를 가져오는 쿼리
    const { data: meetingData } = useQuery({
        queryKey: ['meeting', inviteCode],
        queryFn: () => getMeeting(inviteCode),
        enabled: !!inviteCode,
        staleTime: 5 * 60 * 1000, // 5분간 데이터 유지
    });

    // 중간장소 정보를 가져오는 쿼리
    const { data: midpointData } = useQuery({
        queryKey: ['midpoint', inviteCode],
        queryFn: () => getMidpoint(inviteCode, "TIME_MATRIX"),
        enabled: !!inviteCode,
        staleTime: 5 * 60 * 1000, // 5분간 데이터 유지
    });

    // midpoint 이름 추출
    const midpointName = midpointData?.name || "";

    // 호선 정보를 가져오는 쿼리
    const { data: lineData } = useQuery({
        queryKey: ['subwayLine', midpointName],
        queryFn: () => getLineSubwayFromAPI(midpointName),
        enabled: !!midpointName,
        staleTime: 10 * 60 * 1000, // 10분간 데이터 유지
    });

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

    return (
        <Container>
            <Header name={meetingData?.name || ""} station={{ name: midpointName, line: subwayLines }} />
            <MyProfile 
                name={myParticipant?.name || "알 수 없음"} 
                isDone={myParticipant?.hasVoted || false} 
                setIsEditing={setIsEditing} 
            />
            <Participants 
                totalNumber={participants.length} 
                participants={participants.map((p: ParticipantGetResponse) => ({
                    name: p.name, 
                    isDone: p.hasVoted
                }))} 
            />
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    background: #fff;
`;