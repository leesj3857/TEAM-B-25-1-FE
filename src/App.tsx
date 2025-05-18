// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MakeInvitationPage from './pages/MakeInvitation';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init('684db8e1b4af0ef1eac7f7cfeeaca3c9');
    }
  }, []);
  
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/make-invitation" element={<MakeInvitationPage />} />
      </Routes>
    </div>
  );
}

export default App;
