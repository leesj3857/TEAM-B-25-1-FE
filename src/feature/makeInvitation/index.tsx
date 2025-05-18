import { useState } from 'react';
import { ProgressBar } from './interface/ProgressBar';
import { ProcessStep } from './type/processStep';
import { handleNext as handleNextOrig, handlePrev as handlePrevOrig } from './utils/progress/handleProgress';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Finished from './components/Finished';
import { AnimatePresence, motion } from 'framer-motion';

const stepsInit: ProcessStep[] = [
  { status: 'active' },
  { status: 'todo' },
  { status: 'todo' },
];

const slideVariants = {
  initial: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    position: 'relative' as const,
    width: '100%',
  }),
  animate: {
    x: 0,
    opacity: 1,
    position: 'relative' as const,
    width: '100%',
    transition: { type: 'tween', duration: 0.3 },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    position: 'relative' as const,
    width: '100%',
    transition: { type: 'tween', duration: 0.3 },
  }),
};

const MakeInvitation = () => {
  const [steps, setSteps] = useState<ProcessStep[]>(stepsInit);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1); // 1: next, -1: prev

  const handleNext = () => {
    setDirection(1);
    handleNextOrig({ steps, current, setSteps, setCurrent });
  };
  const handlePrev = () => {
    setDirection(-1);
    handlePrevOrig({ steps, current, setSteps, setCurrent });
  };

  return (
    <div style={{ width: '100%', height: '100%', padding: '24px 0', background: '#fff', position: 'relative', minHeight: 500, overflow: 'hidden' }}>
      <ProgressBar steps={steps} />
      <AnimatePresence custom={direction} mode="wait">
        {current === 0 && (
          <motion.div
            key={0}
            custom={direction}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Step1 onNext={handleNext} />
          </motion.div>
        )}
        {current === 1 && (
          <motion.div
            key={1}
            custom={direction}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Step2 onNext={handleNext} onPrev={handlePrev} />
          </motion.div>
        )}
        {current === 2 && (
          <motion.div
            key={2}
            custom={direction}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Finished />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MakeInvitation;
