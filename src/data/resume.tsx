import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export interface ResumeData {
  name: string;
  initials: string;
  url: string;
  location: string;
  locationLink: string;
  description: string;
  summary: string;
  avatarUrl: string;
  skills: string[];
  navbar: {
    href: string;
    icon: any;
    label: string;
    openInNewTab?: boolean;
  }[];
  contact: {
    email: string;
    tel: string;
    social: Record<string, {
      name: string;
      url: string;
      icon: any;
      navbar: boolean;
    }>;
  };
  work: {
    company: string;
    href: string;
    badges: string[];
    location: string;
    title: string;
    logoUrl: string;
    start: string;
    end: string;
    description: string | readonly string[];
  }[];
  leadership: {
    company: string;
    href: string;
    badges: string[];
    location: string;
    title: string;
    logoUrl: string;
    start: string;
    end: string;
    description: string | readonly string[];
  }[];
  education: {
    school: string;
    href: string;
    degree: string;
    logoUrl: string;
    start: string;
    end: string;
  }[];
  projects: {
    title: string;
    href: string;
    dates: string;
    active: boolean;
    description: string;
    technologies: string[];
    links: {
      type: string;
      href: string;
      icon: any;
    }[];
    image?: string;
    video?: string;
  }[];
  hackathons: {
    title: string;
    dates: string;
    location: string;
    description: string;
    image: string;
    mlh?: string;
    links: {
      title: string;
      icon: any;
      href: string;
    }[];
    win?: string;
    icon?: string;
  }[];
}

