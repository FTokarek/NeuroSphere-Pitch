import { Column, Heading, Meta, Schema, Text } from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";
import cardStyles from "../tokenomics/tokenomics.module.scss";

export async function generateMetadata() {
  return Meta.generate({
    title: work.title,
    description: work.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(work.title)}`,
    path: work.path,
  });
}

export default function Work() {
  return (
    <Column maxWidth="m" paddingTop="4" paddingBottom="4">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={work.path}
        title={work.title}
        description={work.description}
        image={`/api/og/generate?title=${encodeURIComponent(work.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      {/* Card styled like tokenomics */}
      <div className={cardStyles.card} style={{ maxWidth: 760, width: '100%', marginInline: 'auto', marginTop: -16, transform: 'scale(0.92)', transformOrigin: 'center', marginBottom: -8, padding: 12 }}>
        <div className={cardStyles.title} style={{ marginBottom: 6 }}>WHY NEUROSPHERE</div>
        <div className={cardStyles.body} style={{ lineHeight: 1.35 }}>
          <div style={{ marginBottom: 8 }}>
            <strong>Pioneering the Future of AI & Blockchain</strong>
            <div>
              NeuroSphere bridges the gap between artificial intelligence and decentralized finance.
            </div>
            <div>
              Our platform empowers creators and businesses to publish, monetize, and speculate on fine-tuned AI models and prompts in a secure, transparent, and scalable way.
            </div>
          </div>
          <div style={{ marginBottom: 8 }}>
            <strong>Real Utility for Creators and Investors</strong>
            <ul style={{ paddingLeft: 18, marginTop: 6 }}>
              <li>On-chain Infrastructure: Every model and transaction is verifiable on the blockchain.</li>
              <li>Direct Monetization: No middlemen – creators earn directly from their work.</li>
              <li>Speculation & Investment: Investors can back AI projects early and trade their positions.</li>
            </ul>
          </div>
          <div style={{ marginBottom: 8 }}>
            <strong>Trust Through Transparency</strong>
            <div>
              We leverage smart contracts and Solana’s high-speed network to ensure low fees, fast settlement, and immutable records of all interactions.
            </div>
          </div>
          <div style={{ marginBottom: 8 }}>
            <strong>Community-Driven Innovation</strong>
            <div>
              NeuroSphere isn’t just a platform it’s an ecosystem.
              Developers, AI researchers, investors and enthusiasts collaborate to shape the future of decentralized AI.
            </div>
          </div>
          <div style={{ marginBottom: 8 }}>
            <strong>Why Choose Us</strong>
            <ul style={{ paddingLeft: 18, marginTop: 6 }}>
              <li>Cutting-edge tech stack (AI + Web3)</li>
              <li>Transparent, decentralized and secure</li>
              <li>Built for scalability and long-term growth</li>
              <li>Empowering both creators and investors</li>
            </ul>
          </div>
          <div style={{ fontStyle: 'italic' }}>
            “NeuroSphere redefines trust and ownership in the AI economy.”
            <br />
            Join us and be part of the next revolution.
          </div>
        </div>
      </div>
    </Column>
  );
}
