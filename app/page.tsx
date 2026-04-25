import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Expertise from "@/components/home/Expertise";
import Projects from "@/components/home/Projects";
import Journey from "@/components/home/Journey";
import Contact from "@/components/home/Contact";
import Footer from "@/components/home/Footer"

export default function Home() {
  // 1. Data for Hero and About
  const userProfile = {
    name: "Manish Tiwari.", // Updated with your name
    role: "Full-Stack Engineer",
    statusLabel: "Available for Hire",
    greeting: "Hi, I'm",
    buttonText: "→ View Projects"
  };

  // 2. Data for Expertise
  const expertiseData = {
    categories: [
      {
        title: "Frontend",
        skills: ["React", "Next.js", "Tailwind CSS", "Three.js", "Framer Motion"]
      },
      {
        title: "Backend",
        skills: ["Node.js", "Django", "Flask", "MySQL", "PostgreSQL"]
      },
      {
        title: "Specialized",
        skills: ["Computer Vision", "OpenCV", "Biometrics", "SaaS Metrics"]
      },
      {
        title: "Tools & DevOps",
        skills: ["Git", "Docker", "AWS", "Vercel", "Linux"]
      }
    ]
  };

  const projectsData = {
  projects: [
    {
      title: "Insight",
      description: "Automated platform providing VCs with real-time technical audits and software health reports.",
      tech: ["React", "Django", "MySQL", "GitHub API"],
      link: "/projects/insight"
    },
    {
      title: "Biometric AI",
      description: "Academic project for a high-security attendance system utilizing Python 3.12 and OpenCV.",
      tech: ["Python", "OpenCV", "FaceNet", "SQLite"],
      link: "/projects/biometric"
    }
  ]
};

const journeyData = {
  timeline: [
    {
      date: "2026 — Present",
      title: "Founder",
      company: "Insight",
      description: "Architecting a SaaS platform for technical audits. Handling full-stack development and market strategy for VC-facing tools.",
      type: "Work"
    },
    {
      date: "2026",
      title: "BCA Graduate",
      company: "Computer Science",
      description: "Completed academic projects in Biometric Security and Distributed Systems with high-velocity development.",
      type: "Education"
    }
  ]
};

// Use in the page


  return (
    <main className="bg-[#050505]">
      {/* Pass userProfile to Hero */}
      <Hero data={userProfile} />
      
      {/* Pass userProfile to About (assuming it needs the same data) */}
      <About data={userProfile} />
      
      {/* Pass expertiseData to Expertise */}
      <Expertise data={expertiseData} />
      <Projects data={projectsData} />
      <Journey data={journeyData} />
      <Contact />
      <Footer />

    </main>
  );
}