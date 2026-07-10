import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Mail, Phone, ExternalLink, Award, BookOpen,
  Globe, TrendingUp, Briefcase, GraduationCap, Menu, X, Linkedin,ChevronsDown
} from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import profilePhoto from "@/imports/1701950519163.jpg";

// ─── Palette tokens (mirrors theme.css) ─────────────────────────────────────

const C = {
  darkGreen: "#041d35",      // Deep Navy
  midGreen: "#2E5A88",       // Medium Blue
  lightGreen: "#8DA8C3",     // Soft Blue
  paleGreen: "#F7F4EF",      // Warm Ivory

  bg: "#F7F4EF",

  gold: "#C59D5F",
  goldLight: "#DEC08A",

  white: "#FFFCFA",

  text: "#1B1B1B",

  muted: "#5A6472",
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const researchAreas = [
  { label: "Environmental Science & Climate Policy", color: "#163A5F" },
  { label: "Water Resources Management", color: "#2E5A88" },
  { label: "Air Pollution & Urban Environment", color: "#163A5F" },
  { label: "Waste Treatment & Management", color: "#2E5A88" },
  { label: "Energy–Environment–Climate Nexus", color: "#163A5F" },
  { label: "Regional Studies & Sustainability Science", color: "#2E5A88" },
];

const stats = [
  { value: 100, label: "Publications", suffix: "+", icon: BookOpen },
  { value: 6250, label: "Citations", suffix: "+", icon: TrendingUp },
  { value: 33, label: "H-Index", suffix: "", icon: Award },
  { value: 50, label: "Funded Projects", suffix: "+", icon: Briefcase },
];

const timelineItems = [
  { year: "1993", role: "B.E. Civil Engineering", org: "VRCE/VNIT, Nagpur", type: "education" },
  { year: "1994", role: "M.Tech Environmental Engineering", org: "VRCE/VNIT, Nagpur", type: "education" },
  { year: "1995", role: "Sr. Project Fellow", org: "NEERI, Nagpur", type: "work" },
  { year: "1995–99", role: "Research Associate", org: "TERI, Delhi", type: "work" },
  { year: "1999–2008", role: "Lecturer → Senior Scale", org: "GGS Indraprastha University", type: "work" },
  { year: "2007", role: "Ph.D. — IIT Delhi", org: "Valuation of Health Benefits, Air Emissions", type: "education" },
  { year: "2008–09", role: "Assistant Professor", org: "TERI University", type: "work" },
  { year: "2009–13", role: "Associate Professor", org: "TERI University", type: "work" },
  { year: "2010–11", role: "ICCR Chair Professor", org: "Freie Universität Berlin, Germany", type: "international" },
  { year: "2013", role: "Professor", org: "TERI School of Advanced Studies", type: "work" },
  { year: "2016", role: "Professor & Dean (Academic)", org: "Gautam Buddha University (On Lien)", type: "work" },
];

const international = [
  { country: "Germany", role: "ICCR Chair Professor", inst: "Freie Universität Berlin", years: "2010–11" },
  { country: "United Kingdom", role: "Honorary Senior Research Fellow", inst: "University of Birmingham", years: "2011–14" },
  { country: "United Kingdom", role: "Visiting Professor", inst: "University of Derby", years: "2015–18" },
  { country: "Australia", role: "Key Technology Partner Visiting Fellow", inst: "University of Technology Sydney", years: "2013" },
  { country: "Austria", role: "Teaching Staff Mobility (Erasmus+)", inst: "University of Graz", years: "2024" },
  { country: "Nepal", role: "Co-Lead, Thematic Working Group on Water", inst: "ICIMOD, Kathmandu", years: "2020" },
];

const publications = [
  {
    authors: "Bedi, C., Kansal, A.*, & Mukheibir, P.",
    year: "2025",
    title: "SaRVO framework for urban water utilities: Building resilient, liveable, and sustainable cities",
    journal: "Environmental Science & Policy",
    if_score: "5.2",
    publisher: "Elsevier",
  },
  {
    authors: "Rao, R., Kansal A., Tarannum F.",
    year: "2025",
    title: "Sustainability Assessment Index for Surface Water bodies for prioritising management interventions",
    journal: "Jr Environment and Urbanisation ASIA",
    if_score: "1.8",
    publisher: "Sage",
  },
];

const fundingAgencies = [
  "World Bank", "USAID", "UNU", "ADB", "APN",
  "Enel Foundation", "ICEWARM", "DBT", "UKIERI", "ICIMOD",
  "GoI", "Coca-Cola Foundation", "UNDP", "NEDO Japan",
];

const navLinks = ["About", "Research", "Impact", "Journey", "Global", "Publications", "Contact"];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function FloatingCard({ children, className = "", delay = 0, amplitude = 10 }: {
  children: React.ReactNode; className?: string; delay?: number; amplitude?: number;
}) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -amplitude, 0] }}
      transition={{ duration: 4 + delay * 0.8, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {children}
    </motion.div>
  );
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const dur = 1800;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / dur, 1);
          const ease = 1 - Math.pow(1 - t, 3);
          setCount(Math.round(ease * value));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

