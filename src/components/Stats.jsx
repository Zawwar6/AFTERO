import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { usePrefersReducedMotion } from "../hooks/useMediaQuery";

const stats = [
  { value: 50, suffix: "+", label: "Projects" },
  { value: 20, suffix: "+", label: "Brands" },
  { value: 6, suffix: "", label: "Core Services" },
  { value: 100, suffix: "%", label: "Commitment" },
];

function Counter({ value, suffix, duration = 1.6 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reducedMotion = usePrefersReducedMotion();
  const [display, setDisplay] = useState(reducedMotion ? value : 0);

  useEffect(() => {
    if (!inView || reducedMotion) return;
    let start;
    let frame;
    const tick = (t) => {
      if (!start) start = t;
      const progress = Math.min((t - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration, reducedMotion]);

  return (
    <span ref={ref} className="font-display text-6xl font-bold sm:text-7xl">
      {display}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="relative border-y border-white/10 bg-black py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-2 gap-y-14 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="flex flex-col items-start"
            >
              <Counter value={stat.value} suffix={stat.suffix} />
              <span className="eyebrow mt-3">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
