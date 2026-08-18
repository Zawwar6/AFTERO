import { motion } from "framer-motion";

const points = [
  {
    title: "Strategy First",
    description: "We don't just build. We understand why.",
  },
  {
    title: "Design Meets Technology",
    description: "Creative thinking combined with engineering.",
  },
  {
    title: "Built for Growth",
    description: "Every digital experience is designed with scalability in mind.",
  },
  {
    title: "One Creative Partner",
    description: "Design, development, SEO and visual content under one roof.",
  },
];

export default function WhyAftero() {
  return (
    <section className="relative bg-black py-32 md:py-44">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-16 md:mb-24">
          <span className="eyebrow">Why AFTERO</span>
          <h2 className="font-display mt-6 max-w-2xl text-4xl font-bold leading-[1.05] text-balance sm:text-5xl md:text-6xl">
            Built by people who care as much about the outcome as the craft.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2">
          {points.map((point, i) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: (i % 2) * 0.1 }}
              className="border-t border-white/10 pt-8"
            >
              <span className="eyebrow">0{i + 1}</span>
              <h3 className="font-display mt-4 text-3xl font-semibold sm:text-4xl">
                {point.title}
              </h3>
              <p className="mt-4 max-w-sm text-lg text-white/55">
                {point.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
