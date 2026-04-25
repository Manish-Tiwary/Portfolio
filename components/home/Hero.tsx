'use client';
import React, { useRef } from 'react';
import MagnetLens from '../effects/MagnetLens';

const Hero = ({ data }) => {
  const containerRef = useRef(null);

  return (
    <section 
      className="relative min-h-screen w-full flex flex-col items-center justify-center bg-transparent overflow-hidden antialiased"
    >
      <div className="flex flex-col items-start max-w-4xl px-8 z-10">
        
        {/* Status Badge */}
        <div className="flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-mono tracking-widest text-emerald-400 uppercase">
            {data?.statusLabel || "Available for opportunities"}
          </span>
        </div>

        {/* Subheader */}
        <h2 className="text-zinc-500 font-mono text-sm tracking-[0.3em] mb-2 uppercase select-none">
          {data?.greeting || "Hi, I'm"}
        </h2>

        {/* Main Name with Dual Colors */}
        <div ref={containerRef} className="mb-4">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[1.1] font-sans">
            <span className="text-white">Manish</span>{" "}
            <span className="text-[#A855F7]">Tiwari.</span>
          </h1>
        </div>

        {/* Title */}
        <p className="text-2xl md:text-3xl text-zinc-400 font-medium mb-12 tracking-tight">
          {data?.role || "Full-Stack Engineer"}
        </p>

        {/* The Animated Button */}
        <div className="min-h-[64px] flex items-start justify-start">
          <MagnetLens color="#A855F7" baseWidth="220px">
            View Projects
          </MagnetLens>
        </div>
      </div>
      
    </section>
  );
};

export default Hero;