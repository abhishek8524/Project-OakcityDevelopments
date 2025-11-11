// src/app/core/models/site-content.ts
export interface NavLink { label: string; href: string; }
export interface Hero { title: string; subtitle: string; image: string; }
export interface Service { title: string; description?: string; icon?: string; }
export interface ValueProp { title: string; subtitle?: string; icon?: string; }
export interface About { heading: string; body: string; image: string; }
export interface ProjectImage { src: string; alt?: string; }
export interface Project { title: string; location?: string; images: ProjectImage[]; featured?: boolean; }
export interface Testimonial { quote: string; author: string; }
export interface ContactInfo { address: string; email: string; phone: string; }
export interface SiteContent {
  nav: NavLink[];
  hero: Hero;
  services: { items: Service[]; valueProps: ValueProp[]; ctaLabel?: string; };
  about: About;
  projects: Project[];
  testimonials: Testimonial[];
  contact: ContactInfo;
  
}
export interface Certification { name: string; logo: string; url?: string; }

export interface SiteContent {
 
  certifications?: Certification[]; 
}
export interface SocialLink { name: 'instagram'|'tiktok'|'facebook'|'email'|'phone'; url: string; }

export interface SiteContent {
  contact: ContactInfo;
  socials?: SocialLink[];
}

