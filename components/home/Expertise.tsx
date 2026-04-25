'use client';

const Expertise = ({ data }) => {
  // Fallback data structure for when you connect your DB
  const categories = data?.categories || [
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
      title: "Tools & DevOp",
      skills: ["Git", "Docker", "AWS", "Vercel", "Linux"]
    }
  ];

  return (
    <section className=" text-white py-24 px-8 border-t border-zinc-900">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[#70f3b8] font-mono tracking-tighter">//</span>
            <span className="text-[#70f3b8] font-mono text-xs uppercase tracking-[0.3em]">
              Expertise
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold italic tracking-tight">
            Skills & Tools
          </h2>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-800 border border-zinc-800 rounded-2xl overflow-hidden">
          {categories.map((cat, idx) => (
            <div 
              key={idx} 
              className="bg-[#0d1117] p-8 hover:bg-[#11161d] transition-colors group"
            >
              <h3 className="text-[#70f3b8] font-mono text-sm mb-6 uppercase tracking-widest border-b border-zinc-800 pb-2">
                {cat.title}
              </h3>
              <ul className="space-y-3">
                {cat.skills.map((skill, sIdx) => (
                  <li key={sIdx} className="flex items-center gap-2 text-zinc-400 group-hover:text-zinc-300 transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-700 group-hover:bg-[#70f3b8] transition-colors" />
                    <span className="text-sm font-medium">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Subtle Footer Quote or Tech Stack Note */}
        <p className="mt-12 text-center text-zinc-600 font-mono text-[10px] uppercase tracking-[0.5em]">
          Always evolving • Based on industry standards
        </p>
      </div>
    </section>
  );
};

export default Expertise;