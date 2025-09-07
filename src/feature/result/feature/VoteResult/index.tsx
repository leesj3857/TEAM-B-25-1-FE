import styled from "@emotion/styled";
import PlaceRanking from "./interface/PlaceRanking";
import TotalResult from "./interface/TotalResult";
import { PlaceRankingType } from "../../type/PlaceRanking";
import { useQuery } from "@tanstack/react-query";
import { getParticipants } from "../../../../api/participant";
import { getVoteResult } from "../../../../api/vote";
import { useInviteCode } from "../../../../context/inviteCodeContext";
import { useEffect } from "react";

export default function VoteResult() {
    const { inviteCode } = useInviteCode();

    // 참가자 정보를 가져오는 쿼리
    const { data: participantsData, refetch: refetchParticipants } = useQuery({
        queryKey: ['participants', inviteCode],
        queryFn: () => getParticipants(inviteCode),
        enabled: !!inviteCode,
        staleTime: 5 * 60 * 1000, // 5분간 데이터 유지
    });

    // 투표 결과를 가져오는 쿼리
    const { data: voteResultData, refetch: refetchVoteResult } = useQuery({
        queryKey: ['voteResult', inviteCode],
        queryFn: () => getVoteResult(inviteCode),
        enabled: !!inviteCode,
        staleTime: 5 * 60 * 1000, // 5분간 데이터 유지
    });


    useEffect(() => {
        refetchParticipants();
        refetchVoteResult();
    }, [inviteCode]);

    // hasVoted가 true인 참가자 수 계산
    const votedParticipantCount = participantsData ? 
        participantsData.filter(participant => participant.hasVoted).length : 0;

    // 투표 결과를 PlaceRankingType 형태로 변환
    const placeRanking: PlaceRankingType[] = voteResultData ? 
        voteResultData.flat().map((place, index) => ({
            id: place.placeId,
            rank: index + 1,
            name: place.name,
            count: place.voteCount
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