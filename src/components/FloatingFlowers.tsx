import { useEffect, useState } from 'react';

type Flower = {
  id: number;
  left: string;
  animationDuration: string;
  animationDelay: string;
  opacity: number;
  scale: number;
  color: string;
};

export default function FloatingFlowers() {
  const [flowers, setFlowers] = useState<Flower[]>([]);

  useEffect(() => {
    // Generate 35 flowers
    const generatedFlowers = Array.from({ length: 35 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100 + 'vw',
      animationDuration: Math.random() * 5 + 6 + 's',
      animationDelay: -Math.random() * 10 + 's',
      opacity: Math.random() * 0.5 + 0.3,
      scale: Math.random() * 0.6 + 0.5,
      color: ['#bfdbfe', '#93c5fd', '#60a5fa', '#eff6ff'][Math.floor(Math.random() * 4)]
    }));
    setFlowers(generatedFlowers);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {flowers.map(f => (
         <div key={f.id} className="absolute top-[-10vh]" style={{
            left: f.left,
            animation: `fall ${f.animationDuration} linear infinite`,
            animationDelay: f.animationDelay,
            opacity: f.opacity,
            transform: `scale(${f.scale})`
         }}>
           <svg width="24" height="24" viewBox="0 0 24 24" fill={f.color} style={{ imageRendering: 'pixelated' }}>
             {/* Simple pixel block representing a floating particle/flower */}
             <rect x="8" y="2" width="8" height="20" opacity="0.6" />
             <rect x="2" y="8" width="20" height="8" opacity="0.6" />
             <rect x="6" y="6" width="12" height="12" />
             <rect x="10" y="10" width="4" height="4" fill="#ffffff" />
           </svg>
         </div>
      ))}
    </div>
  );
}
