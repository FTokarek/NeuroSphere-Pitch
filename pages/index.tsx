import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Section from '@/components/Section';
import RainbowZappersBackground from '@/components/RainbowZappersBackground';

const sections = [
  { id: 'section1', title: 'Sekcja 1' },
  { id: 'section2', title: 'Sekcja 2' },
  { id: 'section3', title: 'Sekcja 3' },
  { id: 'section4', title: 'Sekcja 4' },
  { id: 'section5', title: 'Sekcja 5' },
  { id: 'section6', title: 'Sekcja 6' },
  { id: 'section7', title: 'Sekcja 7' },
  { id: 'section8', title: 'Sekcja 8' },
  { id: 'section9', title: 'Sekcja 9' },
  { id: 'section10', title: 'Sekcja 10' },
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
        <Navbar sections={sections} />

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
            backgroundComponent={<RainbowZappersBackground />}
          />

          {/* Section 2 */}
          <Section
            id="section2"
            title=""
            backgroundColor="bg-black"
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
      </main>
    </>
  );
}
