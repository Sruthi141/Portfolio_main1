import { motion } from "framer-motion";
import { MapPin, GraduationCap, Calendar, Zap } from "lucide-react";
import { personalInfo } from "@/data/resume";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { CountUp } from "@/components/CountUp";

export function AboutSection() {
  const strengths = [
    { title: "Full-Stack Development", desc: "End-to-end application building with modern tech stacks", icon: "🚀" },
    { title: "System Design", desc: "Scalable architectures with performance in mind", icon: "⚙️" },
    { title: "Problem Solving", desc: "Strong algorithmic thinking and efficient solutions", icon: "🧩" },
    { title: "Collaborative", desc: "Team leadership and cross-functional coordination", icon: "🤝" },
  ];

  const stats = [
    { value: 5, suffix: "+", label: "Projects Built" },
    { value: 25, suffix: "+", label: "REST APIs" },
    { value: 2, suffix: "", label: "Internships" },
    { value: 7.2, suffix: "", label: "CGPA" },
  ];

  return (
    <section id="about" className="section-container">
      <RevealOnScroll>
        <h2 className="section-heading">
          About <span className="gradient-text">Me</span>
        </h2>
        <p className="section-subheading mb-12">{personalInfo.summary}</p>
      </RevealOnScroll>

      {/* Stats bar */}
      <RevealOnScroll delay={0.1}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4, scale: 1.02 }}
              className="glass-card rounded-xl p-5 gradient-border text-center"
            >
              <div className="text-3xl font-bold gradient-text font-display">
                <CountUp end={s.value} suffix={s.suffix} />
              </div>
              <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </RevealOnScroll>

      <div className="grid md:grid-cols-2 gap-8">
        <RevealOnScroll delay={0.1}>
          <div className="grid gap-4">
            {strengths.map((s, i) => (
              <motion.div
                key={i}
                whileHover={{ x: 6, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="glass-card rounded-xl p-5 gradient-border flex items-start gap-4 group cursor-default"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">{s.icon}</span>
                <div>
                  <h3 className="font-display font-semibold text-foreground mb-1">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <div className="glass-card rounded-xl p-8 gradient-border h-fit">
            <h3 className="font-display font-semibold text-lg mb-6 gradient-text flex items-center gap-2">
              <Zap size={18} /> Quick Facts
            </h3>
            <div className="space-y-4">
              {[
                { icon: MapPin, label: "Location", value: personalInfo.location },
                { icon: GraduationCap, label: "Degree", value: "B.Sc Computer Science, IIIT Sri City" },
                { icon: Calendar, label: "Graduation", value: "Aug 2026" },
              ].map(({ icon: Icon, label, value }) => (
                <motion.div
                  key={label}
                  whileHover={{ x: 4 }}
                  className="flex items-start gap-3"
                >
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{label}</p>
                    <p className="font-medium text-foreground">{value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
