import { Flex, Meta, Schema, Heading, Text } from "@once-ui-system/core";
import TokenomicsBadge from "@/components/TokenomicsBadge";
import { baseURL, gallery, person } from "@/resources";

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
        
        <Flex direction="column" style={{ maxWidth: 680, gap: 6 }}>
          <Text variant="display-strong-xs" style={{ fontFamily: 'monospace', fontSize: '1.05rem', textAlign: 'center' }}>
            Token Price = base + α × total_supply + β × total_used
          </Text>
          
          <Text variant="body-default-m" style={{ fontWeight: 'bold', textAlign: 'center' }}>
            Where:
          </Text>
          
          <Flex direction="column" style={{ paddingLeft: 8, paddingRight: 8, gap: 6 }}>
            <Text variant="body-default-s">
              <strong>base</strong> is the minimum price floor — the lowest possible price of the token, ensuring stability.
            </Text>
            
            <Text variant="body-default-s">
              <strong>α</strong> controls the price increase per newly minted token — representing buying pressure and supply-driven inflation.
            </Text>
            
            <Text variant="body-default-s">
              <strong>β</strong> controls the price increase per token used — rewarding real utility and deflation through actual usage (e.g., sending messages, generating content).
            </Text>
          </Flex>
          
          <Text variant="body-default-m" style={{ fontWeight: 'bold', textAlign: 'center' }}>
            Interpretation:
          </Text>
          
          <Flex direction="column" style={{ paddingLeft: 8, paddingRight: 8, gap: 6 }}>
            <Text variant="body-default-s">
              As more tokens are purchased, the price gradually increases based on the total supply (scaled by α).
            </Text>
            
            <Text variant="body-default-s">
              As tokens are burned through usage, the price also increases (scaled by β), reflecting real demand and usage-driven scarcity.
            </Text>
            
            <Text variant="body-default-s">
              The pricing model blends speculative growth (supply) with utility-driven growth (burn).
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
