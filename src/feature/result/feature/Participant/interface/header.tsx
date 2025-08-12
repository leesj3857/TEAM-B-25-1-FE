import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { grayscale } from "../../../../../styles/colors/grayscale";
import { applyTypography } from "../../../../../styles/typography";

export default function Header({name, station}: {name: string, station: { name: string, line: string[] }}) {
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
        <Container>
            <MeetingName>{name}</MeetingName>
            <Station>
                {station.line.map((l, index) => (
                    <Line key={index} style={{ background: lineColor[l as keyof typeof lineColor] }}>
                        {l}
                    </Line>
                ))}
                <span>{station.name}</span>
            </Station>
        </Container>
    )
}

const Container = styled(motion.div)`
    width: 100%;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid ${grayscale[50]};
    border-radius: 10px;
    padding: 15px 25px;
    margin-bottom: 15px;
`;

const MeetingName = styled.div`
    ${applyTypography('title.medium')}
    color: ${grayscale[100]};
`;
const Station = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    ${applyTypography('label.medium')}
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