export const DATA: ResumeData = {
  name: "Deepak Singh",
  initials: "DS",
  url: "https://dillion.io",
  location: "Mumbai, Maharashtra",
  locationLink: "https://www.google.com/maps/place/mumbai",
  description:
    "& an MBA Candidate. I leverage data and engineering expertise to build scalable, user-centric products that drive business growth.",
  summary:
    "I am a **Product Manager**  with a deep technical foundation in **Data Engineering** and **Computer Science**.\n\nCurrently pursuing an **MBA at IIT Roorkee**, I combine business acumen with over **3 years of hands-on engineering experience** to build data-driven products. My background allows me to seamlessly bridge the gap between stakeholders and engineering teams, translating complex business requirements into scalable technical solutions.\n\nI excel at using **data analytics** to uncover user needs, optimize product roadmaps, and drive measurable growth. I am passionate about solving real-world problems through innovative, user-centric technology.",
  avatarUrl: "/mee.jpg",
  skills: [
    "Product Strategy",
    "User Research",
    "Agile & Scrum",
    "Data Analysis",
    "A/B Testing",
    "Figma",
    "SQL",
    "React",
    "Next.js",
    "Typescript",
    "Node.js",
    "Postgres",
    "Docker",
    "Kubernetes",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog", openInNewTab: true },
  ],
  contact: {
    email: "deepaksingh4.iitr@gmail.com",
    tel: "+91 9167024095",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://dub.sh/dillion-github",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/deepak-singh-iitr/",
        icon: Icons.linkedin,

        navbar: true,
      },
      X: {
        name: "X",
        url: "https://dub.sh/dillion-twitter",
        icon: Icons.x,

        navbar: true,
      },
      Reddit: {
        name: "Reddit",
        url: "https://www.reddit.com/",
        icon: Icons.reddit,

        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "#",
        icon: Icons.email,

        navbar: false,
      },
    },
  },

  work: [
    {
      company: "MAQ Software",
      href: "https://maqsoftware.com/",
      badges: [],
      location: "Remote",
      title: "Management Trainee",
      logoUrl: "/maq.png",
      start: "May 2025",
      end: "Jul 2025",
      description: [
        "Engineered a Python-based metadata discovery framework, boosting schema mapping speed by 70%.",
        "Designed a fact-constellation SQL warehouse, optimizing queries for scalable and advanced analytic system.",
        "Automated ETL pipelines in Azure Data Factory and deployed Power BI dashboards, reducing manual effort by 60%.",
        "Managed agile sprints in Azure DevOps, ensuring on-time delivery and transparent stakeholder alignment.",
        "Led milestones via stakeholder syncs and reviews, delivering production-grade dashboards.",
      ],
    },
    {
      company: "LTIMindtree",
      href: "https://www.ltimindtree.com/",
      badges: [],
      location: "Remote",
      title: "Data Engineer",
      logoUrl: "/ltim.avif",
      start: "Jun 2021",
      end: "May 2024",
      description: [
        "Designed and developed robust data pipelines using Hippo and Talend for significantly enhanced efficiency.",
        "Automated report generation tasks with Python, reducing reporting time by 80% and manual workload.",
        "Led collaboration with cross-functional teams to implement innovative solutions aligned with organizational goals.",
        "Monitored data flow and resolved tickets in the initial project phase, achieving 99% incident resolution.",
        "Deployed scalable and efficient data solutions using Microsoft Azure Data Factory, resulting in cost savings.",
        "Optimized SQL queries in AWS Redshift for data extraction, reducing data retrieval time by over 35%.",
        "Directed new team members during onboarding, ensuring smooth and seamless knowledge transfer.",
        "Enhanced key workflow processes by applying Agile practices, achieving a 20% increase in efficiency.",
        "Performed preliminary data exploration in Excel, leveraging Pivot Tables for comprehensive analysis.",
        "Performed thorough testing and validation of Tableau dashboards to ensure data accuracy and functionality.",
        "Performed data copying in HDFS for development and testing, ensuring seamless availability throughout.",
        "Analysed, reviewed, and documented progress using Jira and Confluence, identifying key areas of attention.",
      ],
    },
    {
      company: "TheSmallDataStore",
      href: "https://thesmalldatastore.com/",
      badges: [],
      location: "Remote",
      title: "Data Engineer Intern",
      logoUrl: "/tsds.png",
      start: "Dec 2020",
      end: "May 2021",
      description: [
        "Built advanced web-scraping tools using Python to efficiently develop the Universal Item Master system.",
        "Shaped the overall data architecture and business flow, carefully selecting appropriate technologies.",
        "Designed the database architecture from scratch, creating comprehensive tables and detailed ER diagrams.",
        "Automated the data ingestion pipeline from client stores using an ELT framework for efficient processing.",
        "Developed back-end code using Python for scripting, while securely maintaining data on MongoDB.",
      ],
    },
    {
      company: "Cloud Counselage Pvt. Ltd.",
      href: "https://www.cloudcounselage.com/",
      badges: [],
      location: "Remote",
      title: "Technical Intern",
      logoUrl: "/cc.jpeg",
      start: "Mar 2020",
      end: "Jun 2020",
      description: [
        "Integrated Citrix tools to streamline collaboration, increasing issue resolution speed by 50%.",
        "Implemented a convolutional neural network model using TensorFlow 2.0 for colour recognition task.",
        "Assisted in developing advanced algorithms for a Recommendation System as a Shadow ML Engineer.",
        "Best intern recognized with a Letter of Appreciation for commendable work and assisting peers in learning.",
      ],
    },
  ],
  leadership: [
    {
      company: "Indian Institute of Technology, Roorkee",
      href: "https://doms.iitr.ac.in/",
      badges: [],
      location: "Roorkee, India",
      title: "Placement Cell Coordinator",
      logoUrl: "/iitr.svg",
      start: "2024",
      end: "Present",
      description: [
        "Identified inefficiencies in the manual placement process involving repetitive Google Forms and lack of application tracking.",
        "Conceptualized and developed a centralized Placement Portal with Role-Based Access Control (RBAC) to automate workflows.",
        "Created a student dashboard enabling one-time profile registration, unified resume verification, and one-click applications.",
        "Eliminated redundant data entry and provided students with real-time visibility into their application status (Order of Receipt).",
        "Streamlined operations for the placement team, significantly reducing manual verification time and administrative overhead.",
      ],
    },
  ],
  education: [
    {
      school: "Indian Institute of Technology, Roorkee",
      href: "https://doms.iitr.ac.in/",
      degree: "M.B.A.",
      logoUrl: "/iitr.svg",
      start: "2024",
      end: "2026",
    },
    {
      school: "Lokmanya Tilak College of Engineering (Mumbai University)",
      href: "https://ltce.in",
      degree: "B. Tech (CSE)",
      logoUrl: "/ltce.jpg",
      start: "2017",
      end: "2021",
    },
    {
      school: "RJ Junior College, Mumbai (Maharashtra State Board)",
      href: "https://rjcollege.edu.in",
      degree: "Class XII",
      logoUrl: "/rj.png",
      start: "2017",
      end: "2017",
    },
    {
      school: "K.V.K Ghatkopar Sarvajanik School (Maharashtra State Board)",
      href: "https://kvkghatkopar.in/home",
      degree: "Class X",
      logoUrl: "/kvk.png",
      start: "2015",
      end: "2015",
    },
  ],
  projects: [
    {
      title: "RAGify",
      href: "",
      dates: "Jan 2026 - Mar 2026",
      active: true,
      description:
        "An enterprise-grade GenAI orchestration platform with multi-tenant isolation, hybrid semantic + keyword search, anti-hallucination guardrails, and model-agnostic routing for cost-optimized inference.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "Supabase",
        "LangChain",
        "OpenAI API",
        "TailwindCSS",
        "Shadcn UI",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/deepaksingh4/ragify",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/ragify.svg",
      video: "",
    },
    {
      title: "Magic UI",
      href: "https://magicui.design",
      dates: "June 2023 - Present",
      active: true,
      description:
        "Designed, developed and sold animated UI components for developers.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "Prisma",
        "TailwindCSS",
        "Stripe",
        "Shadcn UI",
        "Magic UI",
      ],
      links: [
        {
          type: "Website",
          href: "https://magicui.design",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/magicuidesign/magicui",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "https://cdn.magicui.design/bento-grid.mp4",
    },
    {
      title: "llm.report",
      href: "https://llm.report",
      dates: "April 2023 - September 2023",
      active: true,
      description:
        "Developed an open-source logging and analytics platform for OpenAI: Log your ChatGPT API requests, analyze costs, and improve your prompts.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "Prisma",
        "TailwindCSS",
        "Shadcn UI",
        "Magic UI",
        "Stripe",
        "Cloudflare Workers",
      ],
      links: [
        {
          type: "Website",
          href: "https://llm.report",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/dillionverma/llm.report",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "https://cdn.llm.report/openai-demo.mp4",
    },
    {
      title: "Automatic Chat",
      href: "https://automatic.chat",
      dates: "April 2023 - March 2024",
      active: true,
      description:
        "Developed an AI Customer Support Chatbot which automatically responds to customer support tickets using the latest GPT models.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "Prisma",
        "TailwindCSS",
        "Shadcn UI",
        "Magic UI",
        "Stripe",
        "Cloudflare Workers",
      ],
      links: [
        {
          type: "Website",
          href: "https://automatic.chat",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/automatic-chat.mp4",
    },
  ],
  hackathons: [
    {
      title: "Consulting Knights",
      dates: "2024",
      location: "IIM Kashipur",
      description:
        "Secured 1st Runner-up in the National Case Study Competition organized by IIM Kashipur. Demonstrated strategic thinking and problem-solving skills in a high-pressure environment.",
      image:
        "/iim-kashipur.jpg",
      links: [
        {
          title: "Contest Details",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://unstop.com/competitions/consulting-knights-iim-kashipur-1325296",
        },
      ],
    },
    {
      title: "Aventura",
      dates: "2024",
      location: "IIM Lucknow",
      description:
        "Achieved 1st Runner Up in the National Business Plan Competition organized by Ecell, IIM Lucknow. Developed a comprehensive business strategy and financial model.",
      image:
        "/iim-lucknow.png",
      links: [
        {
          title: "Contest Details",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://unstop.com/competitions/aventura-2025-national-business-plan-competition-iim-lucknow-1362431",
        },
      ],
    },
    {
      title: "Trendsetter",
      dates: "2024",
      location: "DS Group",
      description:
        "National Finalist in the prestigious Trendsetter competition organized by DS Group. Competed against top B-school teams across the country.",
      image:
        "/ds.webp",
      links: [
        {
          title: "Contest Details",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://xathon.mettl.com/account/login/TrenDSetter04",
        },
      ],
    },
    {
      title: "V-Guard Big Idea",
      dates: "2024",
      location: "V-Guard",
      description:
        "National Finalist in the V-Guard Big Idea contest. Presented innovative solutions to real-world business challenges.",
      image:
        "/vguard.jpg",
      links: [
        {
          title: "Contest Details",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://www.vguard.in/contest/index.php/index",
        },
      ],
    },
  ],
};
