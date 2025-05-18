import styled from '@emotion/styled';
import { alpha } from '../styles/colors/alpha';
import { typography } from '../styles/typography';
import { grayscale } from '../styles/colors/grayscale';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SuccessToastUIProps {
  text: string;
  show: boolean;
  duration?: number; // ms
  onClose?: () => void;
}

export default function SuccessToastUI({ text, show, duration = 1800, onClose }: SuccessToastUIProps) {
  useEffect(() => {
    if (show && onClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4 }}
          style={{
            height: 50,
            background: alpha[75],
            borderRadius: 30,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            padding: '12px 32px',
            color: '#fff',
            position: 'fixed',
            bottom: 32,
            zIndex: 9999,
          }}
        >
          <CheckIcon src="/Checkmark.webp" alt="성공" />
          <ToastText>{text}</ToastText>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const CheckIcon = styled.img`
  width: 26px;
  height: 26px;
`;

const ToastText = styled.span`
  font-size: ${typography.label.small.fontSize}px;
  font-weight: ${typography.label.small.fontWeight};
  line-height: ${typography.label.small.lineHeight};
  letter-spacing: ${typography.label.small.letterSpacing};
  color: ${grayscale[0]};
  position: relative;
  bottom: 0.2px;
`;