function SectionHeading({
  number,
  title,
  subtitle,
  numberColor,
  titleColor,
}: {
  number: string;
  title: string;
  subtitle?: string;
  numberColor?: string;
  titleColor?: string;
}) {
  return (
    <div className="mb-12 md:mb-16">
      <div className="flex items-baseline gap-4 mb-3">
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            color: numberColor || "",
          }}
          className="text-sm font-bold tracking-widest text-accent uppercase"
        >
          {number}
        </span>

        <div className="h-px flex-1 bg-border" />
      </div>

      <h2
        style={{
          fontFamily: "'Playfair Display', serif",
          color: titleColor || "",
        }}
        className="text-3xl md:text-5xl font-semibold text-foreground leading-tight"
      >
        {title}
      </h2>

      {subtitle && (
        <p className="mt-3 text-muted-foreground text-sm md:text-base max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX / window.innerWidth - 0.5, y: e.clientY / window.innerHeight - 0.5 });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const sections = navLinks.map(n => document.getElementById(n.toLowerCase()));
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
    }, { threshold: 0.25 });
    sections.forEach(s => s && obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };
  const scrollToNextSection = () => {
  const sections = ["about", "research", "impact", "journey", "global", "publications", "contact"];

  const currentIndex = sections.indexOf(activeSection);

  if (currentIndex >= 0 && currentIndex < sections.length - 1) {
    document
      .getElementById(sections[currentIndex + 1])
      ?.scrollIntoView({ behavior: "smooth" });
  }
};

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ══ NAV ══════════════════════════════════════════════════════════════ */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/92 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <button onClick={() => scrollTo("about")} style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-sm font-semibold text-foreground hover:text-accent transition-colors">
            Prof. Arun Kansal
          </button>
          <div className="hidden md:flex items-center gap-5">
            {navLinks.map(link => (
              <button key={link} onClick={() => scrollTo(link)}
                className={`text-xs tracking-widest uppercase transition-colors ${activeSection === link.toLowerCase() ? "text-accent" : "text-muted-foreground hover:text-foreground"}`}
                style={{ fontFamily: "'DM Mono', monospace" }}>
                {link}
              </button>
            ))}
          </div>
          <button className="md:hidden text-foreground p-1" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-background border-b border-border px-6 py-4 flex flex-col gap-4">
              {navLinks.map(link => (
                <button key={link} onClick={() => scrollTo(link)} className="text-left text-sm text-foreground hover:text-accent transition-colors">{link}</button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ══ HERO ═════════════════════════════════════════════════════════════ */}
      <section id="about" className="min-h-screen pt-14 relative overflow-hidden flex flex-col">
        {/* Background radial glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-20"
            style={{ background: `radial-gradient(circle, rgba(163,50,61,0.10) 0%, transparent 70%)`, transform: "translate(-30%, -30%)" }} />
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-15"
            style={{ background: `radial-gradient(circle, ${C.gold} 0%, transparent 70%)`, transform: "translate(30%, 30%)" }} />
          <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full opacity-5 -translate-x-1/2 -translate-y-1/2"
            style={{ background: `radial-gradient(circle, ${C.darkGreen} 0%, transparent 70%)` }} />
        </div>

        {/* Floating ambient dots */}
        {[...Array(6)].map((_, i) => (
          <motion.div key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 6 + i * 3, height: 6 + i * 3,
              background: i % 2 === 0 ? C.gold : C.lightGreen,
              opacity: 0.25,
              top: `${15 + i * 13}%`,
              left: `${5 + i * 8}%`,
            }}
            animate={{ y: [0, -20, 0], x: [0, 8, 0] }}
            transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
          />
        ))}

