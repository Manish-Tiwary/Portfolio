'use client';
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    // Add your backend logic or EmailJS here
  };

  return (
    <section className="bg-transparent text-white py-24 px-8 border-t border-zinc-900">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Left Side: Text & Info */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[#70f3b8] font-mono tracking-tighter">//</span>
            <span className="text-[#70f3b8] font-mono text-xs uppercase tracking-[0.3em]">
              Get in touch
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold italic mb-6">Let's Work Together</h2>
          <p className="text-zinc-400 mb-8 max-w-md leading-relaxed">
            Whether you're looking to build something new, improve an existing product, or just want to connect — drop me a message and I'll get back to you within 24 hours.
          </p>

          {/* Response Time Badge */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <span className="text-[#70f3b8]">🕒</span>
            </div>
            <div>
              <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Response Time</p>
              <p className="text-zinc-200 font-medium">Within 24 hours</p>
            </div>
          </div>

          {/* Availability Card */}
          <div className="p-6 rounded-2xl bg-[#0d1117] border border-zinc-800 max-w-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-[#70f3b8] animate-pulse" />
              <p className="text-sm font-bold text-zinc-200">Currently available</p>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Open to full-time roles, freelance projects, and long-term collaborations.
            </p>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="bg-[#0d1117] border border-zinc-800 p-8 rounded-3xl relative overflow-hidden">
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Name</label>
                <input 
                  type="text" 
                  placeholder="Jane Smith"
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#70f3b8]/50 transition-colors"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Email</label>
                <input 
                  type="email" 
                  placeholder="jane@example.com"
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#70f3b8]/50 transition-colors"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Subject</label>
              <input 
                type="text" 
                placeholder="Project collaboration"
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#70f3b8]/50 transition-colors"
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Message</label>
              <textarea 
                rows="4"
                placeholder="Tell me about your project..."
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#70f3b8]/50 transition-colors resize-none"
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              />
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-[#70f3b8] text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all"
            >
              <span className="text-lg">▲</span> Send Message
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};

export default Contact;