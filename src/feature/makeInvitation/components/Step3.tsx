import styled from '@emotion/styled';
import { grayscale } from '../../../styles/colors/grayscale';
import { typography } from '../../../styles/typography';
import { useState } from 'react';
import Icon from '@mdi/react';
import { mdiSubwayVariant, mdiCar, mdiMagnify } from '@mdi/js';
import { primary } from '../../../styles/colors/primary';
import { motion, AnimatePresence } from 'framer-motion';
import { secondary } from '../../../styles/colors/secondary';
import Emoji from '../../../interface/Emoji';
import AddressInputWithDropdown from '../../../interface/AddressInputWithDropdown';

const TRANSPORTS = [
  { key: 'public', label: '대중교통', icon: <Icon path={mdiSubwayVariant} size={1} /> },
  { key: 'car', label: '자동차', icon: <Icon path={mdiCar} size={1} /> },
];

export default function Step3({ onNext, onPrev }: { onNext: () => void, onPrev: () => void }) {
  const [transport, setTransport] = useState<string | null>(null);
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [step, setStep] = useState(0);


  const handleAddressNext = (display: string) => {
    if (display.trim().length > 0 && step === 1) {
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

        <Title>
            거의 다 만들었어요 <Emoji>📑</Emoji> <br />시작하기 위해 몇 가지만 알려주세요!
        </Title>

        <div>
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
                      <TransportRow>
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
                    <Section>
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
                <Section>
                  <Label>이름</Label>
                  <InputWrap>
                      <NameInput
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
              </AnimatePresence>
            </div>
            <ButtonRow>
              <PrevButton onClick={onPrev}>이전</PrevButton>
              <NextButton onClick={onNext} disabled={!(step === 2 && transport && address && name)}>다음</NextButton>
            </ButtonRow>
          </div>
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

const Title = styled.div`
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

const AddressInput = styled.input`
  width: 100%;
  height: 48px;
  padding: 16px 11px 16px 40px;
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

const AddressInputIcon = styled.div`
  position: absolute;
  left: 11px;
  top: 50%;
  transform: translateY(-40%);
  color: ${grayscale[50]};
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

const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
`;

const PrevButton = styled.button`
  flex: 1;
  height: 50px;
  background: ${secondary[5]};
  color: ${secondary[50]};
  font-size: ${typography.title.small.fontSize}px;
  font-weight: ${typography.title.small.fontWeight};
  line-height: ${typography.title.small.lineHeight};
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const NextButton = styled.button`
  flex: 1;
  height: 50px;
  background: ${primary[30]};
  color: #fff;
  font-size: ${typography.title.small.fontSize}px;
  font-weight: ${typography.title.small.fontWeight};
  line-height: ${typography.title.small.lineHeight};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  background: ${({ disabled }) =>
    disabled ? grayscale[40] : primary[30]};
  transition: background 0.2s, opacity 0.2s;
`;