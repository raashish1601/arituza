"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const services = [
  {
    name: "Website Development and Design",
    bestFor: ["Restaurants", "Retail", "Healthcare", "Real Estate", "Education"],
    description:
      "Conversion-focused websites and web apps designed for speed, trust, and clear business outcomes. We handle architecture, UX, integrations, and deployment."
  },
  {
    name: "SEO and Digital Marketing",
    bestFor: ["Retail", "Hospitality", "Professional Services", "Real Estate"],
    description:
      "Performance-driven local SEO, search campaigns, and content systems that generate qualified demand and measurable pipeline, not vanity metrics."
  },
  {
    name: "Custom Software Development",
    bestFor: ["Healthcare", "Operations Teams", "Finance", "Professional Services"],
    description:
      "Purpose-built internal platforms, dashboards, and customer-facing software for teams that need workflows no off-the-shelf product can handle."
  },
  {
    name: "IT Support and Managed Services",
    bestFor: ["Small and Mid-Market Teams", "Multi-location Businesses"],
    description:
      "Proactive IT operations with live monitoring, fast incident response, and reliable day-to-day support that keeps teams productive."
  },
  {
    name: "Cloud Solutions and Hosting",
    bestFor: ["Distributed Teams", "Security-Sensitive Workloads", "Scaling Businesses"],
    description:
      "Cloud migrations, high-availability environments, and managed hosting engineered for uptime, performance, and disaster resilience."
  },
  {
    name: "Point of Sale (POS) Systems",
    bestFor: ["Restaurants", "Retail", "Hospitality"],
    description:
      "Modern POS setup and support with inventory sync, payment reliability, and actionable reporting tied directly to daily operations."
  },
  {
    name: "E-commerce Development",
    bestFor: ["Retail", "D2C Brands", "Service Providers"],
    description:
      "High-conversion storefronts and checkout flows integrated with catalog, fulfillment, analytics, and marketing automation."
  },
  {
    name: "Mobile App Development",
    bestFor: ["Healthcare", "Field Services", "Customer Experience Programs"],
    description:
      "Native-feel mobile products for iOS and Android that improve engagement, unlock self-service, and streamline operational tasks."
  },
  {
    name: "Cybersecurity Services",
    bestFor: ["Healthcare", "Finance", "Legal", "All Businesses"],
    description:
      "Practical security architecture covering endpoints, identity, monitoring, backup policy, and team training to reduce business risk."
  },
  {
    name: "Networking and Infrastructure Setup",
    bestFor: ["Offices", "Clinics", "Warehouses", "Multi-floor Operations"],
    description:
      "Reliable wired and wireless infrastructure, VPN topology, and secure network segmentation for stable high-throughput operations."
  },
  {
    name: "Business Automation and Workflow Solutions",
    bestFor: ["Operations Teams", "Professional Services", "Real Estate"],
    description:
      "Automated workflows for onboarding, approvals, scheduling, and reporting so teams spend less time on manual administrative work."
  },
  {
    name: "Data Analytics and Reporting",
    bestFor: ["Leadership Teams", "Retail", "Hospitality", "Service Businesses"],
    description:
      "Executive-ready dashboards and reporting systems that connect systems data into clear KPIs and decision-ready insights."
  },
  {
    name: "Virtual Assistant Setup",
    bestFor: ["Support Teams", "Appointment-driven Businesses", "E-commerce"],
    description:
      "AI assistants and chat flows that deflect repetitive work, improve response speed, and escalate complex cases to humans cleanly."
  },
  {
    name: "Email Marketing Solutions",
    bestFor: ["All Businesses"],
    description:
      "Automated lifecycle campaigns, segmentation logic, and conversion-focused sequences connected directly to your CRM stack."
  },
  {
    name: "IT Consultation and Training",
    bestFor: ["Leadership Teams", "Growing Organizations", "Cross-functional Teams"],
    description:
      "Strategic advisory and practical team enablement so technology decisions are clear, executable, and aligned to business priorities."
  }
];

