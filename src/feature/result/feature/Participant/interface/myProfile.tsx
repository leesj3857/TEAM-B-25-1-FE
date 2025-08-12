import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { useState } from "react";
import { grayscale } from "../../../../../styles/colors/grayscale";
import VoteStatus from "../../../interface/VoteStatus";
import { applyTypography } from "../../../../../styles/typography";
import { secondary } from "../../../../../styles/colors/secondary";
import { danger } from "../../../../../styles/colors/system";
import Leave from "./Leave";

export default function MyProfile({name, isDone, setIsEditing}: {name: string, isDone: boolean, setIsEditing: (isEditing: boolean) => void}) {
    const [isLeaveOpen, setIsLeaveOpen] = useState(false);

    const handleLeave = () => {
        // 나가기 로직 구현
        console.log("나가기 처리");
        setIsLeaveOpen(false);
    };

    return (
        <>
            <Container>
                <ProfileTop>
                    <Profile>
                        <MyIcon>나</MyIcon>
                        <MyName>{name}</MyName>
                    </Profile>
                    <VoteStatus isDone={isDone} />
                </ProfileTop>
                <Divider />
                <ProfileBottom> 
                    <EditButton onClick={() => setIsEditing(true)}>
                        수정하기
                    </EditButton>
                    <LeaveButton onClick={() => setIsLeaveOpen(true)}>
                        나가기
                    </LeaveButton>
                </ProfileBottom>
            </Container>
            <Leave 
                isOpen={isLeaveOpen}
                onClose={() => setIsLeaveOpen(false)}
                onLeave={handleLeave}
            />
        </>
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
    margin-bottom: 15px;
`;

const ProfileTop = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding: 0 5px;
`;

const Profile = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
`;

const MyIcon = styled.span`
    width: 25px;
    height: 25px;
    background : ${secondary[30]};
    border-radius: 50%;
    ${applyTypography('body.xsmall')}
    font-weight: 700;
    color: ${grayscale[0]};
    display: flex;
    align-items: center;
    justify-content: center;
`;

const MyName = styled.span`
    ${applyTypography('body.large')}
    color: ${grayscale[100]};
`;

const ProfileBottom = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
    padding: 0 5px;
`;

const EditButton = styled.button`
    flex: 1;
    background: ${grayscale[10]};
    color: ${grayscale[80]};
    ${applyTypography('label.small')}
    font-weight: 700;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    padding: 10px 0;
    &:hover {
        background: ${grayscale[20]};
    }
    &:active {
        background: ${grayscale[30]};
    }
`;  

const LeaveButton = styled.button`
    flex: 1;
    background: ${grayscale[10]};
    color: ${danger[50]};
    ${applyTypography('label.small')}
    font-weight: 700;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    padding: 10px 0;
    &:hover {
        background: ${grayscale[20]};
    }
    &:active {
        background: ${grayscale[30]};
    }
`;


const Divider = styled.div`
    width: 100%;
    height: 1px;
    background: ${grayscale[50]};
    margin: 20px 0;
`;