import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const stages = ["IDEA", "DESIGN", "BUILD", "GROW", "IMPACT"];

export default function BrandStory() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.3"],
  });

  return (
    <section id="about" ref={ref} className="relative bg-black py-32 md:py-44">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div>
            <span className="eyebrow">Our Philosophy</span>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8 }}
              className="font-display mt-6 text-4xl font-bold leading-[1.05] text-balance sm:text-5xl md:text-6xl"
            >
              An idea is only{" "}
              <span className="text-white/30">the beginning.</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-10 space-y-5 max-w-md text-white/55 text-lg leading-relaxed"
            >
              <p>
                After the idea comes design. After design comes technology.
                After technology comes visibility. After visibility comes
                growth.
              </p>
              <p className="text-white">
                AFTERO exists to build everything that comes after the idea.
              </p>
            </motion.div>
          </div>

          <div className="relative flex flex-col justify-center">
            {stages.map((stage, i) => {
              const start = i / stages.length;
              const end = (i + 1) / stages.length;
              const opacity = useTransform(
                scrollYProgress,
                [start, start + 0.06, end - 0.06, end],
                [0.18, 1, 1, i === stages.length - 1 ? 1 : 0.18]
              );
              const x = useTransform(scrollYProgress, [start, start + 0.06], [24, 0]);

              return (
                <div key={stage} className="relative">
                  <motion.div
                    style={{ opacity, x }}
                    className="flex items-center gap-6 border-b border-white/10 py-6 md:py-8"
                  >
                    <span className="eyebrow w-8 shrink-0">0{i + 1}</span>
                    <span className="font-display text-4xl font-bold text-white sm:text-5xl md:text-6xl">
                      {stage}
                    </span>
                    {i < stages.length - 1 && (
                      <span className="ml-auto hidden text-white/20 sm:block">↓</span>
                    )}
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
