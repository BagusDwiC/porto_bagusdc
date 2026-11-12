/**
 * Portfolio Data Configuration
 * Centralized data file in English for easy updates and personalization.
 */

export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  company: string;
  companyUrl?: string;
  description: string;
  technologies: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  githubUrl?: string;
  image: string;
  video?: string;
  featured?: boolean;
}

export interface SkillCategory {
  category: string;
  items: {
    name: string;
    level: string; // e.g. "Advanced", "Proficient"
    icon?: string;
  }[];
}

export interface SocialLink {
  label: string;
  url: string;
  icon: 'github' | 'linkedin' | 'instagram' | 'email';
}

export const PORTFOLIO_DATA = {
  profile: {
    name: "Bagus Dwi Cahya",
    role: "Junior Software Engineer | Data Analyst | IT Support",
    tagline: "I build responsive, data-driven web applications with Laravel and React.js, and design user-centered interfaces in Figma.",
    location: "East Jakarta, Indonesia",
    status: "Open to Junior Software Engineer, Data Analyst & IT Support opportunities",
    email: "bagusdwicahya84@gmail.com",
    phone: "+62 896-6531-1963",
    avatarUrl: "/photo.jpg",
  },

  about: {
    paragraphs: [
      "Junior Software Engineer and UI/UX Designer with 3+ years of hands-on experience in Laravel- and React.js-based web development and user-centered interface design. I have worked cross-functionally with development, marketing, and IT support teams to deliver scalable, responsive, data-driven digital solutions.",
      "I proactively leverage AI tools and automation (AI-assisted coding, workflow automation) to boost team efficiency by up to 30%. I have a solid foundation in Git/GitHub, RESTful APIs, SQL, and Agile methodology, combined with a strong learning mindset and a results-oriented approach.",
      "I graduated in Software Engineering (Rekayasa Perangkat Lunak) from SMK Negeri 1 Kota Bekasi, hold a BNSP Junior Coder certification, and work comfortably in both Indonesian (native) and English (professional working proficiency)."
    ]
  },

  navigation: [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" }
  ],

  experiences: [
    {
      id: "exp-1",
      period: "Sep 2025 — Dec 2025",
      role: "Junior Software Engineer / Digital Marketing Executive",
      company: "PT Mahaka Putra, Bekasi",
      description: "Developed and maintained responsive web applications with Laravel (MVC), HTML/CSS, and modern JavaScript (ES6+). Collaborated with developers, designers, and marketing to turn business requirements into technical solutions, designed UI/UX in Figma, and used AI tools for coding, debugging, documentation, content generation, and workflow automation. Optimized website performance, SEO, and engagement with Google Analytics, and created marketing visuals and social media content.",
      technologies: ["Laravel", "JavaScript", "Figma", "Google Analytics", "SEO", "AI Tools"]
    },
    {
      id: "exp-2",
      period: "Jul 2024 — Dec 2024",
      role: "IT Support and Programming Intern",
      company: "Mosanada Facilities Management Services, Doha, Qatar",
      description: "Performed routine maintenance and troubleshooting of company computers, networks, and internal systems. Helped manage the corporate ERP system and tracked electronic assets. Built mini web applications for internal dashboards, including an IT Performance Dashboard in React.js to monitor IT team performance in real time, backed by SQL database design.",
      technologies: ["React.js", "SQL", "ERP", "Troubleshooting", "Networking"]
    }
  ] as ExperienceItem[],

  projects: [
    {
      id: "proj-1",
      title: "Infinite Post Production",
      description: "A cinematic company website for a premium post-production house, featuring a full-screen hero, showreel call-to-action, and sections for services, studio, equipment rental, and clients.",
      technologies: ["React.js", "Next.js", "Tailwind CSS", "Responsive Design", "SEO"],
      image: "/project-infinite.png",
      featured: true
    },
    {
      id: "proj-2",
      title: "ArenaPlus — Court Booking Platform",
      description: "A real-time sports court booking platform for padel, futsal, badminton, and mini soccer courts across Jakarta, Bandung, and Bekasi, with a shared data layer syncing the customer and admin views.",
      technologies: ["React.js", "Tailwind CSS", "REST API", "Dark Mode", "Admin Dashboard"],
      image: "/project-arenaplus.png",
      featured: true
    },
    {
      id: "proj-3",
      title: "BOX — Nightclub, EDM & Hip Hop",
      description: "An immersive, motion-rich website for a nightclub with EDM and hip hop events, focused on bold visuals, smooth animations, and a mobile-first layout.",
      technologies: ["React.js", "Tailwind CSS", "Animation", "Mobile-first"],
      image: "",
      video: "/project-box.mp4",
      featured: true
    }
  ] as ProjectItem[],

  skills: [
    {
      category: "UI/UX Design & Prototyping",
      items: [
        { name: "Figma", level: "Advanced" },
        { name: "Wireframing & Prototyping", level: "Advanced" },
        { name: "Responsive / Mobile-first Design", level: "Advanced" },
        { name: "User Research & Usability Testing", level: "Beginner" },
        { name: "Design Systems", level: "Beginner" }
      ]
    },
    {
      category: "Web Development",
      items: [
        { name: "HTML5, CSS3 & JavaScript (ES6+)", level: "Advanced" },
        { name: "React.js & Next.js", level: "Advanced" },
        { name: "Laravel (MVC)", level: "Advanced" },
        { name: "Tailwind CSS", level: "Advanced" },
        { name: "RESTful API", level: "Beginner" },
        { name: "WordPress & Vercel Deployment", level: "Beginner" }
      ]
    },
    {
      category: "Data & Analytics",
      items: [
        { name: "SQL & Database Design", level: "Beginner" },
        { name: "Google Analytics", level: "Beginner" },
        { name: "A/B Testing & Campaign Analysis", level: "Beginner" },
        { name: "Data Visualization", level: "Beginner" },
        { name: "Excel & Google Sheets", level: "Advanced" }
      ]
    },
    {
      category: "Tools & Platform",
      items: [
        { name: "Git & GitHub", level: "Advanced" },
        { name: "Visual Studio Code & Postman", level: "Advanced" },
        { name: "ERP Systems", level: "Beginner" },
        { name: "AI Tools (ChatGPT, Copilot)", level: "Advanced" },
        { name: "Agile / Scrum Basics", level: "Beginner" }
      ]
    }
  ] as SkillCategory[],

  socials: [
    { label: "Email", url: "https://mail.google.com/mail/?view=cm&fs=1&to=bagusdwicahya84@gmail.com&su=Hello%20Bagus", icon: "email" }
  ] as SocialLink[]
};
