import { useEffect, useRef, useState } from 'react';

export default function FlappyBird() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const scoreRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frames = 0;
    let animationId: number;

    const bird = {
      x: 50,
      y: 150,
      width: 30, // Blocky bird
      height: 20,
      velocity: 0,
      gravity: 0.35,
      jump: -6.5,
      draw() {
        // Body
        ctx.fillStyle = '#facc15';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        ctx.fillStyle = '#eab308';
        ctx.fillRect(this.x, this.y + 10, this.width, this.height - 10);
        
        // Eye
        ctx.fillStyle = 'black';
        ctx.fillRect(this.x + 20, this.y + 4, 4, 4);
        
        // Beak
        ctx.fillStyle = '#fb923c';
        ctx.fillRect(this.x + 26, this.y + 10, 10, 6);
        
        // Wing
        ctx.fillStyle = '#ca8a04';
        ctx.fillRect(this.x + 5, this.y + 8, 10, 6);
      },
      update() {
        this.velocity += this.gravity;
        this.y += this.velocity;
        
        // Floor collision
        if (this.y + this.height >= canvas.height - 20) {
          this.y = canvas.height - 20 - this.height;
          setGameOver(true);
        }
        // Ceiling collision
        if (this.y <= 0) {
          this.y = 0;
          this.velocity = 0;
        }
      },
      flap() {
        this.velocity = this.jump;
      }
    };

    const pipes: any[] = [];
    const pipeWidth = 50;
    const pipeGap = 120;
    const dx = 3; 

    function drawPipes() {
      for (let i = 0; i < pipes.length; i++) {
        let p = pipes[i];
        
        // Pipe color
        ctx.fillStyle = '#22c55e'; // green pipes
        
        // Top pipe
        ctx.fillRect(p.x, 0, pipeWidth, p.top);
        
        // Bottom pipe
        ctx.fillRect(p.x, canvas.height - 20 - p.bottom, pipeWidth, p.bottom);

        // Pipe outlines
        ctx.strokeStyle = '#14532d';
        ctx.lineWidth = 4;
        ctx.strokeRect(p.x, 0, pipeWidth, p.top);
        ctx.strokeRect(p.x, canvas.height - 20 - p.bottom, pipeWidth, p.bottom);

        // Pipe Cap top
        ctx.fillRect(p.x - 4, p.top - 20, pipeWidth + 8, 20);
        ctx.strokeRect(p.x - 4, p.top - 20, pipeWidth + 8, 20);
        
        // Pipe Cap bottom
        ctx.fillRect(p.x - 4, canvas.height - 20 - p.bottom, pipeWidth + 8, 20);
        ctx.strokeRect(p.x - 4, canvas.height - 20 - p.bottom, pipeWidth + 8, 20);

        // Draw Heart
        if (!p.passed) {
          ctx.font = '24px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('❤️', p.x + pipeWidth / 2, p.top + pipeGap / 2);
        }

        p.x -= dx;

        // Collision detection
        if (
          bird.x < p.x + pipeWidth &&
          bird.x + bird.width > p.x &&
          (bird.y < p.top || bird.y + bird.height > canvas.height - 20 - p.bottom)
        ) {
          setGameOver(true);
        }

        // Score update
        if (p.x + pipeWidth < bird.x && !p.passed) {
          scoreRef.current += 1;
          setScore(scoreRef.current);
          p.passed = true;
        }
      }
      
      // Remove off-screen pipes
      if (pipes.length > 0 && pipes[0].x < -pipeWidth - 10) {
        pipes.shift();
      }
    }

    function updateGame() {
      if (!gameStarted || gameOver) {
        if (!gameStarted && !gameOver) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          // Draw sky
          ctx.fillStyle = '#93c5fd';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          // Draw ground 
          ctx.fillStyle = '#fef08a';
          ctx.fillRect(0, canvas.height - 20, canvas.width, 20);
          ctx.fillStyle = '#ca8a04';
          ctx.fillRect(0, canvas.height - 15, canvas.width, 15);
          
          bird.draw();
        }
        return;
      }

      // Draw sky
      ctx.fillStyle = '#93c5fd';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      bird.update();
      
      // Add pipes every 100 frames
      if (frames % 100 === 0) {
        const minPipeHt = 40;
        const groundHeight = 20;
        const maxPipeHt = canvas.height - groundHeight - pipeGap - minPipeHt;
        const topHeight = Math.random() * (maxPipeHt - minPipeHt) + minPipeHt;
        const bottomHeight = canvas.height - groundHeight - pipeGap - topHeight;
        pipes.push({ x: canvas.width, top: topHeight, bottom: bottomHeight, passed: false });
      }
      
      drawPipes();
      
      // Draw ground 
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(0, canvas.height - 20, canvas.width, 20);
      ctx.fillStyle = '#ca8a04';
      ctx.fillRect(0, canvas.height - 15, canvas.width, 15);
      
      bird.draw();
      
      frames++;
      animationId = requestAnimationFrame(updateGame);
    }

    const abortController = new AbortController();

    const handleInput = (e?: Event) => {
      e?.preventDefault();
      if (!gameStarted && !gameOver) {
        setGameStarted(true);
      } else if (gameStarted && !gameOver) {
        bird.flap();
      } else if (gameOver) {
        setGameOver(false);
        setGameStarted(false);
        scoreRef.current = 0;
        setScore(0);
        pipes.length = 0;
        bird.y = 150;
        bird.velocity = 0;
        frames = 0;
      }
    };

    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space') {
        handleInput(e);
      }
    }, { signal: abortController.signal });

    canvas.addEventListener('mousedown', handleInput, { signal: abortController.signal });
    canvas.addEventListener('touchstart', handleInput, { passive: false, signal: abortController.signal });

    if (gameStarted && !gameOver) {
      animationId = requestAnimationFrame(updateGame);
    } else {
      updateGame(); // Draw initial state
    }

    return () => {
      cancelAnimationFrame(animationId);
      abortController.abort();
    };
  }, [gameStarted, gameOver]);

  return (
    <div className="w-full max-w-sm mx-auto bg-white border-4 border-[#1e3a8a] shadow-[8px_8px_0_0_#1e3a8a] p-6 text-center flex flex-col items-center relative z-20">
      <h2 className="text-xl md:text-2xl font-serif text-[#1e3a8a] mb-2 uppercase font-bold drop-shadow-[2px_2px_0_#93c5fd]">
        Mini Game: Flappy Bird
      </h2>
      <p className="text-sm font-sans mb-4 text-[#1e3a8a] font-bold">Lewati tiang untuk mengumpulkan hati!</p>

      <div className="relative border-4 border-[#1e3a8a] shadow-[inset_0_4px_10px_rgba(0,0,0,0.1)]">
        <canvas 
          ref={canvasRef} 
          width={300} 
          height={400} 
          className="bg-[#93c5fd] cursor-pointer touch-none block"
        />
        
        {!gameStarted && !gameOver && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="bg-white px-4 py-2 border-4 border-[#1e3a8a] shadow-[4px_4px_0_0_#1e3a8a] font-serif font-bold text-[#1e3a8a] animate-pulse">
              KLIK UNTUK MULAI
            </span>
          </div>
        )}
        
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 pointer-events-none backdrop-blur-[2px]">
            <div className="bg-white border-4 border-[#1e3a8a] p-6 text-center shadow-[6px_6px_0_0_#1e3a8a]">
               <h3 className="text-red-500 font-serif font-black text-2xl mb-2 drop-shadow-[2px_2px_0_#1e3a8a]">GAME OVER</h3>
               <p className="text-[#1e3a8a] font-sans font-bold text-xl bg-yellow-200 border-2 border-[#1e3a8a] py-1 px-4 mb-4 mt-4">LEVEL CINTA: {score} ❤️</p>
               <p className="text-xs mt-2 text-[#1e3a8a] font-serif uppercase tracking-widest animate-pulse">Klik lagi untuk restart</p>
            </div>
          </div>
        )}
      </div>

      <div className="font-sans font-black text-xl md:text-2xl text-white mt-6 bg-red-500 px-6 py-3 border-4 border-[#1e3a8a] w-full max-w-[300px] shadow-[4px_4px_0_0_#1e3a8a]">
        LEVEL CINTA: {score} ❤️
      </div>
    </div>
  );
}
