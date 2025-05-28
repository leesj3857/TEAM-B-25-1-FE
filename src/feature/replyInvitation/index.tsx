import ReplyForm from './components/ReplyForm';
import { ProgressBar } from '../makeInvitation/interface/ProgressBar';
import { useState } from 'react';
import { ProcessStep } from '../makeInvitation/type/processStep';

const stepsInit: ProcessStep[] = [
    { status: 'active' },
    { status: 'todo' },
    { status: 'todo' },
  ];
  
export default function ReplyInvitation({ invitationId }: { invitationId: string | undefined }) {
    const [steps, setSteps] = useState<ProcessStep[]>(stepsInit);
    const handleNext = () => {
        const currentActiveIndex = steps.findIndex(step => step.status === 'active');
        setSteps(steps.map((step, index) => 
            index === currentActiveIndex + 1 ? { ...step, status: 'active' } : 
            index === currentActiveIndex ? { ...step, status: 'done' } : step
        ));
    };
    return (
        <div>
        <ProgressBar steps={steps} />
        <ReplyForm invitationId={invitationId} handleNext={handleNext}/>
        </div>
    );
}
