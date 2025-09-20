import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface NavbarProps {
  sections: Array<{
    id: string;
    title: string;
  }>;
}

const Navbar: React.FC<NavbarProps> = ({ sections }) => {
  const [activeSection, setActiveSection] = useState('section1');

  useEffect(() => {
    const handleScroll = () => {
      // Update active section based on scroll position
      const sectionElements = sections.map(section => 
        document.getElementById(section.id)
      );

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const element = sectionElements[i];
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2) {
            setActiveSection(sections[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: 'transparent',
        backdropFilter: 'none',
      }}
    >
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Navigation Buttons */}
              <div className="flex justify-center w-full space-x-2">
                {sections.map((section, index) => (
                  <motion.button
                    key={section.id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    onClick={() => scrollToSection(section.id)}
                    className={`
                      nav-button px-4 py-2 rounded-lg text-sm font-medium text-white
                      backdrop-blur-sm border border-white/30
                      ${activeSection === section.id ? 'nav-active bg-white/20' : 'bg-white/10'}
                    `}
                  >
                    {section.title}
                  </motion.button>
                ))}
              </div>

            </div>
          </div>
        </motion.nav>
  );
};

export default Navbar;