<div className="relative z-10 flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-20 flex items-center">          {/* ── Left: Identity ── */}
          <motion.div
  initial={{ opacity: 0, x: -40 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
  className="flex flex-col lg:flex-row items-center gap-14 w-full"
>
            {/* Profile photo */}
<div className="relative w-64 h-64 lg:w-80 lg:h-80 flex-shrink-0">              {/* Subtle rotating ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ border: `1.5px dashed ${C.gold}`, opacity: 0.5 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute rounded-full"
                style={{ inset: "-6px", border: `1px solid ${C.lightGreen}`, opacity: 0.3 }}
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />
              {/* Photo */}
              <div className="absolute inset-[6px] rounded-full overflow-hidden"
                style={{ boxShadow: `0 0 0 2px ${C.darkGreen}22, 0 8px 32px rgba(27,67,50,0.22)` }}>
                <ImageWithFallback src={profilePhoto} alt="Prof. Arun Kansal"
                  className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="flex-1">

            {/* Name — single line */}
            <h1 style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-tight whitespace-nowrap mb-3">
              Prof. Arun Kansal
            </h1>

            <p className="text-base md:text-lg text-muted-foreground mb-0.5 font-semibold font-light leading-relaxed">
              Director, IPCA Center for WorldShperes Management Research
            </p>
            <p className="text-base md:text-lg text-muted-foreground mb-0.5 font-semibold font-light leading-relaxed">
              TERI School of Advanced Studies
            </p>
            <p className="text-sm text-muted-foreground mb-8 font-light">
              Environmental Scientist · Climate Policy Expert · IPCC Lead Author
            </p>

            <div className="flex flex-wrap gap-3">
              <a href="mailto:akansal37@gmail.com"
                className="flex items-center gap-2 text-xs px-4 py-2.5 text-white rounded-none hover:opacity-90 transition-opacity"
                style={{ background: C.darkGreen, fontFamily: "'DM Mono', monospace" }}>
                <Mail size={13} /> akansal37@gmail.com
              </a>
              <a href="tel:+919213373000"
                className="flex items-center gap-2 text-xs px-4 py-2.5 border text-foreground hover:border-accent hover:text-accent transition-colors"
                style={{ borderColor: C.darkGreen, fontFamily: "'DM Mono', monospace" }}>
                <Phone size={13} /> +91 92133 73000
              </a>
            </div>
            </div>
          </motion.div>

          {/* ── Right: Vertical floating cards with connector lines ── */}

        </div>

      </section>

      {/* ══ 01 / PROFILE ════════════════════════════════════════════════════ */}
      <section className="py-14 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Dark green horizontal strip — rounded edges */}
          <div className="relative overflow-hidden px-8 md:px-14 py-12 md:py-16 rounded-2xl"
            style={{ background: C.darkGreen }}>
            {/* Subtle corner accents */}
            <div className="absolute top-0 right-0 w-24 h-24 opacity-20 rounded-tr-2xl"
              style={{ borderBottom: `1px solid ${C.gold}`, borderLeft: `1px solid ${C.gold}` }} />
            <div className="absolute bottom-0 left-0 w-24 h-24 opacity-20 rounded-bl-2xl"
              style={{ borderTop: `1px solid ${C.gold}`, borderRight: `1px solid ${C.gold}` }} />
            {/* Floating ambient in strip */}
            <motion.div className="absolute right-8 top-6 w-20 h-20 rounded-full opacity-10"
              style={{ background: C.gold }}
              animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 5, repeat: Infinity }} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative z-10">
              <div className="lg:col-span-4">
                <div className="text-sm font-bold tracking-widest uppercase mb-4" style={{ fontFamily: "'DM Mono', monospace", color: C.gold }}>01 / Profile</div>
                <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl md:text-4xl font-semibold leading-tight text-white">
                 3 Decades of Interdisciplinary <em className="italic" style={{ color: C.gold }}>Impact</em>
                </h2>
              </div>
              <div className="lg:col-span-8 space-y-5">
                <p className="text-base font-light leading-relaxed text-justify" style={{ color: "#ffffff" }}>
                  Prof. Kansal has over 3 decades of professional experience in interdisciplinary research, consulting, and teaching spanning environmental science and climate policy, water resources management, air pollution, waste treatment, urban environment, and energy- environment- climate linkages.
                </p>
                <p className="text-base font-light leading-relaxed text-justify" style={{ color: "#ffffff" }}>
                  He has served as Vice Chancellor (Acting), Dean (Academic), and Dean (Research and Partnership). He is the Director of the Centre of Excellence (IPCA Centre for WorldShperes Management Research) at TERI School of Advanced Studies, New Delhi.
                </p>
                <p className="text-base font-light leading-relaxed text-justify" style={{ color: "#ffffff" }}>
                  An interdisciplinarian at heart- graduating in Civil Engineering, pursuing M.Tech in Environmental Engineering, and completing a Ph.D. with econometric applications- he has designed and executed projects spanning technology, policy, and management aspects of sustainability science.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ RESEARCH ════════════════════════════════════════════════════════ */}
      <section id="research" className="py-20 md:py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading number="02 / Research" title="Areas of Expertise" subtitle="Spanning the full spectrum of environmental science and sustainability policy." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {researchAreas.map((area, i) => (
              <motion.div key={area.label}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, boxShadow: `0 20px 40px rgba(27,67,50,0.14)` }}
                className="bg-card border border-border p-6 md:p-8 group transition-all duration-300 cursor-default flex flex-col justify-between min-h-[120px]">
                <h3 style={{ fontFamily: "'Playfair Display', serif", color: area.color }}
                  className="text-lg md:text-xl font-semibold leading-snug">
                  {area.label}
                </h3>
                <div className="w-8 h-0.5 mt-4 group-hover:w-16 transition-all duration-300" style={{ background: C.gold }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ IMPACT ══════════════════════════════════════════════════════════ */}
      <section id="impact" className="py-20 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading number="03 / Impact" title="Scholarly Impact" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16">
            {stats.map((stat, i) => (
              <motion.div key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -4, boxShadow: `0 12px 32px rgba(27,67,50,0.12)` }}
                className="bg-card border border-border p-6 md:p-8 text-center group hover:border-accent transition-all duration-300">
                <stat.icon size={22} className="mx-auto mb-3 text-muted-foreground group-hover:text-accent transition-colors" />
                <div style={{ fontFamily: "'Playfair Display', serif" }}
                  className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm md:text-base tracking-wider uppercase text-muted-foreground font-medium" style={{ fontFamily: "'DM Mono', monospace" }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Undertaken Projects with */}
          <div>
            <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-xl font-semibold mb-6 text-foreground">Undertaken Projects with</h3>
            <div className="flex flex-wrap gap-3">
              {fundingAgencies.map((agency, i) => (
                <motion.span key={agency}
                  initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.06, y: -2 }}
                  className="text-sm  px-4 py-2 cursor-default transition-all"
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    background: C.darkGreen,
                    color: "#ffffff",
                    borderRadius: "4px",
                    boxShadow: `0 2px 8px rgba(27,67,50,0.18)`,
                  }}>
                  {agency}
                </motion.span>
              ))}
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <motion.a
  href="documents\Funded projects.pdf"
  target="_blank"
  rel="noopener noreferrer"
  whileHover={{ x: 4 }}
  whileTap={{ scale: 0.97 }}
  className="inline-flex items-center gap-2 text-sm px-6 py-3 transition-all"
  style={{
    background: C.paleGreen,
    color: "#051638",
    fontFamily: "'DM Mono', monospace",
    borderRadius: "4px",
      border: "1.5px solid #163A5F",
    boxShadow: `0 4px 16px rgba(27,67,50,0.2)`,
  }}
