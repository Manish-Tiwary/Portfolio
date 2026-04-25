'use client';
import React from 'react';
import Magnet from '../effects/Magnet';

const Projects = ({ data }) => {
  // Fallback projects if data is not provided yet
  const projectList = data?.projects || [
    {
      title: "Insight",
      description: "Real-time technical audit platform for VCs and CTOs to analyze software health.",
      tech: ["Next.js", "Node.js", "GitHub API"],
      link: "#"
    },
    {
      title: "Biometric Attendance",
      description: "AI-powered system using OpenCV and FaceNet for high-security admin management.",
      tech: ["Python", "OpenCV", "MySQL"],
      link: "#"
    },
    {
      title: "Snapsync",
      description: "A collaborative media synchronization tool for specialized team workflows.",
      tech: ["React", "Firebase", "WebRTC"],
      link: "#"
    }
  ];

  return (
    <section className="bg-transparent text-white py-24 px-8 border-t border-zinc-900">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[#70f3b8] font-mono tracking-tighter">//</span>
            <span className="text-[#70f3b8] font-mono text-xs uppercase tracking-[0.3em]">
              Selected Work
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold italic tracking-tight">
            Featured Projects
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectList.map((project, idx) => (
            <div 
              key={idx}
              className="group relative bg-[#0d1117] border border-zinc-800 rounded-3xl p-8 hover:border-[#70f3b8]/40 transition-all duration-500 overflow-hidden"
            >
              {/* Background Glow Effect on Hover */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#70f3b8]/20 to-purple-500/10 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-bold tracking-tight group-hover:text-[#70f3b8] transition-colors">
                    {project.title}
                  </h3>
                  <div className="text-[#70f3b8] opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 duration-300">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </div>
                </div>

                <p className="text-zinc-400 mb-8 flex-grow leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((t, i) => (
                    <span key={i} className="text-[10px] font-mono px-3 py-1 bg-zinc-900 border border-zinc-800 text-zinc-500 rounded-full group-hover:border-[#70f3b8]/20 group-hover:text-zinc-300 transition-colors">
                      {t}
                    </span>
                  ))}
                </div>

                <Magnet padding={20} magnetStrength={10}>
                  <a 
                    href={project.link} 
                    className="inline-block text-xs font-bold uppercase tracking-widest text-[#70f3b8] hover:underline"
                  >
                    View Case Study
                  </a>
                </Magnet>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;