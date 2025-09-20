"use client";

import React from 'react';
import { GLSLHillsBackground } from './GLSLHillsBackground';
import { useTheme } from '@/hooks/useTheme';

export const GLSLHillsWrapper: React.FC = () => {
  const isDarkMode = useTheme();
  
  return <GLSLHillsBackground isDarkMode={isDarkMode} />;
};
