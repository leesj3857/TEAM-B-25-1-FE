import styled from "@emotion/styled";
import Intro from "./interface/Intro";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import MainHeader from "./interface/MainHeader";
import { useQuery } from "@tanstack/react-query";
import { getMidpoint } from "../../api";
import { useInviteCode } from "../../context/inviteCodeContext";
import { getLineSubwayFromAPI } from "../../utils/getLineSubway";

export default function MapHeader({mode}: {mode: 'hide' | 'half' | 'full'}) {
    const [isIntroVisible, setIsIntroVisible] = useState(true);
    const { inviteCode } = useInviteCode();

    const { data: midpointData, isLoading, error } = useQuery({
        queryKey: ['midpoint', inviteCode],
        queryFn: () => getMidpoint(inviteCode, "TIME_MATRIX"),
        enabled: !!inviteCode, // inviteCode가 있을 때만 쿼리 실행
        staleTime: 5 * 60 * 1000, // 5분간 데이터 유지
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsIntroVisible(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    // midpoint 이름 추출 (기본값: "성수역")
    const midpointName = midpointData?.name || "";
    const participantCount = midpointData ? midpointData.participantCount : 10; // 실제 참가자 수로 교체 필요

    // 호선 정보를 가져오는 쿼리
    const { data: lineData } = useQuery({
        queryKey: ['subwayLine', midpointName],
        queryFn: () => getLineSubwayFromAPI(midpointName),
        enabled: !!midpointName,
        staleTime: 10 * 60 * 1000, // 10분간 데이터 유지
    });

    // 호선 정보 처리 (배열 형태로 변환)
    const subwayLines = lineData ? lineData : [];
    return (
        <Container>
            <AnimatePresence>
                {isIntroVisible && <Intro name={midpointName} number={participantCount} place={midpointName} />}
            </AnimatePresence>
            <AnimatePresence>
                {!isIntroVisible && mode !== 'full' && <MainHeader name={midpointName} line={subwayLines} time={10} />}
            </AnimatePresence>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1000;
`;