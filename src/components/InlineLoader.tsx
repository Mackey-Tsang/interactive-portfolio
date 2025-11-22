"use client";

export default function InlineLoader() {
  return (
    <div className="w-full flex items-center justify-center py-10">
      <div className="relative w-[60px] h-[60px]">
        {Array.from({ length: 8 }).map((_, i) => (
          <span
            key={i}
            className="absolute top-1/2 h-[7px] w-[35px] bg-white shadow-[2px_2px_3px_0_rgba(0,0,0,0.5)]"
            style={{
              left:
                i === 0 ? "80px" :
                i === 1 ? "70px" :
                i === 2 ? "60px" :
                i === 3 ? "50px" :
                i === 4 ? "40px" :
                i === 5 ? "30px" :
                i === 6 ? "20px" : "10px",
              transform: "translateY(-50%)",
              animation: "dominos 1s ease infinite",
              animationDelay:
                i === 0 ? "0.125s" :
                i === 1 ? "0.3s"   :
                i === 2 ? "0.425s" :
                i === 3 ? "0.54s"  :
                i === 4 ? "0.665s" :
                i === 5 ? "0.79s"  :
                i === 6 ? "0.915s" : "0s",
            }}
          />
        ))}
      </div>

      {/* Keyframes inline so you don't need extra CSS files */}
      <style jsx>{`
        @keyframes dominos {
          50% { opacity: 0.7; }
          75% { transform: translateY(-50%) rotate(90deg); }
          80% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