>
  Read more <ExternalLink size={14} />
</motion.a>
          </div>
        </div>
      </section>

      {/* ══ JOURNEY ═════════════════════════════════════════════════════════ */}
      <section id="journey" className="py-20 md:py-20 overflow-hidden" style={{ background: C.darkGreen }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-12 md:mb-16">
            <div className="flex items-baseline gap-4 mb-2">
              <span style={{ fontFamily: "'DM Mono', monospace", color: C.gold }} className="text-sm font-bold tracking-widest uppercase">
                04 / Journey
              </span>
              <div className="h-px flex-1 opacity-20" style={{ background: "#fff" }} />
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl md:text-5xl font-semibold text-white leading-tight">
              Career & Education
            </h2>
            <p className="mt-3 text-sm md:text-base max-w-2xl" style={{ color: "rgba(255,255,255,0.55)" }}>
              Three decades of continuous growth across research, academia, and leadership.
            </p>
          </div>
        </div>

        {/* Auto-sliding infinite timeline */}
        <AutoSlider items={timelineItems} />

        {/* Legend */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 flex gap-6" style={{ fontFamily: "'DM Mono', monospace" }}>
          {[
            { label: "Education", bg: C.gold },
            { label: "International", bg: "#4ade80" },
            { label: "Employment", bg: "#971d0d" },
          ].map(({ label, bg }) => (
            <div key={label} className="flex items-center gap-2 text-xs " style={{ color: "rgba(255,255,255,0.85)" }}>
              <div className="w-3 h-3 rounded-full" style={{ background: bg }} /> {label}
            </div>
          ))}
        </div>
      </section>

      {/* ══ GLOBAL ══════════════════════════════════════════════════════════ */}
      <section id="global" className="py-20 md:py-20 bg-muted overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading number="05 / Global" title="International Presence"
            subtitle="Invited appointments and collaborations across four continents." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {international.map((item, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -6, boxShadow: `0 20px 40px rgba(27,67,50,0.14)` }}
                className="bg-card border border-border p-6 md:p-8 group transition-all duration-300 flex flex-col">
                {/* Country badge */}
                <div className="inline-flex self-start px-3 py-1 rounded text-xs mb-4"
                  style={{ background: C.darkGreen, color: "#fff", fontFamily: "'DM Mono', monospace" }}>
                  {item.country}
                </div>
                <div className="text-xs text-accent  mb-2" style={{ fontFamily: "'DM Mono', monospace" }}>{item.years}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-lg md:text-xl text-foreground leading-snug mb-2 flex-1">
                  {item.role}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground">{item.inst}</p>
                <div className="mt-4 w-6 h-0.5 group-hover:w-14 transition-all duration-300" style={{ background: C.gold }} />
              </motion.div>
            ))}
          </div>

