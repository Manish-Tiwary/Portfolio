'use client';
import { useRef, useEffect, useState } from 'react';
import ProfileCard from '../effects/ProfileCard';

function useInteractiveScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;
      const elementMid = rect.top + rect.height / 2;
      const screenMid = windowH / 2;
      const dist = Math.abs(screenMid - elementMid);
      const range = 700;
      setProgress(Math.max(0, 1 - dist / range));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { ref, progress };
}

const AboutSection = () => {
  const { ref, progress } = useInteractiveScroll();

  const stats = [
    { label: 'Years Experience', value: '0+' },
    { label: 'Projects Shipped', value: '20+' },
    { label: 'Happy Clients', value: '10+' },
    { label: 'Cups of Coffee', value: '∞' },
  ];

  const facts = [
    { emoji: '🚀', text: 'Specialise in full-stack web applications' },
    { emoji: '🎯', text: 'Focused on performance and clean architecture' },
    { emoji: '📖', text: 'Continuous learner – always levelling up' },
    { emoji: '🤝', text: 'Open to collaborations and freelance work' },
  ];

  const eased = Math.sin((progress * Math.PI) / 2);
  const xOffset = 200 * (1 - eased);
  const yOffset = 100 * (1 - eased);
  const rotation = 10 * (1 - eased);
  const opacity = eased;

  // Shadow opacity is directly tied to element opacity — no ghost outline
  // ProfileCard shadow only appears once the card itself is visible
  const shadowOpacity = eased;

  const smoothStyle = {
    transition: 'transform 0.1s linear, opacity 0.1s linear',
    willChange: 'transform, opacity',
  };

  return (
    <section
      id="About"
      className="text-white min-h-screen px-8 relative overflow-hidden flex items-center justify-center"
    >
      <div
        ref={ref}
        className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
      >
        {/* ── Left Column — slides from left ── */}
        <div
          className="flex flex-col justify-center space-y-8"
          style={{
            transform: `translate(${-xOffset}px, ${yOffset}px) rotate(${-rotation}deg) scale(${0.9 + 0.1 * eased})`,
            opacity,
            // Box shadow tied to opacity — prevents ghost shadow at opacity:0
            filter: opacity < 0.05 ? 'none' : undefined,
            ...smoothStyle,
          }}
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[#70f3b8] font-mono tracking-tighter">//</span>
              <span className="text-[#70f3b8] font-mono text-xs uppercase tracking-[0.3em]">About Me</span>
            </div>
            <h2 className="text-5xl lg:text-7xl font-black mb-6 italic tracking-tight leading-none">
              Who I Am
            </h2>
            <p className="text-zinc-400 max-w-md text-lg leading-relaxed">
              I'm a full-stack engineer passionate about building high-performance
              applications with clean, scalable architecture.
            </p>
          </div>

          {/*
            ProfileCard wrapper: visibility hidden until opacity crosses threshold.
            This prevents the tilt card's box-shadow from showing as a ghost
            while the parent is still at opacity 0.
          */}
          <div
            className="max-w-[400px]"
            style={{
              visibility: opacity < 0.05 ? 'hidden' : 'visible',
              // Smooth shadow: scale shadow with opacity so it fades in together
              filter: `drop-shadow(0 0 ${40 * shadowOpacity}px rgba(168,85,247,${0.3 * shadowOpacity}))`,
            }}
          >
            <ProfileCard
              name="Manish Tiwari"
              title="Software Engineer"
              handle="Manishtiwary"
              status="Online"
              contactText="Contact Me"
              avatarUrl="/personal.png"
              showUserInfo
              enableTilt={true}
              enableMobileTilt
              onContactClick={() => window.location.hash = '#Contact'}
              behindGlowColor="#A855F7"
              iconUrl="/coding.svg"
              behindGlowEnabled
              innerGradient="linear-gradient(145deg,#1e1e1e 10%,#A855F7 100%)"
            />
          </div>
        </div>

        {/* ── Right Column — slides from right ── */}
        <div
          className="flex flex-col justify-center space-y-8"
          style={{
            transform: `translate(${xOffset}px, ${yOffset}px) rotate(${rotation}deg) scale(${0.9 + 0.1 * eased})`,
            opacity,
            ...smoothStyle,
          }}
        >
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group relative bg-[#0d1117] border border-zinc-800/50 p-8 rounded-3xl flex flex-col items-center justify-center transition-all duration-500 hover:border-[#70f3b8]/40 hover:bg-[#11161d]"
              >
                <div className="absolute inset-0 bg-[#70f3b8]/5 opacity-0 group-hover:opacity-100 rounded-3xl blur-xl transition-opacity duration-500" />
                <span className="relative text-4xl font-black text-[#70f3b8] mb-1 tracking-tighter">
                  {stat.value}
                </span>
                <span className="relative text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-bold">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Quick Facts */}
          <div className="bg-[#0d1117]/50 backdrop-blur-sm border border-zinc-800/50 p-10 rounded-3xl">
            <h3 className="text-xs font-bold mb-8 tracking-[0.3em] uppercase text-zinc-500 border-b border-zinc-800/50 pb-4">
              Quick Facts
            </h3>
            <ul className="space-y-6">
              {facts.map((fact, index) => (
                <li key={index} className="flex items-start gap-5 group">
                  <span className="text-2xl bg-zinc-800/50 p-3 rounded-xl group-hover:bg-[#A855F7]/10 group-hover:text-[#A855F7] transition-all">
                    {fact.emoji}
                  </span>
                  <span className="text-zinc-300 text-base font-medium group-hover:text-white transition-colors">
                    {fact.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;