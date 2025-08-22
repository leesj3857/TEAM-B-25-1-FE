import React, { createContext, useContext, useState, ReactNode } from 'react';

interface InviteCodeContextType {
  inviteCode: string;
  setInviteCode: (code: string) => void;
  clearInviteCode: () => void;
}

const InviteCodeContext = createContext<InviteCodeContextType | undefined>(undefined);

export const useInviteCode = () => {
  const context = useContext(InviteCodeContext);
  if (context === undefined) {
    throw new Error('useInviteCode must be used within an InviteCodeProvider');
  }
  return context;
};

interface InviteCodeProviderProps {
  children: ReactNode;
}

export const InviteCodeProvider: React.FC<InviteCodeProviderProps> = ({ children }) => {
  const [inviteCode, setInviteCodeState] = useState<string>('');

  const setInviteCode = (code: string) => {
    setInviteCodeState(code);
  };

  const clearInviteCode = () => {
    setInviteCodeState('');
  };

  return (
    <InviteCodeContext.Provider value={{ inviteCode, setInviteCode, clearInviteCode }}>
      {children}
    </InviteCodeContext.Provider>
  );
};
