'use client';
import Link from "next/link";
import MagnetLens from '../effects/MagnetLens';

const Navbar = () => {
  return (
    // Invisible by default — GSAP in Hero will animate this in Stage 3
    <header
      id="site-navbar"
     className="fixed top-0 left-0 w-full h-16 z-[100] px-8 bg-transparent"
      style={{ opacity: 0, transform: 'translateY(-80px)' }}
    >
      <nav className="flex items-center justify-between h-full max-w-7xl mx-auto">
        <Link href="/" className="text-white font-bold tracking-tight">
          Manish Tiwari
        </Link>
        <ul className="flex items-center h-full gap-2 list-none">
          {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'].map(item => (
            <li key={item}>
              <Link href={`#${item}`}>
                <MagnetLens ghost color="#A855F7" strength={5}>{item}</MagnetLens>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;