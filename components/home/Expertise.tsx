'use client';
import { useRef, useEffect, useState } from 'react';

// ─── Scroll reveal hook ───────────────────────────────────────────────────────
function useInView(threshold = 0.2): [React.RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // ✅ This updates EVERY time the element enters or leaves
        setInView(entry.isIntersecting);
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}
// ─── Skill bar ────────────────────────────────────────────────────────────────
function SkillBar({ name, proficiency, inView }: { name: string; proficiency: number; inView: boolean }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-zinc-400 text-sm font-medium">{name}</span>
        <span className="text-[#70f3b8] font-mono text-xs">{proficiency}%</span>
      </div>
      <div className="h-[3px] bg-zinc-800 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#70f3b8] to-[#A855F7] transition-all duration-1000 ease-out"
          style={{ width: inView ? `${proficiency}%` : '0%' }}
        />
      </div>
    </div>
  );
}

// ─── Spinner ──────────────────────────────────────────────────────────────────
function Spinner() {
  return (
    <div className="flex justify-center py-16">
      <div className="w-8 h-8 rounded-full border-2 border-zinc-700 border-t-[#70f3b8] animate-spin" />
    </div>
  );
}

// ─── Error banner ─────────────────────────────────────────────────────────────
function ErrorBanner({ message }: { message: string }) {
  return (
    <div className="border border-red-500/20 bg-red-500/5 rounded-xl px-6 py-4 text-red-400 font-mono text-sm text-center">
      {message}
    </div>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────
interface Skill {
  id: string;
  name: string;
  proficiency: number;
}

interface Category {
  id: string;
  name: string;
  skills: Skill[];
}

// ─── Main component ───────────────────────────────────────────────────────────
const Expertise = ({ data }: { data?: { categories?: Category[] } }) => {
  const [ref, inView] = useInView();

  // State for async-ready data
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If parent passes data, use it directly — otherwise simulate fetch
    // Replace this block with your real fetchSkillCategories() call
    const load = async () => {
      try {
        setLoading(true);
        await new Promise(r => setTimeout(r, 600)); // simulate network

        const fallback: Category[] = data?.categories?.map((c, i) => ({
          id: String(i),
          name: c.title ?? (c as any).name,
          skills: (c.skills as any[]).map((s, si) =>
            typeof s === 'string'
              ? { id: String(si), name: s, proficiency: 70 + Math.floor(Math.random() * 25) }
              : s
          ),
        })) ?? [
          {
            id: '0', name: 'Frontend',
            skills: [
              { id: '0', name: 'React', proficiency: 92 },
              { id: '1', name: 'Next.js', proficiency: 88 },
              { id: '2', name: 'Tailwind CSS', proficiency: 95 },
              { id: '3', name: 'Three.js', proficiency: 72 },
              { id: '4', name: 'Framer Motion', proficiency: 80 },
            ]
          },
          {
            id: '1', name: 'Backend',
            skills: [
              { id: '0', name: 'Node.js', proficiency: 85 },
              { id: '1', name: 'Django', proficiency: 78 },
              { id: '2', name: 'Flask', proficiency: 75 },
              { id: '3', name: 'PostgreSQL', proficiency: 82 },
              { id: '4', name: 'MySQL', proficiency: 80 },
            ]
          },
          {
            id: '2', name: 'Specialized',
            skills: [
              { id: '0', name: 'Computer Vision', proficiency: 76 },
              { id: '1', name: 'OpenCV', proficiency: 74 },
              { id: '2', name: 'Biometrics', proficiency: 70 },
              { id: '3', name: 'SaaS Metrics', proficiency: 78 },
            ]
          },
          {
            id: '3', name: 'Tools & DevOps',
            skills: [
              { id: '0', name: 'Git', proficiency: 93 },
              { id: '1', name: 'Docker', proficiency: 80 },
              { id: '2', name: 'AWS', proficiency: 72 },
              { id: '3', name: 'Vercel', proficiency: 90 },
              { id: '4', name: 'Linux', proficiency: 85 },
            ]
          },
        ];

        setCategories(fallback);
      } catch (e) {
        setError('Failed to load skills. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [data]);

  // 1. Attach ref to a wrapper div that's ALWAYS in the DOM, outside the conditional
return (
  <section id="expertise" className="text-white py-24 px-8 border-t border-zinc-900">
    <div className="max-w-6xl mx-auto">

      {/* Header stays same... */}

      {loading && <Spinner />}
      {error && <ErrorBanner message={error} />}

      {/* ✅ ref is always mounted, not inside {categories && ...} */}
      <div ref={ref}>
        {categories && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, ci) => (
              <div
                key={cat.id}
                className="bg-[#0d1117] border border-zinc-800/50 rounded-2xl p-6 hover:border-[#70f3b8]/20 hover:bg-[#11161d] transition-colors duration-300"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(32px)',
                  transition: `opacity 0.6s ease, transform 0.6s ease`,
                  transitionDelay: inView ? `${ci * 100}ms` : '0ms',
                }}
              >
                <h3 className="text-[#70f3b8] font-mono text-xs uppercase tracking-widest mb-6 pb-2 border-b border-zinc-800">
                  {cat.name}
                </h3>
                <div>
                  {cat.skills.map(skill => (
                    <SkillBar key={skill.id} name={skill.name} proficiency={skill.proficiency} inView={inView} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="mt-12 text-center text-zinc-600 font-mono text-[10px] uppercase tracking-[0.5em]">
        Always evolving • Based on industry standards
      </p>
    </div>
  </section>
);
};
export default Expertise;