const serviceMedia = [
  {
    type: "video",
    src: "/media/services-loop.mp4",
    poster: "/media/services-workflow.jpg",
    alt: "Managed IT strategy session for business systems."
  },
  {
    type: "image",
    src: "/media/services-command.jpg",
    alt: "IT consulting team planning infrastructure and operations."
  },
  {
    type: "image",
    src: "/media/services-workflow.jpg",
    alt: "Business workflow mapping for technology integration."
  },
  {
    type: "image",
    src: "/media/hero-dashboard.jpg",
    alt: "Cloud monitoring and software development workstation."
  }
];

const metrics = [
  { value: 500, prefix: "", suffix: "+", label: "Businesses Supported", decimals: 0 },
  { value: 99.9, prefix: "", suffix: "%", label: "Platform Uptime", decimals: 1 },
  { value: 1, prefix: "<", suffix: "hr", label: "Critical Response", decimals: 0 }
];

const processSteps = [
  {
    number: "01",
    title: "Technical Discovery",
    description: "We map your current systems, friction points, and near-term business priorities.",
    image: "/media/process-discovery.jpg",
    alt: "Technical discovery workshop session."
  },
  {
    number: "02",
    title: "Architecture Blueprint",
    description: "You receive a clear execution plan with phases, scope, timeline, and pricing.",
    image: "/media/process-blueprint.jpg",
    alt: "Architecture blueprint planning board."
  },
  {
    number: "03",
    title: "Build and Transition",
    description: "We deploy, test, and onboard your team with documentation and handoff standards.",
    image: "/media/process-build.jpg",
    alt: "Engineering team executing implementation and rollout."
  },
  {
    number: "04",
    title: "Continuous Optimization",
    description: "Post-launch monitoring and iterative improvements keep systems reliable and efficient.",
    image: "/media/process-optimize.jpg",
    alt: "Monitoring dashboards used for continuous optimization."
  }
];

const industries = [
  { tag: "HIPAA", title: "Healthcare and Clinics", description: "EMR, scheduling, and secure patient workflows.", iconPath: "M4 20V7l8-3 8 3v13M9 14h6M12 10v8" },
  { tag: "POS", title: "Retail and E-commerce", description: "Catalog sync, checkout reliability, and CX automation.", iconPath: "M4 7h16v13H4zM8 7V4h8v3M7 12h10" },
  { tag: "MENU", title: "Restaurants and Hospitality", description: "Ordering, reservations, and multi-location operations.", iconPath: "M3 20h18M5 20V8l7-4 7 4v12M9 20v-5h6v5" },
  { tag: "DOCS", title: "Professional and Legal Services", description: "Secure docs, intake flows, and case workflows.", iconPath: "M5 20V6h14v14M8 9h8M8 13h8M8 17h5" },
  { tag: "CRM", title: "Real Estate and Property Groups", description: "Listings, lead routing, and property operations.", iconPath: "M4 20h16M6 20V9l6-5 6 5v11M9 20v-4h6v4" },
  { tag: "FIELD", title: "Construction and Field Services", description: "Dispatch, crew coordination, and site reporting.", iconPath: "M4 20h16M6 20V7h12v13M9 10h6M9 14h6" },
  { tag: "SOC2", title: "Finance and Insurance", description: "Compliance controls, portals, and risk workflows.", iconPath: "M4 16h16M6 20h12M8 12h8M10 4h4v4h-4z" },
  { tag: "LMS", title: "Education and Training", description: "Student portals, scheduling, and digital delivery.", iconPath: "M4 20V6h16v14M7 10h10M7 14h6" },
  { tag: "APP", title: "Fitness and Wellness", description: "Member engagement, classes, and billing automation.", iconPath: "M12 20s6-4.5 6-10a6 6 0 1 0-12 0c0 5.5 6 10 6 10ZM9 10h6" },
  { tag: "GOV", title: "Local Government Vendors", description: "Procurement-ready systems and service request handling.", iconPath: "M3 20h18M5 20V9l7-4 7 4v11M9 15h6" }
];

