import { useState } from 'react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button 
        onClick={() => setIsPlaying(!isPlaying)}
        className="bg-white border-4 border-[#1e3a8a] text-[#1e3a8a] p-3 shadow-[6px_6px_0_0_#1e3a8a] hover:shadow-[2px_2px_0_0_#1e3a8a] hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center cursor-pointer font-serif font-bold text-xs"
        aria-label="Toggle Music"
      >
        <span className="mr-2 text-lg">{isPlaying ? '♪' : 'x'}</span>
        <span className="hidden md:block">
          {isPlaying ? 'BGM ON' : 'BGM OFF'}
        </span>
      </button>

      {/* Hidden YouTube Iframe for Music: Sting - Shape of my heart */}
      {isPlaying && (
        <iframe
          width="0"
          height="0"
          src="https://www.youtube.com/embed/pmRceD1zriU?autoplay=1&loop=1&playlist=pmRceD1zriU"
          allow="autoplay; encrypted-media"
          title="Background Music"
          className="hidden"
        ></iframe>
      )}
    </div>
  );
}
