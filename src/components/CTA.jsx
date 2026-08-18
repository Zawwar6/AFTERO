import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { usePrefersReducedMotion, useIsTouchDevice } from "../hooks/useMediaQuery";

export default function CTA() {
  const ref = useRef(null);
  const reducedMotion = usePrefersReducedMotion();
  const isTouch = useIsTouchDevice();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 20 });
  const sy = useSpring(my, { stiffness: 50, damping: 20 });

  const orbX = useTransform(sx, (v) => `calc(50% + ${v * 0.5}px)`);
  const orbY = useTransform(sy, (v) => `calc(50% + ${v * 0.5}px)`);

  const handleMove = (e) => {
    if (reducedMotion || isTouch || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set(e.clientX - rect.left - rect.width / 2);
    my.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <section
      id="contact"
      ref={ref}
      onMouseMove={handleMove}
      className="relative overflow-hidden bg-black py-40 md:py-56"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute h-[600px] w-[600px] rounded-full blur-3xl"
        style={{
          left: orbX,
          top: orbY,
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(circle, rgba(108,99,255,0.35) 0%, rgba(0,229,255,0.1) 45%, rgba(0,0,0,0) 70%)",
        }}
      />
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-30" />

      <div className="relative mx-auto max-w-5xl px-6 text-center md:px-10">
        <span className="eyebrow">Get in touch</span>

        <h2 className="font-display mt-8 text-[13vw] font-bold leading-[0.95] sm:text-6xl md:text-8xl">
          HAVE AN IDEA?
        </h2>
        <h2 className="font-display mt-2 text-[13vw] font-bold leading-[0.95] text-white/30 sm:text-6xl md:text-8xl">
          LET'S BUILD
          <br />
          WHAT COMES NEXT.
        </h2>

        <a
            href="https://wa.me/923321360570?text=Hi%20I%27d%20like%20to%20start%20a%20project"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            data-cursor-label="Go"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition-transform hover:scale-[1.03]"
          >
            Start a Project
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
      </div>
    </section>
  );
}
