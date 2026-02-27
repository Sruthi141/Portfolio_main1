import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Copy, Check, Github, Linkedin, Mail } from "lucide-react";
import emailjs from "@emailjs/browser";

import { personalInfo } from "@/data/resume";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  // Honeypot (spam trap) — should remain empty
  website: z.string().optional(),
});

type ContactForm = z.infer<typeof contactSchema>;

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "", website: "" },
  });

  const saveToLocal = (data: Omit<ContactForm, "website">) => {
    const messages = JSON.parse(localStorage.getItem("contact-messages") || "[]");
    messages.push({ ...data, timestamp: new Date().toISOString() });
    localStorage.setItem("contact-messages", JSON.stringify(messages));
  };

  const getEmailJSErrorMessage = (error: any) => {
    // EmailJS typically returns { status, text }
    if (error?.text) return error.text;
    if (error?.message) return error.message;
    if (typeof error === "string") return error;
    return "Unknown EmailJS error. Check console for details.";
  };

  const onSubmit = async (data: ContactForm) => {
    // Honeypot check (spam)
    if (data.website && data.website.trim().length > 0) {
      toast({ title: "Message sent! ✨", description: "Thank you for reaching out." });
      reset();
      return;
    }

    // Always store locally as backup first (so you never lose the message)
    saveToLocal({ name: data.name, email: data.email, message: data.message });

    // Read env vars
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // If env not loaded
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      console.log("Missing EmailJS env:", { SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY });
      toast({
        title: "Email config missing ❌",
        description: "Your .env variables are not loaded. Restart server after creating .env.",
        variant: "destructive",
      });
      return;
    }

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          // send BOTH naming styles so template mismatch won't fail
          from_name: data.name,
          from_email: data.email,
          message: data.message,
          to_name: personalInfo?.name ?? "Sruthi",

          // common alternative keys (some templates use these)
          name: data.name,
          email: data.email,
        },
        PUBLIC_KEY
      );

      toast({
        title: "Message sent successfully ✅",
        description: "Thanks for reaching out. I’ll get back to you soon.",
      });

      reset();
    } catch (error: any) {
      console.error("EmailJS Error:", error);

      toast({
        title: "Couldn’t send email ❌",
        description: getEmailJSErrorMessage(error),
        variant: "destructive",
      });
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      toast({ title: "Email copied!", description: personalInfo.email });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: "Copy failed",
        description: "Please copy manually from the email shown.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="contact" className="section-container">
      <RevealOnScroll>
        <h2 className="section-heading">
          Get In <span className="gradient-text">Touch</span>
        </h2>
        <p className="section-subheading mb-12">Let's collaborate on something great</p>
      </RevealOnScroll>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <RevealOnScroll delay={0.1}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Honeypot field (hidden) */}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              {...register("website")}
            />

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
                Name
              </label>
              <input
                id="name"
                {...register("name")}
                className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                placeholder="Your name"
              />
              {errors.name && <p className="text-destructive text-xs mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                placeholder="your@email.com"
              />
              {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                {...register("message")}
                className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition resize-none"
                placeholder="Your message..."
              />
              {errors.message && (
                <p className="text-destructive text-xs mt-1">{errors.message.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                "Sending..."
              ) : (
                <>
                  <Send size={18} /> Send Message
                </>
              )}
            </button>

            <p className="text-xs text-muted-foreground text-center">
              Or email directly:{" "}
              <a className="underline hover:text-primary" href={`mailto:${personalInfo.email}`}>
                {personalInfo.email}
              </a>
            </p>
          </form>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <div className="glass-card rounded-xl p-8 gradient-border h-fit">
            <h3 className="font-display font-semibold text-lg mb-6 text-foreground">Contact Info</h3>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-primary" />
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {personalInfo.email}
                </a>
              </div>

              <button
                type="button"
                onClick={copyEmail}
                className="btn-outline flex items-center gap-2 text-sm py-2 w-full justify-center"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? "Copied!" : "Copy Email"}
              </button>
            </div>

            <h4 className="font-display font-semibold text-sm mb-4 text-foreground">Connect</h4>
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
                  className="p-3 rounded-xl border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}