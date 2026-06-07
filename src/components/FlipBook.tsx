import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type PageData = {
  type: 'cover' | 'text' | 'img';
  title?: string;
  content?: string;
  img?: string;
};

const bookData: { front: PageData, back: PageData }[] = [
  {
    front: { type: 'cover', title: 'Our Story 💙' },
    back: { type: 'text', content: 'Setiap kisah punya awal yang indah. Dan ini adalah kisah kita, penuh warna kesukaanmu.' }
  },
  {
    front: { type: 'img', img: '/assets/2.jpeg' },
    back: { type: 'text', content: 'Momen-momen manis yang kita lewati, selalu jadi alasan senyumku setiap hari.' }
  },
  {
    front: { type: 'img', img: '/assets/3.jpeg' },
    back: { type: 'text', content: 'Terima kasih kamu selalu ada. Bersamamu selalu terasa nyaman.' }
  },
  {
    front: { type: 'text', content: 'Selamat Ulang Tahun, Sayang! Semoga tahun ini penuh dengan kejutan indah untukmu.' },
    back: { type: 'cover', title: 'I Love You 💙' }
  }
];

function PageContent({ data }: { data: PageData }) {
  if (data.type === 'cover') {
    return (
      <div className="w-full h-full bg-[#1e3a8a] flex flex-col justify-center items-center p-6 md:p-10 text-center relative overflow-hidden border-4 border-white shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
        <div className="bg-white px-2 py-1 border-2 border-[#1e3a8a] text-black font-sans font-bold text-xs md:text-sm mb-6 absolute top-6">★ FILE 01 ★</div>
        <div className="flex flex-col items-center justify-center z-10 w-full bg-[#1e3a8a]/80 p-4 border-4 border-white shadow-[6px_6px_0_0_rgba(255,255,255,0.2)]">
          <h3 className="text-3xl md:text-4xl font-serif text-white drop-shadow-[4px_4px_0_#3b82f6] leading-tight">
            {data.title}
          </h3>
        </div>
      </div>
    );
  }
  if (data.type === 'img') {
    return (
      <div className="w-full h-full p-4 md:p-6 bg-blue-100 flex flex-col items-center justify-center relative border-8 border-transparent" style={{ borderImage: "repeating-linear-gradient(45deg, #3b82f6, #3b82f6 10px, transparent 10px, transparent 20px) 8" }}>
        <div className="w-full h-full bg-white shadow-[8px_8px_0_0_#1e3a8a] p-3 md:p-4 pb-12 flex flex-col border-4 border-[#1e3a8a]">
          <div className="flex-grow w-full relative bg-gray-200 overflow-hidden border-2 border-[#1e3a8a]">
            <img src={data.img} alt="Memory" className="absolute inset-0 w-full h-full object-cover filter contrast-[1.1] grayscale-[0.2]" />
          </div>
          <div className="text-center font-sans font-bold text-xs mt-4 text-[#1e3a8a]"></div>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full h-full bg-yellow-50 p-6 md:p-10 flex items-center justify-center text-center relative border-4 border-[#1e3a8a] shadow-[inset_0_0_0_4px_rgba(255,255,255,0.5)]">
      <p className="text-lg md:text-xl font-sans font-bold text-[#1e3a8a] leading-relaxed z-10 p-4 bg-white border-4 border-[#1e3a8a] shadow-[6px_6px_0_0_#93c5fd]">
        {data.content}
      </p>
    </div>
  );
}

export default function FlipBook() {
  const [currentPage, setCurrentPage] = useState(0);

  const next = () => setCurrentPage((p) => Math.min(p + 1, bookData.length));
  const prev = () => setCurrentPage((p) => Math.max(p - 1, 0));

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center z-10 relative">
      <div className="relative w-[300px] sm:w-[400px] md:w-[600px] h-[350px] sm:h-[450px] md:h-[550px] perspective-[2000px] flex items-center justify-center mb-8">

        {/* Book Container that shifts based on open/close state to stay centered */}
        <div
          className="w-full h-full transition-transform duration-[1.2s] ease-[cubic-bezier(0.645,0.045,0.355,1.000)] relative flex justify-center"
          style={{
            transform: currentPage === 0 ? 'translateX(-25%)' : (currentPage === bookData.length ? 'translateX(25%)' : 'translateX(0)')
          }}
        >
          {/* Main Book Anchor */}
          <div className="absolute w-[50%] h-full right-0 origin-left">
            {bookData.map((page, idx) => {
              const isFlipped = currentPage > idx;
              const zIndex = isFlipped ? idx : bookData.length - idx;

              return (
                <div
                  key={idx}
                  className="absolute top-0 left-0 w-full h-full origin-left transition-transform duration-[1.2s] ease-[cubic-bezier(0.645,0.045,0.355,1.000)] transform-style-3d cursor-pointer"
                  style={{
                    transform: isFlipped ? 'rotateY(-180deg)' : 'rotateY(0deg)',
                    zIndex
                  }}
                  onClick={() => {
                    if (isFlipped) {
                      setCurrentPage(idx); // Flip back to this page
                    } else {
                      setCurrentPage(idx + 1); // Flip this page forward
                    }
                  }}
                >
                  {/* Front Face (Right Side) */}
                  <div className="absolute inset-0 backface-hidden bg-white shadow-[-10px_5px_25px_rgba(0,0,0,0.15)] rounded-r-lg rounded-l-[1px] border-y border-r border-gray-300 overflow-hidden">
                    <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black/20 to-transparent z-20 pointer-events-none"></div>
                    <PageContent data={page.front} />
                  </div>

                  {/* Back Face (Left Side) - Only visible when flipped */}
                  <div className="absolute inset-0 backface-hidden bg-white shadow-[10px_5px_25px_rgba(0,0,0,0.15)] rounded-l-lg rounded-r-[1px] border-y border-l border-gray-300 overflow-hidden"
                    style={{ transform: 'rotateY(180deg)' }}>
                    <div className="absolute inset-y-0 right-0 w-4 bg-gradient-to-l from-black/20 to-transparent z-20 pointer-events-none"></div>
                    <PageContent data={page.back} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Controls */}
      <div className="flex items-center gap-6 mt-8 z-20 font-sans">
        <button
          onClick={prev}
          disabled={currentPage === 0}
          className="w-12 h-12 flex items-center justify-center bg-[#1e3a8a] border-4 border-white text-white shadow-[4px_4px_0_0_#93c5fd] hover:text-yellow-300 disabled:opacity-50 disabled:shadow-none disabled:translate-y-1 transition-all cursor-pointer font-bold"
          aria-label="Previous Page"
        >
          &lt;
        </button>
        <span className="text-[#1e3a8a] font-serif text-sm tracking-widest px-6 py-3 bg-white border-4 border-[#1e3a8a] shadow-[4px_4px_0_0_#93c5fd]">
          {currentPage === 0 ? 'COVER' : `PG ${currentPage}`}
        </span>
        <button
          onClick={next}
          disabled={currentPage === bookData.length}
          className="w-12 h-12 flex items-center justify-center bg-[#1e3a8a] border-4 border-white text-white shadow-[4px_4px_0_0_#93c5fd] hover:text-yellow-300 disabled:opacity-50 disabled:shadow-none disabled:translate-y-1 transition-all cursor-pointer font-bold"
          aria-label="Next Page"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
