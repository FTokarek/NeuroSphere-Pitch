import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface VerticalNavigationProps {
  sections: Array<{
    id: string;
    title: string;
  }>;
}

const VerticalNavigation: React.FC<VerticalNavigationProps> = ({ sections }) => {
  const [activeSection, setActiveSection] = useState('section1');

  useEffect(() => {
    const handleScroll = () => {
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
    <div className="vertical-navigation">
      {sections.map((section, index) => (
        <motion.button
          key={section.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => scrollToSection(section.id)}
          className={`nav-item ${activeSection === section.id ? 'active' : ''}`}
        >
          {section.title}
        </motion.button>
      ))}

      <style jsx>{`
        .vertical-navigation {
          position: fixed;
          right: 2rem;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          z-index: 50;
        }

        .nav-item {
          width: 140px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          text-transform: uppercase;
          letter-spacing: 1px;
          border: none;
          position: relative;
          background-color: transparent;
          transition: .2s cubic-bezier(0.19, 1, 0.22, 1);
          opacity: 0.6;
          color: white;
          font-size: 0.9rem;
          cursor: pointer;
          padding-left: 0.5rem;
          text-align: left;
          font-family: 'Arial', sans-serif;
        }

        .nav-item::after {
          content: '';
          border-bottom: 3px solid white;
          width: 0;
          height: 100%;
          position: absolute;
          margin-top: -5px;
          top: 0;
          left: 5px;
          visibility: hidden;
          opacity: 1;
          transition: .2s linear;
        }

        .nav-item:hover::after {
          visibility: visible;
          opacity: 0.7;
          width: 90%;
        }

        .nav-item:hover {
          letter-spacing: 2px;
          opacity: 1;
        }

        .nav-item.active {
          opacity: 1;
          font-weight: 600;
        }

        .nav-item.active::after {
          visibility: visible;
          opacity: 1;
          width: 90%;
          border-bottom: 3px solid white;
        }

        @media (max-width: 768px) {
          .vertical-navigation {
            right: 1rem;
            gap: 0.2rem;
          }

          .nav-item {
            width: 120px;
            height: 35px;
            font-size: 0.8rem;
          }
        }

        @media (max-width: 480px) {
          .vertical-navigation {
            right: 0.5rem;
          }

          .nav-item {
            width: 100px;
            height: 30px;
            font-size: 0.7rem;
          }
        }
      `}</style>
    </div>
  );
};

export default VerticalNavigation;
