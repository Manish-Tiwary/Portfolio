'use client';
import ProfileCard from '../effects/ProfileCard'

const AboutSection = () => {
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

  return (
    <section className="text-white py-24 px-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        
        {/* Left Column: Text Content & Profile Card */}
        <div className="flex flex-col justify-start space-y-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[#70f3b8] font-mono tracking-tighter">//</span>
              <span className="text-[#70f3b8] font-mono text-xs uppercase tracking-[0.3em]">About Me</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-6 italic tracking-tight leading-none">
              Who I Am
            </h2>
            <p className="text-zinc-400 max-w-md text-lg leading-relaxed">
              I'm a full-stack engineer passionate about building high-performance 
              applications with clean, scalable architecture.
            </p>
          </div>
          
          <div className="max-w-md transform hover:scale-[1.02] transition-transform duration-500">
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
              onContactClick={() => console.log('Contact clicked')}
              behindGlowColor="#A855F7" 
              iconUrl="/coding.svg"
              behindGlowEnabled
              innerGradient="linear-gradient(145deg,#1e1e1e 10%,#0d1117 100%)"
            />
          </div>
        </div>

        {/* Right Column: Cards & Stats */}
        <div className="flex flex-col justify-center space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="group relative bg-[#0d1117] border border-zinc-800/50 p-8 rounded-3xl flex flex-col items-center justify-center transition-all duration-500 hover:border-[#70f3b8]/40 hover:bg-[#11161d]"
              >
                {/* Subtle background glow on hover */}
                <div className="absolute inset-0 bg-[#70f3b8]/5 opacity-0 group-hover:opacity-100 rounded-3xl blur-xl transition-opacity duration-500" />
                
                <span className="relative text-4xl md:text-5xl font-black text-[#70f3b8] mb-2 tracking-tighter">
                  {stat.value}
                </span>
                <span className="relative text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-bold">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Quick Facts Card */}
          <div className="bg-[#0d1117]/50 backdrop-blur-sm border border-zinc-800/50 p-10 rounded-3xl">
            <h3 className="text-xs font-bold mb-10 tracking-[0.3em] uppercase text-zinc-500 border-b border-zinc-800/50 pb-4">
              Quick Facts
            </h3>
            <ul className="space-y-8">
              {facts.map((fact, index) => (
                <li key={index} className="flex items-start gap-5 group">
                  <span className="text-2xl bg-zinc-800/50 p-3 rounded-xl group-hover:bg-[#A855F7]/10 group-hover:text-[#A855F7] transition-all duration-300">
                    {fact.emoji}
                  </span>
                  <div className="flex flex-col space-y-1">
                    <span className="text-zinc-300 text-sm md:text-base font-medium leading-snug group-hover:text-white transition-colors">
                      {fact.text}
                    </span>
                  </div>
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