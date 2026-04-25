'use client';
import Link from "next/link";
import MagnetLens from '../effects/MagnetLens';

const Navbar = () => {
  return (
    /* 1. Changed top-10 to top-0 to pull it up.
       2. Set a fixed height (h-16).
       3. Removed py-4 (padding) to let Flexbox handle the centering.
    */
    <header className="fixed top-5 left-0 w-full h-16 z-[100] px-5 border-b border-white/5 bg-black/20 backdrop-blur-md">
        <nav className="flex items-center justify-between h-full max-w-7xl mx-auto">
            
            {/* Logo - Centered vertically via items-center on <nav> */}
            <Link href="/" className="text-white font-bold tracking-tight"> 
               Manish Tiwari
            </Link>
            
            {/* Nav Links - Centered vertically via h-full and items-center */}
            <ul className="flex items-center h-full gap-2">
                <li>
                  <Link href='/'>
                    <MagnetLens ghost color="#A855F7" strength={5}>Home</MagnetLens>
                  </Link>
                </li>
                <li>
                  <Link href='/'>
                    <MagnetLens ghost color="#A855F7" strength={5}>About</MagnetLens>
                  </Link>
                </li>
                <li>
                  <Link href='/'>
                    <MagnetLens ghost color="#A855F7" strength={5}>Skills</MagnetLens>
                  </Link>
                </li>
                <li>
                  <Link href='/'>
                    <MagnetLens ghost color="#A855F7" strength={5}>Projects</MagnetLens>
                  </Link>
                </li>
                <li>
                  <Link href='/'>
                    <MagnetLens ghost color="#A855F7" strength={5}>Experience</MagnetLens>
                  </Link>
                </li>
                <li>
                  <Link href='/'>
                    <MagnetLens ghost color="#A855F7" strength={5}>Contact</MagnetLens>
                  </Link>
                </li>
            </ul>
        </nav>
    </header>
  );
}

export default Navbar;