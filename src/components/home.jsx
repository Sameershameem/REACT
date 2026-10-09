import { useEffect, useRef, useState, useCallback } from "react";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const u = (id, w = 2000) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const IMAGES = {
  gateway: u("photo-1570168007204-dfb528c6958f"),
  marineDrive: u("photo-1529253355930-ddbe423a2ac7"),
  skyline: u("photo-1566552881560-0be862a7c445"),
  heritage: u("photo-1562979314-bee7453e911c", 1200),
  nightlife: u("photo-1567157577867-05ccb1388e66", 1200),
  coastal: u("photo-1595658658481-d53d3f999875", 1200),
  food: u("photo-1606491956689-2ea866880c84", 1200),
  panorama: u("photo-1595658658481-d53d3f999875", 2400),
};

const SLIDE_INTERVAL = 6500;

const NAV_LINKS = [
  { label: "Tours", href: "#tours" },
  { label: "Story", href: "#story" },
  { label: "Contact", href: "#contact" },
];

const SLIDES = [
  {
    image: IMAGES.gateway,
    alt: "The Gateway of India arch beside the Arabian Sea at dusk in Mumbai",
    location: "Colaba, South Mumbai",
    lines: ["DISCOVER", "MUMBAI"],
    coords: "18.9220° N / 72.8347° E",
    position: "center 55%",
  },
  {
    image: IMAGES.marineDrive,
    alt: "Marine Drive's curving promenade and skyline glowing along the Queen's Necklace in Mumbai",
    location: "Marine Drive, Nariman Point",
    lines: ["WHERE THE", "SEA GLOWS"],
    coords: "18.9442° N / 72.8230° E",
    position: "center 60%",
  },
  {
    image: IMAGES.skyline,
    alt: "Mumbai's waterfront skyline under a moody evening sky",
    location: "Worli Sea Face",
    lines: ["A CITY", "NEVER ASLEEP"],
    coords: "19.0176° N / 72.8153° E",
    position: "center 50%",
  },
];

const TOURS = [
  {
    id: "01",
    title: "Heritage Walks",
    tag: "Fort & Colaba · 3 hrs",
    blurb:
      "Gothic arches, Art Deco facades and century-old cafés, read street by street with a local historian.",
    image: IMAGES.heritage,
    alt: "Victorian Gothic heritage architecture in South Mumbai",
  },
  {
    id: "02",
    title: "City Nightlife",
    tag: "Bandra & Lower Parel · Evening",
    blurb:
      "Rooftop sundowners, hidden jazz rooms and late-night chai stalls once the traffic finally thins out.",
    image: IMAGES.nightlife,
    alt: "Mumbai city lights glowing at night",
  },
  {
    id: "03",
    title: "Coastal Escapes",
    tag: "Marine Drive & Elephanta · Full day",
    blurb:
      "Salt air, harbour ferries and island caves, with golden hour saved for the Queen's Necklace.",
    image: IMAGES.coastal,
    alt: "Mumbai's coastline and sea at golden hour",
  },
  {
    id: "04",
    title: "Local Food Trails",
    tag: "Mohammed Ali Road · 4 hrs",
    blurb:
      "Vada pav at the counter, kebabs off the grill and Irani chai to finish, eaten the way Mumbaikars do.",
    image: IMAGES.food,
    alt: "Plates of Indian street food served at a Mumbai market",
  },
];

/* ------------------------------------------------------------------ */
/*  CUSTOM CSS                                                         */
/* ------------------------------------------------------------------ */

const css = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700&family=Oswald:wght@400;500;600;700&display=swap');

:root {
  --charcoal: #0b0d10;
  --slate: #141a21;
  --blue-grey: #1e2832;
  --muted: #d9dde2;
  --orange: #c8622b;
}

html { scroll-behavior: smooth; }
body { background: var(--charcoal); }

.font-display { font-family: 'Oswald', sans-serif; }
.font-body { font-family: 'DM Sans', sans-serif; }

/* Ken Burns */
.kb-layer { transform: scale(1.12); }
.kb-active { animation: kenburns 9s ease-out both; }
@keyframes kenburns {
  from { transform: scale(1.02) translate3d(0, 0, 0); }
  to   { transform: scale(1.12) translate3d(-1%, -0.8%, 0); }
}

