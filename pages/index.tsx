import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Section from '@/components/Section';
import RainbowZappersBackground from '@/components/RainbowZappersBackground';
import FractalGlassBackground from '@/components/FractalGlassBackground';
import GlassTextOverlay from '@/components/GlassTextOverlay';
import SectionNavigation from '@/components/SectionNavigation';
import VerticalNavigation from '@/components/VerticalNavigation';
import CoswarpShaderBackground from '@/components/CoswarpShaderBackground';
import ParticleLayersBackground from '@/components/ParticleLayersBackground';
import SectionLoader from '@/components/SectionLoader';

const sections = [
  { id: 'section1', title: 'Page 1' },
  { id: 'section2', title: 'Page 2' },
  { id: 'section3', title: 'Page 3' },
  { id: 'section4', title: 'Page 4' },
  { id: 'section5', title: 'Page 5' },
  { id: 'section6', title: 'Page 6' },
  { id: 'section7', title: 'Page 7' },
  { id: 'section8', title: 'Page 8' },
  { id: 'section9', title: 'Page 9' },
  { id: 'section10', title: 'Page 10' },
];

export default function Home() {
  const [isLoading, setIsLoading] = React.useState(true); // Start with loading on page load
  const [loadingTimeout, setLoadingTimeout] = React.useState<NodeJS.Timeout | null>(null);
  const [currentSection, setCurrentSection] = React.useState('section1');
  const [isInitialLoad, setIsInitialLoad] = React.useState(true); // Track if this is the first load

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
        
        {/* Navigation */}
        <Navbar sections={sections} onSectionChange={handleSectionChange} isLoading={isLoading} />

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
    </>
  );
}
