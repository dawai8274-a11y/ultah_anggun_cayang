import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Repeat } from 'lucide-react';

export default function SpotifyPlayer() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(38);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying]);

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      if (!hasInitialized.current) {
        audioRef.current.currentTime = 38;
        setProgress(38);
        hasInitialized.current = true;
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setProgress(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-gradient-to-b from-[#1a202c] to-black rounded-lg p-6 font-sans text-white border-4 border-[#1e3a8a] shadow-[8px_8px_0_0_#1e3a8a] relative z-20">
      {/* Hidden Player */}
      <audio
        ref={audioRef}
        src="/assets/shape of my heart.mp3"
        autoPlay
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Album Art */}
      <div className="w-full aspect-square bg-[#2d3748] rounded-md overflow-hidden mb-6 relative border-2 border-slate-700 shadow-xl">
        <img
          src="/assets/7.jpeg"
          alt="Album Art"
          className="w-full h-full object-contain filter contrast-125"
        />
        <div className="absolute top-2 left-2 bg-black/60 text-[10px] px-2 py-1 rounded-full border border-white/20 text-white backdrop-blur-sm shadow-lg">
          []
        </div>
      </div>

      {/* Info */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold tracking-tight">Shape of My Heart</h3>
          <p className="text-gray-400 text-sm">Backstreet Boys</p>
        </div>
        <button className="text-green-500 hover:scale-110 transition-transform">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>
      </div>

      {/* Progress */}
      <div className="mb-6 group relative">
        <input
          type="range"
          min={0}
          max={duration || 100}
          value={progress}
          onChange={handleSeek}
          className="absolute inset-0 w-full h-2 opacity-0 cursor-pointer z-10"
        />
        <div className="h-1 bg-gray-600 rounded-full w-full mb-2 overflow-hidden flex items-center">
          <div
            className="h-full bg-white rounded-full transition-all duration-100 ease-linear"
            style={{ width: `${duration ? (progress / duration) * 100 : 0}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400 font-mono">
          <span>{formatTime(progress)}</span>
          <span>{duration ? formatTime(duration) : '0:00'}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center px-2">
        <button className="text-gray-400 hover:text-white transition-colors hover:scale-110">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M10.59 9.17L14.17 5.58 15.58 7l-5 5 5 5-1.41 1.41-5-5-1.42 1.41L7 13.58l5 5L10.59 9.17z M14.59 9.17L18.17 5.58 19.58 7l-5 5 5 5-1.41 1.41-5-5-1.42 1.41L11 13.58l5 5L14.59 9.17z" />
          </svg>
        </button>
        <button
          onClick={() => { if (audioRef.current) audioRef.current.currentTime = 0; }}
          className="text-white hover:text-gray-300 transition-colors hover:scale-110"
        >
          <SkipBack size={28} fill="currentColor" />
        </button>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform shadow-[0_0_15px_rgba(255,255,255,0.3)]"
        >
          {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-2" />}
        </button>
        <button className="text-white hover:text-gray-300 transition-colors hover:scale-110">
          <SkipForward size={28} fill="currentColor" />
        </button>
        <button className="text-gray-400 hover:text-white transition-colors hover:scale-110">
          <Repeat size={20} />
        </button>
      </div>
    </div>
  );
}