const testimonials = [
  { quote: "\"Arituza replaced our patchwork IT stack in six weeks. Ticket volume dropped immediately and uptime has been consistent since launch.\"", name: "Marcus D.", role: "Owner, Birmingham Restaurant Group", avatar: "/media/testimonial-1.jpg" },
  { quote: "\"Security and compliance finally stopped being reactive. Their team made the whole process clear for non-technical leadership.\"", name: "Dr. Priya S.", role: "Medical Director, Huntsville Family Clinic", avatar: "/media/testimonial-2.jpg" },
  { quote: "\"We moved from manual workflows to automated operations in under 90 days. It changed how fast our team can deliver.\"", name: "Rachel T.", role: "Founder, Montgomery Commerce Co.", avatar: "/media/testimonial-3.jpg" },
  { quote: "\"Their blend of product UX and IT engineering is rare. They shipped improvements our customers noticed right away.\"", name: "Daniel M.", role: "COO, Mobile Service Collective", avatar: "/media/testimonial-4.jpg" },
  { quote: "\"Arituza became an extension of our internal team. Fast response, clean communication, and no unnecessary complexity.\"", name: "Kayla B.", role: "VP Operations, North Alabama Logistics", avatar: "/media/testimonial-1.jpg" }
];

const faqItems = [
  { q: "What IT services does Arituza provide in Alabama?", a: "Arituza provides managed IT services, cybersecurity, cloud architecture, custom software development, website development, and business automation for Alabama organizations." },
  { q: "Do you support small and mid-sized businesses?", a: "Yes. We work with small and mid-sized teams that need reliable technology operations, faster support response, and a practical roadmap tied to business outcomes." },
  { q: "Can you help with cybersecurity and compliance?", a: "Yes. We implement identity controls, endpoint protection, monitoring, backup strategy, and compliance-ready documentation that reduces risk across your environment." },
  { q: "How quickly can we start a project?", a: "Most engagements begin with a discovery call and system review. After scope alignment, projects typically start within days based on complexity and priorities." },
  { q: "Do you offer cloud migration and modernization?", a: "Yes. We design and execute cloud migration, workload modernization, and reliability improvements to increase performance, security, and uptime." },
  { q: "How do we request a proposal?", a: "Email us at contact@arituza.com or call (205) 800-8869 or (205) 738-9195. We respond with a clear recommendation, scope options, and implementation path within one business day." }
];

function formatCount(value, decimals) {
  if (decimals > 0) {
    return Number(value).toFixed(decimals);
  }
  return Math.round(value).toString();
}

function classNames(...values) {
  return values.filter(Boolean).join(" ");
}

