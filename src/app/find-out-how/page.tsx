import {
  Column,
  Heading,
  Text,
  Meta,
  Schema,
} from "@once-ui-system/core";
import { baseURL } from "@/resources";

export async function generateMetadata() {
  return Meta.generate({
    title: "Find Out How - NeuroSphere",
    description: "Discover how NeuroSphere bridges artificial intelligence with blockchain analytics to make advanced tools accessible to everyone.",
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent("Find Out How - NeuroSphere")}`,
    path: "/find-out-how",
  });
}

export default function FindOutHow() {
  return (
    <Column maxWidth="m" gap="xl" paddingY="xl" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title="Find Out How - NeuroSphere"
        description="Discover how NeuroSphere bridges artificial intelligence with blockchain analytics to make advanced tools accessible to everyone."
        path="/find-out-how"
        image={`/api/og/generate?title=${encodeURIComponent("Find Out How - NeuroSphere")}`}
      />
      
      <Column fillWidth gap="l" paddingX="l">
        <Heading variant="display-strong-xl" wrap="balance">
          Find Out How
        </Heading>
        
        <Column gap="m" textVariant="body-default-l">
          <Text>
            NeuroSphere is an open, interactive platform that bridges artificial intelligence with blockchain analytics. Our mission is to make advanced tools for exploring cryptocurrency transactions accessible to everyone — from researchers and students to developers and startups.
          </Text>
          
          <Text>
            By combining data exploration, address classification, anomaly detection, and time-series forecasting, NeuroSphere transforms raw blockchain data into actionable insights. We created this project to promote transparency, empower innovation, and move beyond artificial benchmarks toward real-world applications.
          </Text>
          
          <Text>
            NeuroSphere is for anyone curious about the hidden patterns of Bitcoin and Ethereum networks — whether you're an AI enthusiast, a data scientist, or a builder shaping the future of Web3.
          </Text>
        </Column>
      </Column>
    </Column>
  );
}
