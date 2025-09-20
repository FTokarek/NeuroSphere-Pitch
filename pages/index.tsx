import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Section from '@/components/Section';
import RainbowZappersBackground from '@/components/RainbowZappersBackground';
import FractalGlassBackground from '@/components/FractalGlassBackground';
import GlassTextOverlay from '@/components/GlassTextOverlay';
import TeamCards from '@/components/TeamCards';
import SectionNavigation from '@/components/SectionNavigation';
import VerticalNavigation from '@/components/VerticalNavigation';
import CoswarpShaderBackground from '@/components/CoswarpShaderBackground';
import ParticleLayersBackground from '@/components/ParticleLayersBackground';
import SectionLoader from '@/components/SectionLoader';

const sections = [
  { id: 'section1', title: '1/10' },
  { id: 'section2', title: '2/10' },
  { id: 'section3', title: '3/10' },
  { id: 'section4', title: '4/10' },
  { id: 'section5', title: '5/10' },
  { id: 'section6', title: '6/10' },
  { id: 'section7', title: '7/10' },
  { id: 'section8', title: '8/10' },
  { id: 'section9', title: '9/10' },
  { id: 'section10', title: '10/10' },
];

export default function Home() {
  const [isLoading, setIsLoading] = React.useState(true); // Start with loading on page load
  const [loadingTimeout, setLoadingTimeout] = React.useState<NodeJS.Timeout | null>(null);
  const [currentSection, setCurrentSection] = React.useState('section1');
  const [isInitialLoad, setIsInitialLoad] = React.useState(true); // Track if this is the first load
  const [lastScrollTime, setLastScrollTime] = React.useState(0); // Track last scroll time for latency

  const handleSectionChange = (sectionId: string) => {
    // Don't change if already on the same section or during initial load
    if (sectionId === currentSection || isInitialLoad) return;

    // Clear any existing timeout
    if (loadingTimeout) {
      clearTimeout(loadingTimeout);
    }

    // Show loader
    setIsLoading(true);

    // Change section after a short delay and hide loader
    const timeout = setTimeout(() => {
      setCurrentSection(sectionId);
      setIsLoading(false);
    }, 1500); // 1.5 seconds loading time

    setLoadingTimeout(timeout);
  };

  // Navigation functions
  const goToNextSection = () => {
    const currentIndex = sections.findIndex(section => section.id === currentSection);
    if (currentIndex < sections.length - 1) {
      const nextSection = sections[currentIndex + 1];
      handleSectionChange(nextSection.id);
    }
  };

  const goToPreviousSection = () => {
    const currentIndex = sections.findIndex(section => section.id === currentSection);
    if (currentIndex > 0) {
      const previousSection = sections[currentIndex - 1];
      handleSectionChange(previousSection.id);
    }
  };

  // Handle wheel/scroll events
  const handleWheel = React.useCallback((event: WheelEvent) => {
    // Skip if initial load or currently loading
    if (isInitialLoad || isLoading) return;

    const now = Date.now();
    const SCROLL_LATENCY = 800; // 800ms latency between scroll actions

    // Check if enough time has passed since last scroll
    if (now - lastScrollTime < SCROLL_LATENCY) return;

    setLastScrollTime(now);

    // Determine scroll direction
    if (event.deltaY > 0) {
      // Scrolling down - go to next section
      goToNextSection();
    } else if (event.deltaY < 0) {
      // Scrolling up - go to previous section
      goToPreviousSection();
    }
  }, [currentSection, isInitialLoad, isLoading, lastScrollTime]);

  // Handle keyboard arrow events
  const handleKeyDown = React.useCallback((event: KeyboardEvent) => {
    // Skip if initial load or currently loading
    if (isInitialLoad || isLoading) return;

    const now = Date.now();
    const SCROLL_LATENCY = 800; // 800ms latency between keyboard actions

    // Check if enough time has passed since last action
    if (now - lastScrollTime < SCROLL_LATENCY) return;

    // Handle arrow keys
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      setLastScrollTime(now);
      goToNextSection();
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      setLastScrollTime(now);
      goToPreviousSection();
    }
  }, [currentSection, isInitialLoad, isLoading, lastScrollTime]);

  // Handle initial page load
  React.useEffect(() => {
    if (isInitialLoad) {
      const timeout = setTimeout(() => {
        setIsLoading(false);
        setIsInitialLoad(false);
      }, 2000); // 2 seconds for initial load

      setLoadingTimeout(timeout);
    }
  }, [isInitialLoad]);

  // Setup wheel and keyboard event listeners
  React.useEffect(() => {
    // Add wheel event listener
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    // Add keyboard event listener
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleWheel, handleKeyDown]);

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (loadingTimeout) {
        clearTimeout(loadingTimeout);
      }
    };
  }, [loadingTimeout]);

  return (
    <>
      <Head>
        <title>NeuroSphere - Pitch Presentation</title>
        <meta name="description" content="NeuroSphere - Zaawansowana technologia przyszłości" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="relative">
        {/* Section Loader */}
        <SectionLoader isVisible={isLoading} />
        
               {/* Page Indicator */}
               {!isLoading && (
                 <div className="page-indicator">
                   {sections.find(section => section.id === currentSection)?.title}
                 </div>
               )}

        {/* Page Content - Only show current section */}
        <motion.div
          key={currentSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 w-full h-full"
        >
          {currentSection === 'section1' && (
            <Section
              id="section1"
              title=""
              backgroundColor="bg-black"
              backgroundComponent={
                <>
                  <RainbowZappersBackground />
                  <GlassTextOverlay />
                </>
              }
            />
          )}

          {currentSection === 'section2' && (
            <Section
              id="section2"
              title=""
              backgroundColor="bg-black"
              backgroundComponent={
                <div className="relative w-full h-full">
                  <RainbowZappersBackground />
                  <div className="absolute inset-0 bg-black/30"></div>
                  <TeamCards />
                </div>
              }
            />
          )}

          {currentSection === 'section3' && (
            <Section
              id="section3"
              title=""
              backgroundColor="bg-black"
              backgroundComponent={
                <div className="relative w-full h-full">
                  <RainbowZappersBackground />
                  <div className="absolute inset-0 bg-black/30"></div>
                </div>
              }
            />
          )}

          {currentSection === 'section4' && (
            <Section
              id="section4"
              title=""
              backgroundColor="bg-black"
              backgroundComponent={
                <div className="relative w-full h-full">
                  <RainbowZappersBackground />
                  <div className="absolute inset-0 bg-black/30"></div>
                </div>
              }
            />
          )}

          {currentSection === 'section5' && (
            <Section
              id="section5"
              title=""
              backgroundColor="bg-black"
              backgroundComponent={
                <div className="relative w-full h-full">
                  <RainbowZappersBackground />
                  <div className="absolute inset-0 bg-black/30"></div>
                </div>
              }
            />
          )}

          {currentSection === 'section6' && (
            <Section
              id="section6"
              title=""
              backgroundColor="bg-black"
              backgroundComponent={
                <div className="relative w-full h-full">
                  <RainbowZappersBackground />
                  <div className="absolute inset-0 bg-black/30"></div>
                </div>
              }
            />
          )}

          {currentSection === 'section7' && (
            <Section
              id="section7"
              title=""
              backgroundColor="bg-black"
              backgroundComponent={
                <div className="relative w-full h-full">
                  <RainbowZappersBackground />
                  <div className="absolute inset-0 bg-black/30"></div>
                </div>
              }
            />
          )}

          {currentSection === 'section8' && (
            <Section
              id="section8"
              title=""
              backgroundColor="bg-black"
              backgroundComponent={
                <div className="relative w-full h-full">
                  <RainbowZappersBackground />
                  <div className="absolute inset-0 bg-black/30"></div>
                </div>
              }
            />
          )}

          {currentSection === 'section9' && (
            <Section
              id="section9"
              title=""
              backgroundColor="bg-black"
              backgroundComponent={
                <div className="relative w-full h-full">
                  <RainbowZappersBackground />
                  <div className="absolute inset-0 bg-black/30"></div>
                </div>
              }
            />
          )}

          {currentSection === 'section10' && (
            <Section
              id="section10"
              title=""
              backgroundColor="bg-black"
              backgroundComponent={
                <div className="relative w-full h-full">
                  <RainbowZappersBackground />
                  <div className="absolute inset-0 bg-black/30"></div>
                </div>
              }
            />
          )}
        </motion.div>

        {/* Vertical Navigation */}
        {/* <VerticalNavigation sections={sections} /> */}
      </main>

      <style jsx>{`
        .page-indicator {
          position: fixed;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 40;
          
          padding: 12px 24px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 25px;
          
          color: white;
          font-size: 1rem;
          font-weight: 500;
          text-align: center;
          letter-spacing: 0.5px;
          
          transition: all 0.3s ease;
        }

        .page-indicator:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.3);
          transform: translateX(-50%) translateY(-2px);
        }

        @media (max-width: 768px) {
          .page-indicator {
            bottom: 20px;
            padding: 10px 20px;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </>
  );
}
