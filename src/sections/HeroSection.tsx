import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Download, ArrowDown, Sparkles } from "lucide-react";
import { personalInfo } from "@/data/resume";
import { TypingAnimation } from "@/components/TypingAnimation";
import { MagneticButton } from "@/components/MagneticButton";
import profilePhoto from "@/assets/photo.png";

const roles = [
  "Full-Stack Developer",
  "Software Engineer",
  "MERN Stack Developer",
  "React Developer",
  "Problem Solver",
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};

export function HeroSection() {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Decorative gradient orbs */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.07, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full"
        style={{ background: "var(--gradient-primary)", filter: "blur(120px)" }}
        aria-hidden="true"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.04 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full"
        style={{ background: "var(--gradient-accent)", filter: "blur(100px)" }}
        aria-hidden="true"
      />

      <div className="section-container relative z-10">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16"
        >
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 chip mb-6">
              <Sparkles size={14} className="text-primary" />
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Open to opportunities
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 tracking-tight"
            >
              <span className="gradient-text">{personalInfo.name}</span>
            </motion.h1>

            <motion.div variants={fadeUp} className="text-xl md:text-2xl text-muted-foreground mb-6 h-[2em]">
              I'm a{" "}
              <TypingAnimation
                words={roles}
                className="text-primary font-semibold"
                typingSpeed={70}
                deletingSpeed={40}
                pauseDuration={2500}
              />
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              {personalInfo.summary}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-8">
              <MagneticButton className="btn-primary flex items-center gap-2" onClick={scrollToProjects}>
                <ArrowDown size={18} />
                View Projects
              </MagneticButton>
              <MagneticButton
                as="a"
                href="/Sruthi_Resume.pdf"
                download="Sruthi_Kommati_Resume.pdf"
                className="btn-outline flex items-center gap-2"
              >
                <Download size={18} />
                Download Resume
              </MagneticButton>
            </motion.div>

            {/* Social Icons */}
            <motion.div variants={fadeUp} className="flex items-center justify-center lg:justify-start gap-3">
              {[
                { icon: Github, href: personalInfo.github, label: "GitHub" },
                { icon: Linkedin, href: personalInfo.linkedin, label: "LinkedIn" },
                { icon: Mail, href: `mailto:${personalInfo.email}`, label: "Email" },
              ].map(({ icon: Icon, href, label }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target={label !== "Email" ? "_blank" : undefined}
                  rel={label !== "Email" ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-xl border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors duration-300"
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Profile Photo */}
          <motion.div
            variants={fadeUp}
            className="relative shrink-0"
          >
            <div className="relative">
              {/* Outer glow ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-3 rounded-full"
                style={{
                  background: "conic-gradient(from 0deg, hsl(173 80% 45% / 0.3), transparent, hsl(262 80% 60% / 0.3), transparent, hsl(173 80% 45% / 0.3))",
                }}
                aria-hidden="true"
              />
              <motion.div
                className="absolute -inset-3 rounded-full"
                style={{ background: "var(--gradient-primary)", opacity: 0.15, filter: "blur(20px)" }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden="true"
              />
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden border-2 border-primary/30 shadow-2xl">
                <img
                  src={profilePhoto}
                  alt={`${personalInfo.name} profile photo`}
                  className="w-full h-full object-cover object-top"
                  loading="eager"
                />
              </div>
              {/* Status badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
                className="absolute -bottom-2 -right-2 px-3 py-1.5 rounded-full glass-card border border-primary/30 text-xs font-medium text-primary flex items-center gap-1.5"
              >
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Available
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="flex flex-col items-center gap-2 text-muted-foreground"
              >
                <span className="text-xs tracking-widest uppercase">Scroll</span>
                <div className="w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-1.5">
                  <motion.div
                    animate={{ y: [0, 10, 0], opacity: [1, 0, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-1 h-1 rounded-full bg-primary/80"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
