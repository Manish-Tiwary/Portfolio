'use client';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const defaultTimeline = [
  {
    date: "2026 — Present",
    title: "Founder & Lead Architect",
    company: "Insight",
    description: "Building an automated technical audit platform for VCs and CTOs to evaluate software health and engineering velocity.",
    type: "Work"
  },
  {
    date: "2024 — 2026",
    title: "BCA (Computer Science)",
    company: "University",
    description: "Specializing in Distributed Systems, Advanced Java, and Network Programming. Developed Snapsync and Biometric systems.",
    type: "Education"
  }
];

// ── Animated laser SVG path ────────────────────────────────────────────────────
function LaserTree({ progress }: { progress: number }) {
  const pathRef   = useRef<SVGPathElement>(null);
  const glowRef   = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    const glow = glowRef.current;
    if (!path || !glow) return;

    const len = path.getTotalLength();

    // Dash-draw based on scroll progress
    gsap.set([path, glow], { strokeDasharray: len, strokeDashoffset: len });
    gsap.to([path, glow], {
      strokeDashoffset: len * (1 - progress),
      duration: 0,
      ease: 'none',
      overwrite: true,
    });
  }, [progress]);

  return (
    <svg
      viewBox="0 0 120 800"
      className="absolute left-1/2 -translate-x-1/2 top-0 h-full"
      style={{ width: 120, overflow: 'visible', pointerEvents: 'none' }}
      preserveAspectRatio="none"
    >
      <defs>
        <filter id="laserGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <linearGradient id="laserGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#70f3b8" />
          <stop offset="50%"  stopColor="#A855F7" />
          <stop offset="100%" stopColor="#70f3b8" />
        </linearGradient>
      </defs>

      {/* Glow layer */}
      <path
        ref={glowRef}
        d="M60,0 C60,100 20,150 60,200 C100,250 60,300 60,400 C60,500 20,550 60,600 C100,650 60,700 60,800"
        fill="none"
        stroke="url(#laserGrad)"
        strokeWidth="8"
        strokeLinecap="round"
        filter="url(#laserGlow)"
        opacity={0.4}
      />
      {/* Core line */}
      <path
        ref={pathRef}
        d="M60,0 C60,100 20,150 60,200 C100,250 60,300 60,400 C60,500 20,550 60,600 C100,650 60,700 60,800"
        fill="none"
        stroke="url(#laserGrad)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Branch nodes at each inflection */}
      {[200, 400, 600].map((y, i) => (
        <g key={i}>
          <circle cx="60" cy={y} r="5" fill="#A855F7" opacity={0.8} filter="url(#laserGlow)" />
          <circle cx="60" cy={y} r="2" fill="#fff" />
          {/* Branch arms */}
          <line x1="60" y1={y} x2="10"  y2={y} stroke="#70f3b8" strokeWidth="1" opacity={0.4} />
          <line x1="60" y1={y} x2="110" y2={y} stroke="#70f3b8" strokeWidth="1" opacity={0.4} />
        </g>
      ))}
    </svg>
  );
}

export default function Journey({ data }: { data?: { timeline?: typeof defaultTimeline } }) {
  const timeline    = data?.timeline || defaultTimeline;
  const sectionRef  = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  const cardRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const [scrollProgress, setScrollProgress] = useStateRef(0);

  // ── 3D gallery card reveals ────────────────────────────────────────────────
  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean);

    cards.forEach((card, i) => {
      gsap.fromTo(card,
        {
          opacity: 0,
          scale: 0.82,
          z: -120,
          filter: 'blur(8px)',
        },
        {
          opacity: 1,
          scale: 1,
          z: 0,
          filter: 'blur(0px)',
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'top 45%',
            scrub: 0.5,
          }
        }
      );
    });

    // Track scroll progress for laser draw
    const section = sectionRef.current;
    if (!section) return;

    ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      end: 'bottom 20%',
      onUpdate: (self) => setScrollProgress(self.progress),
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section
      ref={sectionRef}
      id="Journey"
      className="text-white py-24 px-8 border-t border-zinc-900 relative"
      style={{ perspective: '1200px' }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-24">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[#70f3b8] font-mono">//</span>
            <span className="text-[#70f3b8] font-mono text-xs uppercase tracking-[0.3em]">Roadmap</span>
          </div>
          <h2 className="text-5xl font-black italic tracking-tight">Journey</h2>
          <p className="text-zinc-600 font-mono text-xs mt-3 tracking-widest uppercase">Follow the signal</p>
        </div>

        {/* Gallery hallway layout */}
        <div className="relative" style={{ minHeight: `${timeline.length * 360}px` }}>

          {/* Laser tree — positioned absolutely behind the cards */}
          <LaserTree progress={scrollProgress} />

          {/* Timeline cards — 3D gallery reveal */}
          <div className="relative z-10 space-y-32">
            {timeline.map((item, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  ref={el => { cardRefs.current[idx] = el; }}
                  className={`relative flex ${isLeft ? 'justify-start' : 'justify-end'}`}
                  style={{ transformStyle: 'preserve-3d', willChange: 'transform, opacity, filter' }}
                >
                  {/* Type badge */}
                  <div className={`absolute top-1/2 -translate-y-1/2 ${isLeft ? 'right-[48%]' : 'left-[48%]'} hidden md:flex`}>
                    <span className={`text-[9px] font-mono uppercase tracking-[0.3em] px-3 py-1 rounded-full border ${
                      item.type === 'Work'
                        ? 'border-[#70f3b8]/30 text-[#70f3b8] bg-[#70f3b8]/5'
                        : 'border-[#A855F7]/30 text-[#A855F7] bg-[#A855F7]/5'
                    }`}>
                      {item.type}
                    </span>
                  </div>

                  {/* Card */}
                  <div className="w-full md:w-5/12 group">
                    <div className="relative bg-[#0a0a0f] border border-zinc-800/60 rounded-2xl p-8 hover:border-[#70f3b8]/30 transition-all duration-500 overflow-hidden">
                      {/* Inner glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#70f3b8]/5 via-transparent to-[#A855F7]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl" />

                      <div className="relative z-10">
                        <span className="text-[#70f3b8] font-mono text-[9px] uppercase tracking-[0.4em] block mb-3">
                          {item.date}
                        </span>
                        <h3 className="text-xl font-black tracking-tight text-zinc-100 mb-1 group-hover:text-white transition-colors">
                          {item.title}
                        </h3>
                        <h4 className="text-zinc-600 font-mono text-xs mb-5 tracking-widest uppercase">
                          {item.company}
                        </h4>
                        <p className="text-zinc-500 text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      {/* Corner accent */}
                      <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-[#70f3b8]/10 rounded-br-2xl" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Terminal node — laser flows into Contact */}
          <div className="flex justify-center mt-20 relative z-10">
            <div className="flex flex-col items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#70f3b8] shadow-[0_0_20px_4px_rgba(112,243,184,0.6)] animate-pulse" />
              <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-[#70f3b8]/60">Contact.init()</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Tiny useState wrapper that exposes a setter which also reads current value ─
function useStateRef(initial: number): [number, (v: number) => void] {
  const [val, setVal] = useStateInternal(initial);
  return [val, setVal];
}

// re-export to avoid import collision
import { useState as useStateInternal } from 'react';