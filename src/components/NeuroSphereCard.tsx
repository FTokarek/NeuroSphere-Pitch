"use client";

import React, { useRef, useEffect } from "react";
import styles from "./NeuroSphereCard.module.scss";

interface NeuroSphereCardProps {
  title: string;
  description: string;
  className?: string;
}

export const NeuroSphereCard: React.FC<NeuroSphereCardProps> = ({ 
  title, 
  description, 
  className = "" 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const glow = glowRef.current;

    if (!card || !glow) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--x', `${x}px`);
      card.style.setProperty('--y', `${y}px`);

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * 10;
      const rotateY = ((x - centerX) / centerX) * -10;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

      const angle = 135 + rotateX - rotateY;
      card.style.setProperty('--angle', `${angle}deg`);
    };

    const handleMouseLeave = () => {
      card.style.transform = `rotateX(0deg) rotateY(0deg)`;
      card.style.setProperty('--angle', `135deg`);
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className={`${styles.cardContainer} ${className}`}>
      <div ref={cardRef} className={styles.card}>
        <h2 className={styles.cardTitle}>{title}</h2>
        <p className={styles.cardDescription}>{description}</p>
        <div ref={glowRef} className={styles.glow}></div>
      </div>
    </div>
  );
};
