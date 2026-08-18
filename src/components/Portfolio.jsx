import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeading from './SectionHeading'
import { PROJECTS, PROJECT_CATEGORIES } from '../data/projects'

function ProjectCard({ project, index }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      data-cursor="hover"
      className="group relative rounded-3xl border border-white/10 overflow-hidden"
    >
      <div
        className="relative h-64 md:h-72 overflow-hidden flex items-end p-6"
        style={{
          background:
            'radial-gradient(120% 120% at 20% 0%, #1a1a1a 0%, #050505 60%)',
        }}
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black via-transparent to-transparent" />
        <span className="font-display text-7xl md:text-8xl text-white/[0.06] absolute top-4 right-6 select-none transition-transform duration-700 group-hover:scale-110">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="relative z-10 flex flex-wrap gap-2">
          {project.tech.slice(0, 3).map((t) => (
            <span
              key={t}
              className="text-[11px] font-secondary uppercase tracking-wider px-3 py-1 rounded-full border border-white/15 text-mist-300"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="p-6 md:p-7 bg-black">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-2xl text-white group-hover:translate-x-1 transition-transform duration-500">
              {project.title}
            </h3>
            <p className="font-secondary text-xs uppercase tracking-[0.2em] text-mist-500 mt-1">
              {project.category} &middot; {project.year}
            </p>
          </div>
          <div className="flex gap-3 shrink-0 pt-1">
            <a
              href={project.demo}
              data-cursor="hover"
              className="text-xs font-secondary text-mist-400 hover:text-white transition-colors border-b border-transparent hover:border-white"
            >
              Live
            </a>
            <a
              href={project.github}
              data-cursor="hover"
              className="text-xs font-secondary text-mist-400 hover:text-white transition-colors border-b border-transparent hover:border-white"
            >
              Code
            </a>
          </div>
        </div>

        <p className="mt-4 text-mist-400 text-sm leading-relaxed">{project.description}</p>

        <ul className="mt-4 space-y-1.5">
          {project.features.slice(0, 2).map((f) => (
            <li key={f} className="flex gap-2 text-xs text-mist-500">
              <span className="text-white/40 mt-0.5">&mdash;</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState('All')

  const filtered = useMemo(
    () => (filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter]
  )

  return (
    <section id="work" className="relative py-32 md:py-40 bg-black">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <SectionHeading
            eyebrow="Selected Work"
            title="A handful of the products I&rsquo;ve shipped."
            description="Each one solved a real problem for a real client &mdash; not a template with the copy swapped."
          />

          <div className="flex flex-wrap gap-2">
            {PROJECT_CATEGORIES.map((cat) => (
              <button
                key={cat}
                data-cursor="hover"
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs font-secondary uppercase tracking-wider border transition-colors ${
                  filter === cat
                    ? 'bg-white text-black border-white'
                    : 'border-white/15 text-mist-400 hover:text-white hover:border-white/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>    
        </motion.div>
      </div>
    
    </section>
  )
}