export default function HomePageClient() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState("services");
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const [openAccordionIndex, setOpenAccordionIndex] = useState(0);
  const [counterValues, setCounterValues] = useState(metrics.map(() => 0));
  const startedCounters = useRef(new Set());
  const heroRef = useRef(null);
  const stageRef = useRef(null);
  const metricRefs = useRef([]);
  const doubledTestimonials = useMemo(() => [...testimonials, ...testimonials], []);

  useEffect(() => {
    const onScroll = () => {
      setHeaderScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observed = Array.from(document.querySelectorAll("main section[id]")).filter((section) =>
      ["services", "why", "process", "industries", "faq"].includes(section.id)
    );

    if (!observed.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveNav(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0.02
      }
    );

    observed.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll("[data-reveal]"));
    if (!nodes.length) {
      return undefined;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    const stage = stageRef.current;
    if (!hero || !stage) {
      return undefined;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    if (!window.matchMedia("(pointer:fine)").matches) {
      return undefined;
    }

    let rafId = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const animate = () => {
      currentX += (targetX - currentX) * 0.11;
      currentY += (targetY - currentY) * 0.11;
      stage.style.transform = `rotateY(${currentX}deg) rotateX(${currentY}deg)`;

      if (Math.abs(currentX - targetX) > 0.02 || Math.abs(currentY - targetY) > 0.02) {
        rafId = window.requestAnimationFrame(animate);
      } else {
        rafId = 0;
        if (targetX === 0 && targetY === 0) {
          stage.style.transform = "";
        }
      }
    };

    const start = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(animate);
      }
    };

    const onPointerMove = (event) => {
      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 9;
      targetY = y * -7;
      start();
    };

    const onPointerLeave = () => {
      targetX = 0;
      targetY = 0;
      start();
    };

    hero.addEventListener("pointermove", onPointerMove);
    hero.addEventListener("pointerleave", onPointerLeave);

    return () => {
      hero.removeEventListener("pointermove", onPointerMove);
      hero.removeEventListener("pointerleave", onPointerLeave);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCounterValues(metrics.map((metric) => metric.value));
      return undefined;
    }

    const animateCounter = (index) => {
      if (startedCounters.current.has(index)) {
        return;
      }
      startedCounters.current.add(index);

      const metric = metrics[index];
      const duration = 1200;
      const startedAt = performance.now();

      const tick = (now) => {
        const elapsed = Math.min((now - startedAt) / duration, 1);
        const eased = 1 - Math.pow(1 - elapsed, 3);
        const value = metric.value * eased;
        setCounterValues((current) => {
          const next = [...current];
          next[index] = value;
          return next;
        });
        if (elapsed < 1) {
          requestAnimationFrame(tick);
        }
      };

      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-metric-index"));
            animateCounter(index);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );

    metricRefs.current.forEach((node) => {
      if (node) {
        observer.observe(node);
      }
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const currentService = services[activeServiceIndex];
  const currentServiceMedia = serviceMedia[activeServiceIndex % serviceMedia.length];

  return (
    <>
      <aside className="top-banner" aria-label="Announcement">
        <div className="container top-banner-inner">
          <p>Now onboarding new Alabama teams in under 14 days.</p>
        </div>
      </aside>

      <header className={classNames("site-header", headerScrolled && "scrolled")} id="top">
        <div className="container nav-shell">
          <a className="brand" href="#top" aria-label="Arituza home">
            <img className="brand-logo" src="/logo.svg" alt="Arituza logo" />
          </a>

          <nav className="desktop-nav" aria-label="Primary">
            {[
              ["services", "Services"],
              ["why", "Why Arituza"],
              ["process", "Process"],
              ["industries", "Industries"],
              ["faq", "FAQ"]
            ].map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                data-nav={id}
                className={activeNav === id ? "active" : ""}
              >
                {label}
              </a>
            ))}
          </nav>

          <button
            className="menu-toggle"
            type="button"
            aria-controls="mobile-menu"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <div className={classNames("mobile-drawer", menuOpen && "open")} id="mobile-menu" aria-hidden={!menuOpen}>
        <button className="drawer-close" type="button" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
          Close
        </button>
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {[
            ["services", "Services"],
            ["why", "Why Arituza"],
            ["process", "Process"],
            ["industries", "Industries"],
            ["faq", "FAQ"]
          ].map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
      </div>

      <main>
        <section className="hero" id="hero" ref={heroRef}>
          <div className="hero-aurora" aria-hidden="true">
            <span className="orb orb-a"></span>
            <span className="orb orb-b"></span>
            <span className="grid-noise"></span>
          </div>

          <div className="container hero-layout">
            <div className="hero-copy">
              <p className="eyebrow" data-reveal>
                ALABAMA | ENTERPRISE IT STUDIO
              </p>
              <h1 data-reveal>AI-ready technology systems for businesses that cannot afford downtime.</h1>
              <p className="hero-subcopy" data-reveal>
                Arituza designs, ships, and supports high-performance technology for modern operators. We combine cloud
                architecture, cybersecurity, automation, and product-grade UX into one execution partner.
              </p>

              <div className="hero-actions" data-reveal>
                <a className="btn btn-primary" href="#services">
                  Explore Capabilities
                </a>
              </div>

              <ul className="hero-metrics" aria-label="Arituza highlights" data-reveal>
                {metrics.map((metric, index) => (
                  <li key={metric.label}>
                    <strong data-metric-index={index} ref={(node) => (metricRefs.current[index] = node)}>
                      {metric.prefix}
                      {formatCount(counterValues[index], metric.decimals)}
                      {metric.suffix}
                    </strong>
                    <span>{metric.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            <aside
              className="hero-stage"
              data-parallax
              data-reveal
              aria-label="Arituza service orchestration panel"
              ref={stageRef}
            >
              <div className="stage-visual" aria-hidden="true">
                <video autoPlay muted loop playsInline preload="metadata" poster="/media/hero-dashboard.jpg">
                  <source src="/media/hero-loop.mp4" type="video/mp4" />
                </video>
                <img
                  src="/media/hero-operations.jpg"
                  alt="Secure datacenter racks used in enterprise managed IT operations."
                  loading="eager"
                  fetchPriority="high"
                />
              </div>

              <div className="stage-header">
                <p>Service Orchestration</p>
                <span>
                  <i></i>Live
                </span>
              </div>

              <div className="stage-core">
                <article>
                  <h3>Cloud Reliability</h3>
                  <p>Multi-zone architecture with encrypted failover.</p>
                </article>
                <article>
                  <h3>Security Mesh</h3>
                  <p>Threat monitoring, endpoint policy, and SIEM alerts.</p>
                </article>
                <article>
                  <h3>Workflow AI</h3>
                  <p>Automated ticket triage and response acceleration.</p>
                </article>
              </div>

              <div className="stage-terminal" aria-hidden="true">
                <p>$ arituza deploy --policy zero-trust</p>
                <p>status: stable | secure | autoscaled</p>
              </div>
            </aside>
          </div>
        </section>

        <section className="logo-ribbon" aria-label="Client categories" data-reveal>
          <div className="container">
            <p className="ribbon-label">
              Trusted by teams in healthcare, retail, finance, legal, logistics, and high-growth services.
            </p>
          </div>
          <div className="logo-track">
            <div className="logo-row">
              <span>BIRMINGHAM HEALTH</span>
              <span>RIVERBANK LEGAL</span>
              <span>SOUTHLINE RETAIL</span>
              <span>MAGNOLIA HOSPITALITY</span>
              <span>IRONRIDGE CONSTRUCTION</span>
              <span>HUNTSVILLE FINTECH</span>
              <span>BIRMINGHAM HEALTH</span>
              <span>RIVERBANK LEGAL</span>
              <span>SOUTHLINE RETAIL</span>
              <span>MAGNOLIA HOSPITALITY</span>
              <span>IRONRIDGE CONSTRUCTION</span>
              <span>HUNTSVILLE FINTECH</span>
            </div>
          </div>
        </section>

        <section className="section services-zone" id="services" data-reveal>
          <div className="container">
            <div className="section-head">
              <p className="kicker">Capabilities</p>
              <h2>Complete IT and digital execution from one accountable team.</h2>
              <p>
                Every service can run standalone or as part of one integrated roadmap. You get one architecture, one
                delivery rhythm, and one team that owns outcomes.
              </p>
            </div>

            <div className="services-media-strip" aria-label="Arituza implementation highlights">
              <figure>
                <img
                  src="/media/services-command.jpg"
                  alt="Arituza team working on IT implementation strategy."
                  loading="lazy"
                />
              </figure>
              <figure>
                <video autoPlay muted loop playsInline preload="metadata" poster="/media/services-workflow.jpg">
                  <source src="/media/services-loop.mp4" type="video/mp4" />
                </video>
              </figure>
              <figure>
                <img
                  src="/media/services-workflow.jpg"
                  alt="Collaborative workflow planning session with technical specialists."
                  loading="lazy"
                />
              </figure>
            </div>

            <div className="service-desktop">
              <div className="service-list" id="service-list" role="tablist" aria-label="Service list">
                {services.map((service, index) => (
                  <button
                    key={service.name}
                    className={classNames("service-item", activeServiceIndex === index && "active")}
                    type="button"
                    role="tab"
                    aria-selected={activeServiceIndex === index}
                    data-index={index}
                    onMouseEnter={() => setActiveServiceIndex(index)}
                    onFocus={() => setActiveServiceIndex(index)}
                    onClick={() => setActiveServiceIndex(index)}
                  >
                    <span>{service.name}</span>
                    <span aria-hidden="true">-&gt;</span>
                  </button>
                ))}
              </div>
              <div className="service-preview" id="service-preview" aria-live="polite">
                <div className="service-preview-media">
                  {currentServiceMedia.type === "video" ? (
                    <video autoPlay muted loop playsInline preload="metadata" poster={currentServiceMedia.poster}>
                      <source src={currentServiceMedia.src} type="video/mp4" />
                    </video>
                  ) : (
                    <img src={currentServiceMedia.src} alt={currentServiceMedia.alt} loading="lazy" />
                  )}
                </div>
                <h3>{currentService.name}</h3>
                <p className="best-for">Best for:</p>
                <div className="tag-row">
                  {currentService.bestFor.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="service-desc">{currentService.description}</p>
              </div>
            </div>

            <div className="service-mobile" id="service-mobile" aria-label="Mobile service accordion">
              {services.map((service, index) => {
                const open = openAccordionIndex === index;
                const media = serviceMedia[index % serviceMedia.length];
                return (
                  <article key={service.name} className="accordion-item">
                    <button
                      className="accordion-button"
                      type="button"
                      aria-expanded={open}
                      data-index={index}
                      onClick={() => setOpenAccordionIndex((current) => (current === index ? -1 : index))}
                    >
                      <span>{service.name}</span>
                      <span>{open ? "-" : "+"}</span>
                    </button>
                    <div className={classNames("accordion-panel", open && "open")}>
                      <div className="accordion-media">
                        {media.type === "video" ? (
                          <video autoPlay muted loop playsInline preload="metadata" poster={media.poster}>
                            <source src={media.src} type="video/mp4" />
                          </video>
                        ) : (
                          <img src={media.src} alt={media.alt} loading="lazy" />
                        )}
                      </div>
                      <p className="best-for">Best for:</p>
                      <div className="tag-row">
                        {service.bestFor.map((tag) => (
                          <span key={tag} className="tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="service-desc">{service.description}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section outcomes-zone" id="why" data-reveal>
          <div className="container outcomes-grid">
            <div className="outcomes-intro">
              <p className="kicker">Why Arituza</p>
              <h2>Built like a product team. Operated like a mission-critical partner.</h2>
              <p>
                Most vendors patch tickets. We engineer systems that reduce future tickets. Our model combines
                technical depth, clear communication, and fast execution cycles.
              </p>

              <div className="outcomes-media-stack" aria-label="Arituza delivery visuals">
                <figure>
                  <img src="/media/outcomes-team.jpg" alt="Team reviewing roadmap and project priorities together." loading="lazy" />
                </figure>
                <figure>
                  <video autoPlay muted loop playsInline preload="metadata" poster="/media/outcomes-ops.jpg">
                    <source src="/media/hero-loop.mp4" type="video/mp4" />
                  </video>
                </figure>
              </div>
            </div>

            <div className="outcomes-list">
              <article>
                <h3>Architecture Before Tools</h3>
                <p>Every recommendation starts with your workflow and business goals, not a software quota.</p>
              </article>
              <article>
                <h3>Fast, Structured Delivery</h3>
                <p>Sprints, milestones, and transparent status reporting so leadership always knows progress.</p>
              </article>
              <article>
                <h3>Security by Default</h3>
                <p>Identity controls, backups, endpoint policies, and monitoring embedded into every launch.</p>
              </article>
              <article>
                <h3>Operator-Friendly Support</h3>
                <p>Human support that translates technical decisions into clear business impact.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section process-zone" id="process" data-reveal>
          <div className="container">
            <div className="section-head">
              <p className="kicker">Delivery Model</p>
              <h2>A practical process with speed, clarity, and ownership.</h2>
            </div>

            <div className="process-grid">
              {processSteps.map((step) => (
                <article key={step.number}>
                  <span>{step.number}</span>
                  <img src={step.image} alt={step.alt} loading="lazy" />
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section industries-zone" id="industries" data-reveal>
          <div className="container">
            <div className="section-head">
              <p className="kicker">Industries</p>
              <h2>Built for complex, real-world operations across Alabama.</h2>
            </div>

            <div className="industries-visual-band" aria-label="Industry execution visuals">
              <figure>
                <img src="/media/industries-grid.jpg" alt="Multi-industry operations coordination session." loading="lazy" />
              </figure>
              <figure>
                <video autoPlay muted loop playsInline preload="metadata" poster="/media/hero-dashboard.jpg">
                  <source src="/media/services-loop.mp4" type="video/mp4" />
                </video>
              </figure>
            </div>

            <div className="industries-grid">
              {industries.map((industry) => (
                <article key={industry.title}>
                  <div className="industry-head">
                    <span className="industry-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                        <path d={industry.iconPath} />
                      </svg>
                    </span>
                    <span className="industry-tag">{industry.tag}</span>
                  </div>
                  <h3>{industry.title}</h3>
                  <p>{industry.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section testimonial-zone" id="testimonials" data-reveal>
          <div className="container">
            <div className="section-head">
              <p className="kicker">Results</p>
              <h2>What operators say after switching to Arituza.</h2>
            </div>

            <div className="testimonial-rail" aria-label="Testimonials">
              <div className="testimonial-track">
                {doubledTestimonials.map((testimonial, index) => (
                  <article
                    key={`${testimonial.name}-${index}`}
                    className="testimonial-card"
                    style={{ "--avatar-image": `url('${testimonial.avatar}')` }}
                  >
                    <p>{testimonial.quote}</p>
                    <h3>{testimonial.name}</h3>
                    <span>{testimonial.role}</span>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section faq-zone" id="faq" data-reveal>
          <div className="container">
            <div className="section-head">
              <p className="kicker">FAQ</p>
              <h2>Common questions about managed IT services in Alabama.</h2>
              <p>
                Clear answers for business leaders evaluating IT support, cybersecurity, cloud migration, and custom
                digital systems.
              </p>
            </div>

            <div className="faq-grid" aria-label="Frequently asked questions">
              {faqItems.map((item, index) => (
                <details key={item.q} open={index === 0}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <p className="footer-brand">
              <img className="footer-logo" src="/logo.svg" alt="Arituza logo" loading="lazy" />
            </p>
            <p className="footer-copy">
              AI-ready IT execution for Alabama businesses that need reliable systems and measurable outcomes.
            </p>
          </div>
          <div>
            <p className="footer-label">Services</p>
            <a href="#services">Web and Software</a>
            <a href="#services">Cloud and Infrastructure</a>
            <a href="#services">Security and Compliance</a>
            <a href="#services">Automation and AI</a>
          </div>
          <div>
            <p className="footer-label">Contact</p>
            <a href="mailto:contact@arituza.com">contact@arituza.com</a>
            <a href="tel:+12058008869">(205) 800-8869</a>
            <a href="tel:+12057389195">(205) 738-9195</a>
            <p className="footer-meta">Hoover, Alabama 35216</p>
            <p className="footer-meta">Response window: Under 24 hours</p>
          </div>
        </div>
        <div className="container footer-bottom">
          <p>(c) 2026 Arituza. All rights reserved.</p>
          <p>Hoover, Alabama 35216 | Under 24 hours</p>
        </div>
      </footer>
    </>
  );
}
