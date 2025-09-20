import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SectionLoaderProps {
  isVisible: boolean;
}

const SectionLoader: React.FC<SectionLoaderProps> = ({ isVisible }) => {
  const letters = ['L', 'O', 'A', 'D', 'I', 'N', 'G'];

  return (
    <AnimatePresence>
      {isVisible && (
               <motion.div
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 transition={{ duration: 0.3 }}
                 className="fixed inset-0 z-50 flex items-center justify-center"
                 style={{
                   backdropFilter: 'blur(10px)',
                   backgroundColor: 'rgba(0, 0, 0, 0.5)'
                 }}
               >
                 {/* Animated Transition Rectangles */}
                 <div className="transition-overlay">
                   <motion.div 
                     className="transition-rect rect-1"
                     initial={{ y: '-100%' }}
                     animate={{ y: ['100%', '-100%'] }}
                     transition={{ 
                       duration: 1.2, 
                       ease: "easeInOut",
                       repeat: Infinity,
                       repeatType: "loop"
                     }}
                   />
                   <motion.div 
                     className="transition-rect rect-2"
                     initial={{ y: '-100%' }}
                     animate={{ y: ['100%', '-100%'] }}
                     transition={{ 
                       duration: 1.4, 
                       ease: "easeInOut",
                       repeat: Infinity,
                       repeatType: "loop",
                       delay: 0.1
                     }}
                   />
                   <motion.div 
                     className="transition-rect rect-3"
                     initial={{ y: '-100%' }}
                     animate={{ y: ['100%', '-100%'] }}
                     transition={{ 
                       duration: 1.6, 
                       ease: "easeInOut",
                       repeat: Infinity,
                       repeatType: "loop",
                       delay: 0.2
                     }}
                   />
                   <motion.div 
                     className="transition-rect rect-4"
                     initial={{ y: '-100%' }}
                     animate={{ y: ['100%', '-100%'] }}
                     transition={{ 
                       duration: 1.3, 
                       ease: "easeInOut",
                       repeat: Infinity,
                       repeatType: "loop",
                       delay: 0.3
                     }}
                   />
                   <motion.div 
                     className="transition-rect rect-5"
                     initial={{ y: '-100%' }}
                     animate={{ y: ['100%', '-100%'] }}
                     transition={{ 
                       duration: 1.5, 
                       ease: "easeInOut",
                       repeat: Infinity,
                       repeatType: "loop",
                       delay: 0.4
                     }}
                   />
                 </div>

                 <div className="loading">
                   <svg width="64px" height="48px">
                     <polyline points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" id="back"></polyline>
                     <polyline points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" id="front"></polyline>
                   </svg>
                 </div>

          <style jsx>{`
            /* Transition Overlay */
            .transition-overlay {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              overflow: hidden;
              z-index: 1;
              pointer-events: none;
            }

            .transition-rect {
              position: absolute;
              width: 100%;
              height: 150px;
              opacity: 0.3;
              mix-blend-mode: overlay;
              filter: blur(2px);
            }

            .rect-1 {
              background: linear-gradient(135deg, 
                rgba(180, 100, 240, 0.4) 0%, 
                rgba(120, 50, 200, 0.6) 50%, 
                rgba(80, 30, 160, 0.4) 100%);
              left: 10%;
              width: 15%;
              transform: skewX(-15deg);
            }

            .rect-2 {
              background: linear-gradient(135deg, 
                rgba(100, 150, 255, 0.4) 0%, 
                rgba(60, 110, 220, 0.6) 50%, 
                rgba(40, 80, 180, 0.4) 100%);
              left: 25%;
              width: 20%;
              transform: skewX(10deg);
            }

            .rect-3 {
              background: linear-gradient(135deg, 
                rgba(150, 80, 255, 0.4) 0%, 
                rgba(110, 50, 200, 0.6) 50%, 
                rgba(80, 30, 150, 0.4) 100%);
              left: 45%;
              width: 18%;
              transform: skewX(-20deg);
            }

            .rect-4 {
              background: linear-gradient(135deg, 
                rgba(90, 180, 255, 0.4) 0%, 
                rgba(50, 140, 220, 0.6) 50%, 
                rgba(30, 100, 180, 0.4) 100%);
              left: 63%;
              width: 16%;
              transform: skewX(12deg);
            }

            .rect-5 {
              background: linear-gradient(135deg, 
                rgba(200, 90, 255, 0.4) 0%, 
                rgba(160, 60, 220, 0.6) 50%, 
                rgba(120, 40, 180, 0.4) 100%);
              left: 79%;
              width: 14%;
              transform: skewX(-8deg);
            }

            .loading {
              position: relative;
              z-index: 10;
            }

            .loading svg polyline {
              fill: none;
              stroke-width: 3;
              stroke-linecap: round;
              stroke-linejoin: round;
            }

            .loading svg polyline#back {
              fill: none;
              stroke: rgba(180, 100, 240, 0.2);
            }

            .loading svg polyline#front {
              fill: none;
              stroke: rgba(180, 100, 240, 1);
              stroke-dasharray: 48, 144;
              stroke-dashoffset: 192;
              animation: dash_neurosphere 1.4s linear infinite;
            }

            @keyframes dash_neurosphere {
              72.5% {
                opacity: 0;
              }
              to {
                stroke-dashoffset: 0;
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SectionLoader;
