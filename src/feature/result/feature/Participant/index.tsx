import Header from "./interface/header";
import styled from "@emotion/styled";
import MyProfile from "./interface/myProfile";
import Participants from "./interface/participants";
import { useState, useEffect } from "react";
import { getParticipants, ParticipantResponse } from "../../../../api";
import { useInviteCode } from "../../../../context/inviteCodeContext";

export default function Participant({setIsEditing}: {setIsEditing: (isEditing: boolean) => void}) {
    const [participants, setParticipants] = useState<ParticipantResponse[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { inviteCode } = useInviteCode();

    useEffect(() => {
        const fetchParticipants = async () => {
            if (!inviteCode) {
                console.error("inviteCode가 없습니다.");
                return;
            }

            try {
                setIsLoading(true);
                setError(null);
                
                const response = await getParticipants(inviteCode);
                
                if (response.success) {
                    setParticipants(response.data);
                } else {
                    setError(response.message || "참가자 목록을 불러오는데 실패했습니다.");
                }
                
            } catch (error) {
                console.error("참가자 목록 조회 실패:", error);
                setError("참가자 목록을 불러오는데 실패했습니다.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchParticipants();
    }, [inviteCode]);

    // 로딩 중일 때
    if (isLoading) {
        return (
            <Container>
                <div>참가자 목록을 불러오는 중...</div>
            </Container>
        );
    }

    // 에러가 있을 때
    if (error) {
        return (
            <Container>
                <div>에러: {error}</div>
            </Container>
        );
    }

    return (
        <Container>
            <Header name="텔레토비" station={{ name: '성수역', line: ['2','3','4'] }} />
            <MyProfile name="텔레토비" isDone={true} setIsEditing={setIsEditing} />
            <Participants 
                totalNumber={participants.length} 
                participants={participants.map((p: ParticipantResponse) => ({
                    name: p.name, 
                    isDone: false
                }))} 
            />
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    background: #fff;
`;