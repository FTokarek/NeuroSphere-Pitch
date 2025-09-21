"use client";

import { Column } from "@once-ui-system/core";
import { RevealFx } from "@once-ui-system/core";
import { useEffect, useState } from "react";

export const ScrollDownButton: React.FC = () => {
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    // Check if light mode is active
    const checkTheme = () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light' ||
                     document.documentElement.classList.contains('light') ||
                     window.matchMedia('(prefers-color-scheme: light)').matches;
      setIsLightMode(isLight);
    };

    checkTheme();
    
    // Listen for theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    mediaQuery.addEventListener('change', checkTheme);
    
    // Listen for DOM changes (theme toggle)
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'class']
    });

    return () => {
      mediaQuery.removeEventListener('change', checkTheme);
      observer.disconnect();
    };
  }, []);

  const handleScrollDown = () => {
    document.getElementById('hands-section')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const textColor = isLightMode ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)';
  const iconColor = isLightMode ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)';

  return (
    <RevealFx translateY="16" delay={0.4}>
      <div className="main__action" style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        width: '100%',
        paddingTop: '40px',
        paddingBottom: '40px'
      }}>
        <a 
          className="main__scroll" 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            handleScrollDown();
          }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none',
            cursor: 'pointer'
          }}
        >
          <div className="main__scroll-box" style={{
            width: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: '20px', height: '20px' }}>
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path d="M11.9997 13.1716L7.04996 8.22186L5.63574 9.63607L11.9997 16L18.3637 9.63607L16.9495 8.22186L11.9997 13.1716Z" fill={iconColor}>
              </path>
            </svg>
          </div>
          <span className="main__scroll-text" style={{
            color: textColor,
            fontSize: '14px',
            fontWeight: '500'
          }}>Scroll</span>
        </a>
      </div>
    </RevealFx>
  );
};
