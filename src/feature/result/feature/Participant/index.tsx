import Header from "./interface/header";
import styled from "@emotion/styled";
import MyProfile from "./interface/myProfile";
import Participants from "./interface/participants";

export default function Participant({setIsEditing}: {setIsEditing: (isEditing: boolean) => void}) {
    return (
        <Container>
            <Header name="텔레토비" station={{ name: '성수역', line: ['2','3','4'] }} />
            <MyProfile name="텔레토비" isDone={true} setIsEditing={setIsEditing} />
            <Participants totalNumber={10} participants={[{name: '텔레토비', isDone: true}, {name: '텔레토비', isDone: false}, {name: '텔레토비', isDone: true}, {name: '텔레토비', isDone: false}, {name: '텔레토비', isDone: true}, {name: '텔레토비', isDone: false}, {name: '텔레토비', isDone: true}, {name: '텔레토비', isDone: false}, {name: '텔레토비', isDone: true}, {name: '텔레토비', isDone: false}]} />
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    background: #fff;
`;