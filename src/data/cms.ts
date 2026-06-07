import { HeroData, ServiceItem, AboutData, ProjectItem, ProcessStep, TestimonialData } from "../types";

export const heroData: HeroData = {
  label: "DESIGN CONSULTANCY",
  headline: "We design brands that mean something.",
  subtext: "Design consultancy & brand strategy — built in Figma, built for impact.",
};

export const servicesData: ServiceItem[] = [
  {
    id: "s1",
    title: "Brand Identity",
    description: "Logos, color palettes, typographic guidelines & comprehensive visual directions that endure.",
  },
  {
    id: "s2",
    title: "UI/UX Design",
    description: "Figma-first product blueprints, modern responsive websites, and elegant mobile interfaces.",
  },
  {
    id: "s3",
    title: "Design Consulting",
    description: "Strategic advisory for aligning your visual brand with commercial and business goals.",
  },
  {
    id: "s4",
    title: "Design Systems",
    description: "Scalable component libraries built inside Figma with flawless Auto-Layout and variables.",
  }
];

export const aboutData: AboutData = {
  headline: "Design is not decoration. It's communication.",
  body: "At pandx, we bypass the decoration process to focus entirely on visual communication. We design high-performance identities and interfaces that communicate trust, precision, and authority. Our entire methodology lives in Figma — allowing fast-moving teams to collaborate with us in real-time.",
};

export const projectsData: ProjectItem[] = [
  {
    id: "p1",
    title: "Aura Ledger",
    category: "Visual Identity & Web",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "p2",
    title: "Vex Design System",
    category: "Figma Architecture",
    image: "https://images.unsplash.com/photo-1541462608141-2f58c6e68e5d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "p3",
    title: "Nova Wearable",
    category: "Product UI/UX",
    image: "https://images.unsplash.com/photo-1618005198143-e5283b519a7f?auto=format&fit=crop&w=800&q=80",
  }
];

export const processSteps: ProcessStep[] = [
  {
    id: "pr1",
    number: "01",
    title: "Discover",
    description: "We audit your existing assets, research competitor landscapes, and define the core thesis of your visual communication.",
  },
  {
    id: "pr2",
    number: "02",
    title: "Define",
    description: "Establishing standard layout structures, typographical hierarchies, and general branding frameworks before designing.",
  },
  {
    id: "pr3",
    number: "03",
    title: "Design",
    description: "Iteratively building premium hi-fidelity visual mockups, Figma auto-layouts, and design elements inside our unified canvas.",
  },
  {
    id: "pr4",
    number: "04",
    title: "Deliver",
    description: "Supplying fully tokenized Figma files, design tokens, ready-to-code guides, and asset packages prepared for development.",
  }
];

export const testimonialData: TestimonialData = {
  quote: "pandx didn't just design our brand — they defined it.",
  attribution: "Marcus Thorne, Founder of Aura Technologies",
};
