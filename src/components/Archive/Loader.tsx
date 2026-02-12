"use client";
import React from "react";

export default function Loader() {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black text-white">
      <div className="spinner relative w-[60px] h-[60px] flex justify-center items-center rounded-full -ml-[75px]">
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} style={{ animationDelay: `${0.125 + i * 0.125}s` }} />
        ))}
      </div>

      <style jsx>{`
        .spinner span {
          position: absolute;
          top: 50%;
          width: 35px;
          height: 7px;
          background: #fff;
          animation: dominos 1s ease infinite;
          box-shadow: 2px 2px 3px 0px black;
        }

        .spinner span:nth-child(1) {
          left: 80px;
        }
        .spinner span:nth-child(2) {
          left: 70px;
        }
        .spinner span:nth-child(3) {
          left: 60px;
        }
        .spinner span:nth-child(4) {
          left: 50px;
        }
        .spinner span:nth-child(5) {
          left: 40px;
        }
        .spinner span:nth-child(6) {
          left: 30px;
        }
        .spinner span:nth-child(7) {
          left: 20px;
        }
        .spinner span:nth-child(8) {
          left: 10px;
        }

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
