import React from 'react';

const GlassTextOverlay: React.FC = () => {
  return (
    <div className="glass-text-container">
      <div className="glass-text">
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
          align-items: flex-start;
          padding-top: 25vh;
          z-index: 10;
          pointer-events: none;
        }

        .glass-text {
          font-size: clamp(3rem, 9vw, 7.5rem);
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
