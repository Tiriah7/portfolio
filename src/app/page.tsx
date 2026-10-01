import { query } from "@/lib/db";
import Reveal from "./components/Reveal";
import SpotlightCard from "./components/SpotlightCard";

export const runtime = "nodejs";

const toList = (s?: string | null) =>
  (s ?? "").split(",").map((t) => t.trim()).filter(Boolean);

const EMAIL = "chrisnkinyanjui@gmail.com";
const GITHUB = "https://github.com/Tiriah7";
const CV_URL = "cv/Christopher_Kinyanjui_CV.pdf";
const LINKEDIN =
  "https://www.linkedin.com/in/christopher-kinyanjui-a3295a257/";

export default async function Home() {
  const projects = await query(`
    SELECT id, title, description, roles, highlights, impact,
           tech_stack, github_url, live_url
    FROM projects
    ORDER BY created_at DESC
  `);

  const skills = await query(`
    SELECT id, name, level FROM skills
  `);

  // Group skills by their "level" column (e.g. Frontend / Backend / Tools)
  const grouped = skills.reduce((acc: Record<string, any[]>, s: any) => {
    const key = s.level || "Skills";
    (acc[key] ||= []).push(s);
    return acc;
  }, {});

  return (
    <>
      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-zinc-900 bg-black/60 backdrop-blur-md">
        <nav className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="#top" className="font-semibold tracking-tight">
            CK<span className="text-zinc-500">.</span>
          </a>
          <div className="flex gap-6 text-sm text-muted">
            <a href="#projects" className="nav-link">Projects</a>
            <a href="#skills" className="nav-link">Skills</a>
            <a href="#contact" className="nav-link">Contact</a>
          </div>
        </nav>
      </header>

      <main
        id="top"
        className="max-w-6xl mx-auto px-6 pb-24 space-y-32 relative"
      >
        {/* HERO */}
        <section className="relative pt-28 md:pt-36 space-y-8">
          <div className="hero-glow" aria-hidden />

          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950 px-3 py-1 text-xs text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            Open to opportunities
          </div>

          <h1 className="gradient-text text-5xl md:text-7xl leading-[1.05]">
            Christopher
            <br />
            Kinyanjui
          </h1>

          <p className="text-lg md:text-xl text-muted max-w-2xl leading-relaxed">
            Full-Stack Developer building scalable, high-performance
            applications with clean architecture and exceptional user
            experience.
          </p>

        <div className="flex flex-wrap gap-3">
          <a href={`mailto:${EMAIL}`} className="btn">Email me →</a>
          <a href={CV_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost">View CV ↗</a>
          <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="btn-ghost">GitHub ↗</a>
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="btn-ghost">LinkedIn ↗</a>
        </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="space-y-10 scroll-mt-24">
          <Reveal>
            <p className="eyebrow">Selected work</p>
            <h2>Projects</h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project: any, i: number) => (
              <Reveal
                key={project.id}
                delay={(i % 2) * 90}
                className={i === 0 ? "md:col-span-2" : ""}
              >
                <SpotlightCard className="p-6 md:p-8 h-full flex flex-col gap-5">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      {project.roles && (
                        <p className="eyebrow">{project.roles}</p>
                      )}
                      <h3 className="text-xl font-semibold tracking-tight">
                        {project.title}
                      </h3>
                    </div>

                  {project.live_url && (
                    <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="btn-ghost shrink-0">Live demo ↗</a>
                  )}
                  </div>

                  <p className="text-sm md:text-base text-muted leading-relaxed">
                    {project.description}
                  </p>

                  {project.highlights && (
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      {project.highlights}
                    </p>
                  )}

                  {project.impact && (
                    <p className="impact-pill">{project.impact}</p>
                  )}

                  {/* Footer pinned to bottom */}
                  <div className="mt-auto pt-2 space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {toList(project.tech_stack).map((t) => (
                        <span key={t} className="chip">
                          {t}
                        </span>
                      ))}
                    </div>

                    {project.github_url && (
                      <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="text-sm text-muted hover:text-white transition">View source on GitHub →</a>
                    )}
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="space-y-10 scroll-mt-24">
          <Reveal>
            <p className="eyebrow">Toolbox</p>
            <h2>Skills &amp; Technologies</h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(grouped).map(([level, items], i) => (
              <Reveal key={level} delay={i * 80}>
                <div className="card p-6 space-y-4 h-full">
                  <h3 className="text-sm font-medium text-zinc-300">
                    {level}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill: any) => (
                      <span key={skill.id} className="chip">
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="scroll-mt-24">
          <Reveal>
            <div className="card p-10 md:p-14 text-center space-y-6">
              <h2 className="gradient-text text-3xl md:text-4xl">
                Let&apos;s build something together
              </h2>
              <p className="text-muted max-w-md mx-auto">
                Open to full-time roles, freelance work and collaborations.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a href={`mailto:${EMAIL}`} className="btn">Say hello →</a>
                <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="btn-ghost">LinkedIn ↗</a>
              </div>
            </div>
          </Reveal>
          <p className="text-center text-xs text-zinc-600 mt-10">
            © {new Date().getFullYear()} Christopher Kinyanjui
          </p>
        </section>
      </main>
    </>
  );
}