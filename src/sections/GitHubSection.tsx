import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Star, GitFork, ExternalLink, Calendar } from "lucide-react";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { personalInfo } from "@/data/resume";

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
}

const PER_PAGE = 6;

export function GitHubSection() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [langFilter, setLangFilter] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch(
          `https://api.github.com/users/${personalInfo.githubUsername}/repos?per_page=100&sort=updated`
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const data: Repo[] = await res.json();
        setRepos(data);
      } catch {
        setError("Could not load GitHub repositories.");
      } finally {
        setLoading(false);
      }
    }
    fetchRepos();
  }, []);

  const languages = useMemo(() => {
    const langs = new Set(repos.map((r) => r.language).filter(Boolean) as string[]);
    return Array.from(langs).sort();
  }, [repos]);

  const filtered = useMemo(() => {
    return repos.filter((r) => {
      const matchSearch =
        !search ||
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        (r.description && r.description.toLowerCase().includes(search.toLowerCase()));
      const matchLang = !langFilter || r.language === langFilter;
      return matchSearch && matchLang;
    });
  }, [repos, search, langFilter]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  useEffect(() => {
    setPage(1);
  }, [search, langFilter]);

  return (
    <section id="github" className="section-container">
      <RevealOnScroll>
        <h2 className="section-heading">
          GitHub <span className="gradient-text">Projects</span>
        </h2>
        <p className="section-subheading mb-8">All repositories from my GitHub</p>
      </RevealOnScroll>

      <RevealOnScroll delay={0.1}>
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search repositories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
              aria-label="Search repositories"
            />
          </div>
          <select
            value={langFilter}
            onChange={(e) => setLangFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
            aria-label="Filter by language"
          >
            <option value="">All Languages</option>
            {languages.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>
      </RevealOnScroll>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="glass-card rounded-xl p-6 gradient-border animate-pulse">
              <div className="h-5 bg-muted rounded w-2/3 mb-3" />
              <div className="h-3 bg-muted rounded w-full mb-2" />
              <div className="h-3 bg-muted rounded w-4/5 mb-4" />
              <div className="flex gap-3">
                <div className="h-3 bg-muted rounded w-12" />
                <div className="h-3 bg-muted rounded w-12" />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <p className="text-center text-muted-foreground">{error}</p>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginated.map((repo) => (
              <motion.div
                key={repo.id}
                whileHover={{ y: -4 }}
                className="glass-card rounded-xl p-6 gradient-border flex flex-col"
              >
                <h3 className="font-display font-semibold text-foreground mb-2 truncate">{repo.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-2">
                  {repo.description || "No description available"}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  {repo.language && (
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                      {repo.language}
                    </span>
                  )}
                  <span className="flex items-center gap-1"><Star size={12} /> {repo.stargazers_count}</span>
                  <span className="flex items-center gap-1"><GitFork size={12} /> {repo.forks_count}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar size={12} />
                    {new Date(repo.updated_at).toLocaleDateString()}
                  </span>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary font-medium flex items-center gap-1 hover:underline"
                  >
                    View Repo <ExternalLink size={12} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                    page === i + 1
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}

          <p className="text-center text-sm text-muted-foreground mt-4">
            Showing {paginated.length} of {filtered.length} repositories
          </p>
        </>
      )}
    </section>
  );
}
