import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../hooks/useMediaQuery";

/**
 * The AFTERO signature: an "A" held inside a slowly rotating orbital
 * ring, with a glowing point tracing the path — the idea, orbited by
 * everything that comes after it.
 */
export default function OrbitMark({ size = 220, className = "" }) {
  const reducedMotion = usePrefersReducedMotion();
  const r = size / 2;

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 200 200"
        width={size}
        height={size}
        className="absolute inset-0"
      >
        <defs>
          <radialGradient id="orbitGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6C63FF" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#6C63FF" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="ringStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6C63FF" />
            <stop offset="100%" stopColor="#00E5FF" />
          </linearGradient>
        </defs>

        <circle cx="100" cy="100" r="96" fill="url(#orbitGlow)" />

        {/* outer orbit ring */}
        <motion.circle
          cx="100"
          cy="100"
          r="88"
          fill="none"
          stroke="rgba(255,255,255,0.14)"
          strokeWidth="1"
        />

        {/* rotating dashed ring */}
        <motion.circle
          cx="100"
          cy="100"
          r="70"
          fill="none"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth="1"
          strokeDasharray="1 7"
          animate={reducedMotion ? {} : { rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "100px 100px" }}
        />

        {/* main orbit path with glowing dot */}
        <motion.g
          animate={reducedMotion ? {} : { rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "100px 100px" }}
        >
          <circle cx="100" cy="30" r="3.2" fill="#00E5FF" />
          <circle cx="100" cy="30" r="7" fill="#00E5FF" opacity="0.35" />
        </motion.g>

        <circle
          cx="100"
          cy="100"
          r="88"
          fill="none"
          stroke="url(#ringStroke)"
          strokeWidth="1"
          strokeDasharray="4 550"
          opacity="0.9"
        />
      </svg>

      <span
        className="relative select-none font-bold"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: size * 0.34,
          background: "linear-gradient(180deg, #ffffff 0%, #C8C8C8 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        A
      </span>
    </div>
  );
}