<div
  className="mt-14 rounded-xl px-8 py-6"
  style={{
    background: "#ffffff",
    borderLeft: `5px solid ${C.darkGreen}`,
  }}
>
  <p
    className="text-sm font-semibold tracking-[0.15em] mb-4"
    style={{
      color: C.darkGreen,
      fontFamily: "'DM Mono', monospace",
    }}
  >
    SCHOLARLY VISITS & COLLABORATIONS
  </p>

  <p
  className="leading-8 text-base"
  style={{ color: "#1B1B1B" }}
>
    United Kingdom • USA • Australia • Japan • South Korea • China • Ireland • Thailand • Malaysia • Spain • Italy • Norway • Germany • Fiji • Nepal • Uzbekistan • Tanzania
  </p>
</div>
        </div>
      </section>

      {/* ══ PUBLICATIONS ════════════════════════════════════════════════════ */}
      <section id="publications" className="py-20 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading number="06 / Publications" title="Recent Work"
            subtitle="100 publications. Google Scholar H-Index: 33 · Scopus H-Index: 25 · Citations: 6,250+" />
          <div className="space-y-4">
            {publications.map((pub, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                whileHover={{ x: 4, borderColor: C.darkGreen }}
                className="bg-card border border-border p-6 md:p-8 group transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div style={{ fontFamily: "'Playfair Display', serif", color: "rgba(17, 6, 0, 0.12)" }}
                    className="text-4xl md:text-5xl font-bold flex-shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground mb-2" style={{ fontFamily: "'DM Mono', monospace" }}>{pub.authors} · {pub.year}</p>
                    <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-lg md:text-xl font-semibold text-foreground leading-snug mb-2">
                      {pub.title}
                    </h3>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-sm text-muted-foreground italic">{pub.journal}</span>
                      <span className="text-xs px-2 py-0.5 border" style={{ background: `${C.gold}15`, color: C.gold, borderColor: `${C.gold}44`, fontFamily: "'DM Mono', monospace" }}>
                        IF: {pub.if_score}
                      </span>
                      <span className="text-sm text-muted-foreground">{pub.publisher}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Read more button below last publication */}
          <div className="mt-6 flex justify-end">
            <motion.a
  href="documents\PUBLICATIONS.pdf"
  target="_blank"
  rel="noopener noreferrer"
  whileHover={{ x: 4 }}
  whileTap={{ scale: 0.97 }}
  className="inline-flex items-center gap-2 text-sm px-6 py-3 transition-all"
  style={{
    background: C.paleGreen,
    color: "#051638",
    fontFamily: "'DM Mono', monospace",
    borderRadius: "4px",
    border: "1.5px solid #163A5F",
    boxShadow: `0 4px 16px rgba(27,67,50,0.2)`,
  }}
>
  Read more <ExternalLink size={14} />
</motion.a>
          </div>
        </div>
      </section>

      {/* ══ RECOGNITIONS ════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-20 " style={{
    background: "#051a30",
  }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6" >
<SectionHeading
  number="07 / Recognitions"
  title="Honors & Positions"
  numberColor="#C59D5F"
  titleColor="#FFFFFF"
/>          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { text: "Lead Author, IPCC AR5, Working Group III", year: "2014" },
              { text: "ICCR Chair Professor, Freie Universität Berlin (Sponsored by MoEA, GoI)", year: "2010–11" },
              { text: "Honorary Senior Research Fellow, University of Birmingham, UK", year: "2011–14" },
              { text: "Visiting Professor in Natural Science, University of Derby, UK", year: "2015–18" },
              { text: "Key Technology Partner Visiting Fellow, University of Technology Sydney", year: "2013" },
              { text: "Co-Lead, Thematic Working Group on Water, HUC, ICIMOD, Kathmandu", year: "2020" },
              { text: "Teaching Staff Mobility, University of Graz, Austria (Erasmus+ KA171)", year: "2024" },
              { text: "Roll of Honor by TERI, New Delhi", year: "2011–12" },
              { text: "Best Teacher Award, GGS Indraprastha University", year: "2000–01" },
              { text: "TREE Fellowship, Renewables Academy Germany- Renewable Energy & Efficiency", year: "" },
            ].map((item, i) => (
              <motion.div key={i}
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                whileHover={{ borderColor: C.darkGreen, x: 3 }}
                className="flex items-start gap-4 bg-card border border-border p-4 transition-all duration-200 group">
                <Award size={14} className="flex-shrink-0 mt-0.5" style={{ color: C.darkGreen }} />
                <p className="text-sm text-foreground leading-snug flex-1">{item.text}</p>
                {item.year && (
                  <span className="text-xs text-muted-foreground flex-shrink-0" style={{ fontFamily: "'DM Mono', monospace" }}>{item.year}</span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CONTACT ═════════════════════════════════════════════════════════ */}
      <section id="contact" className="py-20 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <div className="text-sm font-bold tracking-widest uppercase text-accent mb-4" style={{ fontFamily: "'DM Mono', monospace" }}>08 / Contact</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-4xl md:text-5xl font-semibold text-foreground leading-tight mb-10">
                Get in Touch
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail size={16} className="flex-shrink-0 mt-0.5" style={{ color: C.gold }} />
                  <div>
                    <div className="text-xs text-muted-foreground mb-0.5" style={{ fontFamily: "'DM Mono', monospace" }}>EMAIL</div>
                    <a href="mailto:akansal37@gmail.com" className="text-foreground hover:text-accent transition-colors text-sm">akansal37@gmail.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone size={16} className="flex-shrink-0 mt-0.5" style={{ color: C.gold }} />
                  <div>
                    <div className="text-xs text-muted-foreground mb-0.5" style={{ fontFamily: "'DM Mono', monospace" }}>PHONE</div>
                    <a href="tel:+919213373000" className="text-foreground hover:text-accent transition-colors text-sm">+91 92133 73000</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Linkedin size={16} className="flex-shrink-0 mt-0.5" style={{ color: C.gold }} />
                  <div>
                    <div className="text-xs text-muted-foreground mb-0.5" style={{ fontFamily: "'DM Mono', monospace" }}>LINKEDIN</div>
                    <a href="https://www.linkedin.com/in/arun-kansal-161b9213/" target="_blank" rel="noopener noreferrer"
                      className="text-foreground hover:text-accent transition-colors text-sm flex items-center gap-1">
                      Arun Kansal <ExternalLink size={11} />
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Globe size={16} className="flex-shrink-0 mt-0.5" style={{ color: C.gold }} />
                  <div>
  <div
    className="text-xs text-muted-foreground mb-0.5"
    style={{ fontFamily: "'DM Mono', monospace" }}
  >
    INSTITUTION
  </div>

  <p className="text-foreground text-sm">
    <a
      href="https://icwmr.terisas.ac.in/index.php/about-icwmr"
      target="_blank"
      rel="noopener noreferrer"
      className="text-[#163A5F] hover:underline transition-colors duration-300"
    >
      IPCA Centre for WorldSpheres Management Research (ICWMR)
    </a>
    <br />
    TERI SAS
    <br />

    New Delhi, India
  </p>
</div>
                </div>
              </div>
            </div>

            {/* Quote card */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden p-8 md:p-12"
              style={{ background: C.darkGreen }}>
              <div className="absolute top-0 right-0 w-32 h-32 opacity-50"
                style={{ borderBottom: `1px solid ${C.gold}`, borderLeft: `1px solid ${C.gold}` }} />
              <motion.div className="absolute bottom-4 left-4 w-12 h-12 rounded-full opacity-15"
                style={{ background: C.gold }}
                animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 4, repeat: Infinity }} />
              <div className="text-6xl font-serif leading-none mb-4 opacity-20" style={{ color: C.gold }}>"</div>
              <blockquote style={{ fontFamily: "'Playfair Display', serif" }}
                className="text-xl md:text-2xl italic font-light leading-relaxed text-justify mb-6 text-white/90">
                Interdisciplinarity is not a method but a way of seeing- bridging engineering, ecology, economics, and equity for a sustainable world.
              </blockquote>
              <div className="h-px mb-4 opacity-30" style={{ background: C.gold }} />
              <cite className="not-italic text-xs opacity-50 text-white" style={{ fontFamily: "'DM Mono', monospace" }}>
                Prof. Arun Kansal · ICWMR · TERI SAS · New Delhi
              </cite>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══════════════════════════════════════════════════════════ */}
      <footer className="py-6 border-t border-border" style={{ background: C.darkGreen }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-2">
          <span style={{ fontFamily: "'Playfair Display', serif" }} className="text-white/60 text-sm">Prof. Arun Kansal</span>
          <span style={{ fontFamily: "'DM Mono', monospace" }} className="text-white/30 text-xs text-center">
            Director, ICWMR · TERI SAS · New Delhi
          </span>
        </div>
      </footer>
{activeSection !== "contact" && (
  <motion.button
    onClick={scrollToNextSection}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1, y: [0, 8, 0] }}
    transition={{
      opacity: { duration: 0.4 },
      y: {
        repeat: Infinity,
        duration: 1.6,
        ease: "easeInOut",
      },
    }}
    whileHover={{ scale: 1.12 }}
    whileTap={{ scale: 0.95 }}
className="fixed bottom-10 right-10 z-50 rounded-full p-3"
    style={{
  background: "rgba(255,255,255,0.15)",
  color: C.darkGreen,
  backdropFilter: "blur(12px)",
  border: "1px solid rgba(255,255,255,0.3)",
  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
}}
  >
    <ChevronsDown size={20} />
  </motion.button>
)}
      <style>{`
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 0; height: 0; }
      `}</style>
    </div>
  );
}

