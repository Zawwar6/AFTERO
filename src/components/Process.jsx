import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const steps = [
  {
    index: "01",
    title: "DISCOVER",
    description: "Understand the business, audience and goals.",
  },
  {
    index: "02",
    title: "DESIGN",
    description: "Turn strategy into a strong visual and UX direction.",
  },
  {
    index: "03",
    title: "BUILD",
    description: "Develop the product using modern technology.",
  },
  {
    index: "04",
    title: "GROW",
    description: "Optimize, launch and scale.",
  },
];

function StepRow({ step, i, total }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.3"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.2, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.96, 1]);
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className="relative border-b border-white/10 py-10 md:py-14">
      <motion.div
        style={{ opacity, scale }}
        className="flex flex-col gap-4 md:flex-row md:items-center md:gap-10"
      >
        <span className="font-display text-lg text-white/30 md:w-16">
          {step.index}
        </span>
        <h3 className="font-display text-4xl font-bold sm:text-5xl md:text-6xl md:w-80">
          {step.title}
        </h3>
        <p className="max-w-md text-white/55 text-lg md:ml-auto">
          {step.description}
        </p>
      </motion.div>
      <motion.div
        style={{ width: lineWidth }}
        className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-[#6C63FF] to-[#00E5FF]"
      />
    </div>
  );
}

export default function Process() {
  return (
    <section id="process" className="relative bg-black py-32 md:py-44">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-16 md:mb-24">
          <span className="eyebrow">Our Process</span>
          <h2 className="font-display mt-6 text-4xl font-bold leading-[1.02] sm:text-5xl md:text-6xl">
            HOW WE BUILD
            <br />
            <span className="text-white/30">WHAT COMES NEXT.</span>
          </h2>
        </div>

        <div>
          {steps.map((step, i) => (
            <StepRow key={step.index} step={step} i={i} total={steps.length} />
          ))}
        </div>
      </div>
    </section>
  );
}
