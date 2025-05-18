import React from 'react';
import styled from '@emotion/styled';
import { primary } from '../../../styles/colors/primary';
import { secondary } from '../../../styles/colors/secondary';
import { grayscale } from '../../../styles/colors/grayscale';
import { ProcessStep, ProcessStepStatus } from '../type/processStep';
import { mdiCheck } from '@mdi/js';
import { Icon } from '@mdi/react';
import { motion, AnimatePresence } from 'framer-motion';

const CIRCLE_SIZE = 16;
const INNER_SIZE = 12;
const LINE_HEIGHT = 2;
const DOTS_SIZE = 2;

const BarContainer = styled.div`
  display: flex;
  align-items: center;
  height: 20px;
  margin: 24px 0;
`;

const StepWrapper = styled.div`
  display: flex;
  align-items: center;
  z-index: 1;
`;

const DoneCircle = styled.div`
  width: ${CIRCLE_SIZE}px;
  height: ${CIRCLE_SIZE}px;
  border-radius: 50%;
  background: ${secondary[70]};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CircleInner = styled.div`
  width: ${INNER_SIZE}px;
  height: ${INNER_SIZE}px;
  border-radius: 50%;
  background: ${primary[30]};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1px;
`;

const Dots = styled.span`
  width: ${DOTS_SIZE}px;
  height: ${DOTS_SIZE}px;
  border-radius: 50%;
  background: ${grayscale[0]};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TodoCircle = styled.div`
  width: ${CIRCLE_SIZE}px;
  height: ${CIRCLE_SIZE}px;
  border-radius: 50%;
  background: ${grayscale[20]};
`;

const LineBg = styled.div`
  flex: 1;
  height: ${LINE_HEIGHT}px;
  background: ${grayscale[40]};
  position: relative;
  overflow: hidden;
`;

const LineFg = styled(motion.div)<{ $active: ProcessStepStatus }>`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background: ${({ $active }) =>
    $active === 'done' ? secondary[70] : grayscale[40]};
`;

interface ProgressBarProps {
  steps: ProcessStep[];
}

export const ProgressBar = ({ steps }: ProgressBarProps) => {
  return (
    <BarContainer>
      {steps.map((step, idx) => (
        <React.Fragment key={idx}>
          <StepWrapper>
            {step.status === 'done' ? (
              <DoneCircle>
                <Icon path={mdiCheck} size={0.5} color={grayscale[0]} />
              </DoneCircle>
            ) : step.status === 'active' ? (
              <motion.div
                key={'active-' + idx}
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.25, 1] }}
                transition={{ duration: 0.3, times: [0, 0.5, 1] }}
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  border: `2px solid ${primary[30]}`,
                  background: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CircleInner>
                  <Dots/>
                  <Dots/>
                  <Dots/>
                </CircleInner>
              </motion.div>
            ) : (
              <TodoCircle />
            )}
          </StepWrapper>
          {idx < steps.length - 1 && (
            <LineBg>
              <AnimatePresence initial={false}>
                <LineFg
                  key={step.status + '-' + idx}
                  $active={step.status}
                  initial={{ width: step.status === 'done' ? 0 : '100%' }}
                  animate={{ width: step.status === 'done' ? '100%' : '0%' }}
                  exit={{ width: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>
            </LineBg>
          )}
        </React.Fragment>
      ))}
    </BarContainer>
  );
}; 