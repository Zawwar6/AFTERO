import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useIsTouchDevice, usePrefersReducedMotion } from "../hooks/useMediaQuery";

export default function CustomCursor() {
  const isTouch = useIsTouchDevice();
  const reducedMotion = usePrefersReducedMotion();
  const [label, setLabel] = useState("");
  const [variant, setVariant] = useState("default");

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const springX = useSpring(mx, { stiffness: 500, damping: 40, mass: 0.3 });
  const springY = useSpring(my, { stiffness: 500, damping: 40, mass: 0.3 });

  const active = useRef(false);

  useEffect(() => {
    if (isTouch || reducedMotion) return;

    const move = (e) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      if (!active.current) {
        active.current = true;
        document.documentElement.classList.add("cursor-ready");
      }
    };

    const onOver = (e) => {
      const el = e.target.closest("[data-cursor]");
      if (el) {
        setVariant(el.getAttribute("data-cursor") || "hover");
        setLabel(el.getAttribute("data-cursor-label") || "");
      } else {
        setVariant("default");
        setLabel("");
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", onOver);
    };
  }, [isTouch, reducedMotion, mx, my]);

  if (isTouch || reducedMotion) return null;

  const isExpanded = variant !== "default";

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[999] mix-blend-difference"
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
    >
      <motion.div
        animate={{
          width: isExpanded ? 84 : 10,
          height: isExpanded ? 84 : 10,
          backgroundColor: isExpanded ? "rgba(255,255,255,1)" : "rgba(255,255,255,1)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="flex items-center justify-center rounded-full"
      >
        {isExpanded && label && (
          <span className="text-[10px] font-medium tracking-widest text-black uppercase">
            {label}
          </span>
        )}
      </motion.div>
    </motion.div>
  );
}
