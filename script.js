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

function qs(selector, scope = document) {
  return scope.querySelector(selector);
}

function qsa(selector, scope = document) {
  return Array.from(scope.querySelectorAll(selector));
}

function initHeaderState() {
  const header = qs(".site-header");
  if (!header) {
    return;
  }

  const setHeaderState = () => {
    header.classList.toggle("scrolled", window.scrollY > 20);
  };

  window.addEventListener("scroll", setHeaderState, { passive: true });
  setHeaderState();
}

function initActiveNav() {
  const links = qsa(".desktop-nav a[data-nav]");
  if (!links.length) {
    return;
  }

  const bySection = (id) => {
    links.forEach((link) => {
      link.classList.toggle("active", link.dataset.nav === id);
    });
  };

  const observed = qsa("main section[id]").filter((section) =>
    ["services", "industries", "process", "contact"].includes(section.id)
  );

  if (!observed.length) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          bySection(entry.target.id);
        }
      });
    },
    {
      rootMargin: "-45% 0px -45% 0px",
      threshold: 0.02
    }
  );

  observed.forEach((section) => observer.observe(section));
}

function initMobileMenu() {
  const openButton = qs(".menu-toggle");
  const drawer = qs(".mobile-drawer");
  const closeButton = qs(".drawer-close");
  const links = qsa(".mobile-nav a");

  if (!openButton || !drawer || !closeButton) {
    return;
  }

  const open = () => {
    drawer.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
    openButton.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    drawer.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
    openButton.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };

  openButton.addEventListener("click", open);
  closeButton.addEventListener("click", close);
  links.forEach((link) => link.addEventListener("click", close));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && drawer.classList.contains("open")) {
      close();
    }
  });
}

function renderDesktopServices(activeIndex) {
  const serviceList = qs("#service-list");
  const servicePreview = qs("#service-preview");

  if (!serviceList || !servicePreview) {
    return;
  }

  serviceList.innerHTML = services
    .map((service, index) => {
      const active = index === activeIndex;
      return `<button class="service-item${active ? " active" : ""}" type="button" role="tab" aria-selected="${active}" data-index="${index}">
        <span>${service.name}</span>
        <span aria-hidden="true">-></span>
      </button>`;
    })
    .join("");

  const current = services[activeIndex];
  const tags = current.bestFor.map((tag) => `<span class="tag">${tag}</span>`).join("");

  servicePreview.innerHTML = `
    <h3>${current.name}</h3>
    <p class="best-for">Best for:</p>
    <div class="tag-row">${tags}</div>
    <p class="service-desc">${current.description}</p>
    <a href="#contact" class="learn-more">Start This Project -></a>
  `;

  qsa(".service-item", serviceList).forEach((item) => {
    const idx = Number(item.dataset.index);
    item.addEventListener("mouseenter", () => {
      renderDesktopServices(idx);
    });
    item.addEventListener("focus", () => {
      renderDesktopServices(idx);
    });
    item.addEventListener("click", () => {
      renderDesktopServices(idx);
    });
  });
}

function renderMobileServices() {
  const container = qs("#service-mobile");
  if (!container) {
    return;
  }

  container.innerHTML = services
    .map((service, index) => {
      const open = index === 0;
      const tags = service.bestFor.map((tag) => `<span class="tag">${tag}</span>`).join("");
      return `
        <article class="accordion-item">
          <button class="accordion-button" type="button" aria-expanded="${open}" data-index="${index}">
            <span>${service.name}</span>
            <span>${open ? "-" : "+"}</span>
          </button>
          <div class="accordion-panel${open ? " open" : ""}">
            <p class="best-for">Best for:</p>
            <div class="tag-row">${tags}</div>
            <p class="service-desc">${service.description}</p>
            <a href="#contact" class="learn-more">Start This Project -></a>
          </div>
        </article>
      `;
    })
    .join("");

  const buttons = qsa(".accordion-button", container);
  const panels = qsa(".accordion-panel", container);

  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      const expanded = button.getAttribute("aria-expanded") === "true";

      buttons.forEach((btn, btnIndex) => {
        btn.setAttribute("aria-expanded", "false");
        const icon = btn.lastElementChild;
        if (icon) {
          icon.textContent = "+";
        }
        panels[btnIndex].classList.remove("open");
      });

      if (!expanded) {
        button.setAttribute("aria-expanded", "true");
        const icon = button.lastElementChild;
        if (icon) {
          icon.textContent = "-";
        }
        panels[index].classList.add("open");
      }
    });
  });
}

function initServices() {
  renderDesktopServices(0);
  renderMobileServices();
}

function initReveal() {
  const nodes = qsa("[data-reveal]");
  if (!nodes.length) {
    return;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    nodes.forEach((node) => node.classList.add("is-visible"));
    return;
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
    {
      threshold: 0.12
    }
  );

  nodes.forEach((node) => observer.observe(node));
}

function initHeroParallax() {
  const hero = qs(".hero");
  const stage = qs("[data-parallax]");

  if (!hero || !stage) {
    return;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  if (!window.matchMedia("(pointer:fine)").matches) {
    return;
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

  hero.addEventListener("pointermove", (event) => {
    const rect = hero.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    targetX = x * 9;
    targetY = y * -7;
    start();
  });

  hero.addEventListener("pointerleave", () => {
    targetX = 0;
    targetY = 0;
    start();
  });
}

function formatCount(value, decimals) {
  if (decimals > 0) {
    return value.toFixed(decimals);
  }
  return Math.round(value).toString();
}

function animateCounter(node) {
  const targetValue = Number(node.dataset.counter);
  if (!Number.isFinite(targetValue)) {
    return;
  }

  const decimals = Number.isInteger(targetValue) ? 0 : 1;
  const prefix = node.dataset.prefix || "";
  const suffix = node.dataset.suffix || "";

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    node.textContent = `${prefix}${formatCount(targetValue, decimals)}${suffix}`;
    return;
  }

  const duration = 1200;
  const startTime = performance.now();

  const tick = (now) => {
    const elapsed = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - elapsed, 3);
    const value = targetValue * eased;
    node.textContent = `${prefix}${formatCount(value, decimals)}${suffix}`;

    if (elapsed < 1) {
      requestAnimationFrame(tick);
    }
  };

  requestAnimationFrame(tick);
}

function initCounters() {
  const counters = qsa("[data-counter]");
  if (!counters.length) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.6
    }
  );

  counters.forEach((counter) => observer.observe(counter));
}

function initTrackHoverPause() {
  const tracks = qsa(".logo-row, .testimonial-track");
  tracks.forEach((track) => {
    track.addEventListener("mouseenter", () => {
      track.style.animationPlayState = "paused";
    });
    track.addEventListener("mouseleave", () => {
      track.style.animationPlayState = "running";
    });
  });
}

function bootstrap() {
  initHeaderState();
  initActiveNav();
  initMobileMenu();
  initServices();
  initReveal();
  initHeroParallax();
  initCounters();
  initTrackHoverPause();
}

bootstrap();
