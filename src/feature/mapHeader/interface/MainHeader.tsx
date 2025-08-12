import styled from "@emotion/styled";
import Icon from '@mdi/react';
import { mdiArrowLeft, mdiVote } from '@mdi/js';
import { grayscale } from "../../../styles/colors/grayscale";
import { applyTypography } from "../../../styles/typography";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function MainHeader({name, line}: {name: string, line: string[]}) {
    const navigate = useNavigate();

    const lineColor = {
        '1': '#0052A4',
        '2': '#00A84D',
        '3': '#EF7C1C',
        '4': '#00A5DE',
        '5': '#996CAC',
        '6': '#CD7C2F',
        '7': '#747F00',
        '8': '#E6186C',
        '9': '#BDB092',
        '우이': '#BB8336',
        default: '#000000',
    }

    return (
        <Container
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.3 }}
        >
            <Back>
                <Icon path={mdiArrowLeft} size={1.5} /> 
            </Back>
            <Station>
                {line.map((l) => (
                    <Line key={l} style={{ background: lineColor[l as keyof typeof lineColor] }}>
                        {l}
                    </Line>
                ))}
                <span>{name}</span>
            </Station>
            <Vote onClick={() => {
                navigate('/result');
            }}>
                <Icon path={mdiVote} size={1.2} />
                <span>투표함</span>
            </Vote>
        </Container>
    )
}

const Container = styled(motion.div)`
    width: 100%;
    height: 100px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    border-bottom: 1px solid ${grayscale[70]};
`;

const Back = styled.div`
    
`;

const Station = styled.div`
    width: 220px;
    height: 50px;
    background: #fff;
    border-radius: 10px;
    border: 1px solid ${grayscale[70]};
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    ${applyTypography('body.small')}
    font-weight: 700;
    `;


const Line = styled.div`
    width: 15px;
    height: 15px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    ${applyTypography('body.xsmall')}
    `;

const Vote = styled.button`
    background: none;
    border: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    ${applyTypography('label.xsmall')}
    color: ${grayscale[80]};
`;