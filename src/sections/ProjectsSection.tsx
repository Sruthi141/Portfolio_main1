import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X, ArrowRight } from "lucide-react";
import { featuredProjects } from "@/data/resume";
import { RevealOnScroll } from "@/components/RevealOnScroll";

const cardVariants = {
  hidden: { opacity: 0, y: 40, rotateX: 5 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  return (
    <section id="projects" className="section-container">
      <RevealOnScroll>
        <h2 className="section-heading">
          Featured <span className="gradient-text">Projects</span>
        </h2>
        <p className="section-subheading mb-12">Detailed case studies of key projects</p>
      </RevealOnScroll>

      <div className="grid md:grid-cols-3 gap-6">
        {featuredProjects.map((project, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="glass-card rounded-xl overflow-hidden gradient-border h-full flex flex-col group"
          >
            {/* Animated header gradient */}
            <div className="h-1.5 relative overflow-hidden">
              <motion.div
                className="absolute inset-0"
                style={{ background: "var(--gradient-primary)" }}
                whileHover={{ scaleX: 1.5 }}
              />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-sm text-primary font-medium">{project.subtitle}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-3">{project.period}</p>
              <p className="text-sm text-muted-foreground mb-4 flex-1">{project.overview}</p>

              {/* Metrics */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.metrics.map((m) => (
                  <motion.span
                    key={m}
                    whileHover={{ scale: 1.05 }}
                    className="chip text-xs"
                  >
                    {m}
                  </motion.span>
                ))}
              </div>

              {/* Tech */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.tech.map((t) => (
                  <span key={t} className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary font-medium">{t}</span>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex gap-2 mt-auto">
                {project.demo ? (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-sm py-2 px-4 flex items-center gap-1.5"
                  >
                    <ExternalLink size={14} /> Live Demo
                  </a>
                ) : (
                  <span className="relative group/demo">
                    <button
                      disabled
                      className="btn-outline text-sm py-2 px-4 flex items-center gap-1.5 opacity-50 cursor-not-allowed"
                    >
                      <ExternalLink size={14} /> Live Demo
                    </button>
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs rounded bg-foreground text-background opacity-0 group-hover/demo:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      Coming soon
                    </span>
                  </span>
                )}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline text-sm py-2 px-4 flex items-center gap-1.5"
                >
                  <Github size={14} /> GitHub
                </a>
                <button
                  onClick={() => setSelectedProject(i)}
                  className="btn-outline text-sm py-2 px-4 flex items-center gap-1.5 group/btn"
                >
                  Details <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {selectedProject !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/40 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 40, rotateX: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 40, rotateX: 10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card rounded-2xl p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const p = featuredProjects[selectedProject];
                return (
                  <>
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-display font-bold gradient-text">{p.title}</h3>
                        <p className="text-primary font-medium">{p.subtitle}</p>
                        <p className="text-sm text-muted-foreground">{p.period}</p>
                      </div>
                      <motion.button
                        whileHover={{ rotate: 90 }}
                        onClick={() => setSelectedProject(null)}
                        className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
                        aria-label="Close"
                      >
                        <X size={20} />
                      </motion.button>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="font-display font-semibold mb-2 text-foreground">Overview</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">{p.overview}</p>
                      </div>
                      <div>
                        <h4 className="font-display font-semibold mb-3 text-foreground">Key Features</h4>
                        <ul className="space-y-2">
                          {p.features.map((f, j) => (
                            <motion.li
                              key={j}
                              initial={{ x: -10, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: j * 0.1 }}
                              className="text-sm text-muted-foreground flex items-start gap-2"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                              {f}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-display font-semibold mb-2 text-foreground">Tech Stack</h4>
                        <div className="flex flex-wrap gap-2">
                          {p.tech.map((t) => (
                            <span key={t} className="chip">{t}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-display font-semibold mb-2 text-foreground">Impact Metrics</h4>
                        <div className="flex flex-wrap gap-2">
                          {p.metrics.map((m) => (
                            <span key={m} className="text-sm px-3 py-1.5 rounded-lg bg-primary/10 text-primary font-medium">{m}</span>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-3 pt-2">
                        <a
                          href={p.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary text-sm py-2 px-5 flex items-center gap-2"
                        >
                          <Github size={16} /> View on GitHub
                        </a>
                      </div>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
