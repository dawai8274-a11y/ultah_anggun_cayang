import { useState } from 'react';
import { motion } from 'motion/react';
import ARPhotoGallery from './ARPhotoGallery';

// Anda bisa mengubah urutan atau nama file di bawah ini sesuai keinginan
const photos = [
  "/assets/31.png",
  "/assets/1.jpeg",
  "/assets/32.jpeg",
  "/assets/33.jpeg",
  "/assets/4.jpeg",
  "/assets/5.jpeg",
  "/assets/7.jpeg",
  "/assets/9.jpeg",
  "/assets/3.jpeg",
  "/assets/12.jpeg",
  "/assets/14.jpeg",
  "/assets/16.jpeg",
  "/assets/19.jpeg",
  "/assets/21.jpeg",
  "/assets/23.jpeg"
];

function PhotoFrame({ src, caption }: { src: string, caption: string }) {
  return (
    <div className="flex-none w-48 md:w-64 bg-white p-3 pb-8 shadow-[4px_4px_0_0_#1e3a8a] border-4 border-[#1e3a8a] rotate-[-2deg] hover:rotate-0 hover:scale-105 hover:shadow-[8px_8px_0_0_#1e3a8a] transition-all relative">
      <div className="w-full h-48 md:h-64 overflow-hidden border-2 border-gray-200 bg-gray-100">
        <img src={src} alt={caption} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
      </div>
      <div className="absolute bottom-2 left-0 right-0 text-center font-sans font-bold text-xs text-[#1e3a8a]">
        {caption}
      </div>
    </div>
  );
}

export default function PhotoGallery() {
  const [showAR, setShowAR] = useState(false);

  const row1 = photos.slice(0, 5);
  const row2 = photos.slice(5, 10);
  const row3 = photos.slice(10, 15);

  const renderMarquee = (items: string[], directionClass: string) => (
    <div className={`flex gap-6 ${directionClass}`}>
      {[...items, ...items, ...items, ...items, ...items].map((url, i) => {
        const name = url.split('/').pop()?.replace('.png', '') || `Foto ${i}`;
        return <PhotoFrame key={i} src={url} caption={name.toUpperCase()} />;
      })}
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto bg-blue-100 border-4 border-[#1e3a8a] shadow-[12px_12px_0_0_#1e3a8a] p-4 md:p-8 overflow-hidden relative z-10">

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-300 rounded-bl-full border-b-4 border-l-4 border-[#1e3a8a] translate-x-4 -translate-y-4"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-red-500 rounded-tr-full border-t-4 border-r-4 border-[#1e3a8a] -translate-x-4 translate-y-4 z-0"></div>

      <div className="flex flex-col gap-6 md:gap-8 relative z-10 py-10 opacity-80 pointer-events-none mix-blend-multiply">
        {/* Row 1 Content */}
        {renderMarquee(row1, "animate-marquee hover:[animation-play-state:paused]")}

        {/* Row 2 Content */}
        {renderMarquee(row2, "animate-marquee-reverse hover:[animation-play-state:paused]")}

        {/* Row 3 Content */}
        {renderMarquee(row3, "animate-marquee hover:[animation-play-state:paused]")}
      </div>

      {/* Cutout Image in Foreground */}
      <div className="absolute bottom-[-20px] right-0 md:right-16 z-20 h-full w-[80%] md:w-[50%] flex items-end justify-center pointer-events-none">
        <img
          src="/assets/31.png"
          onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?fit=crop&w=600&h=800&q=80" }}
          alt="Foreground"
          className="h-[95%] w-auto object-contain object-bottom drop-shadow-[-10px_10px_20px_rgba(0,0,0,0.4)] md:drop-shadow-[-20px_20px_30px_rgba(0,0,0,0.3)] filter brightness-110"
        />
      </div>

      {/* AR Gallery Launch Button Overlay */}
      <div className="absolute inset-0 z-30 flex items-center justify-center md:justify-start md:pl-32 pointer-events-none mt-40 md:mt-0">
        <button
          onClick={() => setShowAR(true)}
          className="pointer-events-auto bg-yellow-300 text-[#1e3a8a] font-bold font-sans text-lg md:text-2xl px-6 md:px-10 py-3 md:py-4 border-4 border-[#1e3a8a] shadow-[8px_8px_0_0_#1e3a8a] hover:translate-y-1 hover:shadow-[4px_4px_0_0_#1e3a8a] hover:bg-white transition-all flex items-center gap-3 active:scale-95"
        >
          <span className="animate-pulse flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>
            LIHAT GALERI
          </span>
        </button>
      </div>

      {showAR && (
        <ARPhotoGallery photos={photos} onClose={() => setShowAR(false)} />
      )}
    </div>
  );
}
