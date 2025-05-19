import { ReplyForm } from '../feature/replyInvitation';
import { useParams } from 'react-router-dom';
export default function ReplyInvitation() {
  const { invitationId } = useParams(); // invitationId가 문자열로 들어옴
  return <ReplyForm invitationId={invitationId} />;
} 