import {
  DataStyleConfig,
  DisplayConfig,
  EffectsConfig,
  FontsConfig,
  MailchimpConfig,
  ProtectedRoutesConfig,
  RoutesConfig,
  SameAsConfig,
  SchemaConfig,
  SocialSharingConfig,
  StyleConfig,
} from "@/types";
import { home } from "./index";

// Project base URL for OG/meta (production domain)
const baseURL: string = "https://www.neurosphere.trade";

const routes: RoutesConfig = {
  "/": true,
  "/about": true,
  "/why-neurosphere": true,
  "/blog": false,
  "/tokenomics": true,
  "/find-out-how": true,
};

const display: DisplayConfig = {
  location: false,
  time: false,
  themeSwitcher: true,
};

const protectedRoutes: ProtectedRoutesConfig = {
  "/work/automate-design-handovers-with-a-figma-to-code-pipeline": true,
};

import { Geist } from "next/font/google";
import { Geist_Mono } from "next/font/google";

const heading = Geist({ variable: "--font-heading", subsets: ["latin"], display: "swap" });
const body = Geist({ variable: "--font-body", subsets: ["latin"], display: "swap" });
const label = Geist({ variable: "--font-label", subsets: ["latin"], display: "swap" });
const code = Geist_Mono({ variable: "--font-code", subsets: ["latin"], display: "swap" });

const fonts: FontsConfig = { heading, body, label, code };

const style: StyleConfig = {
  theme: "system",
  neutral: "gray",
  brand: "violet",
  accent: "blue",
  solid: "contrast",
  solidStyle: "flat",
  border: "playful",
  surface: "translucent",
  transition: "all",
  scaling: "100",
};

const dataStyle: DataStyleConfig = {
  variant: "gradient",
  mode: "categorical",
  height: 24,
  axis: { stroke: "var(--neutral-alpha-weak)" },
  tick: { fill: "var(--neutral-on-background-weak)", fontSize: 11, line: false },
};

const effects: EffectsConfig = {
  mask: { cursor: false, x: 50, y: 0, radius: 100 },
  gradient: { display: false, opacity: 100, x: 50, y: 60, width: 100, height: 50, tilt: 0, colorStart: "accent-background-strong", colorEnd: "page-background" },
  dots: { display: false, opacity: 40, size: "2", color: "brand-background-strong" },
  grid: { display: false, opacity: 100, color: "neutral-alpha-medium", width: "0.25rem", height: "0.25rem" },
  lines: { display: false, opacity: 100, color: "neutral-alpha-weak", size: "16", thickness: 1, angle: 45 },
};

const mailchimp: MailchimpConfig = {
  action: "https://url/subscribe/post?parameters",
  effects: {
    mask: { cursor: true, x: 50, y: 0, radius: 100 },
    gradient: { display: true, opacity: 90, x: 50, y: 0, width: 50, height: 50, tilt: 0, colorStart: "accent-background-strong", colorEnd: "static-transparent" },
    dots: { display: true, opacity: 20, size: "2", color: "brand-on-background-weak" },
    grid: { display: false, opacity: 100, color: "neutral-alpha-medium", width: "0.25rem", height: "0.25rem" },
    lines: { display: false, opacity: 100, color: "neutral-alpha-medium", size: "16", thickness: 1, angle: 90 },
  },
};

const schema: SchemaConfig = {
  logo: "/logonobg.png",
  type: "Organization",
  name: "NeuroSphere",
  description: home.description,
  email: "contact@neurosphere.ai",
};

const sameAs: SameAsConfig = { threads: "", linkedin: "", discord: "" };

const socialSharing: SocialSharingConfig = {
  display: true,
  platforms: { x: true, linkedin: true, facebook: false, pinterest: false, whatsapp: false, reddit: false, telegram: false, email: true, copyLink: true },
};

export { display, mailchimp, routes, protectedRoutes, baseURL, fonts, style, schema, sameAs, socialSharing, effects, dataStyle };

