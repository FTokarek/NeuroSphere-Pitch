import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface SectionProps {
  id: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
  backgroundComponent?: ReactNode;
  backgroundColor?: string;
  textColor?: string;
  className?: string;
}

const Section: React.FC<SectionProps> = ({
  id,
  title,
  subtitle,
  children,
  backgroundComponent,
  backgroundColor = 'bg-gray-900',
  textColor = 'text-white',
  className = '',
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { threshold: 0.3 });
  const controls = useAnimation();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      controls.start('visible');
      setHasAnimated(true);
    }
  }, [isInView, controls, hasAnimated]);

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 60,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section
      id={id}
      ref={ref}
      className={`
        relative min-h-screen w-full flex items-center justify-center
        section-transition ${backgroundColor} ${textColor} ${className}
      `}
    >
      {/* Background Component */}
      {backgroundComponent && (
        <div className="bg-overlay">
          {backgroundComponent}
        </div>
      )}

      {/* Content Container */}
      <motion.div
        className="content-container w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <div className="text-center">
          {/* Title */}
          {title && (
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              {title}
            </motion.h2>
          )}

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl lg:text-3xl mb-12 opacity-80 max-w-4xl mx-auto"
            >
              {subtitle}
            </motion.p>
          )}

          {/* Custom Content */}
          {children && (
            <motion.div
              variants={itemVariants}
              className="max-w-6xl mx-auto"
            >
              {children}
            </motion.div>
          )}
        </div>
      </motion.div>

    </section>
  );
};

export default Section;