/* Staggered headline reveal */
.mask-line { display: block; overflow: hidden; }
.mask-line > span {
  display: block;
  transform: translateY(112%);
  animation: lineUp 1.1s cubic-bezier(.2,.8,.2,1) both;
}
@keyframes lineUp { to { transform: translateY(0); } }

.fade-rise {
  opacity: 0;
  transform: translateY(18px);
  animation: fadeRise 1s cubic-bezier(.2,.8,.2,1) both;
}
@keyframes fadeRise { to { opacity: 1; transform: translateY(0); } }

/* Slide progress */
.progress-fill {
  transform-origin: left;
  transform: scaleX(0);
  animation: progress ${SLIDE_INTERVAL}ms linear forwards;
}
@keyframes progress { to { transform: scaleX(1); } }

/* Scroll prompt */
.scroll-line { animation: scrollLine 2.4s ease-in-out infinite; }
@keyframes scrollLine {
  0%   { transform: scaleY(0); transform-origin: top; opacity: 1; }
  50%  { transform: scaleY(1); transform-origin: top; }
  51%  { transform-origin: bottom; }
  100% { transform: scaleY(0); transform-origin: bottom; opacity: .4; }
}

/* Scroll reveal */
.reveal {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 1.1s cubic-bezier(.2,.8,.2,1), transform 1.1s cubic-bezier(.2,.8,.2,1);
}
.reveal.is-in { opacity: 1; transform: none; }

/* Story panorama drift */
.drift { animation: drift 40s ease-in-out infinite alternate; }
@keyframes drift {
  from { transform: scale(1.15) translateX(-2.5%); }
  to   { transform: scale(1.15) translateX(2.5%); }
}

.outline-text {
  color: transparent;
  -webkit-text-stroke: 1.5px rgba(217, 221, 226, 0.75);
}

/* Contact ambient glow */
.ambient { animation: ambient 14s ease-in-out infinite alternate; }
@keyframes ambient {
  from { transform: translate3d(-3%, 0, 0) scale(1); }
  to   { transform: translate3d(3%, -2%, 0) scale(1.08); }
}

