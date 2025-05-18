import { ProcessStep, ProcessStepStatus } from "../../type/processStep";

function getNextSteps(steps: ProcessStep[], current: number): ProcessStep[] {
    return steps.map((step, idx) => {
      if (idx < current + 1) return { status: 'done' as ProcessStepStatus };
      if (idx === current + 1) return { status: 'active' as ProcessStepStatus };
      return { status: 'todo' as ProcessStepStatus };
    });
  }
  
function getPrevSteps(steps: ProcessStep[], current: number): ProcessStep[] {
    return steps.map((step, idx) => {
      if (idx < current - 1) return { status: 'done' as ProcessStepStatus };
      if (idx === current - 1) return { status: 'active' as ProcessStepStatus };
      return { status: 'todo' as ProcessStepStatus };
    });
  }

export function handleNext({ steps, current, setSteps, setCurrent, setIsAnimating }: {
  steps: ProcessStep[];
  current: number;
  setSteps: (steps: ProcessStep[]) => void;
  setCurrent: (cb: (prev: number) => number) => void;
  setIsAnimating: (animating: boolean) => void;
}) {
  setIsAnimating(true);
  const newSteps = steps.map((step, idx) => {
    if (idx < current) return { status: 'done' as ProcessStepStatus };
    if (idx === current) return { status: 'done' as ProcessStepStatus };
    return { status: 'todo' as ProcessStepStatus };
  });
  setSteps(newSteps);
  setCurrent((prev) => Math.min(prev + 1, steps.length - 1));
  setTimeout(() => {
    setSteps(getNextSteps(steps, current));
    setIsAnimating(false);
  }, 300);
}

export function handlePrev({ steps, current, setSteps, setCurrent }: {
  steps: ProcessStep[];
  current: number;
  setSteps: (steps: ProcessStep[]) => void;
  setCurrent: (cb: (prev: number) => number) => void;
}) {
  setSteps(getPrevSteps(steps, current));
  setCurrent((prev) => Math.max(prev - 1, 0));
}