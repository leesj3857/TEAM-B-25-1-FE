import Result from '../feature/result';
import { useParams } from 'react-router-dom';
import { useInviteCode } from '../context/inviteCodeContext';
import { useEffect } from 'react';

const ResultPage = () => {
  const { inviteCode: urlInviteCode } = useParams();
  const { setInviteCode, inviteCode } = useInviteCode();
  useEffect(() => {
    if (urlInviteCode && !inviteCode) {
      setInviteCode(urlInviteCode);
    }
  }, [urlInviteCode, setInviteCode, inviteCode]);
  
  return <Result />;
};

export default ResultPage;
