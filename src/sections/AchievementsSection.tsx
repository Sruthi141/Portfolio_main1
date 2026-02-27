import { motion } from "framer-motion";
import { Trophy, Code, Server, Award, Camera, Users, Heart } from "lucide-react";
import { achievements, positions } from "@/data/resume";
import { RevealOnScroll } from "@/components/RevealOnScroll";

const iconMap: Record<string, any> = { Trophy, Code, Server, Award, Camera, Users, Heart };

const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.03, y: -6, transition: { type: "spring" as const, stiffness: 300 } },
};

export function AchievementsSection() {
  return (
    <section id="achievements" className="section-container">
      <RevealOnScroll>
        <h2 className="section-heading">
          Achievements & <span className="gradient-text">Leadership</span>
        </h2>
        <p className="section-subheading mb-12">Recognition, certifications, and community impact</p>
      </RevealOnScroll>

      {/* Achievements */}
      <div className="grid sm:grid-cols-2 gap-4 mb-16">
        {achievements.map((a, i) => {
          const Icon = iconMap[a.icon] || Award;
          return (
            <RevealOnScroll key={i} delay={i * 0.1}>
              <motion.div
                variants={cardHover}
                initial="rest"
                whileHover="hover"
                className="glass-card rounded-xl p-6 gradient-border flex items-start gap-4 group cursor-default"
              >
                <motion.div
                  whileHover={{ rotate: 15 }}
                  className="p-3 rounded-xl bg-primary/10 shrink-0 group-hover:bg-primary/20 transition-colors"
                >
                  <Icon size={22} className="text-primary" />
                </motion.div>
                <div>
                  <h3 className="font-display font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">{a.title}</h3>
                  <p className="text-sm text-muted-foreground">{a.description}</p>
                </div>
              </motion.div>
            </RevealOnScroll>
          );
        })}
      </div>

      {/* Positions */}
      <RevealOnScroll>
        <h3 className="text-2xl font-display font-bold mb-8">
          Positions & <span className="gradient-text-accent">Responsibilities</span>
        </h3>
      </RevealOnScroll>

      <div className="grid sm:grid-cols-3 gap-4">
        {positions.map((p, i) => {
          const Icon = iconMap[p.icon] || Users;
          return (
            <RevealOnScroll key={i} delay={i * 0.1}>
              <motion.div
                variants={cardHover}
                initial="rest"
                whileHover="hover"
                className="glass-card rounded-xl p-6 gradient-border text-center group cursor-default"
              >
                <motion.div
                  whileHover={{ scale: 1.15, rotate: -10 }}
                  className="mx-auto w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors"
                >
                  <Icon size={24} className="text-accent" />
                </motion.div>
                <h4 className="font-display font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">{p.title}</h4>
                <p className="text-sm text-muted-foreground">{p.description}</p>
              </motion.div>
            </RevealOnScroll>
          );
        })}
      </div>
    </section>
  );
}
