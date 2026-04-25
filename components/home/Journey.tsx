'use client';
import React from 'react';

const Journey = ({ data }) => {
  const timeline = data?.timeline || [
    {
      date: "2026 — Present",
      title: "Founder & Lead Architect",
      company: "Insight",
      description: "Building an automated technical audit platform for VCs and CTOs to evaluate software health and velocity.",
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

  return (
    <section className="bg-transparent text-white py-24 px-8 border-t border-zinc-900">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-20">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[#70f3b8] font-mono tracking-tighter">//</span>
            <span className="text-[#70f3b8] font-mono text-xs uppercase tracking-[0.3em]">
              Roadmap
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold italic tracking-tight">
            Journey
          </h2>
        </div>

        {/* Timeline Flow */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-[7px] md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#70f3b8] via-zinc-800 to-transparent" />

          <div className="space-y-12">
            {timeline.map((item, idx) => (
              <div key={idx} className={`relative flex flex-col md:flex-row items-center ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Center Circle */}
                <div className="absolute left-0 md:left-1/2 -translate-x-[1px] md:-translate-x-1/2 w-4 h-4 rounded-full border-2 border-[#70f3b8] bg-[#050505] z-10" />

                {/* Content Card */}
                <div className="w-full md:w-5/12 ml-8 md:ml-0 group">
                  <div className="p-6 rounded-2xl bg-[#0d1117] border border-zinc-800 group-hover:border-[#70f3b8]/30 transition-all duration-300">
                    <span className="text-[#70f3b8] font-mono text-[10px] uppercase tracking-widest block mb-2">
                      {item.date}
                    </span>
                    <h3 className="text-xl font-bold text-zinc-100 mb-1">
                      {item.title}
                    </h3>
                    <h4 className="text-zinc-500 font-medium text-sm mb-4">
                      {item.company}
                    </h4>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Empty Space for Desktop layout */}
                <div className="hidden md:block md:w-2/12" />
                <div className="hidden md:block md:w-5/12" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journey;