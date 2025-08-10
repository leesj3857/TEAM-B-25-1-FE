import styled from '@emotion/styled';
import { useState, useRef } from 'react';
import Icon from '@mdi/react';
import { mdiMagnify, mdiMapMarker } from '@mdi/js';
import { grayscale } from '../styles/colors/grayscale';
import { primary } from '../styles/colors/primary';
import { typography } from '../styles/typography';
import { fetchBuildingNamesByAddress, JusoResult } from '../utils/jusoApi';
import { useQuery } from '@tanstack/react-query';
import { css } from '@emotion/react';
interface AddressInputWithDropdownProps {
  value: string;
  onChange: (value: string) => void;
  onNext?: (display: string) => void;
  disabled?: boolean;
}

export default function AddressInputWithDropdown({
  value,
  onChange,
  onNext,
  disabled,
}: AddressInputWithDropdownProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSelected, setIsSelected] = useState(value.trim().length > 0);
  const addressInputRef = useRef<HTMLInputElement>(null);

  // 주소 검색 쿼리
  const { data: addressOptions = [], isLoading } = useQuery({
    queryKey: ['address', value],
    queryFn: () => fetchBuildingNamesByAddress(value),
    enabled: value.trim().length > 0 && !isSelected,
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
  });

  const handleDropdownSelect = (display: string) => {
    onChange(display);
    setShowDropdown(false);
    setIsSelected(true);
    if (onNext) onNext(display);
    // 선택 후 focus 해제
    if (addressInputRef.current) {
      addressInputRef.current.blur();
    }
  };

  return (
    <InputWrap>
      <AddressInputIcon isSelected={isSelected}>
        <Icon path={isSelected ? mdiMapMarker : mdiMagnify} size={1} />
      </AddressInputIcon>
      <AddressInput
        ref={addressInputRef}
        placeholder="출발하실 위치를 입력해주세요"
        value={value}
        onChange={e => {
          onChange(e.target.value);
          setIsSelected(false);
          setShowDropdown(true);
        }}
        onBlur={() => {
          setShowDropdown(false);
        }}
        autoComplete="off"
        disabled={disabled}
      />
      {showDropdown && value.trim() && (
        <Dropdown>
          {isLoading ? (
            <DropdownItem>검색 중...</DropdownItem>
          ) : addressOptions.length > 0 ? (
            addressOptions.map((option, idx) => {
              const display = option.bdNm && /^[가-힣a-zA-Z\s]+$/.test(option.bdNm.trim()) 
                ? `${option.bdNm} (${option.roadAddrPart1 || option.roadAddr})` 
                : (option.roadAddrPart1 && option.roadAddrPart1.trim() 
                  ? option.roadAddrPart1 
                  : option.roadAddr);
              return (
                <DropdownItem
                  key={option.bdNm + option.roadAddr + idx}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleDropdownSelect(display);
                  }}
                >
                  <MarkerIconWrap>
                    <Icon path={mdiMapMarker} size={0.9} />
                  </MarkerIconWrap>
                  {display}
                </DropdownItem>
              );
            })
          ) : (
            <DropdownItem>검색 결과가 없습니다</DropdownItem>
          )}
        </Dropdown>
      )}
    </InputWrap>
  );
}

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

const AddressInputIcon = styled.div<{ isSelected: boolean }>`
  position: absolute;
  left: 11px;
  top: 50%;
  transform: translateY(-40%);
  ${({ isSelected }) =>
    isSelected
      ? css`color: ${grayscale[100]};`
      : css`color: ${grayscale[50]};`}
`;

const Dropdown = styled.ul`
  position: absolute;
  top: 48px;
  left: 0;
  width: 100%;
  background: #fff;
  border: 1px solid ${grayscale[60]};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const DropdownItem = styled.li`
  padding: 12px 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  user-select: none;
  &:hover {
    background: ${grayscale[40]};
  }
`;

const MarkerIconWrap = styled.span`
  display: inline-flex;
  align-items: center;
  margin-right: 7px;
`; 