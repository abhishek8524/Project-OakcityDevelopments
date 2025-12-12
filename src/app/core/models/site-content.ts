// src/app/core/models/site-content.ts

// ===== NAVIGATION =====
/**
 * One link in the main navigation bar (e.g., "Home", "Services").
 */
export interface NavLink {
  label: string; // Text shown in the navbar
  href: string;  // Anchor id or URL (e.g., "#services")
}

// ===== HERO SECTION =====
/**
 * Content for the main hero banner at the top of the page.
 */
export interface Hero {
  title: string;    // Big heading text
  subtitle: string; // Small supporting text
  image: string;    // Image path for hero background / side image
}

// ===== SERVICES SECTION =====
/**
 * A single service item (e.g., "Custom Homes", "Renovations").
 */
export interface Service {
  title: string;         // Service name
  description?: string;  // Short description
  icon?: string;         // Optional icon (Material icon / FontAwesome class / image)
}

/**
 * A "value proposition" item (e.g., "On-time delivery", "Transparent pricing").
 */
export interface ValueProp {
  title: string;         // Short title
  subtitle?: string;     // Extra description
  icon?: string;         // Optional icon
}

// ===== ABOUT SECTION =====
/**
 * About section content describing the company.
 */
export interface About {
  heading: string; // Section title, e.g., "About OakCity Developments"
  body: string;    // Main paragraph text
  image: string;   // Image path (team / site photo)
}

// ===== PROJECTS SECTION =====
/**
 * One image for a project, used in carousels / galleries.
 */
export interface ProjectImage {
  src: string;   // Image path
  alt?: string;  // Alt text for accessibility
}

/**
 * One project entry for the Projects section.
 */
export interface Project {
  title?: string;           // Project name (optional because your JSON omits it)
  location?: string;        // Optional location (e.g., "Oakville, ON")
  images: ProjectImage[];   // One or more images
  featured?: boolean;       // Flag to highlight certain projects
  segment?: 'residential' | 'commercial';
}


// ===== TESTIMONIALS SECTION =====
/**
 * Client testimonial / review.
 */
export interface Testimonial {
  quote: string; // The review text
  author: string; // Name of the client
}

// ===== CONTACT & SOCIALS =====
/**
 * Contact information displayed on the site (footer + contact section).
 */
export interface ContactInfo {
  address: string;
  email: string;
  phone: string;
}

/**
 * Certifications logo + link (e.g., WSIB, licensed, etc.).
 */
export interface Certification {
  name: string; // Certification / association name
  logo: string; // Image path for logo
  url?: string; // Optional link to external site
}

/**
 * Social link (e.g., Instagram, TikTok, Email).
 * `name` is restricted to a known set so we can map icons easily.
 */
export interface SocialLink {
  name: 'instagram' | 'tiktok' | 'facebook' | 'email' | 'phone';
  url: string;
}

/**
 * ✅ MAIN SITE CONTENT INTERFACE
 * This combines everything into one structure that matches content.json.
 *
 * NOTE: In your original code, `SiteContent` was declared three times.
 * Here it's merged into ONE clean interface so TypeScript is happy.
 */
export interface SiteContent {
  nav: NavLink[];
  hero: Hero;
  services: {
    items: Service[];        // List of main services
    valueProps: ValueProp[]; // "Why choose us" bullet points
    ctaLabel?: string;       // Optional button label, e.g., "Get a quote"
  };
  about: About;
  projects: Project[];
  testimonials: Testimonial[];
  contact: ContactInfo;

  // OPTIONAL extras
  certifications?: Certification[]; // Used by CertificationsComponent
  socials?: SocialLink[];           // Used for footer/social icons
}
