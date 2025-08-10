import styled from "@emotion/styled";
import Icon from "@mdi/react";
import { motion } from "framer-motion";
import { grayscale } from "../../../styles/colors/grayscale";
import { mdiCheck, mdiClose } from "@mdi/js";
import { success, warning } from "../../../styles/colors/system";
import { applyTypography } from "../../../styles/typography";

export default function VoteStatus({isDone}: {isDone: boolean}) {
    return (
        <Container isDone={isDone}>
            <Status isDone={isDone}>{isDone ? <Icon path={mdiCheck} size={0.7} color={success[5]} /> : <Icon path={mdiClose} size={0.7} color={warning[5]} />} {isDone ? '투표 완료' : '미투표'}</Status>
        </Container>
    )
}

const Container = styled(motion.div)<{isDone: boolean}>`
    width: fit-content;
    background: ${({isDone}) => isDone ? success[50] : warning[50]};
    display: flex;
    align-items: center;
    padding: 5px 15px;
    border-radius: 15px;
`;

const Status = styled.span<{isDone: boolean}>`
    ${applyTypography('body.xsmall')}
    font-weight: 700;
    color: ${({isDone}) => isDone ? success[5] : warning[5]};
    display: flex;
    align-items: center;
    gap: 5px;
`;