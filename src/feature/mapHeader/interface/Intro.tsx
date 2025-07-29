import styled from "@emotion/styled";
import { grayscale } from "../../../styles/colors/grayscale";
import { applyTypography } from "../../../styles/typography";
import { motion } from "framer-motion";

export default function Intro({name, number, place}: {name: string, number: number, place: string}) {
    return (
            <Container
                initial={{ opacity: 0, y: -100, x: '-50%' }}
                animate={{ opacity: 1, y: 0, x: '-50%' }}
                exit={{ opacity: 0, y: -100, x: '-50%' }}
                transition={{ duration: 0.3 }}
            >
                <div>
                    <strong>{name}</strong> 모임 {number}명의 <br /> 중간지점은 <strong>{place}</strong>입니다 !
                </div>
            </Container>
    )
}

const Container = styled(motion.div)`
    width: 300px;
    padding: 20px 50px;
    position: absolute;
    top: 40px;
    left: 50%;
    transform: translateX(-50%);
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    border: 1px solid ${grayscale[70]};
    z-index: 1000;
    ${applyTypography('label.large')}
    text-align: center;
`;

