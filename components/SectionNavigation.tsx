import React, { useState, useEffect } from 'react';

interface SectionNavigationProps {
  sections: Array<{
    id: string;
    title: string;
  }>;
}

const SectionNavigation: React.FC<SectionNavigationProps> = ({ sections }) => {
  const [currentSection, setCurrentSection] = useState(0);

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
            setCurrentSection(i);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const goToSection = (index: number) => {
    if (index >= 0 && index < sections.length) {
      const element = document.getElementById(sections[index].id);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
  };

  const goToPrevious = () => {
    goToSection(currentSection - 1);
  };

  const goToNext = () => {
    goToSection(currentSection + 1);
  };

  return (
    <div className="section-navigation">
      {/* Previous Button */}
      {currentSection > 0 && (
        <button 
          className="nav-button nav-button-prev"
          onClick={goToPrevious}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="nav-icon">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"></path>
          </svg>
          <div className="nav-text">
            Previous
          </div>
        </button>
      )}

      {/* Next Button */}
      {currentSection < sections.length - 1 && (
        <button 
          className="nav-button nav-button-next"
          onClick={goToNext}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="nav-icon">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"></path>
          </svg>
          <div className="nav-text">
            Next
          </div>
        </button>
      )}

      <style jsx>{`
        .section-navigation {
          position: fixed;
          bottom: 3rem;
          left: 0;
          right: 0;
          display: flex;
          justify-content: space-between;
          padding: 0 3rem;
          z-index: 50;
          pointer-events: none;
        }

        .nav-button {
          background-color: transparent;
          color: #fff;
          width: 8.5em;
          height: 2.9em;
          border: #ffffff 0.2em solid;
          border-radius: 11px;
          text-align: right;
          transition: all 0.6s ease;
          cursor: pointer;
          pointer-events: auto;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .nav-button:hover {
          background-color: #ffffff;
          color: #000;
        }

        .nav-icon {
          width: 1.6em;
          position: absolute;
          left: 0.8em;
          top: 50%;
          transform: translateY(-50%);
          transition: all 0.6s ease;
        }

        .nav-button:hover .nav-icon {
          transform: translateY(-50%) translateX(5px);
        }

        .nav-button-prev:hover .nav-icon {
          transform: translateY(-50%) translateX(-5px);
        }

        .nav-text {
          margin-right: 1.5em;
          font-weight: 500;
        }

        .nav-button-prev {
          text-align: left;
        }

        .nav-button-prev .nav-icon {
          right: 0.8em;
          left: auto;
        }

        .nav-button-prev .nav-text {
          margin-left: 1.5em;
          margin-right: 0;
        }

        @media (max-width: 768px) {
          .section-navigation {
            padding: 0 1rem;
            bottom: 2rem;
          }

          .nav-button {
            width: 6em;
            height: 2.5em;
            font-size: 0.9rem;
          }

          .nav-icon {
            width: 1.2em;
          }
        }
      `}</style>
    </div>
  );
};

export default SectionNavigation;
