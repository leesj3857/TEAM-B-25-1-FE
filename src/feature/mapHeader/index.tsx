import styled from "@emotion/styled";
import Intro from "./interface/Intro";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import MainHeader from "./interface/MainHeader";
interface HeaderData {
    meetingName: string;
    midpointName: string;
    participantCount: number;
    avgTime: number;
    subwayLines: string[];
}

export default function MapHeader({mode, headerData}: {mode: 'hide' | 'half' | 'full', headerData: HeaderData}) {
    const [isIntroVisible, setIsIntroVisible] = useState(true);


    useEffect(() => {
        const timer = setTimeout(() => {
            setIsIntroVisible(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);
    
    return (
        <Container>
            <AnimatePresence>
                {isIntroVisible && <Intro name={headerData.meetingName} number={headerData.participantCount} place={headerData.midpointName} />}
            </AnimatePresence>
            <AnimatePresence>
                {!isIntroVisible && mode !== 'full' && <MainHeader name={headerData.midpointName} line={headerData.subwayLines} time={headerData.avgTime} />}
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