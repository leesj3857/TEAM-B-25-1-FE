import ReplyForm from './components/ReplyForm';
import { ProgressBar } from '../makeInvitation/interface/ProgressBar';
import { useState, useEffect } from 'react';
import { ProcessStep, ProcessStepStatus } from '../makeInvitation/type/processStep';
import AlertModal from '../../interface/alertModal';
import { registerParticipant, Participant } from '../../api';
import { getLatLngByAddress } from '../../utils/getLng';
import { useNavigate } from 'react-router-dom';
interface UserInfo {
  name?: string;
  address?: string;
  transport?: string;
  step?: number;
}

const SESSION_STORAGE_KEY = (invitationId: string) => `replyInvitation_${invitationId}`;

const stepsInit: ProcessStep[] = [
    { status: 'active' },
    { status: 'todo' },
    { status: 'todo' },
  ];
  
export default function ReplyInvitation({ invitationId }: { invitationId: string | undefined }) {
    const [steps, setSteps] = useState<ProcessStep[]>(stepsInit);
    const [showModal, setShowModal] = useState(false);
    const [userInfo, setUserInfo] = useState<UserInfo>({});
    const navigate = useNavigate();

    useEffect(() => {
        if (!invitationId) return;
        const existing = localStorage.getItem(invitationId);
        if (existing) {
            navigate('/map/' + invitationId);
        }
    }, [invitationId, navigate]);

    useEffect(() => {
        if (!invitationId) return;
        
        const savedInfo = sessionStorage.getItem(SESSION_STORAGE_KEY(invitationId));
        if (savedInfo) {
            try {
                const parsedInfo = JSON.parse(savedInfo);
                if (parsedInfo.step !== undefined && parsedInfo.step > 0) {
                    setShowModal(true);
                }
            } catch (error) {
                console.error('세션스토리지 파싱 오류:', error);
                sessionStorage.removeItem(SESSION_STORAGE_KEY(invitationId));
            }
        }
    }, [invitationId]);

    const updateUserInfo = (newInfo: Partial<UserInfo>) => {
        if (!invitationId) return;
        
        const updatedInfo = { ...userInfo, ...newInfo };
        setUserInfo(updatedInfo);
        
        sessionStorage.setItem(SESSION_STORAGE_KEY(invitationId), JSON.stringify({
            userInfo: updatedInfo,
            step: updatedInfo.step || 0
        }));
    };

    const clearSessionStorage = async (userInfo: {
        name?: string;
        address?: string;
        transport?: string;
    }) => {
        if (!invitationId) return;
        const coords = await getLatLngByAddress(userInfo.address || '');
        if (!coords) return;
        const {lat, lng} = coords;
        const participant = await registerParticipant(invitationId, {
            name: userInfo.name || '',
            address: userInfo.address || '',
            transportType: userInfo.transport || '',
            lat,
            lng
          } as Participant);
        if (participant && participant.participantId) {
            localStorage.setItem(invitationId as string, JSON.stringify(participant));
        }
        sessionStorage.removeItem(SESSION_STORAGE_KEY(invitationId));
        navigate('/map/'+invitationId);
    };

    const handleNext = () => {
        const currentActiveIndex = steps.findIndex(step => step.status === 'active');
        setSteps(steps.map((step, index) => 
            index === currentActiveIndex + 1 ? { ...step, status: 'active' } : 
            index === currentActiveIndex ? { ...step, status: 'done' } : step
        ));
    };

    const handleContinue = () => {
        const savedInfo = sessionStorage.getItem(SESSION_STORAGE_KEY(invitationId!));
        if (savedInfo) {
            const parsedInfo = JSON.parse(savedInfo);
            setUserInfo(parsedInfo.userInfo || {});
            
            if (parsedInfo.step !== undefined) {
                const newSteps = stepsInit.map((step, index) => {
                    if (index < parsedInfo.step) return { status: 'done' as ProcessStepStatus };
                    if (index === parsedInfo.step) return { status: 'active' as ProcessStepStatus };
                    return { status: 'todo' as ProcessStepStatus };
                });
                setSteps(newSteps);
            }
        }
        setShowModal(false);
    };

    const handleCancel = () => {
        setShowModal(false);
        clearSessionStorage(userInfo);
        setUserInfo({});
    };

    return (
        <div style={{padding: '24px'}}>
            <ProgressBar steps={steps} />
            <ReplyForm 
                invitationId={invitationId} 
                handleNext={handleNext}
                userInfo={userInfo}
                updateUserInfo={updateUserInfo}
                onComplete={clearSessionStorage}
            />
            
            {showModal && (
                <AlertModal 
                    onContinue={handleContinue}
                    onCancel={handleCancel}
                />
            )}
        </div>
    );
}
