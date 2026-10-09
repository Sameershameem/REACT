import React from "react";

export default function Home() {
  const projects = [
    {
      num: "01",
      title: "Digital Universe",
      type: "WEB DEVELOPMENT",
      description: "Beautiful digital experiences built with modern technology.",
      color: "from-violet-500/30 via-purple-900/10 to-transparent",
    },
    {
      num: "02",
      title: "Obsidian",
      type: "UI / UX DESIGN",
      description: "Minimal interfaces where elegance meets functionality.",
      color: "from-indigo-500/30 via-slate-900/10 to-transparent",
    },
    {
      num: "03",
      title: "Beyond Orbit",
      type: "CREATIVE DEVELOPMENT",
      description: "Exploring the boundaries of design and interaction.",
      color: "from-fuchsia-500/20 via-violet-900/10 to-transparent",
    },
  ];

  const skills = ["React", "JavaScript", "Tailwind CSS", "UI / UX", "Creative Coding"];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050507] text-white selection:bg-violet-400/30 selection:text-white">

      {/* GALAXY BACKGROUND */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,#211333_0%,#0b0910_35%,#050507_75%)]" />

        <div className="absolute -right-40 top-40 h-[500px] w-[500px] rounded-full bg-violet-700/10 blur-[130px]" />

        <div className="absolute -left-40 top-[650px] h-[400px] w-[400px] rounded-full bg-indigo-600/10 blur-[120px]" />

        {/* STARS */}
        {Array.from({ length: 90 }).map((_, i) => (
          <span
            key={i}
            className="absolute animate-pulse rounded-full bg-white"
            style={{
              left: `${(i * 37.17) % 100}%`,
              top: `${(i * 61.73) % 100}%`,
              width: i % 9 === 0 ? "2px" : "1px",
              height: i % 9 === 0 ? "2px" : "1px",
              opacity: 0.2 + ((i * 13) % 7) / 10,
              animationDelay: `${(i % 8) * 0.4}s`,
              animationDuration: `${3 + (i % 5)}s`,
            }}
          />
        ))}

        {/* COSMIC PLANET */}
        <div className="absolute -right-48 top-48 h-[420px] w-[420px] rounded-full border border-violet-300/10 bg-[radial-gradient(circle_at_30%_25%,#6d4b8c_0%,#30203e_15%,#100d19_48%,#050507_72%)] opacity-70 shadow-[0_0_100px_rgba(139,92,246,0.12)] sm:-right-32 sm:h-[540px] sm:w-[540px]" />

        <div className="absolute -right-36 top-[390px] h-40 w-[600px] rotate-[-25deg] rounded-[50%] border border-violet-200/10 sm:-right-20" />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050507]" />
      </div>

      {/* NAVBAR */}
      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 sm:px-10 lg:px-16">
        <a href="#home" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-violet-300/40 text-lg text-violet-200">
            S.
          </div>
          <span className="text-xs font-medium tracking-[0.2em] sm:text-sm">
            SAMEER SHAMEEM
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-xs text-white/60 md:flex">
          <a href="#home" className="transition hover:text-violet-300">Home</a>
          <a href="#about" className="transition hover:text-violet-300">About</a>
          <a href="#work" className="transition hover:text-violet-300">Projects</a>
          <a href="#contact" className="transition hover:text-violet-300">Contact</a>
        </nav>

        <a
          href="#contact"
          className="rounded-full border border-white/15 px-4 py-2.5 text-xs transition hover:border-violet-300/60 hover:bg-violet-400/10"
        >
          Let's talk ↗
        </a>
      </header>

      {/* HERO */}
      <section
        id="home"
        className="relative z-10 mx-auto flex min-h-[82vh] max-w-7xl flex-col justify-center px-6 py-24 sm:px-10 lg:px-16"
      >
        <div className="mb-8 flex items-center gap-3">
          <span className="h-2 w-2 animate-pulse rounded-full bg-violet-300 shadow-[0_0_12px_#a78bfa]" />
          <span className="text-[10px] uppercase tracking-[0.25em] text-white/55 sm:text-xs">
            Developer · Designer · Dreamer
          </span>
        </div>

        <p className="mb-5 text-sm text-white/60 sm:text-base">
          Hello, I'm Sameer Shameem.
        </p>

        <h1 className="max-w-5xl text-6xl font-light leading-[0.95] tracking-[-0.07em] sm:text-8xl lg:text-[112px]">
          Building
          <br />
          <span className="bg-gradient-to-r from-violet-200 via-purple-300 to-indigo-400 bg-clip-text text-transparent">
            beyond
          </span>
          <br />
          the ordinary<span className="text-violet-300">.</span>
        </h1>

        <div className="mt-9 flex max-w-2xl flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-sm leading-7 text-white/50 sm:text-base">
            I turn ideas into immersive digital experiences through thoughtful
            design, clean code, and an obsession with the details.
          </p>

          <a
            href="#work"
            className="group flex w-fit items-center gap-4 rounded-full bg-[#e9e1ff] px-6 py-4 text-xs font-medium text-black transition duration-300 hover:bg-white"
          >
            EXPLORE MY WORK
            <span className="transition-transform group-hover:translate-x-1">↗</span>
          </a>
        </div>

        <div className="mt-20 flex items-center justify-between border-t border-white/10 pt-6">
          <div>
            <p className="text-[9px] tracking-[0.25em] text-white/35">CURRENTLY EXPLORING</p>
            <p className="mt-2 text-xs text-white/60">Code · Creativity · The unknown</p>
          </div>
          <a href="#about" className="text-xs text-white/40 transition hover:text-violet-300">
            SCROLL TO DISCOVER ↓
          </a>
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="relative z-10 mx-auto max-w-7xl px-6 py-24 sm:px-10 sm:py-32 lg:px-16"
      >
        <div className="mb-10 flex items-center gap-4 text-[10px] uppercase tracking-[0.25em] text-white/40">
          <span className="text-violet-300">01</span>
          <span className="h-px w-8 bg-violet-300/50" />
          A LITTLE ABOUT ME
        </div>

        <div className="grid gap-12 md:grid-cols-2 md:gap-20">
          <h2 className="text-4xl font-light leading-tight tracking-tight sm:text-6xl">
            Curious mind.
            <span className="mt-2 block text-white/35">
              Creative soul.
            </span>
            <span className="mt-2 block bg-gradient-to-r from-violet-200 to-indigo-400 bg-clip-text text-transparent">
              Infinite ideas.
            </span>
          </h2>

          <div className="flex flex-col justify-end">
            <p className="text-sm leading-8 text-white/55 sm:text-base">
              I'm Sameer Shameem, passionate about building digital experiences
              that combine technology and design. I love exploring new ideas,
              experimenting with interfaces, and transforming simple concepts
              into something memorable.
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-white/10 px-4 py-2 text-[10px] text-white/60 transition hover:border-violet-300/40 hover:text-violet-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section
        id="work"
        className="relative z-10 mx-auto max-w-7xl px-6 py-24 sm:px-10 sm:py-32 lg:px-16"
      >
        <div className="mb-10 flex items-center gap-4 text-[10px] uppercase tracking-[0.25em] text-white/40">
          <span className="text-violet-300">02</span>
          <span className="h-px w-8 bg-violet-300/50" />
          SELECTED PROJECTS
        </div>

        <div className="mb-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-4xl font-light tracking-tight sm:text-6xl">
            A glimpse into
            <span className="block text-violet-200">my universe.</span>
          </h2>
          <p className="max-w-xs text-sm leading-7 text-white/45">
            Experiments, ideas, and digital experiences brought to life.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <a
              href="#contact"
              key={project.num}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] transition duration-500 hover:-translate-y-2 hover:border-violet-300/30"
            >
              <div
                className={`relative flex aspect-[1.15/1] items-center justify-center overflow-hidden bg-gradient-to-br ${project.color}`}
              >
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:30px_30px]" />

                <div className="absolute h-36 w-36 rounded-full bg-violet-500/20 blur-3xl transition duration-500 group-hover:bg-violet-400/40" />

                <div className="relative flex h-32 w-32 items-center justify-center rounded-full border border-violet-200/30 bg-black/20 shadow-[0_0_70px_rgba(139,92,246,0.15)] transition duration-700 group-hover:rotate-12 group-hover:scale-110 sm:h-40 sm:w-40">
                  <div className="absolute inset-3 rounded-full border border-white/10" />
                  <span className="text-3xl font-extralight tracking-tight text-violet-100/90">
                    {project.num}
                  </span>
                </div>

                <span className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 transition group-hover:rotate-45 group-hover:bg-violet-200 group-hover:text-black">
                  ↗
                </span>
              </div>

              <div className="p-6">
                <p className="mb-3 text-[9px] tracking-[0.2em] text-violet-300/70">
                  {project.type}
                </p>
                <h3 className="text-xl font-light">{project.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/45">
                  {project.description}
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-white/50">
                  <span>Discover project</span>
                  <span className="transition group-hover:translate-x-1 group-hover:text-violet-200">→</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <p className="mt-6 text-xs text-white/30">
          Replace these sample projects with your actual work.
        </p>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="relative z-10 mx-auto max-w-7xl px-6 py-24 sm:px-10 sm:py-32 lg:px-16"
      >
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-violet-500/[0.09] to-white/[0.015] px-6 py-20 text-center sm:px-12 sm:py-28">
          <div className="pointer-events-none absolute left-1/2 top-0 h-48 w-96 -translate-x-1/2 rounded-full bg-violet-500/10 blur-[90px]" />

          <div className="relative">
            <p className="mb-6 text-[10px] tracking-[0.28em] text-violet-200/70">
              03 / LET'S CONNECT
            </p>

            <h2 className="text-4xl font-light leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              Have an idea?
              <span className="mt-2 block bg-gradient-to-r from-violet-200 to-indigo-400 bg-clip-text text-transparent">
                Let's create it.
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-white/50">
              Every great project starts with a conversation. Let's build
              something extraordinary together.
            </p>

            {/* CHANGE THIS TO YOUR EMAIL */}
            <a
              href="mailto:your-email@example.com"
              className="mt-9 inline-flex items-center gap-4 rounded-full bg-white px-7 py-4 text-xs font-medium text-black transition hover:bg-violet-200"
            >
              SAY HELLO <span>↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 mx-auto flex max-w-7xl flex-col gap-5 border-t border-white/10 px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-16">
        <a href="#home" className="text-xs tracking-[0.18em] text-white/70">
          SAMEER SHAMEEM<span className="text-violet-300">.</span>
        </a>

        <p className="text-[10px] text-white/35">
          Designed among the stars © 2026
        </p>

        <a href="#home" className="text-xs text-white/50 transition hover:text-violet-200">
          BACK TO TOP ↑
        </a>
      </footer>
    </main>
  );
}
