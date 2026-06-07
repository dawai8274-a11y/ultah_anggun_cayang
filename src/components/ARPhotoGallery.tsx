import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { ZoomIn, ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function ARPhotoGallery({ photos, onClose }: { photos: string[], onClose: () => void }) {
  const [angle, setAngle] = useState(0);
  const [zoomedIndex, setZoomedIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalPhotos = photos.length;
  const anglePerPhoto = 360 / totalPhotos;
  const radius = 600; // Adjusted for 15 photos

  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      setAngle(prev => prev - anglePerPhoto * 2);
    } else if (info.offset.x > swipeThreshold) {
      setAngle(prev => prev + anglePerPhoto * 2);
    }
  };

  const handleNext = () => setAngle(prev => prev - anglePerPhoto * 2);
  const handlePrev = () => setAngle(prev => prev + anglePerPhoto * 2);

  return (
    <div className="fixed inset-0 overflow-hidden bg-slate-900 border-4 border-[#1e3a8a] z-[100] block" style={{ touchAction: 'none' }}>

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-900 to-black z-0"></div>

      {/* Controls Overlay */}
      <div className="absolute top-4 left-4 md:top-8 md:left-8 z-20 bg-white border-4 border-[#1e3a8a] p-2 md:p-3 shadow-[6px_6px_0_0_#1e3a8a] flex items-center justify-between w-[calc(100%-2rem)] md:w-auto md:gap-8">
        <div className="flex flex-col gap-1">
            <span className="font-serif text-sm md:text-xl text-[#1e3a8a] font-black uppercase">AR MEMORY VAULT</span>
            <span className="text-[10px] font-sans font-bold text-red-500">GESER UNTUK MEMUTAR</span>
        </div>
        <button onClick={onClose} className="bg-red-500 text-white p-2 border-2 border-red-700 hover:bg-red-600 transition-colors">
            <X size={24} />
        </button>
      </div>

      <div 
        ref={containerRef}
        className="w-full h-full flex items-center justify-center relative z-10"
        style={{ perspective: '1500px' }}
      >
         <motion.div 
           className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
           style={{ transformStyle: 'preserve-3d' }}
           drag="x"
           dragConstraints={{ left: 0, right: 0 }}
           dragElastic={0.1}
           onDragEnd={handleDragEnd}
         >
            <motion.div 
              className="relative w-48 h-64 md:w-64 md:h-96"
              style={{ transformStyle: 'preserve-3d', y: 50, scale: 0.65 }}
              animate={{ rotateY: angle }}
              transition={{ type: "spring", stiffness: 40, damping: 20 }}
            >
               {/* Central Person */}
               <motion.div 
                 className="absolute inset-0 flex items-end justify-center drop-shadow-[0_0_40px_rgba(59,130,246,0.8)]"
                 animate={{ rotateY: -angle }}
                 transition={{ type: "spring", stiffness: 40, damping: 20 }}
                 style={{ transformStyle: 'preserve-3d' }}
               >
                  <img 
                    src="/assets/31.png" 
                    onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?fit=crop&w=600&h=800&q=80" }}
                    alt="Anggun Tercinta" 
                    className="max-h-[140%] md:max-h-[130%] object-contain object-bottom pointer-events-none drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]"
                    style={{ maskImage: 'linear-gradient(to top, black 80%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to top, black 80%, transparent 100%)' }}
                    draggable="false"
                  />
                  <div className="absolute bottom-[-40px] bg-white text-[#1e3a8a] border-2 border-[#1e3a8a] font-serif font-black text-sm px-6 py-2 shadow-[4px_4px_0_0_#1e3a8a] z-10">ANGGUN TERCINTA</div>
               </motion.div>

               {/* Orbiting Photos */}
               {photos.map((photo, i) => {
                  const rotationY = i * anglePerPhoto;
                  return (
                    <div 
                      key={i}
                      className="absolute top-1/2 left-1/2 -ml-20 -mt-24 md:-ml-28 md:-mt-36 w-40 h-48 md:w-56 md:h-72 origin-center"
                      style={{ 
                        transform: `rotateY(${rotationY}deg) translateZ(${radius}px)`,
                        transformStyle: 'preserve-3d'
                      }}
                    >
                      {/* Photo Card */}
                      <div 
                         onClick={(e) => { e.stopPropagation(); setZoomedIndex(i); }}
                         className="w-full h-full bg-white/10 backdrop-blur-md border-[3px] border-white/30 p-2 md:p-3 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.6)] hover:border-white transition-all cursor-pointer relative group overflow-hidden flex flex-col"
                      >
                         <div className="flex-1 w-full relative overflow-hidden bg-black/20">
                            <img 
                              src={photo} 
                              alt={`Foto ${i+1}`} 
                              className="w-full h-full object-cover filter brightness-90 group-hover:brightness-110 transition-all pointer-events-none"
                              draggable="false"
                            />
                         </div>
                         <div className="mt-2 text-center text-white/80 font-serif font-bold text-[10px] md:text-sm">
                            FOTO {i + 1}
                         </div>
                         <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
                           <div className="bg-black/60 text-white rounded-full p-3 backdrop-blur-sm shadow-xl">
                              <ZoomIn size={24} />
                           </div>
                         </div>
                      </div>
                    </div>
                  );
               })}
            </motion.div>
         </motion.div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-6 md:gap-12 z-20 pointer-events-none">
         <button onClick={handlePrev} className="pointer-events-auto w-12 h-12 md:w-16 md:h-16 rounded-none bg-white border-4 border-[#1e3a8a] shadow-[4px_4px_0_0_#1e3a8a] flex items-center justify-center text-[#1e3a8a] hover:bg-yellow-300 hover:shadow-[2px_2px_0_0_#1e3a8a] hover:translate-x-1 hover:translate-y-1 transition-all">
            <ChevronLeft size={32} />
         </button>
         <button onClick={handleNext} className="pointer-events-auto w-12 h-12 md:w-16 md:h-16 rounded-none bg-white border-4 border-[#1e3a8a] shadow-[4px_4px_0_0_#1e3a8a] flex items-center justify-center text-[#1e3a8a] hover:bg-yellow-300 hover:shadow-[2px_2px_0_0_#1e3a8a] hover:translate-x-1 hover:translate-y-1 transition-all">
            <ChevronRight size={32} />
         </button>
      </div>

      {/* Zoom Modal overlay */}
      {zoomedIndex !== null && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4 md:p-8 backdrop-blur-xl"
          onClick={() => setZoomedIndex(null)}
        >
           <button 
             className="absolute top-6 right-6 md:top-8 md:right-8 text-white hover:text-yellow-300 bg-white/10 p-2 rounded-full backdrop-blur-md border border-white/20 transition-colors z-50"
             onClick={() => setZoomedIndex(null)}
           >
             <X size={32} />
           </button>
           <motion.div
             initial={{ scale: 0.8, y: 50 }}
             animate={{ scale: 1, y: 0 }}
             transition={{ type: 'spring', damping: 25, stiffness: 200 }}
             className="bg-white p-4 border-8 border-white shadow-[0_0_50px_rgba(59,130,246,0.5)] flex flex-col items-center max-w-full max-h-[90vh] z-40"
             onClick={(e) => e.stopPropagation()}
           >
             <img 
               src={photos[zoomedIndex]} 
               alt="Zoomed" 
               className="max-w-full max-h-[70vh] md:max-h-[75vh] object-contain border border-gray-200"
             />
             <div className="mt-4 font-serif font-black text-xl text-[#1e3a8a]">FOTO {zoomedIndex + 1}</div>
           </motion.div>
        </motion.div>
      )}

    </div>
  );
}
