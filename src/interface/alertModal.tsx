import styled from '@emotion/styled';
import { applyTypography } from '../styles/typography';
import { grayscale } from '../styles/colors/grayscale';
import { button } from '../styles/button';
import { motion } from 'framer-motion';
interface AlertModalProps {
  onContinue: () => void;
  onCancel: () => void;
}

export default function AlertModal({ onContinue, onCancel }: AlertModalProps) {
  return (
    <Overlay>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
      >
        <Modal>
        <Description>
          입력하시던 정보가 있어요! <br />
          이어서 입력하시겠어요?
        </Description>
        <ButtonContainer>
          <CancelButton onClick={onCancel}>
            괜찮아요
          </CancelButton>
          <ContinueButton onClick={onContinue}>
            이어서 입력
          </ContinueButton>
        </ButtonContainer>
        </Modal>
      </motion.div>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px 24px;
  width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const Description = styled.p`
  ${applyTypography('label.small')}
  color: ${grayscale[100]};
  margin: 0;
  text-align: center;
  line-height: 1.5;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
  margin-top: 8px;
`;

const CancelButton = styled.button`
    background-color: ${grayscale[10]};
    border: 1px solid transparent;
    color: ${grayscale[80]};
    ${applyTypography('title.xsmall')}
    border-radius: 8px;
    box-shadow: none;
    transition: background-color 0.2s;
    cursor: pointer;
    &:hover {
        background-color: ${grayscale[10]};
        border: 1px solid ${grayscale[20]};
        color: ${grayscale[100]};
    }
    &:active {
        background-color: ${grayscale[5]};
        border: 1px solid ${grayscale[20]};
        color: ${grayscale[100]};
    }
    &:disabled {
        background-color: ${grayscale[30]};
        border: 1px solid ${grayscale[40]};
        color: ${grayscale[60]};
        }
    flex: 1;
    height: 40px;
`;

const ContinueButton = styled.button`
    ${button.Primary}
    ${applyTypography('title.xsmall')}
    flex: 1;
    height: 40px;
`;
