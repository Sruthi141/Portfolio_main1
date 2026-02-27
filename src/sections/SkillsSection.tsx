import { motion } from "framer-motion";
import { skills } from "@/data/resume";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Code, Layout, Server, Wrench } from "lucide-react";

const iconMap: Record<string, any> = {
  Languages: Code,
  Frontend: Layout,
  "Backend & APIs": Server,
  "Tools & Workflow": Wrench,
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const chipVariant = {
  hidden: { opacity: 0, scale: 0.7, y: 10 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring" as const, stiffness: 200, damping: 12 } },
};

export function SkillsSection() {
  return (
    <section id="skills" className="section-container">
      <RevealOnScroll>
        <h2 className="section-heading">
          Technical <span className="gradient-text">Skills</span>
        </h2>
        <p className="section-subheading mb-12">Technologies and tools I work with</p>
      </RevealOnScroll>

      <div className="grid sm:grid-cols-2 gap-6">
        {Object.entries(skills).map(([category, items], catIdx) => {
          const Icon = iconMap[category] || Code;
          return (
            <RevealOnScroll key={category} delay={catIdx * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                className="glass-card rounded-xl p-6 gradient-border h-full group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground">{category}</h3>
                </div>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex flex-wrap gap-2"
                >
                  {items.map((skill) => (
                    <motion.span
                      key={skill}
                      variants={chipVariant}
                      whileHover={{ scale: 1.08, y: -2 }}
                      className="chip cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            </RevealOnScroll>
          );
        })}
      </div>
    </section>
  );
}
