import styled from '@emotion/styled';
import { grayscale } from '../../../../styles/colors/grayscale';
import { typography, applyTypography } from '../../../../styles/typography';
import { useState } from 'react';
import Icon from '@mdi/react';
import { mdiSubwayVariant, mdiCar } from '@mdi/js';
import { primary } from '../../../../styles/colors/primary';
import { motion } from 'framer-motion';
import AddressInputWithDropdown from '../../../../interface/AddressInputWithDropdown';
import { button } from '../../../../styles/button';
import Emoji from '../../../../interface/Emoji';

const TRANSPORTS = [
  { key: 'PUBLIC', label: '대중교통', icon: <Icon path={mdiSubwayVariant} size={1} /> },
  { key: 'CAR', label: '자동차', icon: <Icon path={mdiCar} size={1} /> },
];

interface EditInfoProps {
  name: string;
  address: string;
  transport: string;
  onSave: (name: string, address: string, transport: string) => void;
  onCancel: () => void;
}

export default function EditInfo({ 
  name: initialName, 
  address: initialAddress, 
  transport: initialTransport, 
  onSave, 
  onCancel 
}: EditInfoProps) {
  const [name, setName] = useState(initialName);
  const [address, setAddress] = useState(initialAddress);
  const [transport, setTransport] = useState(initialTransport);

  const handleSave = () => {
    if (name.trim() && address.trim() && transport) {
      onSave(name, address, transport);
    }
  };

  const isFormValid = name.trim() && address.trim() && transport;

  return (
    <Container>
        <Title>
            혹시 바뀐 게 있나요? <Emoji>👀</Emoji>
        </Title>
        <Description>
            필요한 정보를 다시 확인하고 수정해보세요.
        </Description>
        <FormContainer>
        <Section>
            <Label>이름</Label>
            <InputWrap>
            <NameInput
                placeholder="친구들에게 표시될 이름을 입력해주세요"
                value={name}
                onChange={e => setName(e.target.value)}
            />
            </InputWrap>
        </Section>

        <Section>
            <Label>주소</Label>
            <InputWrap>
            <AddressInputWithDropdown
                value={address}
                onChange={setAddress}
                onNext={() => {}}
            />
            </InputWrap>
        </Section>

        <Section>
            <Label style={{ marginBottom: 3 }}>이동 방법</Label>
            <SubLabel>약속 장소까지 이동할 교통수단을 선택해주세요!</SubLabel>
            <TransportRow>
            {TRANSPORTS.map((t) => (
                <TransportBtn
                key={t.key}
                selected={transport === t.key}
                onClick={() => setTransport(t.key)}
                >
                <IconWrap>{t.icon}</IconWrap>
                {t.label}
                </TransportBtn>
            ))}
            </TransportRow>
        </Section>
        </FormContainer>

        <ButtonContainer>
        <SaveButton 
            disabled={!isFormValid}
            onClick={handleSave}
        >
            변경사항 저장하기
        </SaveButton>
        </ButtonContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const Title = styled.div`
  color: ${grayscale[100]};
  ${applyTypography('title.medium')}
  font-weight: 700;
  margin-bottom: 10px;
`;

const Description = styled.div`
  color: ${grayscale[100]};
  ${applyTypography('body.small')}
  margin-bottom: 20px;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Section = styled.div`
  margin-bottom: 28px;
`;

const Label = styled.div`
  color: ${grayscale[100]};
  ${applyTypography('body.medium')}
  margin-bottom: 8px;
`;

const SubLabel = styled.div`
  color: ${grayscale[50]};
  ${applyTypography('body.small')}
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
  border: 1px solid ${({ selected}) => (selected ? primary[20] : grayscale[60])};
  border-radius: 8px;
  background: ${({ selected }) => selected ? `${primary[20]}20` : '#fff'};
  color: ${({ selected }) => selected ? primary[30] : grayscale[50]};
  ${applyTypography('body.small')}
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
  ${applyTypography('body.small')}
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

const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
`;

const CancelButton = styled.button`
  flex: 1;
  height: 50px;
  background: ${grayscale[10]};
  color: ${grayscale[80]};
  ${applyTypography('label.medium')}
  font-weight: 700;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background: ${grayscale[20]};
  }
  &:active {
    background: ${grayscale[30]};
  }
`;

const SaveButton = styled.button`
  flex: 1;
  height: 50px;
  ${button.Primary}
  ${applyTypography('label.medium')}
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
