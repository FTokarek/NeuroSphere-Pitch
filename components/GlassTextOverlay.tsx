import React from 'react';

const GlassTextOverlay: React.FC = () => {
  return (
    <div className="glass-text-container">
      {/* Vapor Effect */}
      <div className="vapor-effect">
        <div className="vapor-particle"></div>
        <div className="vapor-particle"></div>
        <div className="vapor-particle"></div>
        <div className="vapor-particle"></div>
        <div className="vapor-particle"></div>
      </div>

      {/* Main Centered Text */}
      <div className="glass-text main-text">
        NEUROSPHERE
      </div>


      <style jsx>{`
        .glass-text-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 10;
          pointer-events: none;
        }

        /* Vapor Effect */
        .vapor-effect {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        .vapor-particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(180, 100, 240, 0.6);
          border-radius: 50%;
          animation: vapor-float 4s ease-in-out infinite;
        }

        .vapor-particle:nth-child(1) {
          top: 20%;
          left: 10%;
          animation-delay: 0s;
          animation-duration: 3s;
        }

        .vapor-particle:nth-child(2) {
          top: 60%;
          left: 80%;
          animation-delay: 1s;
          animation-duration: 4s;
        }

        .vapor-particle:nth-child(3) {
          top: 30%;
          left: 60%;
          animation-delay: 2s;
          animation-duration: 3.5s;
        }

        .vapor-particle:nth-child(4) {
          top: 70%;
          left: 30%;
          animation-delay: 0.5s;
          animation-duration: 4.5s;
        }

        .vapor-particle:nth-child(5) {
          top: 40%;
          left: 90%;
          animation-delay: 1.5s;
          animation-duration: 3.8s;
        }

        @keyframes vapor-float {
          0%, 100% {
            transform: translateY(0px) scale(1);
            opacity: 0;
          }
          25% {
            opacity: 0.6;
          }
          50% {
            transform: translateY(-30px) scale(1.2);
            opacity: 0.8;
          }
          75% {
            opacity: 0.4;
          }
        }

        /* Main Glass Text */
        .glass-text {
          font-family: 'Arial Black', sans-serif;
          font-weight: 900;
          text-align: center;
          letter-spacing: 0.1em;

          /* Transparent letters with blur */
          color: rgba(255, 255, 255, 0.1);

          /* Strong blur effect for glass appearance */
          filter: blur(2px);

          /* Text stroke outline for each letter */
          -webkit-text-stroke: 2px rgba(255, 255, 255, 0.3);
          text-stroke: 2px rgba(255, 255, 255, 0.3);

          /* Multiple text shadows for letter outline */
          text-shadow:
            -2px -2px 0 rgba(255, 255, 255, 0.2),
            2px -2px 0 rgba(255, 255, 255, 0.2),
            -2px 2px 0 rgba(255, 255, 255, 0.2),
            2px 2px 0 rgba(255, 255, 255, 0.2),
            0 0 10px rgba(255, 255, 255, 0.1);
        }

        .main-text {
          font-size: clamp(3rem, 9vw, 7.5rem);
          z-index: 10;
          position: relative;
        }



        @media (max-width: 768px) {
          .glass-text {
            font-size: clamp(2.25rem, 6vw, 4.5rem);
            letter-spacing: 0.05em;
            -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
            text-stroke: 1px rgba(255, 255, 255, 0.3);
          }
        }
      `}</style>
    </div>
  );
};

export default GlassTextOverlay;
