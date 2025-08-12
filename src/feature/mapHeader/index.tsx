import styled from "@emotion/styled";
import Intro from "./interface/Intro";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import MainHeader from "./interface/MainHeader";

export default function MapHeader({mode}: {mode: 'hide' | 'half' | 'full'}) {
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
                {isIntroVisible && <Intro name="성수역" number={10} place="성수역" />}
            </AnimatePresence>
            <AnimatePresence>
                {!isIntroVisible && mode !== 'full' && <MainHeader name="성수역" line={['1', '2', '3']} />}
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