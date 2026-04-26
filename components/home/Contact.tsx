'use client';
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ── Animated border box that "charges up" on scroll entry ─────────────────────
function LaserBorderBox({ children, active }: { children: React.ReactNode; active: boolean }) {
  return (
    <div className="relative">
      {/* SVG laser border — draws in when active */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <filter id="contactGlow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#70f3b8" />
            <stop offset="100%" stopColor="#A855F7" />
          </linearGradient>
        </defs>
        {/* Animated border rect — 4 sides draw in sequence */}
        <rect
          x="1" y="1"
          width="calc(100% - 2px)" height="calc(100% - 2px)"
          rx="24" ry="24"
          fill="none"
          stroke="url(#borderGrad)"
          strokeWidth="1.5"
          filter="url(#contactGlow)"
          strokeDasharray="2000"
          strokeDashoffset={active ? 0 : 2000}
          style={{
            transition: 'stroke-dashoffset 1.8s cubic-bezier(0.16, 1, 0.3, 1)',
            width: '100%',
            height: '100%',
          }}
        />
        {/* Corner sparks */}
        {active && ['0,0', '100%,0', '100%,100%', '0,100%'].map((pos, i) => {
          const [cx, cy] = pos.split(',');
          return (
            <circle
              key={i}
              cx={cx} cy={cy} r="3"
              fill="#70f3b8"
              filter="url(#contactGlow)"
              style={{
                opacity: 0,
                animation: `spark 0.6s ease-out ${0.3 + i * 0.15}s forwards`,
              }}
            />
          );
        })}
      </svg>

      {children}

      <style>{`
        @keyframes spark {
          0%   { opacity: 0; r: 2; }
          30%  { opacity: 1; r: 6; }
          100% { opacity: 0; r: 3; }
        }
      `}</style>
    </div>
  );
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef    = useRef<HTMLDivElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const [boxActive, setBoxActive] = useState(false);
  const [sent, setSent]           = useState(false);
  const [form, setForm]           = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    // Header reveal
    gsap.fromTo(headerRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 80%' }
      }
    );

    // Form box reveal + laser activation
    gsap.fromTo(formRef.current,
      { opacity: 0, scale: 0.95, y: 30 },
      {
        opacity: 1, scale: 1, y: 0,
        duration: 1.2, ease: 'power4.out',
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 75%',
          onEnter: () => setBoxActive(true),
        }
      }
    );

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    // Wire to your API here
    setSent(true);
  };

  return (
    <section
      ref={sectionRef}
      id="Contact"
      className="text-white py-32 px-8 border-t border-zinc-900 relative overflow-hidden"
    >
      {/* Ambient glow behind form */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
      </div>

      <div className="max-w-2xl mx-auto relative z-10">

        {/* Header */}
        <div ref={headerRef} className="mb-16 text-center" style={{ opacity: 0 }}>
          {/* Incoming laser indicator */}
          <div className="flex justify-center mb-8">
            <div className="flex flex-col items-center gap-2">
              <div
                className="w-px bg-gradient-to-b from-[#70f3b8] to-transparent transition-all duration-1000"
                style={{ height: boxActive ? 64 : 0 }}
              />
              <div className={`w-2 h-2 rounded-full bg-[#70f3b8] transition-all duration-500 ${boxActive ? 'shadow-[0_0_12px_4px_rgba(112,243,184,0.8)]' : 'opacity-0'}`} />
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-[#70f3b8] font-mono">//</span>
            <span className="text-[#70f3b8] font-mono text-xs uppercase tracking-[0.3em]">Get In Touch</span>
          </div>
          <h2 className="text-5xl font-black italic tracking-tight mb-4">Let's Build</h2>
          <p className="text-zinc-500 text-sm leading-relaxed max-w-md mx-auto">
            Open to collaborations, freelance work, and interesting problems.
            The signal found its way here — let's talk.
          </p>
        </div>

        {/* Laser box form */}
        <div ref={formRef} style={{ opacity: 0 }}>
          <LaserBorderBox active={boxActive}>
            <div className="bg-[#0a0a0f]/80 backdrop-blur-xl rounded-3xl p-10">

              {sent ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-12 h-12 rounded-full border border-[#70f3b8]/40 flex items-center justify-center mb-6">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#70f3b8" strokeWidth="1.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <p className="text-[#70f3b8] font-mono text-sm tracking-widest uppercase">Signal received.</p>
                  <p className="text-zinc-600 text-xs mt-2 font-mono">I'll get back to you soon.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {/* Name */}
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[9px] uppercase tracking-[0.35em] text-zinc-600">Name</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="bg-zinc-900/60 border border-zinc-800 rounded-xl px-5 py-3.5 text-sm text-zinc-200 placeholder:text-zinc-700 focus:outline-none focus:border-[#70f3b8]/40 focus:bg-zinc-900 transition-all duration-300"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[9px] uppercase tracking-[0.35em] text-zinc-600">Email</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="bg-zinc-900/60 border border-zinc-800 rounded-xl px-5 py-3.5 text-sm text-zinc-200 placeholder:text-zinc-700 focus:outline-none focus:border-[#70f3b8]/40 focus:bg-zinc-900 transition-all duration-300"
                    />
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[9px] uppercase tracking-[0.35em] text-zinc-600">Message</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="What are you building?"
                      rows={5}
                      className="bg-zinc-900/60 border border-zinc-800 rounded-xl px-5 py-3.5 text-sm text-zinc-200 placeholder:text-zinc-700 focus:outline-none focus:border-[#70f3b8]/40 focus:bg-zinc-900 transition-all duration-300 resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    onClick={handleSubmit}
                    className="group relative mt-2 w-full py-4 rounded-xl font-mono text-xs uppercase tracking-[0.3em] font-bold overflow-hidden transition-all duration-300"
                    style={{ background: 'linear-gradient(135deg, rgba(112,243,184,0.1), rgba(168,85,247,0.1))', border: '1px solid rgba(112,243,184,0.2)' }}
                  >
                    <span className="relative z-10 text-[#70f3b8] group-hover:text-white transition-colors">
                      Transmit →
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#70f3b8] to-[#A855F7] opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                  </button>

                  {/* Social links */}
                  <div className="flex justify-center gap-8 pt-4 border-t border-zinc-900 mt-2">
                    {[
                      { label: 'GitHub', href: '#' },
                      { label: 'LinkedIn', href: '#' },
                      { label: 'Twitter', href: '#' },
                    ].map(link => (
                      <a
                        key={link.label}
                        href={link.href}
                        className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-700 hover:text-[#70f3b8] transition-colors"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </LaserBorderBox>
        </div>
      </div>
    </section>
  );
}