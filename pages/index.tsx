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
  return (
    <>
      <Head>
        <title>NeuroSphere - Pitch Presentation</title>
        <meta name="description" content="NeuroSphere - Zaawansowana technologia przyszłości" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="relative">
        {/* Navigation */}
        {/* <Navbar sections={sections} /> */}

        {/* Page Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Section 1 */}
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

          {/* Section 2 */}
          <Section
            id="section2"
            title=""
            backgroundColor="bg-black"
            backgroundComponent={<FractalGlassBackground />}
          />

          {/* Section 3 */}
          <Section
            id="section3"
            title=""
            backgroundColor="bg-black"
          />

          {/* Section 4 */}
          <Section
            id="section4"
            title=""
            backgroundColor="bg-black"
          />

          {/* Section 5 */}
          <Section
            id="section5"
            title=""
            backgroundColor="bg-black"
          />

          {/* Section 6 */}
          <Section
            id="section6"
            title=""
            backgroundColor="bg-black"
          />

          {/* Section 7 */}
          <Section
            id="section7"
            title=""
            backgroundColor="bg-black"
          />

          {/* Section 8 */}
          <Section
            id="section8"
            title=""
            backgroundColor="bg-black"
          />

          {/* Section 9 */}
          <Section
            id="section9"
            title=""
            backgroundColor="bg-black"
          />

          {/* Section 10 */}
          <Section
            id="section10"
            title=""
            backgroundColor="bg-black"
          />
        </motion.div>

        {/* Vertical Navigation */}
        <VerticalNavigation sections={sections} />
      </main>
    </>
  );
}
