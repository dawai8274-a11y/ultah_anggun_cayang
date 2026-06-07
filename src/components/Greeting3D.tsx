import { motion } from 'motion/react';

export default function Greeting3D() {
  return (
    <div className="flex flex-col items-center justify-center mt-12 md:mt-16 z-10 relative">
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 3,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        className="bg-white p-4 md:p-6 relative flex flex-col border-4 border-[#1e3a8a] shadow-[12px_12px_0_0_#1e3a8a] w-full max-w-[800px]"
      >
        <div className="absolute -top-6 -left-6 z-20 bg-yellow-300 border-4 border-[#1e3a8a] px-3 py-2 rotate-[-10deg] shadow-[4px_4px_0_0_#1e3a8a] font-serif text-sm md:text-lg text-black">
          NEW ITEM!
        </div>

        <div className="flex-1 border-4 border-dashed border-[#3b82f6] flex flex-col items-center justify-center bg-[#eff6ff] text-center p-8 md:p-14 relative overflow-hidden">
          
          <motion.div 
             initial={{ y: 30, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ duration: 1.2, delay: 0.3 }}
             className="z-10 w-full"
          >
             <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif text-[#1e3a8a] drop-shadow-[2px_2px_0_#93c5fd] leading-[1.3] mb-8 uppercase">
               "Happy birthday to the girl who stole my heart, Anggun Tercinta!"
             </h2>
          </motion.div>
          
          <motion.div
             initial={{ y: 30, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ duration: 1.2, delay: 0.8 }}
             className="z-10 w-full max-w-lg mt-4"
          >
             <p className="text-lg md:text-xl leading-relaxed text-[#1e3a8a] font-sans font-bold bg-white p-4 border-4 border-[#1e3a8a] shadow-[6px_6px_0_0_rgba(30,58,138,0.2)]">
               Semoga hari-harimu secerah senyummu. Kamu selalu menjadi warna biru di hidupku. Teruslah bersinar!
             </p>
          </motion.div>
        </div>

        <div className="mt-6 flex flex-wrap gap-4 items-center justify-between font-serif text-[10px] md:text-xs text-[#1e3a8a]">
          <span className="bg-blue-100 px-3 py-2 border-2 border-[#1e3a8a] shadow-[2px_2px_0_0_#1e3a8a]">ITEM: MEMOIR </span>
          <span className="bg-blue-100 px-3 py-2 border-2 border-[#1e3a8a] shadow-[2px_2px_0_0_#1e3a8a] text-green-700">HP: 100/100</span>
          <span className="bg-blue-100 px-3 py-2 border-2 border-[#1e3a8a] shadow-[2px_2px_0_0_#1e3a8a] text-blue-700">MP: 100/100</span>
        </div>
        
      </motion.div>
    </div>
  );
}
