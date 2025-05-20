import styled from '@emotion/styled';
import { useState, useEffect, useRef } from 'react';
import Icon from '@mdi/react';
import { mdiMagnify, mdiMapMarker } from '@mdi/js';
import { grayscale } from '../styles/colors/grayscale';
import { primary } from '../styles/colors/primary';
import { typography } from '../styles/typography';
import { fetchBuildingNamesByAddress, JusoResult } from '../utils/jusoApi';
import { css } from '@emotion/react';

interface AddressInputWithDropdownProps {
  value: string;
  onChange: (value: string) => void;
  onSelect?: (value: string) => void;
  onNext?: () => void;
  disabled?: boolean;
}

export default function AddressInputWithDropdown({
  value,
  onChange,
  onSelect,
  onNext,
  disabled,
}: AddressInputWithDropdownProps) {
  const [addressOptions, setAddressOptions] = useState<JusoResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const addressInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!value.trim()) {
      setAddressOptions([]);
      setShowDropdown(false);
      setIsSelected(false);
      return;
    }
    if (!showDropdown && addressOptions.length === 0 && isSelected) {
      return;
    }
    setIsLoading(true);
    const handler = setTimeout(async () => {
      const results = await fetchBuildingNamesByAddress(value);
      setAddressOptions(results);
      setShowDropdown(true);
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(handler);
  }, [value]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        addressInputRef.current &&
        !addressInputRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  // 입력 완료(엔터/포커스아웃) 또는 드롭다운에서 선택 시 마커로 변경
  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (value.trim() === '') {
      setIsSelected(false);
      return;
    }
    if (onNext) onNext();
    setIsSelected(true);
  };

  const handleDropdownSelect = (display: string) => {
    onChange(display);
    setShowDropdown(false);
    setAddressOptions([]);
    setIsSelected(true);
    if (onSelect) onSelect(display);
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
        }}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            if (onNext) onNext();
            setIsSelected(true);
          }
        }}
        onBlur={handleInputBlur}
        autoComplete="off"
        disabled={disabled}
      />
      {showDropdown && addressOptions.length > 0 && (
        <Dropdown>
          {isLoading ? (
            <DropdownItem>검색 중...</DropdownItem>
          ) : (
            addressOptions.map((option, idx) => {
              const display = option.bdNm && /^[가-힣a-zA-Z\s]+$/.test(option.bdNm.trim()) ? `${option.bdNm} (${option.roadAddrPart1 || option.roadAddr})` : (option.roadAddrPart1 && option.roadAddrPart1.trim() ? option.roadAddrPart1 : option.roadAddr);
              return (
                <DropdownItem
                  key={option.bdNm + option.roadAddr + idx}
                  onMouseDown={() => handleDropdownSelect(display)}
                >
                  <MarkerIconWrap>
                    <Icon path={mdiMapMarker} size={0.9} />
                  </MarkerIconWrap>
                  {display}
                </DropdownItem>
              );
            })
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
  &:hover {
    background: ${grayscale[40]};
  }
`;

const MarkerIconWrap = styled.span`
  display: inline-flex;
  align-items: center;
  margin-right: 7px;
`; 