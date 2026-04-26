'use client';
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Magnet from '../effects/Magnet';

gsap.registerPlugin(ScrollTrigger);

const defaultProjects = [
  {
    title: "Insight",
    description: "Real-time technical audit platform for VCs and CTOs to analyze software health and engineering velocity.",
    tech: ["Next.js", "Node.js", "GitHub API"],
    link: "#",
    index: "01"
  },
  {
    title: "Biometric Attendance",
    description: "AI-powered system using OpenCV and FaceNet for high-security admin management and identity verification.",
    tech: ["Python", "OpenCV", "MySQL"],
    link: "#",
    index: "02"
  },
  {
    title: "Snapsync",
    description: "A collaborative media synchronization tool engineered for specialized team workflows in real time.",
    tech: ["React", "Firebase", "WebRTC"],
    link: "#",
    index: "03"
  },
  {
    title: "Portfolio OS",
    description: "This portfolio — a high-performance cinematic experience built with Next.js, GSAP, and WebGL shaders.",
    tech: ["Next.js", "GSAP", "WebGL"],
    link: "#",
    index: "04"
  }
];

// ── Single project card ────────────────────────────────────────────────────────
function ProjectCard({ project, cardRef }: { project: typeof defaultProjects[0]; cardRef: React.RefObject<HTMLDivElement> }) {
  return (
    <div
      ref={cardRef}
      className="group relative bg-[#0a0a0f] border border-zinc-800/60 rounded-2xl p-8 hover:border-[#70f3b8]/40 transition-colors duration-500 overflow-hidden will-change-transform"
    >
      {/* Ambient glow on hover */}
      <div className="absolute -inset-px bg-gradient-to-br from-[#70f3b8]/10 via-transparent to-[#A855F7]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl" />

      <div className="relative z-10 flex flex-col h-full">
        {/* Index + Arrow */}
        <div className="flex justify-between items-start mb-8">
          <span className="font-mono text-[10px] text-zinc-700 tracking-[0.4em]">{project.index}</span>
          <div className="text-[#70f3b8] opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
            </svg>
          </div>
        </div>

        <h3 className="text-2xl font-black tracking-tight mb-3 group-hover:text-[#70f3b8] transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-zinc-500 mb-8 flex-grow leading-relaxed text-sm">
          {project.description}
        </p>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tech.map((t, i) => (
            <span key={i} className="text-[9px] font-mono px-3 py-1 bg-zinc-900 border border-zinc-800/80 text-zinc-600 rounded-full group-hover:border-[#70f3b8]/20 group-hover:text-zinc-400 transition-colors">
              {t}
            </span>
          ))}
        </div>

        <Magnet padding={20} magnetStrength={8}>
          <a href={project.link} className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-[#70f3b8] hover:underline underline-offset-4">
            View Case Study →
          </a>
        </Magnet>
      </div>
    </div>
  );
}

export default function Projects({ data }: { data?: { projects?: typeof defaultProjects } }) {
  const projectList = (data?.projects || defaultProjects).map((p, i) => ({
    ...p,
    index: String(i + 1).padStart(2, '0')
  }));

  const sectionRef  = useRef<HTMLElement>(null);
  const cardRefs    = useRef<React.RefObject<HTMLDivElement>[]>(
    projectList.map(() => useRef<HTMLDivElement>(null))
  );

  // ── Mobile swipe state ─────────────────────────────────────────────────────
  const [active, setActive]         = useState(0);
  const [dragging, setDragging]     = useState(false);
  const [startX, setStartX]         = useState(0);
  const [isMobile, setIsMobile]     = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // ── Desktop: alternating scroll-triggered slide-in ─────────────────────────
  useEffect(() => {
    if (isMobile) return;

    const cards = cardRefs.current.map(r => r.current).filter(Boolean);

    cards.forEach((card, i) => {
      const fromLeft = i % 2 === 0;
      gsap.fromTo(card,
        { opacity: 0, x: fromLeft ? -120 : 120, scale: 0.94 },
        {
          opacity: 1, x: 0, scale: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'top 55%',
            scrub: false,
            toggleActions: 'play none none reverse',
          }
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, [isMobile]);

  // ── Mobile swipe handlers ──────────────────────────────────────────────────
  const onTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setDragging(true);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!dragging) return;
    const delta = startX - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) {
      if (delta > 0) setActive(a => Math.min(a + 1, projectList.length - 1));
      else           setActive(a => Math.max(a - 1, 0));
    }
    setDragging(false);
  };

  // ── Mobile carousel render ─────────────────────────────────────────────────
  if (isMobile) {
    return (
      <section ref={sectionRef} id="Projects" className="text-white py-24 px-6 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[#70f3b8] font-mono">//</span>
              <span className="text-[#70f3b8] font-mono text-xs uppercase tracking-[0.3em]">Selected Work</span>
            </div>
            <h2 className="text-4xl font-black italic tracking-tight">Featured Projects</h2>
          </div>

          {/* Carousel */}
          <div
            className="overflow-hidden relative"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${active * 100}%)`, ease: 'cubic-bezier(0.25, 1, 0.5, 1)' }}
            >
              {projectList.map((project, i) => (
                <div key={i} className="min-w-full px-1">
                  <ProjectCard project={project} cardRef={cardRefs.current[i]} />
                </div>
              ))}
            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {projectList.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === active ? 'bg-[#70f3b8] w-6' : 'bg-zinc-700'}`}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ── Desktop staggered vertical layout ─────────────────────────────────────
  return (
    <section ref={sectionRef} id="Projects" className="text-white py-24 px-8 border-t border-zinc-900">
      <div className="max-w-5xl mx-auto">
        <div className="mb-20">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[#70f3b8] font-mono">//</span>
            <span className="text-[#70f3b8] font-mono text-xs uppercase tracking-[0.3em]">Selected Work</span>
          </div>
          <h2 className="text-5xl font-black italic tracking-tight">Featured Projects</h2>
        </div>

        {/* Staggered 2-col grid with alternating alignment */}
        <div className="grid grid-cols-2 gap-6">
          {projectList.map((project, i) => (
            <div
              key={i}
              className={`${i % 2 === 0 ? 'mt-0' : 'mt-16'}`}
            >
              <ProjectCard project={project} cardRef={cardRefs.current[i]} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}