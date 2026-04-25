'use client';
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-transparent text-white py-12 px-8 border-t border-zinc-900">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Logo/Name Section */}
        <div className="flex flex-col items-center md:items-start">
          <span className="text-xl font-black tracking-tighter hover:text-[#70f3b8] transition-colors cursor-default">
            Manish Tiwari<span className="text-[#70f3b8]">.</span>
          </span>
          <p className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] mt-2">
            Built with Next JS & Passion
          </p>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-6">
          <a href="#" className="text-zinc-400 hover:text-[#70f3b8] transition-colors text-sm font-mono tracking-tighter">
            GITHUB
          </a>
          <a href="#" className="text-zinc-400 hover:text-[#70f3b8] transition-colors text-sm font-mono tracking-tighter">
            LINKEDIN
          </a>
          <a href="#" className="text-zinc-400 hover:text-[#70f3b8] transition-colors text-sm font-mono tracking-tighter">
            TWITTER
          </a>
        </div>

        {/* Copyright */}
        <div className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">
          © {currentYear} — ALL RIGHTS RESERVED
        </div>
        
      </div>

      {/* Decorative Bottom Bar */}
      <div className="max-w-6xl mx-auto mt-12 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
    </footer>
  );
};

export default Footer;