// ─── Auto-Sliding Timeline ────────────────────────────────────────────────────

function AutoSlider({ items }: { items: typeof timelineItems }) {
  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden py-4">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
        style={{ background: `linear-gradient(to right, ${C.darkGreen}, transparent)` }} />
      <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
        style={{ background: `linear-gradient(to left, ${C.darkGreen}, transparent)` }} />

      <motion.div
        className="flex gap-0"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        style={{ width: "max-content" }}
      >
        {doubled.map((item, i) => (
          <div key={i} className="relative w-52 sm:w-64 flex-shrink-0">
            {/* Top line */}
            <div className="absolute top-[22px] left-0 right-0 h-px" style={{ background: "rgba(255,255,255,0.25)" }} />
            {/* Dot */}
            <div className="relative z-10 w-3 h-3 rounded-full mb-4 ml-6"
              style={{
                background: item.type === "education" ? C.gold : item.type === "international" ? "#4ade80" : "#971d0d",
                boxShadow: `0 0 0 3px rgba(255,255,255,0.12)`,
              }} />
            <div className="pl-6 pr-4">
              <div className="text-xs mb-1 " style={{ fontFamily: "'DM Mono', monospace", color: C.gold }}>{item.year}</div>
              <div style={{ fontFamily: "'Playfair Display', serif", color: "#ffffff" }} className="text-sm font-semibold leading-snug mb-1">
                {item.role}
              </div>
              <div className="text-xs leading-snug" style={{ color: "rgba(255,255,255,0.75)" }}>{item.org}</div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
