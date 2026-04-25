'use client';
import Magnet from './Magnet';
import StarBorder from './StarBorder';

const MagnetLens = ({ 
  children, 
  color = "#A855F7", 
  strength = 5, 
  baseWidth = "auto",
  ghost = false // New prop to disable button styles
}) => {
  return (
    <div className="relative inline-block z-50">
      <Magnet padding={ghost ? 40 : 120} disabled={false} magnetStrength={strength}>
        {/* Adjusted padding: Ghost mode needs very little padding to stay tight to the text */}
        <div className={`group relative flex items-center justify-center cursor-pointer ${ghost ? 'p-2' : 'p-32'}`}>
          
          {/* THE RING EFFECT (The only thing visible in ghost mode) */}
          <div 
            className="absolute pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out z-0" 
            style={{
              inset: ghost ? "-60px" : "-150px",
              background: `radial-gradient(circle ${ghost ? '70px' : '200px'} at center, transparent 15%, ${color}66 40%, transparent 80%)`
            }}
          />

          {/* THE MORPHING BACKGROUND - Hidden if ghost is true */}
          {!ghost && (
            <div 
              style={{ width: baseWidth }}
              className="absolute z-0 h-[60px] rounded-xl bg-[#0d1117] border border-zinc-800 transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:w-[400px] group-hover:h-[400px] group-hover:rounded-full group-hover:bg-transparent group-hover:border-transparent" 
            />
          )}

          {/* THE STAR BORDER - Hidden if ghost is true */}
          {!ghost && (
            <div className="absolute inset-0 z-0 flex items-center justify-center transition-all duration-200 group-hover:scale-150 group-hover:opacity-0 group-hover:blur-xl">
              <StarBorder as="div" color={color} speed="2s" style={{ width: baseWidth }} className="h-[60px] rounded-xl" />
            </div>
          )}

          {/* THE CONTENT - No scale-up for ghost mode to keep nav stable */}
          <div className={`relative z-30 transition-all duration-200 text-zinc-300 group-hover:text-white font-bold ${!ghost && 'group-hover:scale-150 text-xl'}`}>
            {children}
          </div>

        </div>
      </Magnet>
    </div>
  );
};

export default MagnetLens;