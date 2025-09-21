"use client";

import { Column } from "@once-ui-system/core";
import { RevealFx } from "@once-ui-system/core";

export const ScrollDownButton: React.FC = () => {
  const handleScrollDown = () => {
    document.getElementById('hands-section')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

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
              <path d="M11.9997 13.1716L7.04996 8.22186L5.63574 9.63607L11.9997 16L18.3637 9.63607L16.9495 8.22186L11.9997 13.1716Z" fill="rgba(255,255,255,0.8)">
              </path>
            </svg>
          </div>
          <span className="main__scroll-text" style={{
            color: 'rgba(255,255,255,0.8)',
            fontSize: '14px',
            fontWeight: '500'
          }}>Scroll</span>
        </a>
      </div>
    </RevealFx>
  );
};
