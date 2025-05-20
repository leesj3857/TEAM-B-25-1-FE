import styled from '@emotion/styled';
import { grayscale } from '../../../styles/colors/grayscale';
import { typography } from '../../../styles/typography';
import { useState, useEffect, useRef } from 'react';
import Icon from '@mdi/react';
import { mdiSubwayVariant, mdiCar, mdiMagnify } from '@mdi/js';
import { primary } from '../../../styles/colors/primary';
import { motion, AnimatePresence } from 'framer-motion';
import AddressInputWithDropdown from '../../../interface/AddressInputWithDropdown';

const TRANSPORTS = [
  { key: 'public', label: '대중교통', icon: <Icon path={mdiSubwayVariant} size={1} /> },
  { key: 'car', label: '자동차', icon: <Icon path={mdiCar} size={1} /> },
];

export default function ReplyForm({ invitationId }: { invitationId: string | undefined }) {
  const [transport, setTransport] = useState<string | null>(null);
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [imgLoaded, setImgLoaded] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [step, setStep] = useState(0);
  const transportRowRef = useRef<HTMLDivElement>(null);
  const addressInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (imgLoaded) {
      const t1 = setTimeout(() => setShowTitle(true), 800);
      return () => clearTimeout(t1);
    }
  }, [imgLoaded]);

  useEffect(() => {
    if (showTitle) {
      const t2 = setTimeout(() => setShowForm(true), 800);
      return () => clearTimeout(t2);
    }
  }, [showTitle]);

  const handleAddressNext = () => {
    if (address.trim().length > 0 && step === 1) {
      setStep(2);
    }
  };
  const handleNameNext = () => {
    if (name.trim().length > 0 && step === 0) {
      setStep(1);
    }
  };

  return (
    <Container>
      <MotionLetterImg
        src="/letter.webp"
        alt="초대장"
        onLoad={() => setImgLoaded(true)}
        initial={{ opacity: 0 }}
        animate={{ opacity: imgLoaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />
      <AnimatePresence>
        {showTitle && (
          <MotionTitle
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            초대장이 도착했어요<br />시작하기 위해 몇 가지만 알려주세요!
          </MotionTitle>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <AnimatePresence>
                {step >= 2 && (
                  <motion.div
                    key="transport"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Section>
                      <Label style={{ marginBottom: 3 }}>이동 방법</Label>
                      <SubLabel>약속 장소까지 이동할 교통수단을 선택해주세요!</SubLabel>
                      <TransportRow ref={transportRowRef} tabIndex={-1}>
                        {TRANSPORTS.map((t) => (
                          <TransportBtn
                            key={t.key}
                            selected={transport === t.key}
                            onClick={() => {
                              setTransport(t.key);
                            }}
                            tabIndex={0}
                          >
                            <IconWrap>{t.icon}</IconWrap>
                            {t.label}
                          </TransportBtn>
                        ))}
                      </TransportRow>
                    </Section>
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {step >= 1 && (
                  <motion.div
                    key="address"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Section style={{ position: 'relative' }}>
                      <Label>주소</Label>
                      <InputWrap>
                        <AddressInputWithDropdown
                          value={address}
                          onChange={setAddress}
                          onNext={handleAddressNext}
                        />
                      </InputWrap>
                    </Section>
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                <motion.div
                  key="name"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <Section>
                    <Label>이름</Label>
                    <InputWrap>
                      <NameInput
                        ref={nameInputRef}
                        placeholder="친구들에게 표시될 이름을 입력해주세요"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        onKeyDown={e => {
                          if (e.key === 'Enter') handleNameNext();
                        }}
                        onBlur={handleNameNext}
                      />
                    </InputWrap>
                  </Section>
                </motion.div>
              </AnimatePresence>
            </div>
            <SubmitBtn disabled={!(step === 2 && transport && address && name)}>
              제출하기
            </SubmitBtn>
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 16px 0;
`;

const MotionLetterImg = styled(motion.img)`
  width: 102px;
  height: 80px;
  margin-bottom: 24px;
  align-self: flex-start;
  position: relative;
  right: 16px;
`;

const MotionTitle = styled(motion.div)`
  color: ${grayscale[100]};
  font-size: ${typography.title.medium.fontSize}px;
  font-weight: ${typography.title.medium.fontWeight};
  line-height: ${typography.title.medium.lineHeight};
  margin-bottom: 32px;
`;

const Section = styled.div`
  margin-bottom: 28px;
`;

const Label = styled.div`
  color: ${grayscale[100]};
  font-size: ${typography.body.medium.fontSize}px;
  font-weight: ${typography.body.medium.fontWeight};
  margin-bottom: 8px;
`;

const SubLabel = styled.div`
  color: ${grayscale[50]};
  font-size: ${typography.body.small.fontSize}px;
  margin-bottom: 15px;
`;

const TransportRow = styled.div`
  display: flex;
  gap: 16px;
`;

const TransportBtn = styled.button<{ selected: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 46px;
  border: 1px solid
    ${({ selected}) => (selected ? primary[20] : grayscale[60])};
  border-radius: 8px;
  background: ${({ selected }) =>
    selected ? `${primary[20]}20` : '#fff'};
  color: ${grayscale[50]};
  font-size: ${typography.body.small.fontSize}px;
  font-weight: ${typography.body.small.fontWeight};
  line-height: ${typography.body.small.lineHeight};
  letter-spacing: ${typography.body.small.letterSpacing}px;
  cursor: pointer;
  transition: border 0.2s, background 0.2s;
`;

const IconWrap = styled.div`
  margin-right: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InputWrap = styled.div`
  width: 100%;
  position: relative;
`;

const NameInput = styled.input`
  width: 100%;
  height: 48px;
  padding: 16px;
  border: 1px solid ${grayscale[60]};
  border-radius: 8px;
  font-size: ${typography.body.small.fontSize}px;
  font-weight: ${typography.body.small.fontWeight};
  line-height: ${typography.body.small.lineHeight};
  letter-spacing: ${typography.body.small.letterSpacing}px;
  color: ${grayscale[100]};
  background: #fff;
  box-sizing: border-box;
  transition: border 0.2s;
  &:focus {
    outline: none;
    border: 1px solid ${primary[30]};
  }
  &::placeholder {
    color: ${grayscale[50]};
    opacity: 1;
  }
`;

const SubmitBtn = styled.button`
  width: 100%;
  height: 50px;
  margin-top: 4px;
  background: ${grayscale[50]};
  color: #fff;
  font-size: ${typography.title.medium.fontSize}px;
  font-weight: ${typography.title.medium.fontWeight};
  line-height: ${typography.title.medium.lineHeight};
  letter-spacing: ${typography.title.medium.letterSpacing}px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  background: ${({ disabled }) =>
    disabled ? grayscale[40] : primary[30]};
`;

const NextInputBtn = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${grayscale[50]};
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  &:disabled {
    opacity: 0.3;
    cursor: default;
  }
`; 