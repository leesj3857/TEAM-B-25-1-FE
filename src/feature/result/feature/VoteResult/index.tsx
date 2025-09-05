import styled from "@emotion/styled";
import PlaceRanking from "./interface/PlaceRanking";
import TotalResult from "./interface/TotalResult";
import { PlaceRankingType } from "../../type/PlaceRanking";
import { useQuery } from "@tanstack/react-query";
import { getParticipants } from "../../../../api/participant";
import { getVoteResult } from "../../../../api/vote";
import { useInviteCode } from "../../../../context/inviteCodeContext";

export default function VoteResult() {
    const { inviteCode } = useInviteCode();

    // 참가자 정보를 가져오는 쿼리
    const { data: participantsData } = useQuery({
        queryKey: ['participants', inviteCode],
        queryFn: () => getParticipants(inviteCode),
        enabled: !!inviteCode,
        staleTime: 5 * 60 * 1000, // 5분간 데이터 유지
    });

    // 투표 결과를 가져오는 쿼리
    const { data: voteResultData } = useQuery({
        queryKey: ['voteResult', inviteCode],
        queryFn: () => getVoteResult(inviteCode),
        enabled: !!inviteCode,
        staleTime: 5 * 60 * 1000, // 5분간 데이터 유지
    });

    // hasVoted가 true인 참가자 수 계산
    const votedParticipantCount = participantsData ? 
        participantsData.filter(participant => participant.hasVoted).length : 0;

    // 투표 결과를 PlaceRankingType 형태로 변환
    const placeRanking: PlaceRankingType[] = voteResultData ? 
        voteResultData.flat().map((place, index) => ({
            id: parseInt(place.placeId),
            rank: index + 1,
            name: place.name,
            count: 0 // vote count는 API 응답에 없으므로 0으로 설정 (필요시 API 수정 필요)
        })) : [];
    return (
        <Container>
            <TotalResult number={votedParticipantCount} />
            <PlaceRanking placeRanking={placeRanking} />
        </Container>
    )
}

const Container = styled.div`   
    
`;