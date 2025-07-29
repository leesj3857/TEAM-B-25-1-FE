// src/App.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import MakeInvitationPage from './pages/MakeInvitation';
import ReplyInvitationPage from './pages/ReplyInvitation';
import Map from './pages/Map';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init("684db8e1b4af0ef1eac7f7cfeeaca3c9");
    }
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/make" element={<MakeInvitationPage />} />
        <Route path="/reply/:invitationId" element={<ReplyInvitationPage />} />
        <Route path="/reply" element={<Navigate to="/" replace />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </div>
  );
}

export default App;
