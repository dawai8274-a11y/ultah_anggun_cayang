import { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import MainApp from './components/MainApp';

export default function App() {
  const [started, setStarted] = useState(false);

  return (
    <div className="min-h-screen bg-[#f0f7ff] text-[#1e3a8a] font-serif overflow-x-hidden selection:bg-blue-300 selection:text-blue-900 relative flex flex-col">
      {!started ? (
        <WelcomeScreen onStart={() => setStarted(true)} />
      ) : (
        <MainApp />
      )}
    </div>
  );
}
