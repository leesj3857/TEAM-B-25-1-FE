import ReplyInvitation from '../feature/replyInvitation';
import { useParams } from 'react-router-dom';

export default function ReplyInvitationPage() {
  const { invitationId } = useParams(); // invitationId가 문자열로 들어옴
  return <ReplyInvitation invitationId={invitationId} />;
} 