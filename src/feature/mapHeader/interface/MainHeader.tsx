import styled from "@emotion/styled";
import Icon from '@mdi/react';
import { mdiArrowLeft, mdiVote } from '@mdi/js';
import { grayscale } from "../../../styles/colors/grayscale";
import { applyTypography } from "../../../styles/typography";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { primary } from "../../../styles/colors/primary";
import { secondary } from "../../../styles/colors/secondary";

export default function MainHeader({name, line, time}: {name: string, line: string[], time: number}) {
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
        '경의': '#77C4A3',
        '경춘': '#0C8E72',
        '공항': '#0090D2',
        '신분당': '#D4003B',
        '수인': '#F5A200',
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
                {line.map((l) => {
                    // lineColor의 키 값이 line 문자열에 포함되어 있는지 확인
                    const colorKey = Object.keys(lineColor).find(key => 
                        key !== 'default' && l.includes(key)
                    );
                    
                    // colorKey가 없으면 렌더링하지 않음
                    if (!colorKey) return null;
                    
                    const backgroundColor = lineColor[colorKey as keyof typeof lineColor];
                    
                    return (
                        <Line key={l} style={{ background: backgroundColor }}>
                            <LineName isNumber={!isNaN(Number(colorKey))}>{colorKey}</LineName>
                        </Line>
                    );
                })}
                <span>{name}</span>
            </Station>
            <Vote onClick={() => {
                navigate('/result');
            }}>
                <Icon path={mdiVote} size={1.2} />
                <span>투표함</span>
            </Vote>
            <Time>
                <CharacterImg src="/logo_v2.webp" alt="캐릭터" />
                {time}분 소요
            </Time>
        </Container>
    )
}

const Container = styled(motion.div)`
    position: relative;
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

const LineName = styled.span<{isNumber: boolean}>`
    ${({isNumber}) => !isNumber && `
        font-size: 7px;
    `}
    white-space: nowrap;
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

const Time = styled.div`
    position: absolute;
    top: 110%;
    left: 10px;
    background-color: ${primary[5]};
    border-radius: 30px;
    padding: 7px 15px;
    ${applyTypography('body.xsmall')}
    color: ${secondary[30]};
    font-weight: 700;
    border: 1px solid ${secondary[20]};
    display: flex;
    align-items: center;
    gap: 5px;
`;

const CharacterImg = styled.img`
    width: 20px;
`;