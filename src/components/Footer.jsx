const links = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...props}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.77V21h-4v-5.7c0-1.36-.03-3.1-1.9-3.1-1.9 0-2.2 1.48-2.2 3v5.8H9z" />
    </svg>
  );
}

function BehanceIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...props}>
      <path d="M22 7.53h-6.19v-1.5H22v1.5zM7.85 12.35c.66-.34 1.03-.94 1.03-1.85 0-1.75-1.28-2.62-3.05-2.62H0v11.24h6.12c1.94 0 3.53-1 3.53-3.03 0-1.26-.63-2.24-1.8-2.74zM2.5 9.72h2.79c.75 0 1.35.31 1.35 1.09 0 .78-.5 1.15-1.31 1.15H2.5V9.72zm3.16 6.65H2.5v-2.6h3.24c.9 0 1.5.4 1.5 1.3 0 .93-.68 1.3-1.58 1.3zm12.7-8.03c-2.7 0-4.5 1.98-4.5 4.87 0 2.98 1.9 4.83 4.6 4.83 2.05 0 3.5-.9 4.14-2.53l-2.1-.6c-.3.68-.98 1.15-1.98 1.15-1.3 0-2.13-.83-2.24-2.13h6.5v-.7c0-3-1.7-4.9-4.42-4.9zm-2.06 3.98c.16-1.1.87-1.86 2.02-1.86 1.1 0 1.85.8 1.9 1.86h-3.92z" />
    </svg>
  );
}

function DribbbleIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M4 9.5c2.5 1 8.5 1.5 15.5-1M2.5 14.5c5-1.5 12-1 17.5 3M9 3c3 4 4.5 8.5 4.5 13.5" />
    </svg>
  );
}

const socials = [
  { label: "Instagram", href: "https://instagram.com", icon: InstagramIcon },
  { label: "LinkedIn", href: "https://linkedin.com", icon: LinkedinIcon },
  { label: "Behance", href: "https://behance.net", icon: BehanceIcon },
  { label: "Dribbble", href: "https://dribbble.com", icon: DribbbleIcon },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-black pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <span className="font-display text-3xl font-bold">AFTERO</span>
            <p className="mt-4 max-w-xs text-white/50">
              WE BUILD WHAT COMES NEXT.
            </p>
          </div>

          <div>
            <span className="eyebrow">Navigate</span>
            <ul className="mt-5 space-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-white/60 transition-colors hover:text-white"
                    data-cursor="hover"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="eyebrow">Connect</span>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href="mailto:hello@aftero.com"
                  className="text-white/60 transition-colors hover:text-white"
                  data-cursor="hover"
                >
                  {/* hello@aftero.com */}
                </a>
              </li>
            </ul>
            <div className="mt-6 flex gap-3">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    data-cursor="hover"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-white hover:text-white"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-white/35 sm:flex-row">
          <span>© 2026 AFTERO. All rights reserved.</span>
          <span>Karachi · Global</span>
        </div>
      </div>
    </footer>
  );
}
