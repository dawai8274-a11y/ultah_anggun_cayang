import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

export default function WelcomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-[#1e3a8a] text-white relative overflow-hidden font-sans">
      {/* Pixelated Background Grid */}
      <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(#2563eb 2px, transparent 2px), linear-gradient(90deg, #2563eb 2px, transparent 2px)', backgroundSize: '40px 40px', opacity: 0.4 }}></div>

      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="z-10 flex flex-col items-center text-center px-6 md:px-16 py-12 max-w-3xl bg-white/10 backdrop-blur-sm border-4 border-white shadow-[12px_12px_0_0_#93c5fd]"
      >
        <span className="text-xl md:text-2xl mb-8 font-serif font-bold text-yellow-300 animate-pulse tracking-widest">*** P1 START ***</span>
        
        <h1 className="text-4xl md:text-6xl font-serif text-white mb-10 drop-shadow-[4px_4px_0_#3b82f6] leading-[1.2]">
          ADA<br/>KEJUTAN<br/>UNTUK<br/><span className="text-yellow-300">ANGGUN TERCINTA</span>
        </h1>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="px-10 py-5 bg-[#3b82f6] text-white border-4 border-white font-serif text-sm md:text-lg transition-all duration-100 cursor-pointer shadow-[8px_8px_0_0_#1d4ed8] hover:shadow-[4px_4px_0_0_#1d4ed8] hover:translate-x-[4px] hover:translate-y-[4px]"
        >
          PRESS START
        </motion.button>
      </motion.div>
    </div>
  );
}
