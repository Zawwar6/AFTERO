import { motion } from 'framer-motion'

/**
 * Consistent section heading: eyebrow label + large display title + optional description.
 */
export default function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  return (
    <div className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-secondary text-xs uppercase tracking-[0.3em] text-mist-400 mb-4"
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="font-display font-medium text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tightest text-white"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-5 text-mist-400 text-base sm:text-lg leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}