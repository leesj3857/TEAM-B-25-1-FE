import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { grayscale } from "../../../../../styles/colors/grayscale";
import { danger } from "../../../../../styles/colors/system";
import { applyTypography } from "../../../../../styles/typography";

interface LeaveProps {
    isOpen: boolean;
    onClose: () => void;
    onLeave: () => void;
}

export default function Leave({ isOpen, onClose, onLeave }: LeaveProps) {
    if (!isOpen) return null;

    return (
        <Overlay>
            <Container
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
            >
                <Content>
                    <Description>정말 이 모임에서 나가시겠어요?</Description>
                    <Description>나가면 모든 참여 기록이 삭제돼요.</Description>
                </Content>
                <ButtonContainer>
                    <CancelButton onClick={onClose}>
                        취소
                    </CancelButton>
                    <LeaveButton onClick={onLeave}>
                        나가기
                    </LeaveButton>
                </ButtonContainer>
            </Container>
        </Overlay>
    );
}

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

const Container = styled(motion.div)`
    background: #fff;
    border-radius: 15px;
    padding: 24px;
    margin: 20px;
    max-width: 320px;
    width: 100%;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

const Content = styled.div`
    text-align: center;
    margin-bottom: 20px;
`;

const Description = styled.div`
    ${applyTypography('label.small')}
    color: ${grayscale[100]};

`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 14px;
`;

const CancelButton = styled.button`
    flex: 1;
    background: ${grayscale[10]};
    color: ${grayscale[80]};
    ${applyTypography('label.small')}
    font-weight: 700;
    border: none;
    border-radius: 12px;
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
    background: ${danger[50]};
    color: #fff;
    ${applyTypography('label.small')}
    font-weight: 700;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    padding: 10px 0;
    &:hover {
        background: ${danger[60]};
    }
    &:active {
        background: ${danger[70]};
    }
`;
