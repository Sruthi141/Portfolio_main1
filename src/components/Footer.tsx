import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { personalInfo, navLinks } from "@/data/resume";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8">
          <div>
            <p className="font-display font-bold text-xl gradient-text mb-2">Sruthi Kommati</p>
            <p className="text-sm text-muted-foreground">{personalInfo.role}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {navLinks.slice(0, 5).map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            {[
              { icon: Github, href: personalInfo.github, label: "GitHub" },
              { icon: Linkedin, href: personalInfo.linkedin, label: "LinkedIn" },
              { icon: Mail, href: `mailto:${personalInfo.email}`, label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={label !== "Email" ? "_blank" : undefined}
                rel={label !== "Email" ? "noopener noreferrer" : undefined}
                aria-label={label}
                className="p-2 rounded-lg text-muted-foreground hover:text-primary transition-colors"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-border pt-6">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Sruthi Kommati. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
            aria-label="Back to top"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
}
