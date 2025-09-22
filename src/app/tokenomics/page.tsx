import { Flex, Meta, Schema, Heading, Text } from "@once-ui-system/core";
import TokenomicsBadge from "@/components/TokenomicsBadge";
import { baseURL, gallery, person } from "@/resources";
import styles from "./tokenomics.module.scss";

export async function generateMetadata() {
  return Meta.generate({
    title: gallery.title,
    description: gallery.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(gallery.title)}`,
    path: gallery.path,
  });
}

export default function Tokenomics() {
  return (
    <Flex maxWidth="l" direction="column" gap="12" paddingY="8" style={{ minHeight: 'calc(100vh - 220px)', overflow: 'hidden', justifyContent: 'flex-start' }}>
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={gallery.title}
        description={gallery.description}
        path={gallery.path}
        image={`/api/og/generate?title=${encodeURIComponent(gallery.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${gallery.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      
      <Flex direction="column" gap="8" paddingX="8" style={{ alignItems: 'center', marginTop: -8 }}>
        <TokenomicsBadge />
        {/* Formula box above cards */}
        <div className={styles.formulaBox}>
          <div className={styles.formulaHead}>
            <div className={styles.formulaStatus}>pricing</div>
          </div>
          <div className={styles.formulaBody}>
            <span className={styles.formulaLine}>Token Price = base + α × total_supply + β × total_used</span>
          </div>
        </div>

        {/* Single wide card with two columns: Mechanics | Interpretation */}
        <div className={styles.cardWide}>
          <div className={styles.col}>
            <div className={styles.title}>Mechanics</div>
            <div className={styles.body}>
              <div style={{ marginBottom: 6 }}>
                <strong>base</strong> is the minimum price floor — the lowest possible price of the token, ensuring stability.
              </div>
              <div style={{ marginBottom: 6 }}>
                <strong>α</strong> controls the price increase per newly minted token — representing buying pressure and supply-driven inflation.
              </div>
              <div>
                <strong>β</strong> controls the price increase per token used — rewarding real utility and deflation through actual usage (e.g., sending messages, generating content).
              </div>
            </div>
          </div>
          <div className={styles.col}>
            <div className={styles.title}>Interpretation</div>
            <div className={styles.body}>
              <div style={{ marginBottom: 6 }}>
                As more tokens are purchased, the price gradually increases based on the total supply (scaled by α).
              </div>
              <div style={{ marginBottom: 6 }}>
                As tokens are burned through usage, the price also increases (scaled by β), reflecting real demand and usage-driven scarcity.
              </div>
              <div>
                The pricing model blends speculative growth (supply) with utility-driven growth (burn).
              </div>
            </div>
          </div>
        </div>
      </Flex>
    </Flex>
  );
}
