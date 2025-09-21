"use client";

import { Button, Column, Text } from "@once-ui-system/core";
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
      <Column horizontal="center" gap="s" paddingY="l">
        <Button
          variant="ghost"
          size="m"
          onClick={handleScrollDown}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            padding: '16px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '50px',
            background: 'transparent',
            color: 'inherit',
            transition: 'all 0.3s ease'
          }}
        >
          <Text variant="body-default-s">Scroll to see more</Text>
          <div style={{
            fontSize: '20px',
            animation: 'bounce 2s infinite'
          }}>
            ↓
          </div>
        </Button>
      </Column>
    </RevealFx>
  );
};
