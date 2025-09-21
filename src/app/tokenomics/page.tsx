import { Flex, Meta, Schema, Heading, Text } from "@once-ui-system/core";
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
    <Flex maxWidth="l" direction="column" gap="32" paddingY="32">
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
      
      <Flex direction="column" gap="24" paddingX="20">
        <Heading variant="display-strong-s">
          Tokenomics
        </Heading>
        
        <Flex direction="column" gap="16">
          <Text variant="display-strong-xs" style={{ fontFamily: 'monospace', fontSize: '1.5rem' }}>
            Token Price = base + α × total_supply + β × total_used
          </Text>
          
          <Text variant="body-default-l" style={{ fontWeight: 'bold' }}>
            Where:
          </Text>
          
          <Flex direction="column" gap="12" paddingLeft="16">
            <Text variant="body-default-m">
              <strong>base</strong> is the minimum price floor — the lowest possible price of the token, ensuring stability.
            </Text>
            
            <Text variant="body-default-m">
              <strong>α</strong> controls the price increase per newly minted token — representing buying pressure and supply-driven inflation.
            </Text>
            
            <Text variant="body-default-m">
              <strong>β</strong> controls the price increase per token used — rewarding real utility and deflation through actual usage (e.g., sending messages, generating content).
            </Text>
          </Flex>
          
          <Text variant="body-default-l" style={{ fontWeight: 'bold' }}>
            Interpretation:
          </Text>
          
          <Flex direction="column" gap="12" paddingLeft="16">
            <Text variant="body-default-m">
              As more tokens are purchased, the price gradually increases based on the total supply (scaled by α).
            </Text>
            
            <Text variant="body-default-m">
              As tokens are burned through usage, the price also increases (scaled by β), reflecting real demand and usage-driven scarcity.
            </Text>
            
            <Text variant="body-default-m">
              The pricing model blends speculative growth (supply) with utility-driven growth (burn).
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
