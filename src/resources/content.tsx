import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Logo, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Selene",
  lastName: "Yu",
  name: `-`,
  role: "Design Engineer",
  avatar: "/images/avatar.jpg",
  email: "example@gmail.com",
  location: "Europe/Warsaw",
  languages: ["English", "Bahasa"], // optional: Leave the array empty if you don't want to display languages
};

const person2: Person = {
  firstName: "Filip",
  lastName: "Malejki",
  name: `Filip Malejki`,
  role: "Founder & Backend Developer",
  avatar: "/images/avatar.jpg",
  email: "filip.malejki@example.com",
  location: "Poland",
  languages: [],
  github: "https://github.com/FMalejki",
  linkedin: "https://www.linkedin.com/in/filip-malejki-832474289/",
  twitter: "https://x.com/Philip_MBc",
  telegram: "@Malejki",
};

const person3: Person = {
  firstName: "Franciszek",
  lastName: "Tokarek",
  name: `Franciszek Tokarek`,
  role: "Co-Founder & Full-Stack Developer",
  avatar: "/images/avatar.jpg",
  email: "franciszek.tokarek@example.com",
  location: "Poland",
  languages: [],
  github: "https://github.com/ftokarek",
  linkedin: "https://www.linkedin.com/in/franciszektokarek/",
  twitter: "https://x.com/f_tokarek",
  telegram: "@franciszektokarek",
};

const person4: Person = {
  firstName: "Filip",
  lastName: "Sokołowski",
  name: `Filip Sokołowski`,
  role: "Backend Developer",
  avatar: "/images/avatar.jpg",
  email: "filip.sokolowski@example.com",
  location: "Poland",
  languages: [],
  github: "https://github.com/Sok205",
  linkedin: "https://www.linkedin.com/in/filip-soko%C5%82owski-a2666b333/",
  twitter: "https://x.com/sok205",
  telegram: "@sok2054",
};

const newsletter: Newsletter = {
  display: false,
  title: <></>,
  description: <></>,
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "GitHub",
    icon: "github",
    link: "=",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/company/once-ui/",
  },
  {
    name: "X",
    icon: "X",
    link: "https://www.threads.com/@once_ui",
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home", 
  title: "NeuroSphere",
  description: "Decentralized AI marketplace on Solana. Publish, monetize & trade fine-tuned LLMs and prompts. Build. Sell. Invest. Own the future.",
  headline: <>Decentralized AI marketplace on Solana</>,
  featured: {
    display: true,
    title: (
      <img 
        src="/logonobg.png" 
        alt="NeuroSphere" 
        style={{ 
          height: "160px", 
          width: "auto"
        }} 
      />
    ),
    href: "",
  },
  subline: (
    <>
      Publish, monetize & trade fine-tuned LLMs and prompts.
      <br /> Build. Sell. Invest. Own the future.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "Team",
  title: "About Us",
  description: "Meet the brilliant minds behind NeuroSphere - our talented design engineering team",
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com",
  },
  intro: {
    display: false,
    title: "---",
    description: (
      <>
        -
      </>
    ),
  },
  work: {
    display: false, // set to false to hide this section
    title: "Work Experience",
    experiences: [],
  },
  studies: {
    display: false, // set to false to hide this section
    title: "Studies",
    institutions: [],
  },
  technical: {
    display: false, // set to false to hide this section
    title: "Technical skills",
    skills: [],
  },
};

const about2: About = {
  path: "/about2",
  label: "About",
  title: `About – ${person2.name}`,
  description: `Meet ${person2.name}, ${person2.role} from ${person2.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Filip Malejki",
    description: (
      <>
        
      </>
    ),
  },
  work: {
    display: false, // set to false to hide this section
    title: "Work Experience",
    experiences: [],
  },
  studies: {
    display: false, // set to false to hide this section
    title: "Studies",
    institutions: [],
  },
  technical: {
    display: false, // set to false to hide this section
    title: "Technical skills",
    skills: [],
  },
};

const about3: About = {
  path: "/about3",
  label: "About",
  title: `About – ${person3.name}`,
  description: `Meet ${person3.name}, ${person3.role} from ${person3.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Franciszek Tokarek",
    description: (
      <>
        
      </>
    ),
  },
  work: {
    display: false, // set to false to hide this section
    title: "Work Experience",
    experiences: [],
  },
  studies: {
    display: false, // set to false to hide this section
    title: "Studies",
    institutions: [],
  },
  technical: {
    display: false, // set to false to hide this section
    title: "Technical skills",
    skills: [],
  },
};

const about4: About = {
  path: "/about4",
  label: "About",
  title: `About – ${person4.name}`,
  description: `Meet ${person4.name}, ${person4.role} from ${person4.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Filip Sokołowski",
    description: (
      <>
        
      </>
    ),
  },
  work: {
    display: false, // set to false to hide this section
    title: "Work Experience",
    experiences: [],
  },
  studies: {
    display: false, // set to false to hide this section
    title: "Studies",
    institutions: [],
  },
  technical: {
    display: false, // set to false to hide this section
    title: "Technical skills",
    skills: [],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/why-neurosphere",
  label: "Why NeuroSphere?",
  title: "Why NeuroSphere?",
  description: "Discover what makes NeuroSphere the ultimate platform for blockchain analytics and AI insights",
  // Create new project pages by adding a new .mdx file to app/why-neurosphere/projects
  // All projects will be listed on the /home and /why-neurosphere routes
};

const gallery: Gallery = {
  path: "/tokenomics",
  label: "Tokenomics",
  title: "Tokenomics",
  description: "Understanding NeuroSphere's token pricing model",
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, person2, person3, person4, social, newsletter, home, about, about2, about3, about4, blog, work, gallery };
