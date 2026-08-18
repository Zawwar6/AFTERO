import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import { services } from "../data/services";

export default function Services() {
  const [active, setActive] = useState(0);

  return (
    <section id="services" className="relative bg-black py-32 md:py-44">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-16 flex flex-col justify-between gap-6 md:mb-24 md:flex-row md:items-end">
          <div>
            <span className="eyebrow">What we do</span>
            <h2 className="font-display mt-6 text-4xl font-bold leading-[1.02] sm:text-5xl md:text-6xl">
              EVERYTHING
              <br />
              <span className="text-white/30">AFTER THE IDEA.</span>
            </h2>
          </div>
          <p className="max-w-xs text-white/50">
            Six disciplines, one team — carried from first sketch through to
            measurable growth.
          </p>
        </div>

        {/* Desktop editorial interaction */}
        <div className="hidden lg:grid lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            {services.map((service, i) => (
              <button
                key={service.id}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                data-cursor="hover"
                className="group flex w-full items-center gap-6 border-b border-white/10 py-6 text-left transition-colors first:border-t"
              >
                <span
                  className={`eyebrow w-8 shrink-0 transition-colors ${
                    active === i ? "text-[#6C63FF]" : ""
                  }`}
                >
                  {service.index}
                </span>
                <span
                  className={`font-display text-3xl font-semibold transition-all duration-300 xl:text-4xl ${
                    active === i ? "text-white translate-x-2" : "text-white/35"
                  }`}
                >
                  {service.title}
                </span>
                <ArrowUpRight
                  size={20}
                  className={`ml-auto shrink-0 transition-all duration-300 ${
                    active === i ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative"
              >
                <div
                  aria-hidden
                  className="absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-30 blur-3xl"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(108,99,255,0.6), transparent 70%)",
                  }}
                />
                <span className="font-display text-8xl font-bold text-white/10">
                  {services[active].index}
                </span>
                <h3 className="font-display mt-4 text-3xl font-bold">
                  {services[active].title}
                </h3>
                <p className="mt-5 max-w-sm text-white/60 leading-relaxed">
                  {services[active].description}
                </p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {services[active].tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile / tablet accordion */}
        <div className="lg:hidden">
          {services.map((service, i) => {
            const isOpen = active === i;
            return (
              <div key={service.id} className="border-b border-white/10 first:border-t">
                <button
                  onClick={() => setActive(isOpen ? -1 : i)}
                  className="flex w-full items-center gap-4 py-6 text-left"
                >
                  <span className="eyebrow w-8 shrink-0">{service.index}</span>
                  <span className="font-display flex-1 text-xl font-semibold sm:text-2xl">
                    {service.title}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Plus size={18} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pl-14 pr-4 text-white/55 leading-relaxed">
                        {service.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
