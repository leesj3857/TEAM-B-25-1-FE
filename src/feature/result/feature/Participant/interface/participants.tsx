import Icon from "@mdi/react";
import { mdiFormatListBulleted, mdiAccount } from "@mdi/js";
import styled from "@emotion/styled";
import { grayscale } from "../../../../../styles/colors/grayscale";
import { motion } from "framer-motion";
import { applyTypography } from "../../../../../styles/typography";
import VoteStatus from "../../../interface/VoteStatus";

export default function Participants({totalNumber, participants}: {totalNumber: number, participants: {name: string, isDone: boolean}[]}) {

    const Participant = ({name, isDone}: {name: string, isDone: boolean}) => {
        return (
            <ParticipantContainer>
                <Name>{name}</Name>
                <VoteStatus isDone={isDone} />
            </ParticipantContainer>
        )
    }
    return (
        <Container>
            <Header>
                <Indicator>
                    <Icon path={mdiFormatListBulleted} size={1} />
                    <span>참여자</span>
                </Indicator>
                <TotalNumber>
                    <Icon path={mdiAccount} size={1} />
                    {totalNumber}
                </TotalNumber>
            </Header>
            <ParticipantsList>
                {participants.map((participant, index) => (
                    <Participant key={index} name={participant.name} isDone={participant.isDone} />
                ))}
            </ParticipantsList>
        </Container>
    )
}

const Container = styled(motion.div)`
    width: 100%;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border: 1px solid ${grayscale[50]};
    border-radius: 10px;
    padding: 20px;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 25px;
    border-bottom: 1px solid ${grayscale[50]};
    padding: 0 5px 15px 5px;
`;

const Indicator = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    ${applyTypography('body.medium')}
    font-weight: 700;
`;

const TotalNumber = styled.div`
    display: flex;
    align-items: center;
    gap: 3px;
    ${applyTypography('body.medium')}
`;

const ParticipantsList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 20px;
    padding: 0 5px;
`;

const ParticipantContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;

const Name = styled.span`
    ${applyTypography('body.small')}
    color: ${grayscale[100]};
`;
