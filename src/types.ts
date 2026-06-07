export interface ServiceItem {
  id: string;
  title: string;
  description: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  image: string;
}

export interface ProcessStep {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface TestimonialData {
  quote: string;
  attribution: string;
}

export interface HeroData {
  label: string;
  headline: string;
  subtext: string;
}

export interface AboutData {
  headline: string;
  body: string;
}

export interface ContactSubmission {
  name: string;
  email: string;
  company?: string;
  message: string;
}
