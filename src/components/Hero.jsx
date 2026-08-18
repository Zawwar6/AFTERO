import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import OrbitMark from "./OrbitMark";
import { usePrefersReducedMotion, useIsTouchDevice } from "../hooks/useMediaQuery";

const words = ["WE BUILD", "WHAT COMES", "NEXT."];

export default function Hero() {
  const reducedMotion = usePrefersReducedMotion();
  const isTouch = useIsTouchDevice();
  const ref = useRef(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });

  const glowX = useTransform(sx, (v) => `calc(50% + ${v * 0.4}px)`);
  const glowY = useTransform(sy, (v) => `calc(50% + ${v * 0.4}px)`);
  const orbitRotateX = useTransform(sy, [-200, 200], [8, -8]);
  const orbitRotateY = useTransform(sx, [-200, 200], [-8, 8]);
  const parallaxX = useTransform(sx, (v) => v * 0.03);
  const parallaxY = useTransform(sy, (v) => v * 0.03);

  const handleMouseMove = (e) => {
    if (reducedMotion || isTouch || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set(e.clientX - rect.left - rect.width / 2);
    my.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <section
      id="home"
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-black pt-28"
    >
      {/* Background layers */}
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="noise absolute inset-0" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute h-[700px] w-[700px] rounded-full"
        style={{
          left: glowX,
          top: glowY,
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(circle, rgba(108,99,255,0.22) 0%, rgba(108,99,255,0) 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-10 h-[420px] w-[420px] rounded-full opacity-40"
        style={{
          background: "radial-gradient(circle, rgba(0,229,255,0.14) 0%, rgba(0,229,255,0) 65%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black" />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-6 md:px-10 lg:grid-cols-[1.3fr_1fr]">
        {/* Text */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="eyebrow mb-6"
          >
            Digital Agency — Est. Karachi / Global
          </motion.div>

          <h1 className="font-display text-[15vw] font-bold leading-[0.95] tracking-tight text-white sm:text-[9vw] lg:text-[5.4vw]">
            {words.map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className={`block ${i === 2 ? "text-[#6C63FF]" : ""}`}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-8 max-w-md text-balance text-lg text-white/60"
          >
            We transform ideas into powerful digital experiences, brands and
            products built for growth.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
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
            <a
              href="#work"
              data-cursor="hover"
              data-cursor-label="View"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white/50"
            >
              Explore Our Work
            </a>
          </motion.div>
        </div>

        {/* Orbital visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative hidden justify-self-center lg:flex"
          style={{
            perspective: 800,
          }}
        >
          <motion.div
            style={{
              rotateX: orbitRotateX,
              rotateY: orbitRotateY,
              x: parallaxX,
              y: parallaxY,
            }}
          >
            <OrbitMark size={340} />
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-white/40"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={reducedMotion ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  );
}
