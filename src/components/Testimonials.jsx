import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { testimonials } from "../data/testimonials";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = (dir) => {
    setDirection(dir);
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length);
  };

  const current = testimonials[index];

  return (
    <section className="relative bg-black py-32 md:py-44">
      <div className="mx-auto max-w-4xl px-6 md:px-10">
        <div className="mb-16 text-center">
          <span className="eyebrow">Client Feedback</span>
          <h2 className="font-display mt-6 text-4xl font-bold sm:text-5xl">
            WHAT THEY SAY
          </h2>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] px-8 py-14 md:px-16 md:py-20">
          <Quote className="mx-auto mb-8 text-[#6C63FF]" size={32} />

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current.id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 40 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, info) => {
                if (info.offset.x < -80) go(1);
                else if (info.offset.x > 80) go(-1);
              }}
              className="cursor-grab text-center active:cursor-grabbing"
            >
              <p className="font-display text-balance text-2xl font-medium leading-snug text-white sm:text-3xl">
                "{current.quote}"
              </p>
              <div className="mt-8">
                <p className="font-semibold text-white">{current.name}</p>
                <p className="text-sm text-white/45">
                  {current.role}, {current.company}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-12 flex items-center justify-center gap-4">
            <button
              onClick={() => go(-1)}
              data-cursor="hover"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white hover:text-white"
              aria-label="Previous testimonial"
            >
              <ArrowLeft size={16} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setDirection(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-6 bg-white" : "w-1.5 bg-white/25"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => go(1)}
              data-cursor="hover"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white hover:text-white"
              aria-label="Next testimonial"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
