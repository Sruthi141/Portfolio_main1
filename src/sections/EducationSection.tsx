import { motion } from "framer-motion";
import { GraduationCap, BookOpen } from "lucide-react";
import { education } from "@/data/resume";
import { RevealOnScroll } from "@/components/RevealOnScroll";

export function EducationSection() {
  return (
    <section id="education" className="section-container">
      <RevealOnScroll>
        <h2 className="section-heading">
          <span className="gradient-text">Education</span>
        </h2>
        <p className="section-subheading mb-12">Academic journey and coursework</p>
      </RevealOnScroll>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border" aria-hidden="true" />

        <div className="space-y-12">
          {education.map((edu, i) => (
            <RevealOnScroll key={i} delay={i * 0.15} direction={i % 2 === 0 ? "left" : "right"}>
              <div className={`relative flex items-start gap-6 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                {/* Dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                  <motion.div
                    whileInView={{ scale: [0, 1.2, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.15 }}
                    className="w-12 h-12 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center"
                  >
                    {i === 0 ? <GraduationCap size={20} className="text-primary" /> : <BookOpen size={20} className="text-primary" />}
                  </motion.div>
                </div>

                {/* Card */}
                <div className={`ml-20 md:ml-0 md:w-[calc(50%-40px)] ${i % 2 === 0 ? "" : "md:mr-auto"} ${i % 2 === 0 ? "md:ml-auto md:pl-0 md:text-left" : "md:text-right"}`}>
                  <div className="glass-card rounded-xl p-6 gradient-border">
                    <h3 className="font-display font-semibold text-foreground mb-1">{edu.institution}</h3>
                    <p className="text-primary font-medium text-sm mb-1">{edu.degree}</p>
                    {edu.period && <p className="text-xs text-muted-foreground mb-2">{edu.period}</p>}
                    {edu.cgpa && <p className="text-sm text-muted-foreground mb-2">CGPA: {edu.cgpa}</p>}
                    {edu.coursework && (
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        <span className="font-medium text-foreground">Coursework:</span> {edu.coursework}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
