"use client";

export default function PhotoLoader() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center justify-center gap-1.5">
        {Array.from({ length: 8 }).map((_, i) => (
          <span
            key={i}
            className="
              h-[7px] w-[35px]
              bg-white
              shadow-[2px_2px_3px_0px_rgba(0,0,0,0.6)]
              animate-[dominos_1s_ease_infinite]
            "
            style={{
              animationDelay: `${0.125 + i * 0.125}s`,
            }}
          />
        ))}
      </div>

      <style jsx global>{`
        @keyframes dominos {
          50% {
            opacity: 0.7;
          }
          75% {
            transform: rotate(90deg);
          }
          80% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