.film-grain {
  background-image: radial-gradient(rgba(255,255,255,.035) 1px, transparent 1px);
  background-size: 3px 3px;
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    animation-delay: 0ms !important;
    transition-duration: 0.01ms !important;
  }
  .reveal { opacity: 1; transform: none; }
}
`;

/* ------------------------------------------------------------------ */
/*  HOOKS & HELPERS                                                    */
/* ------------------------------------------------------------------ */

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

function useInView(options = { threshold: 0.15 }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, options);
    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [ref, inView];
}

function Reveal({ children, delay = 0, className = "", as: Tag = "div" }) {
  const [ref, inView] = useInView();
  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? "is-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/** Image that quietly disappears if the URL fails, leaving the dark backdrop. */
function SmartImg({ src, alt, className = "", style, loading = "lazy" }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
      style={style}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  NAVIGATION                                                         */
/* ------------------------------------------------------------------ */

function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "bg-[#0b0d10]/85 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-6 md:px-12"
      >
        <a href="#top" className="flex items-center gap-3 group" aria-label="ROAM home">
          <span className="h-2 w-2 rounded-full bg-[#c8622b]" />
          <span className="font-display text-lg font-medium tracking-[0.35em] text-[#d9dde2]">
            ROAM
          </span>
        </a>

        <ul className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-body text-[11px] uppercase tracking-[0.28em] text-[#d9dde2]/70 transition-colors duration-300 hover:text-[#d9dde2]"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <a
            href="#tours"
            className="hidden rounded-full border border-[#d9dde2]/30 px-6 py-2.5 font-body text-[11px] uppercase tracking-[0.28em] text-[#d9dde2] transition-all duration-500 hover:border-[#c8622b] hover:bg-[#c8622b] sm:inline-block"
          >
            Discover
          </a>
          <button
            type="button"
            className="flex h-10 w-10 flex-col items-center justify-center gap-[6px] md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span
              className={`h-px w-6 bg-[#d9dde2] transition-transform duration-300 ${
                open ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-6 bg-[#d9dde2] transition-transform duration-300 ${
                open ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-white/5 px-6 pb-8 pt-4 md:hidden">
          <ul className="flex flex-col gap-5">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-3xl uppercase tracking-wide text-[#d9dde2]"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#tours"
                onClick={() => setOpen(false)}
                className="mt-2 inline-block rounded-full bg-[#c8622b] px-7 py-3 font-body text-[11px] uppercase tracking-[0.28em] text-white"
              >
                Discover
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  HERO                                                               */
/* ------------------------------------------------------------------ */

function Hero() {
  const [active, setActive] = useState(0);
  const reduced = usePrefersReducedMotion();

  // One timeout per slide; re-armed whenever `active` changes (auto or manual),
  // always cleaned up, so progress bar and slide change stay in sync.
  useEffect(() => {
    if (reduced) return undefined;
    const id = setTimeout(() => {
      setActive((i) => (i + 1) % SLIDES.length);
    }, SLIDE_INTERVAL);
    return () => clearTimeout(id);
  }, [active, reduced]);

  const goTo = useCallback((i) => setActive(i), []);
  const slide = SLIDES[active];

  return (
    <section id="top" className="relative h-screen min-h-[640px] w-full overflow-hidden bg-[#0b0d10]">
      {/* Slides */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#141a21] to-[#0b0d10]">
        {SLIDES.map((s, i) => (
          <div
            key={s.image + i}
            aria-hidden={i !== active}
            className={`absolute inset-0 transition-opacity duration-[1600ms] ease-in-out ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          >
            <SmartImg
              src={s.image}
              alt={s.alt}
              loading={i === 0 ? "eager" : "lazy"}
              className={`h-full w-full object-cover ${
                i === active && !reduced ? "kb-active" : "kb-layer"
              }`}
              style={{ objectPosition: s.position }}
            />
          </div>
        ))}
      </div>

      {/* Overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b0d10] via-[#0b0d10]/35 to-[#0b0d10]/55" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0b0d10]/80 via-transparent to-transparent" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 20% 100%, rgba(200,98,43,.14), transparent 55%)" }}
      />
      <div className="film-grain pointer-events-none absolute inset-0 opacity-60" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-[1500px] flex-col justify-end px-6 pb-24 md:px-12 md:pb-20">
        <div key={active} className="max-w-5xl">
          <p
            className="fade-rise mb-6 flex items-center gap-3 font-body text-[11px] uppercase tracking-[0.35em] text-[#d9dde2]/80"
            style={{ animationDelay: "200ms" }}
          >
            <span className="h-px w-10 bg-[#c8622b]" />
            {slide.location}
          </p>

          <h1 className="font-display font-bold uppercase leading-[0.92] tracking-tight text-[#e8eaed] text-[clamp(3.4rem,13vw,11.5rem)]">
            {slide.lines.map((line, idx) => (
              <span key={line} className="mask-line">
                <span style={{ animationDelay: `${350 + idx * 170}ms` }}>
                  {idx === slide.lines.length - 1 ? (
                    <>
                      {line}
                      <span className="text-[#c8622b]">.</span>
                    </>
                  ) : (
                    line
                  )}
                </span>
              </span>
            ))}
          </h1>

          <div
            className="fade-rise mt-10 flex flex-wrap items-center gap-6"
            style={{ animationDelay: "900ms" }}
          >
            <a
              href="#tours"
              className="group inline-flex items-center gap-4 rounded-full bg-[#c8622b] px-8 py-4 font-body text-[11px] font-medium uppercase tracking-[0.3em] text-white transition-all duration-500 hover:bg-[#d97338]"
            >
              Explore Tours
              <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1.5">
                →
              </span>
            </a>
            <p className="font-body text-[11px] uppercase tracking-[0.3em] text-[#d9dde2]/60">
              {slide.coords}
            </p>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div
        className="absolute bottom-24 right-6 z-20 flex flex-col items-end gap-5 md:bottom-20 md:right-12"
        role="tablist"
        aria-label="Hero slides"
      >
        {SLIDES.map((s, i) => {
          const isActive = i === active;
          return (
            <button
              key={s.location}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`Go to slide ${i + 1}: ${s.location}`}
              onClick={() => goTo(i)}
              className="group flex items-center gap-4"
            >
              <span
                className={`font-display text-sm tracking-[0.25em] transition-colors duration-500 ${
                  isActive ? "text-[#e8eaed]" : "text-[#d9dde2]/40 group-hover:text-[#d9dde2]/80"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="relative block h-px w-12 overflow-hidden bg-white/20 md:w-20">
                {isActive && (
                  <span
                    key={`p-${active}`}
                    className="progress-fill absolute inset-0 bg-[#c8622b]"
                    style={reduced ? { animation: "none", transform: "scaleX(1)" } : undefined}
                  />
                )}
              </span>
            </button>
          );
        })}
      </div>

      {/* Scroll prompt */}
      <a
        href="#tours"
        aria-label="Scroll to tours"
        className="absolute bottom-6 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
      >
        <span className="font-body text-[10px] uppercase tracking-[0.4em] text-[#d9dde2]/60">Scroll</span>
        <span className="relative block h-10 w-px overflow-hidden bg-white/15">
          <span className="scroll-line absolute inset-0 bg-[#d9dde2]" />
        </span>
      </a>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  POPULAR TOURS                                                      */
/* ------------------------------------------------------------------ */

function TourCard({ tour, index }) {
  return (
    <Reveal delay={index * 120}>
      <article className="group relative aspect-[3/4] cursor-pointer overflow-hidden bg-[#141a21]">
        <SmartImg
          src={tour.image}
          alt={tour.alt}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d10] via-[#0b0d10]/30 to-[#0b0d10]/20 transition-opacity duration-700 group-hover:opacity-90" />
        <div className="absolute inset-0 bg-[#c8622b]/0 transition-colors duration-700 group-hover:bg-[#c8622b]/10" />

        <span className="absolute left-6 top-6 font-display text-sm tracking-[0.3em] text-[#d9dde2]/80">
          {tour.id}
        </span>
        <span className="absolute right-6 top-6 h-2 w-2 rounded-full bg-[#c8622b] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
          <p className="mb-3 font-body text-[10px] uppercase tracking-[0.3em] text-[#d9dde2]/60">
            {tour.tag}
          </p>
          <h3 className="font-display text-3xl font-semibold uppercase leading-none tracking-tight text-[#e8eaed] md:text-[2rem]">
            {tour.title}
          </h3>
          <div className="grid grid-rows-[0fr] transition-all duration-700 ease-out group-hover:grid-rows-[1fr]">
            <div className="overflow-hidden">
              <p className="pt-4 font-body text-sm font-light leading-relaxed text-[#d9dde2]/80">
                {tour.blurb}
              </p>
              <span className="mt-4 inline-flex items-center gap-3 font-body text-[10px] uppercase tracking-[0.3em] text-[#c8622b]">
                View Journey <span aria-hidden="true">→</span>
              </span>
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function PopularTours() {
  return (
    <section id="tours" className="relative bg-[#0b0d10] px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-16 flex flex-col justify-between gap-8 md:mb-24 md:flex-row md:items-end">
          <Reveal>
            <p className="mb-5 flex items-center gap-3 font-body text-[11px] uppercase tracking-[0.35em] text-[#c8622b]">
              <span className="h-px w-10 bg-[#c8622b]" />
              Popular Tours
            </p>
            <h2 className="font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight text-[#e8eaed] md:text-7xl lg:text-8xl">
              Four ways to
              <br />
              meet the city
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="max-w-sm font-body text-base font-light leading-relaxed text-[#d9dde2]/65">
              Small groups, local guides and unhurried pacing. Each journey is built around a different
              side of Mumbai, from colonial Fort to the midnight tea stalls of Bandra.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TOURS.map((t, i) => (
            <TourCard key={t.id} tour={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  ABOUT / IMMERSIVE STORY                                            */
/* ------------------------------------------------------------------ */

function AboutSection() {
  return (
    <section
      id="story"
      className="relative flex min-h-[110vh] items-center overflow-hidden bg-[#0b0d10]"
    >
      <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-[#1e2832] to-[#0b0d10]">
        <SmartImg
          src={IMAGES.panorama}
          alt="Panoramic view of Mumbai's coastline and skyline at golden hour"
          className="drift h-full w-full object-cover"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0b0d10] via-[#0b0d10]/40 to-[#0b0d10]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0b0d10]/85 via-[#0b0d10]/30 to-transparent" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 85% 80%, rgba(200,98,43,.18), transparent 55%)" }}
      />
      <div className="film-grain pointer-events-none absolute inset-0 opacity-50" />

      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-6 py-32 md:px-12">
        <Reveal>
          <p className="mb-8 flex items-center gap-3 font-body text-[11px] uppercase tracking-[0.35em] text-[#d9dde2]/70">
            <span className="h-px w-10 bg-[#c8622b]" />
            The Story
          </p>
        </Reveal>

        <Reveal delay={100}>
          <h2 className="font-display font-bold uppercase leading-[0.9] tracking-tight text-[#e8eaed] text-[clamp(2.8rem,10vw,9.5rem)]">
            More than a
            <br />
            destination.
            <br />
            <span className="outline-text">A feeling.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 md:grid-cols-12">
          <Reveal delay={250} className="md:col-span-5 md:col-start-1">
            <p className="font-body text-lg font-light leading-relaxed text-[#d9dde2]/75">
              Mumbai isn't ticked off a list. It's the sea breeze at Marine Drive at six in the evening,
              the clatter of a local train, the smell of rain on warm stone. Stay long enough and the
              city stops being somewhere you visit and becomes something you carry home.
            </p>
            <a
              href="#contact"
              className="group mt-10 inline-flex items-center gap-4 border-b border-[#c8622b] pb-2 font-body text-[11px] uppercase tracking-[0.3em] text-[#e8eaed] transition-colors duration-500 hover:text-[#c8622b]"
            >
              Begin your story
              <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1.5">
                →
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  CONTACT                                                            */
/* ------------------------------------------------------------------ */

function ContactSection() {
  return (
    <section
      id="contact"
      className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-[#0b0d10] px-6 py-32 text-center"
    >
      <div
        className="ambient pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 40%, rgba(30,40,50,.9), transparent 60%), radial-gradient(ellipse at 75% 70%, rgba(200,98,43,.16), transparent 55%)",
        }}
      />
      <div className="film-grain pointer-events-none absolute inset-0 opacity-50" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <Reveal>
          <p className="mb-8 font-body text-[11px] uppercase tracking-[0.4em] text-[#c8622b]">
            Plan your journey
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="font-display font-bold uppercase leading-[0.92] tracking-tight text-[#e8eaed] text-[clamp(3rem,11vw,10rem)]">
            The city is
            <br />
            calling<span className="text-[#c8622b]">.</span>
          </h2>
        </Reveal>
        <Reveal delay={220}>
          <p className="mx-auto mt-10 max-w-md font-body text-base font-light leading-relaxed text-[#d9dde2]/65">
            Tell us when you're arriving and what you're hungry for. We'll shape the rest, from the
            first sunrise on the seafront to the last cup of chai.
          </p>
        </Reveal>
        <Reveal delay={340}>
          <a
            href="mailto:hello@roam.travel?subject=Planning%20my%20Mumbai%20journey"
            className="group mt-12 inline-flex items-center gap-4 rounded-full bg-[#c8622b] px-10 py-5 font-body text-[11px] font-medium uppercase tracking-[0.3em] text-white transition-all duration-500 hover:bg-[#d97338]"
          >
            Get in touch
            <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1.5">
              →
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FOOTER                                                             */
/* ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0b0d10] px-6 py-10 md:px-12">
      <div className="mx-auto flex max-w-[1500px] flex-col items-center justify-between gap-6 sm:flex-row">
        <a href="#top" className="flex items-center gap-3" aria-label="ROAM home">
          <span className="h-1.5 w-1.5 rounded-full bg-[#c8622b]" />
          <span className="font-display text-sm font-medium tracking-[0.35em] text-[#d9dde2]">ROAM</span>
        </a>
        <p className="font-body text-xs font-light tracking-wide text-[#d9dde2]/45">
          © {new Date().getFullYear()} ROAM Travel Co. All rights reserved.
        </p>
        <a
          href="#top"
          className="font-body text-[10px] uppercase tracking-[0.3em] text-[#d9dde2]/60 transition-colors duration-300 hover:text-[#c8622b]"
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function Home() {
  return (
    <div className="font-body min-h-screen bg-[#0b0d10] text-[#d9dde2] antialiased selection:bg-[#c8622b] selection:text-white">
      <style>{css}</style>
      <Navigation />
      <main>
        <Hero />
        <PopularTours />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}