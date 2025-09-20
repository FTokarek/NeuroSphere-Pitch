import React from "react";
import { Column, Row } from "@once-ui-system/core";
import { NeuroSphereCard } from "./NeuroSphereCard";
import styles from "./NeuroSphereCards.module.scss";

export const NeuroSphereCards: React.FC = () => {
  return (
    <Column gap="xl" paddingY="l" className={styles.container}>
      <Row gap="l" s={{ direction: "column" }} className={styles.cardsRow}>
        <NeuroSphereCard
          title="Open Platform"
          description="NeuroSphere is an open, interactive platform that bridges artificial intelligence with blockchain analytics. Our mission is to make advanced tools for exploring cryptocurrency transactions accessible to everyone — from researchers and students to developers and startups."
        />
        
        <NeuroSphereCard
          title="Advanced Analytics"
          description="By combining data exploration, address classification, anomaly detection, and time-series forecasting, Neurosphere transforms raw blockchain data into actionable insights. We created this project to promote transparency, empower innovation, and move beyond artificial benchmarks toward real-world applications."
        />
        
        <NeuroSphereCard
          title="For Everyone"
          description="Neurosphere is for anyone curious about the hidden patterns of Bitcoin and Ethereum networks — whether you're an AI enthusiast, a data scientist, or a builder shaping the future of Web3."
        />
      </Row>
    </Column>
  );
};
