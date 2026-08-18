import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = LINKS.map((l) => document.querySelector(l.href)).filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleNav = (href) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "py-3" : "py-6"
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-500 md:px-10 ${
            scrolled
              ? "rounded-full border border-white/10 bg-black/60 py-2.5 backdrop-blur-xl mx-4 md:mx-auto md:max-w-5xl"
              : "border border-transparent py-1"
          }`}
        >
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNav("#home");
            }}
            className="font-display text-lg font-bold tracking-tight text-white"
            data-cursor="hover"
            data-cursor-label="Top"
          >
            AFTERO
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNav(link.href);
                }}
                data-cursor="hover"
                className={`group relative text-sm font-medium transition-colors ${
                  active === link.href ? "text-white" : "text-silver-dim text-white/50 hover:text-white"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1.5 left-0 h-px bg-white transition-all duration-300 ${
                    active === link.href ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
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

            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white lg:hidden"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-black px-8 lg:hidden"
          >
            <nav className="flex flex-col gap-2">
              {LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav(link.href);
                  }}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.5 }}
                  className="font-display border-b border-white/10 py-4 text-4xl font-medium text-white/90"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
            <motion.a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNav("#contact");
              }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.5 }}
              className="mt-10 inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black"
            >
              Start a Project <ArrowUpRight size={16} />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
