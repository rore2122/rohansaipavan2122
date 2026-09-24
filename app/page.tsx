"use client";

import { useEffect, useRef, useState } from "react";import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import PortfolioScene from "@/components/portfolio-scene";
import EffectsController from "@/components/effects-controller";
import SmoothScroll from "@/components/smooth-scroll";
import WebGLHeroBackground from "@/components/webgl-hero-background";
function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.12 });
  const reduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={`section-reveal ${className}`.trim()}
      initial={reduced ? false : { opacity: 0, y: 26 }}
      animate={inView || reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 }}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function FeaturedProjectFrame({
  project,
  direction,
  onSwipe,
}: {
  project: (typeof projects)[number];
  direction: number;
  onSwipe: (direction: number) => void;
}) {
  const reduced = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const smoothX = useSpring(rotateX, { stiffness: 160, damping: 24, mass: 0.35 });
  const smoothY = useSpring(rotateY, { stiffness: 160, damping: 24, mass: 0.35 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(x * 7);
    rotateX.set(-y * 6);
  };

  const resetTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      layoutId="project-image-frame"
      className="showcase-image-frame liquid-glass glow-border"
      initial={reduced ? false : { opacity: 0, x: direction * 55, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={reduced ? undefined : { opacity: 0, x: direction * -55, scale: 0.96 }}
      transition={{ duration: reduced ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX: smoothX, rotateY: smoothY, transformPerspective: 1600 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      drag={reduced ? false : "x"}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.12}
      onDragEnd={(_, info) => {
        if (Math.abs(info.offset.x) > 70 || Math.abs(info.velocity.x) > 500) {
          onSwipe(info.offset.x < 0 ? 1 : -1);
        }
      }}
      tabIndex={0}
      role="group"
      aria-label={`${project.title} featured project image`}
    >
      <img src={project.image} alt={project.title} className="showcase-image gloss-sweep" draggable={false} />
      <div className="showcase-image-overlay" />
      <div className="image-corner image-corner-tl" />
      <div className="image-corner image-corner-tr" />
      <div className="image-corner image-corner-bl" />
      <div className="image-corner image-corner-br" />
      <div className="image-index">{project.number} / 05</div>
    </motion.div>
  );
}

const projects = [
  {
    number: "01",
    title: "AI-Driven Demand Forecasting",
    category: "MBA Final Project",
    description:
      "Demand forecasting for sustainable e-commerce logistics using time-series analysis and forecasting models.",
    image: "/assets/projects/forecasting.png",
    link: "https://mbafinalproject.netlify.app/",
    accent: "copper",
  },
  {
    number: "02",
    title: "AML / KYC Compliance",
    category: "Risk Analytics",
    description:
      "AML/KYC compliance, customer due diligence, transaction monitoring and risk analytics project.",
    image: "/assets/projects/risk.png",
    link: "https://amlkycproject2122.netlify.app/",
    accent: "red",
  },
  {
    number: "03",
    title: "Cricket Performance Analytics",
    category: "SAS · Data Analysis",
    description:
      "Statistical and data analysis of ICC Men's Cricket World Cup 2023 performance data.",
    image: "/assets/projects/dashboard.png",
    link: "https://sasproject2023.netlify.app/",
    accent: "green",
  },
  {
    number: "04",
    title: "Incredible India AI",
    category: "Java · AI Web Application",
    description:
      "AI-powered tourism web application for exploring Indian destinations and travel information.",
    image: "/assets/projects/incredible-india.png",
    link: "https://incredibleindia-ai-2.onrender.com/",
    accent: "gold",
  },
  {
    number: "05",
    title: "Chocolate Sales Report",
    category: "Tableau · Data Visualization",
    description:
      "Interactive Tableau dashboard for analyzing chocolate sales data through business-focused visualizations and reporting.",
    image: "/assets/projects/tableau.png",
    link: "https://public.tableau.com/app/profile/puvvada.rohan.sai.pavan/viz/ChocolatesalesReport_17786751258270/Dashboard1",
    accent: "champagne",
  },
];

const skillGroups = [
  {
    number: "01",
    title: "Analytics & BI",
    skills: [
      ["Power BI", "Advanced"],
      ["Tableau", "Advanced"],
      ["Microsoft Excel", "Advanced"],
      ["Management & KPI Reporting", "Proficient"],
    ],
  },
  {
    number: "02",
    title: "Programming & Data",
    skills: [
      ["Python", "Proficient"],
      ["SQL", "Proficient"],
      ["SAS", "Proficient"],
      ["Pandas & NumPy", "Proficient"],
    ],
  },
  {
    number: "03",
    title: "Business Analysis",
    skills: [
      ["Requirements Analysis", "Core"],
      ["Data Analysis & Validation", "Core"],
      ["KPI & Performance Analysis", "Core"],
      ["Process Improvement", "Core"],
    ],
  },
  {
    number: "04",
    title: "ERP, Risk & Analytics",
    skills: [
      ["SAP S/4HANA MM", "Training"],
      ["Sourcing & Procurement", "Training"],
      ["AML / KYC & Transaction Monitoring", "Proficient"],
      ["Predictive Analytics & Forecasting", "Proficient"],
    ],
  },
];

export default function Home() {
  const [activeProject, setActiveProject] = useState(0);
  const [direction, setDirection] = useState(1);
  const [showcasePaused, setShowcasePaused] = useState(false);
  const [activeExperience, setActiveExperience] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const reduced = useReducedMotion();

  const currentProject = projects[activeProject];

  const goToProject = (index: number) => {
    if (index === activeProject) return;

    setDirection(index > activeProject ? 1 : -1);
    setActiveProject(index);
  };

  const nextProject = () => {
    setDirection(1);
    setActiveProject((current) => (current + 1) % projects.length);
  };

  const previousProject = () => {
    setDirection(-1);
    setActiveProject(
      (current) => (current - 1 + projects.length) % projects.length
    );
  };

  useEffect(() => {
    if (reduced || showcasePaused) return;
    const timer = window.setInterval(() => {
      setDirection(1);
      setActiveProject((current) => (current + 1) % projects.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [reduced, showcasePaused]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") nextProject();
      if (event.key === "ArrowLeft") previousProject();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <main className="site-shell" id="top">
      <EffectsController />
      <SmoothScroll />
      {/* =========================================================
          NAVIGATION
      ========================================================= */}

      <header className="site-header">
        <nav className="nav-pill liquid-glass">
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
            <a href="#work">Projects</a>
            <a href="#skills">Skills</a>
            <a href="#education">Education</a>
            <a href="#contact">Contact</a>
          </div>

          <div className="nav-actions">
            <a href="#contact" className="nav-cta chroma-hover" data-magnetic data-liquid>
              <span className="button-label">Start a Conversation <span>↗</span></span>
              <svg className="button-border-svg" viewBox="0 0 100 36" preserveAspectRatio="none" aria-hidden="true"><rect x="1" y="1" width="98" height="34" rx="17" /></svg>
            </a>
          </div>
        </nav>
      </header>

      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="hero-section" id="hero">
        <WebGLHeroBackground />

        <div className="hero-name-background" aria-hidden="true">
          <span>ROHAN</span>
          <span>SAI</span>
          <span>PAVAN</span>
        </div>

        <div className="hero-grid">
          <Reveal className="hero-reveal">
          <motion.div
            className="hero-copy"
            initial={
              reduced
                ? false
                : { opacity: 0, y: 35, filter: "blur(14px)", scale: 0.985 }
            }
            animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
            transition={{ duration: reduced ? 0 : 1.05, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="eyebrow">
              <span className="eyebrow-line" />
              Business Analysis · Data Analytics · Business Intelligence
            </div>

            <h1 className="hero-title variable-weight" data-scramble>
              <span>I turn</span>
              <em>raw data</em>
              <span>into decisions.</span> 
            </h1>

            <p className="hero-description">
              Dashboards, analysis, forecasts and recommendations that connect
              data with practical business decisions.
            </p>

            <div className="hero-actions">
              <a href="#work" className="button button-primary chroma-hover" data-magnetic data-liquid>
                <span className="button-label">Explore My Work <span>↗</span></span>
                <svg className="button-border-svg" viewBox="0 0 100 36" preserveAspectRatio="none" aria-hidden="true"><rect x="1" y="1" width="98" height="34" rx="17" /></svg>
              </a>

              <a href="#contact" className="button button-secondary" data-magnetic data-liquid>
                <span className="button-label">Let&apos;s Connect</span>
                <svg className="button-border-svg" viewBox="0 0 100 36" preserveAspectRatio="none" aria-hidden="true"><rect x="1" y="1" width="98" height="34" rx="17" /></svg>
              </a>
<a href="/assets/Rohan-cv.pdf" download className="button button-secondary button-cv">
                <span className="button-label">Download CV <span>↓</span></span>
                <svg className="button-border-svg" viewBox="0 0 100 36" preserveAspectRatio="none" aria-hidden="true"><rect x="1" y="1" width="98" height="34" rx="17" /></svg>
              </a>
            </div>

            <div className="hero-stats">
              <div className="stat">
                <strong>9.04</strong>
                <span>MBA CGPA</span>
              </div>

              <div className="stat">
                <strong>87%</strong>
                <span>B.Sc. Score</span>
              </div>

              <div className="stat">
                <strong>5+</strong>
                <span>Major Projects</span>
              </div>
            </div>

            <div className="scroll-indicator">
              <span className="scroll-circle">↓</span>
              Scroll to explore
            </div>
          </motion.div>
          </Reveal>

          <div className="hero-visual-wrapper">
            <PortfolioScene />
          </div>
        </div>

        <div className="hero-grain" />
        <div className="hero-vignette" />
      </section>

      {/* =========================================================
          ABOUT
      ========================================================= */}

      <section className="section" id="about">
        <div className="container">
          <div className="eyebrow section-eyebrow">
            <span className="eyebrow-line" />
            01 / About
          </div>

          <Reveal className="about-reveal">
          <div className="about-grid">
            <div className="about-number">01</div>

            <div className="about-content">
              <h2 data-scramble>
                The story
                <br />
                <span>so far.</span>
              </h2>

              <p>
                I am a data-driven analyst with a background in Data Science
                and an MBA in AI &amp; Data Science from SRM Institute of
                Science &amp; Technology.
              </p>

              <p>
                My experience combines data analytics, business intelligence
                and administrative operations. I have worked with structured
                datasets, reporting, documentation, business processes and
                operational information.
              </p>

              <p>
                I also completed a Data Analytics Internship at Techno Spark IT
                Solutions, where I worked with SAS OnDemand for Academics and
                Microsoft Excel.
              </p>
            </div>
          </div>
          </Reveal>

          <Reveal className="stats-reveal">
          <div className="stats">
            <div className="stat">
              <div className="stat-number">9.04</div>
              <div className="stat-label">MBA CGPA</div>
            </div>

            <div className="stat">
              <div className="stat-number">87%</div>
              <div className="stat-label">B.Sc. Score</div>
            </div>

            <div className="stat">
              <div className="stat-number">5+</div>
              <div className="stat-label">Major Projects</div>
            </div>
          </div>
          </Reveal>
        </div>
      </section>

      {/* =========================================================
          EXPERIENCE
      ========================================================= */}

      <section className="section experience-section" id="experience">
        <div className="container">
          <div className="eyebrow section-eyebrow">
            <span className="eyebrow-line" />
            02 / Experience
          </div>

          <h2 className="section-title" data-scramble>
            Professional
            <br />
            <em>journey.</em>
          </h2>

          <p className="section-description">
            A practical combination of administrative operations, data
            analytics, technology and community work.
          </p>

          <Reveal className="experience-reveal">
          <div className="experience-list">
            {/* VJP & DLB */}

            <article className={`experience-item experience-hover ${activeExperience === "vjp" ? "is-active" : ""}`} onClick={() => setActiveExperience((current) => (current === "vjp" ? null : "vjp"))}>
              <div className="experience-main">
                <div className="experience-date">AUG 2024 — MAY 2026</div>

                <div>
                  <h3 className="experience-role">
                    Assistant Administrative Officer
                  </h3>

                  <p className="experience-company">
                    VJP &amp; DLB Degree College · Mangalagiri, Andhra Pradesh
                  </p>

                  <span className="experience-type">
                    Part-Time · Administrative Operations
                  </span>
                </div>
              </div>

              <div className="experience-arrow">↗</div>

              <div className="experience-popup" onClick={(event) => event.stopPropagation()}>
                <div className="popup-header">
                  <span>WORK EXPERIENCE</span>
                  <strong>VJP &amp; DLB</strong>
                </div>

                <div className="popup-meta">
                  <span>ROLE</span>
                  <b>Assistant Administrative Officer · Part-Time</b>

                  <span>TIMELINE</span>
                  <b>Aug 2024 — May 2026</b>

                  <span>LOCATION</span>
                  <b>Mangalagiri, Andhra Pradesh</b>
                </div>

                <div className="popup-divider" />

                <p className="popup-label">WHAT I WORKED ON</p>

                <ul>
                  <li>
                    Managed day-to-day college operations, documentation and
                    administrative workflows.
                  </li>

                  <li>
                    Managed admissions, student and parent records, accounts,
                    fee operations and financial documentation.
                  </li>

                  <li>
                    Maintained UDISE data and coordinated university
                    requirements, affiliations and certifications.
                  </li>

                  <li>
                    Investigated payment discrepancies and coordinated their
                    resolution.
                  </li>

                  <li>
                    Coordinated communication with students, parents,
                    management, faculty and university stakeholders.
                  </li>
                </ul>
              </div>
            </article>

            {/* TECHNO SPARK */}

            <article className={`experience-item experience-hover ${activeExperience === "techno" ? "is-active" : ""}`} onClick={() => setActiveExperience((current) => (current === "techno" ? null : "techno"))}>
              <div className="experience-main">
                <div className="experience-date">JAN 2024 — MAY 2024</div>

                <div>
                  <h3 className="experience-role">Data Analytics Intern</h3>

                  <p className="experience-company">
                    Techno Spark IT Solutions · Vijayawada, Andhra Pradesh
                  </p>

                  <span className="experience-type">
                    Internship · SAS &amp; Excel
                  </span>
                </div>
              </div>

              <div className="experience-arrow">↗</div>

              <div className="experience-popup" onClick={(event) => event.stopPropagation()}>
                <div className="popup-header">
                  <span>INTERNSHIP</span>
                  <strong>TECHNO SPARK</strong>
                </div>

                <div className="popup-meta">
                  <span>ROLE</span>
                  <b>Data Analytics Intern</b>

                  <span>TIMELINE</span>
                  <b>Jan 2024 — May 2024</b>

                  <span>LOCATION</span>
                  <b>Vijayawada, Andhra Pradesh</b>
                </div>

                <div className="popup-divider" />

                <p className="popup-label">WHAT I WORKED ON</p>

                <ul>
                  <li>
                    Collected, cleaned and validated structured datasets using
                    SAS OnDemand for Academics and Microsoft Excel.
                  </li>

                  <li>
                    Performed exploratory and statistical analysis to identify
                    trends, anomalies and data-quality issues.
                  </li>

                  <li>
                    Investigated data inconsistencies and documented analytical
                    findings.
                  </li>

                  <li>
                    Prepared analytical outputs and reports within defined
                    project timelines.
                  </li>
                </ul>
              </div>
            </article>

            {/* JAVA */}

            <article className="experience-item">
              <div className="experience-main">
                <div className="experience-date">2023</div>

                <div>
                  <h3 className="experience-role">Full-Stack Java Intern</h3>

                  <p className="experience-company">
                    KBN College Project Lab
                  </p>

                  <span className="experience-type">
                    Java · Web Development
                  </span>
                </div>
              </div>

              <div className="experience-arrow">↗</div>
            </article>

            {/* COMMUNITY */}

            <article className="experience-item">
              <div className="experience-main">
                <div className="experience-date">2022</div>

                <div>
                  <h3 className="experience-role">
                    Digital &amp; Computer Awareness Volunteer
                  </h3>

                  <p className="experience-company">
                    Community Service Project
                  </p>

                  <span className="experience-type">Digital Literacy</span>
                </div>
              </div>

              <div className="experience-arrow">↗</div>
            </article>
          </div>
          </Reveal>
        </div>
      </section>

      {/* =========================================================
          PROJECTS — FEATURED CAROUSEL
      ========================================================= */}

      <section className="section projects-section" id="work">
        <div className="container">
          <div className="projects-heading">
            <div>
              <div className="eyebrow section-eyebrow">
                <span className="eyebrow-line" />
                03 / Selected Work
              </div>

              <h2 className="section-title" data-scramble>
                Projects that
                <br />
                <em>move data.</em>
              </h2>
            </div>

            <div className="projects-heading-meta">
              <span>SELECTED PROJECTS</span>
              <strong>05</strong>
            </div>
          </div>

          <p className="section-description projects-description">
            Explore my analytics, AI, risk and data visualization projects.
          </p>

          <Reveal className="projects-reveal">
          <div
            className={`project-showcase accent-${currentProject.accent}`}
            onMouseEnter={() => setShowcasePaused(true)}
            onMouseLeave={() => setShowcasePaused(false)}
            onFocusCapture={() => setShowcasePaused(true)}
            onBlurCapture={() => setShowcasePaused(false)}
          >
            {/* Top project navigation */}

            <div className="showcase-topbar">
              <div className="showcase-label">
                <span className="live-dot" />
                FEATURED PROJECT
              </div>

              <div className="showcase-counter">
                <span>{currentProject.number}</span>
                <i>/</i>
                <span>05</span>
              </div>
            </div>

            {/* Main featured area */}

            <div className="showcase-main">
              {/* Project information */}

              <div className="showcase-copy">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={`${currentProject.number}-copy`}
                    initial={reduced ? false : { opacity: 0, x: direction * -35 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={reduced ? undefined : { opacity: 0, x: direction * 35 }}
                    transition={{ duration: reduced ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="showcase-number">
                      {currentProject.number}
                    </div>

                    <div className="showcase-category">
                      {currentProject.category}
                    </div>

                    <h3>{currentProject.title}</h3>

                    <p>{currentProject.description}</p>

                    <div className="showcase-line" />

                    <div className="showcase-tools">
                      <span>ANALYZE</span>
                      <span>VISUALIZE</span>
                      <span>INSIGHT</span>
                    </div>

                    <a
                      href={currentProject.link}
                      target="_blank"
                      rel="noreferrer"
                      className="showcase-button"
                      data-magnetic
                      data-liquid
                    >
                      <span className="button-label">View Live Project <span>↗</span></span>
                      <svg className="button-border-svg" viewBox="0 0 100 36" preserveAspectRatio="none" aria-hidden="true"><rect x="1" y="1" width="98" height="34" rx="17" /></svg>
                    </a>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Featured image */}

              <div className="showcase-image-stage">
                <div className="showcase-image-glow" />

                <AnimatePresence mode="wait" initial={false}>
                  <FeaturedProjectFrame
                    project={currentProject}
                    direction={direction}
                    onSwipe={(swipeDirection) => {
                      if (swipeDirection > 0) nextProject();
                      else previousProject();
                    }}
                  />
                </AnimatePresence>
              </div>
            </div>

            {/* Controls */}

            <div className="showcase-controls">
              <div className="project-thumbnails">
                {projects.map((project, index) => (
                  <button
                    key={project.number}
                    type="button"
                    className={`project-thumb ${
                      index === activeProject ? "is-active" : ""
                    }`}
                    onClick={() => goToProject(index)}
                    aria-label={`Show ${project.title}`}
                    aria-current={index === activeProject}
                  >
                    <span className="thumb-image gloss-sweep mask-reveal">
                      <img src={project.image} alt="" />
                    </span>

                    <span className="thumb-info">
                      <small>{project.number}</small>
                      <strong>{project.title}</strong>
                    </span>
                  </button>
                ))}
              </div>

              <div className="showcase-arrows">
                <button
                  type="button"
                  onClick={previousProject}
                  aria-label="Previous project"
                  className="showcase-arrow"
                >
                  ←
                </button>

                <button
                  type="button"
                  onClick={nextProject}
                  aria-label="Next project"
                  className="showcase-arrow showcase-arrow-primary"
                >
                  →
                </button>
              </div>
            </div>

            <div className="showcase-progress">
              {projects.map((project, index) => (
                <button
                  key={project.number}
                  type="button"
                  onClick={() => goToProject(index)}
                  className={`progress-segment ${
                    index === activeProject ? "is-active" : ""
                  }`}
                  aria-label={`Go to project ${project.number}`}
                >
                  <span className="progress-fill" />
                </button>
              ))}
            </div>
          </div>
          </Reveal>
        </div>
      </section>

      {/* =========================================================
          SKILLS
      ========================================================= */}

      <section className="section" id="skills">
        <div className="container">
          <div className="eyebrow section-eyebrow">
            <span className="eyebrow-line" />
            04 / Skills
          </div>

          <h2 className="section-title" data-scramble>
            Technical &amp;
            <br />
            <em>Professional Competencies.</em>
          </h2>

          <p className="section-description">
            My existing skills and competencies, presented without adding
            technologies that aren&apos;t part of my portfolio.
          </p>

          <Reveal className="skills-reveal">
          <div className="skills-wrapper">
            {skillGroups.map((group) => (
              <div className="skill-card liquid-glass glow-border" key={group.number}>
                <div className="skill-card-number">{group.number}</div>

                <h3>{group.title}</h3>

                <div className="skill-list">
                  {group.skills.map(([skill, level]) => (
                    <div className="skill-row" key={skill}>
                      <span>{skill}</span>
                      <small>{level}</small>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          </Reveal>
        </div>
      </section>

      {/* =========================================================
          EDUCATION
      ========================================================= */}

      <section className="section" id="education">
        <div className="container">
          <div className="eyebrow section-eyebrow">
            <span className="eyebrow-line" />
            05 / Education
          </div>

          <h2 className="section-title" data-scramble>
            Academic
            <br />
            <em>background.</em>
          </h2>

          <Reveal className="education-reveal">
          <div className="education-grid">
            <article className="education-card education-card-srm liquid-glass glow-border mask-reveal">
              <span>2024 — 2026</span>

              <h3>MBA — AI &amp; Data Science</h3>

              <p>SRM Institute of Science &amp; Technology, Chennai</p>

              <strong>CGPA 9.04</strong>
            </article>

            <article className="education-card education-card-kbn liquid-glass glow-border mask-reveal">
              <span>2021 — 2024</span>

              <h3>B.Sc. — Data Science</h3>

              <p>KBN College · Krishna University, Andhra Pradesh</p>

              <strong>87%</strong>
            </article>
          </div>
          </Reveal>
        </div>
      </section>

      {/* =========================================================
          CONTACT
      ========================================================= */}

      <section className="contact" id="contact">
        <div className="container">
          <div className="eyebrow section-eyebrow">
            <span className="eyebrow-line" />
            06 / Contact
          </div>

          <h2 className="contact-title" data-scramble>
            Let&apos;s connect
            <br />
            and make data <em>useful.</em>
          </h2>

          <p className="contact-description">
            Open to opportunities in Data Analytics, Business Analysis,
            Business Intelligence, Operations Analytics and Risk Analytics.
          </p>

          <Reveal className="contact-reveal">
          <div className="contact-actions">
            <a
              href="mailto:puvvadarohansai@gmail.com"
              className="button button-primary"
              data-magnetic
              data-liquid
            >
              <span className="button-label">Send an Email ↗</span>
              <svg className="button-border-svg" viewBox="0 0 100 36" preserveAspectRatio="none" aria-hidden="true"><rect x="1" y="1" width="98" height="34" rx="17" /></svg>
            </a>

            <a
              href="https://www.linkedin.com/in/rohan-sai-pavan-649133397"
              target="_blank"
              rel="noreferrer"
              className="button button-secondary"
              data-magnetic
              data-liquid
            >
              <span className="button-label">LinkedIn ↗</span>
              <svg className="button-border-svg" viewBox="0 0 100 36" preserveAspectRatio="none" aria-hidden="true"><rect x="1" y="1" width="98" height="34" rx="17" /></svg>
            </a>
          </div>
          <div className="contact-meta">
            <span>puvvadarohansai@gmail.com</span>
            <span>+91 93473 95265</span>
            <span>Mangalagiri, Andhra Pradesh</span>
          </div>
          </Reveal>
        </div>
      </section>

      {/* =========================================================
          FOOTER
      ========================================================= */}

      <footer className="footer">
        <div className="container footer-inner">
          <span className="footer-brand">RSP/26 — DATA · BI · AI</span>

          <span>© {new Date().getFullYear()} Rohan Sai Pavan</span>

          <a href="#top">BACK TO TOP ↑</a>
        </div>
      </footer>
    </main>
  );
}
