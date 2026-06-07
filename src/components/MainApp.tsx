import FloatingFlowers from './FloatingFlowers';
import Greeting3D from './Greeting3D';
import FlipBook from './FlipBook';
import PhotoGallery from './PhotoGallery';
import SpotifyPlayer from './SpotifyPlayer';
import FlappyBird from './FlappyBird';

export default function MainApp() {
  return (
    <div className="relative min-h-screen pb-12 w-full flex flex-col items-center bg-[#bfdbfe] font-sans selection:bg-[#1e3a8a] selection:text-white">
      <FloatingFlowers />
      
      {/* Pixel Art Background Pattern */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{ backgroundImage: 'linear-gradient(#93c5fd 2px, transparent 2px), linear-gradient(90deg, #93c5fd 2px, transparent 2px)', backgroundSize: '32px 32px', opacity: 0.5 }}></div>

      <div className="w-full max-w-[1024px] px-4 md:px-8 pt-10 relative z-10 flex flex-col">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end border-b-4 border-[#1e3a8a] pb-6 w-full relative bg-white border-4 p-6 shadow-[8px_8px_0_0_#1e3a8a]">
          <div className="flex flex-col">
            <span className="text-sm md:text-lg font-serif text-[#3b82f6] shadow-sm"><span className="text-xl">☆</span> LEVEL 24 <span className="text-xl">☆</span></span>
            <h1 className="text-2xl md:text-4xl font-serif mt-6 text-[#1e3a8a] drop-shadow-[2px_2px_0_#93c5fd] leading-snug">HAPPY BIRTHDAY<br />ANGGUN TERCINTA</h1>
            <p className="mt-4 font-sans text-xl md:text-2xl font-bold text-[#1e3a8a] bg-yellow-200 inline-block px-2 border-2 border-[#1e3a8a]">PLAYER 1 ACTIVE</p>
          </div>
          <div className="text-left md:text-right mt-6 md:mt-0 font-serif">
            <div className="text-2xl md:text-3xl text-[#1e3a8a] drop-shadow-[2px_2px_0_#93c5fd]">SCORE: 9999</div>
            <div className="text-sm mt-4 bg-blue-100 border-2 border-[#1e3a8a] px-2 py-1 inline-block">STAGE: FOREVER</div>
          </div>
        </header>
        
        <main className="w-full flex flex-col items-center">
          <Greeting3D />
          
          <div className="mt-20 md:mt-32 w-full flex flex-col relative items-center">
            <FlappyBird />
          </div>

          <div className="mt-20 md:mt-32 w-full flex flex-col relative items-center">
            <SpotifyPlayer />
          </div>
          
          <div className="mt-20 md:mt-32 w-full flex flex-col relative items-center">
            <div className="bg-white border-4 border-[#1e3a8a] shadow-[8px_8px_0_0_#1e3a8a] px-6 py-4 inline-block mb-12 relative z-20">
              <h2 className="text-xl md:text-3xl font-serif text-[#1e3a8a]">
                <span className="text-red-500">❤</span> BUKU KENANGAN <span className="text-red-500">❤</span>
              </h2>
            </div>
            <FlipBook />
          </div>

          <div className="mt-20 md:mt-32 w-full flex flex-col relative items-center">
            <div className="bg-white border-4 border-[#1e3a8a] shadow-[8px_8px_0_0_#1e3a8a] px-6 py-4 inline-block mb-12 relative z-20">
              <h2 className="text-xl md:text-3xl font-serif text-[#1e3a8a]">
                ★ GUDANG FOTO ★
              </h2>
            </div>
            <PhotoGallery />
          </div>
        </main>
        
        <footer className="mt-16 mb-8 flex flex-col items-center justify-center p-6 bg-white border-4 border-[#1e3a8a] shadow-[8px_8px_0_0_#1e3a8a] z-20 relative">
          <div className="font-serif text-[10px] md:text-sm text-[#1e3a8a] text-center space-y-4">
             <p>GAME OVER? NO, JUST LEVEL UP!</p>
             <p className="text-red-500 animate-pulse">INSERT COIN TO CONTINUE FOREVER</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
