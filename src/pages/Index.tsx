import { Navbar } from "@/components/Navbar";
import { AnimatedBlobs } from "@/components/AnimatedBlobs";
import { ParticleField } from "@/components/ParticleField";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/sections/HeroSection";
import { AboutSection } from "@/sections/AboutSection";
import { EducationSection } from "@/sections/EducationSection";
import { SkillsSection } from "@/sections/SkillsSection";
import { ExperienceSection } from "@/sections/ExperienceSection";
import { ProjectsSection } from "@/sections/ProjectsSection";
import { GitHubSection } from "@/sections/GitHubSection";
import { AchievementsSection } from "@/sections/AchievementsSection";
import { ContactSection } from "@/sections/ContactSection";
import { useTheme } from "@/hooks/useTheme";

const Index = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="relative min-h-screen">
      <ParticleField />
      <AnimatedBlobs />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <EducationSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <GitHubSection />
        <AchievementsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
