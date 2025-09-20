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
          <div className="loading">
            <svg width="64px" height="48px">
              <polyline points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" id="back"></polyline>
              <polyline points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" id="front"></polyline>
            </svg>
          </div>

          <style jsx>{`
            .loading {
              position: relative;
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
