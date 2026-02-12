"use client";

import React from "react";

const CyberLoader = () => {
  return (
    <div className="cyber-loader-container">
      <style>{`
        .cyber-loader-container .loader {
          display: flex;
          align-items: center;
        }

        .cyber-loader-container .bar {
          display: inline-block;
          width: 3px;
          height: 20px;
          background-color: rgba(255, 255, 255, .5);
          border-radius: 10px;
          animation: scale-up4 1s linear infinite;
        }

        .cyber-loader-container .bar:nth-child(2) {
          height: 35px;
          margin: 0 5px;
          animation-delay: .25s;
        }

        .cyber-loader-container .bar:nth-child(3) {
          animation-delay: .5s;
        }

        @keyframes scale-up4 {
          20% {
            background-color: #ffff;
            transform: scaleY(1.5);
          }

          40% {
            transform: scaleY(1);
          }
        }
      `}</style>

      <div className="loader">
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </div>
    </div>
  );
};

export default CyberLoader;