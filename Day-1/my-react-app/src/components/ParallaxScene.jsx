import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

const ParallaxScene = ({ totalCount, completedCount, remainingCount }) => {
  const { scrollY } = useScroll();
  const prefersReducedMotion = useReducedMotion();

  const y1 = useTransform(scrollY, [0, 240], [0, -70]);
  const y2 = useTransform(scrollY, [0, 240], [0, -120]);
  const y3 = useTransform(scrollY, [0, 240], [0, 80]);
  const x1 = useTransform(scrollY, [0, 240], [0, -24]);
  const x2 = useTransform(scrollY, [0, 240], [0, 24]);
  const scale = useTransform(scrollY, [0, 240], [1, 1.03]);

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/70 px-6 py-8 shadow-[0_30px_90px_-30px_rgba(15,23,42,0.9)] backdrop-blur-xl sm:px-8 lg:px-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.22),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.18),_transparent_45%)]" />
      <motion.div
        className="absolute -left-10 top-10 h-32 w-32 rounded-full bg-indigo-500/20 blur-3xl"
        style={{ y: prefersReducedMotion ? 0 : y1, x: prefersReducedMotion ? 0 : x1 }}
      />
      <motion.div
        className="absolute right-12 top-4 h-44 w-44 rounded-full bg-cyan-400/15 blur-3xl"
        style={{ y: prefersReducedMotion ? 0 : y2, x: prefersReducedMotion ? 0 : x2 }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 h-40 w-40 rounded-full bg-emerald-400/10 blur-3xl"
        style={{ y: prefersReducedMotion ? 0 : y3 }}
      />

      <motion.div
        className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
        style={{ scale: prefersReducedMotion ? 1 : scale }}
      >
        <div className="max-w-2xl">
          <p className="mb-3 inline-flex items-center rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-slate-300">
            Calm productivity • refined focus
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            A beautifully calm space for your next big day.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
            Capture ideas, keep momentum, and turn your priorities into a polished daily ritual with a thoughtful, cinematic workspace.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[340px]">
          <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-4 backdrop-blur">
            <p className="text-sm text-slate-300">Total</p>
            <p className="mt-1 text-2xl font-semibold text-white">{totalCount}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-4 backdrop-blur">
            <p className="text-sm text-slate-300">Done</p>
            <p className="mt-1 text-2xl font-semibold text-emerald-300">{completedCount}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-4 backdrop-blur">
            <p className="text-sm text-slate-300">Left</p>
            <p className="mt-1 text-2xl font-semibold text-sky-300">{remainingCount}</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ParallaxScene;
