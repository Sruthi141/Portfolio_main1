import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, ChevronDown, ExternalLink } from "lucide-react";
import { experience } from "@/data/resume";
import { RevealOnScroll } from "@/components/RevealOnScroll";

export function ExperienceSection() {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <section id="experience" className="section-container">
      <RevealOnScroll>
        <h2 className="section-heading">
          Work <span className="gradient-text">Experience</span>
        </h2>
        <p className="section-subheading mb-12">Professional roles and contributions</p>
      </RevealOnScroll>

      <div className="relative max-w-3xl mx-auto">
        {/* Animated gradient line */}
        <div className="absolute left-6 top-0 bottom-0 w-px overflow-hidden" aria-hidden="true">
          <motion.div
            initial={{ height: "0%" }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full"
            style={{ background: "var(--gradient-primary)" }}
          />
        </div>

        <div className="space-y-6">
          {experience.map((exp, i) => (
            <RevealOnScroll key={i} delay={i * 0.15}>
              <div className="relative pl-16">
                <div className="absolute left-0 top-2">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 200, delay: i * 0.15 }}
                    className="w-12 h-12 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center"
                  >
                    <Briefcase size={18} className="text-primary" />
                  </motion.div>
                </div>

                <motion.button
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  whileHover={{ scale: 1.01 }}
                  className="w-full glass-card rounded-xl p-6 gradient-border text-left group"
                  aria-expanded={expanded === i}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">{exp.role}</h3>
                      <p className="text-primary text-sm font-medium">{exp.company} · {exp.type}</p>
                      <p className="text-xs text-muted-foreground mt-1">{exp.period}</p>
                    </div>
                    <motion.div
                      animate={{ rotate: expanded === i ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-muted-foreground shrink-0"
                    >
                      <ChevronDown size={20} />
                    </motion.div>
                  </div>

                  <AnimatePresence>
                    {expanded === i && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 space-y-3 overflow-hidden"
                      >
                        {exp.responsibilities.map((r, j) => (
                          <motion.li
                            key={j}
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: j * 0.1 }}
                            className="text-sm text-muted-foreground flex items-start gap-2"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                            {r}
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
