'use client';
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import MagnetLens from '../effects/MagnetLens';

const Hero = ({ data }) => {
  const raysWrapRef   = useRef<HTMLDivElement>(null);
  const badgeRef      = useRef<HTMLDivElement>(null);
  const subheadRef    = useRef<HTMLHeadingElement>(null);
  const titleRef      = useRef<HTMLDivElement>(null);
  const roleRef       = useRef<HTMLParagraphElement>(null);
  const buttonRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ── 1. All hero children start invisible (belt-and-suspenders over inline styles)
    gsap.set([
      badgeRef.current,
      subheadRef.current,
      titleRef.current,
      roleRef.current,
      buttonRef.current,
    ], { opacity: 0, y: 30 });

    gsap.set(titleRef.current, {
      opacity: 0,
      scale: 0.88,
      filter: 'blur(28px)',
      letterSpacing: '0.35em',
      y: 0,
    });

    const navbar = document.getElementById('site-navbar');

    // ── 2. Fade in the body — LightRays is now the only visible thing
    //    Small delay lets the WebGL canvas initialize so there's no black frame
    gsap.to(document.body, {
      opacity: 1,
      duration: 0.01,  // instant — body must be visible for rays to show
      delay: 0.05,
      onComplete: () => {
        // ── 3. Master timeline fires only after body is visible & fully mounted
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // Stage 1 — LightRays already visible (they're in layout, not hidden)
        // We use a pause here so the rays have a moment to "breathe" first
        tl.to({}, { duration: 0.6 }); // 600ms pure rays moment

        // Stage 2 — Movie title reveal: blur clears, tracking tightens, fades in
        tl.to(titleRef.current, {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          letterSpacing: '-0.04em',  // matches tracking-tighter
          duration: 1.9,
          ease: 'power4.out',
        });

        // Stage 3 — Navbar slides down while title is still clearing
        tl.to(navbar, {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: 'back.out(1.5)',
        }, '-=1.3');

        // Stage 4 — All remaining elements stagger up from below
        // Natural cascading: badge → subhead → role → button
        tl.to(badgeRef.current, {
          opacity: 1, y: 0,
          duration: 0.6, ease: 'power2.out',
        }, '-=0.9');

        tl.to(subheadRef.current, {
          opacity: 1, y: 0,
          duration: 0.5, ease: 'power2.out',
        }, '-=0.45');

        tl.to(roleRef.current, {
          opacity: 1, y: 0,
          duration: 0.5, ease: 'power2.out',
        }, '-=0.38');

        tl.to(buttonRef.current, {
          opacity: 1, y: 0,
          duration: 0.5, ease: 'power2.out',
        }, '-=0.32');
      }
    });

    return () => { gsap.killTweensOf([
      document.body,
      navbar,
      badgeRef.current,
      subheadRef.current,
      titleRef.current,
      roleRef.current,
      buttonRef.current,
    ]); };
  }, []);

  return (
    <section
      id="Home"
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden antialiased"
    >
      <div className="flex flex-col items-start max-w-4xl px-8 z-(-2) w-full">

        {/* Status badge — Stage 4, starts hidden via GSAP set */}
        <div
          ref={badgeRef}
          style={{ opacity: 0 }}  // inline default so it's hidden before JS runs
          className="flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-xs font-mono tracking-widest text-emerald-400 uppercase">
            {data?.statusLabel || "Available for opportunities"}
          </span>
        </div>

        {/* Subheader — Stage 4 */}
        <h2
          ref={subheadRef}
          style={{ opacity: 0 }}
          className="text-zinc-500 font-mono text-sm tracking-[0.3em] mb-2 uppercase select-none"
        >
          {data?.greeting || "Hi, I'm"}
        </h2>

        {/* Main name — Stage 2 (movie title) — inline opacity:0 prevents flash */}
        <div
          ref={titleRef}
          style={{ opacity: 0, willChange: 'filter, transform, opacity, letter-spacing' }}
          className="mb-4"
        >
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[1.1] font-sans">
            <span className="text-white">Manish</span>{' '}
            <span className="text-[#A855F7]">Tiwari.</span>
          </h1>
        </div>

        {/* Role — Stage 4 */}
        <p
          ref={roleRef}
          style={{ opacity: 0 }}
          className="text-2xl md:text-3xl text-zinc-400 font-medium mb-12 tracking-tight"
        >
          {data?.role || "Full-Stack Engineer"}
        </p>

        {/* Button — Stage 4 */}
        <div
          ref={buttonRef}
          style={{ opacity: 0 }}
          className="min-h-[64px] flex items-start justify-start"
        >
          <MagnetLens color="#A855F7">
            View Projects
          </MagnetLens>
        </div>

      </div>
    </section>
  );
};

export default Hero;