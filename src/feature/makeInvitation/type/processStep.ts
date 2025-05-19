export type ProcessStepStatus = 'done' | 'active' | 'todo';

export interface ProcessStep {
  status: ProcessStepStatus;
} 