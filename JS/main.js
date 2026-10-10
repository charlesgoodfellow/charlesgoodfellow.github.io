// Charles Goodfellow · Personal Website

const root = document.documentElement;
root.classList.add("js");

// --- Theme toggle (remembers the visitor's choice, otherwise follows the OS) ---

const themeToggle = document.querySelector(".theme-toggle");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

const currentTheme = () => root.dataset.theme || (prefersDark.matches ? "dark" : "light");

themeToggle.addEventListener("click", () => {
  const next = currentTheme() === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch (e) {}
});

// --- Mobile navigation ---

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.getElementById("nav-links");

const setMenu = (open) => {
  navLinks.classList.toggle("is-open", open);
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
};

navToggle.addEventListener("click", () => setMenu(!navLinks.classList.contains("is-open")));
navLinks.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenu(false);
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenu(false);
});
document.addEventListener("click", (event) => {
  if (!event.target.closest(".site-nav")) setMenu(false);
});

// --- Highlight the nav link for the section in view ---

const sections = document.querySelectorAll("main section[id]");
const linkFor = (id) => navLinks.querySelector(`a[href="#${id}"]`);

if ("IntersectionObserver" in window) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const link = linkFor(entry.target.id);
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.querySelectorAll("a").forEach((a) => a.removeAttribute("aria-current"));
          link.setAttribute("aria-current", "true");
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );
  sections.forEach((section) => navObserver.observe(section));

  // --- Fade content in as it scrolls into view (staggered within grids) ---

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add("is-visible");
        revealObserver.unobserve(el);
        // Hand transitions back to the element (e.g. card hover lift) once revealed
        setTimeout(() => {
          el.classList.remove("reveal", "is-visible");
          el.style.removeProperty("--delay");
        }, 1200);
      });
    },
    { threshold: 0.12 }
  );

  const revealTargets = ".section-title, .prose, .skills, .timeline-item, .side-role, .card-grid > *, .subsection-title, .cert-list, .contact > *";
  document.querySelectorAll(revealTargets).forEach((el) => {
    const grid = el.parentElement.classList.contains("card-grid");
    if (grid) el.style.setProperty("--delay", `${([...el.parentElement.children].indexOf(el) % 3) * 90}ms`);
    el.classList.add("reveal");
    revealObserver.observe(el);
  });
}

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// --- Cursor spotlight on cards ---

document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    card.style.setProperty("--my", `${event.clientY - rect.top}px`);
  });
});

// --- Experience timeline fills in as you scroll ---

const timeline = document.querySelector(".timeline");
const timelineItems = timeline ? [...timeline.querySelectorAll(".timeline-item")] : [];
let timelineQueued = false;

const updateTimeline = () => {
  timelineQueued = false;
  const anchor = window.innerHeight * 0.6;
  const rect = timeline.getBoundingClientRect();
  const progress = Math.min(Math.max((anchor - rect.top) / rect.height, 0), 1);
  timeline.style.setProperty("--progress", progress.toFixed(4));
  timelineItems.forEach((item) => {
    item.classList.toggle("is-active", item.getBoundingClientRect().top + 12 < anchor);
  });
};

if (timeline) {
  const queue = () => {
    if (!timelineQueued) {
      timelineQueued = true;
      requestAnimationFrame(updateTimeline);
    }
  };
  window.addEventListener("scroll", queue, { passive: true });
  window.addEventListener("resize", queue);
  updateTimeline();
}

// --- Count up the hero stats ---

const counters = document.querySelectorAll("[data-count]");
const formatCount = (el, value) => `${Math.round(value).toLocaleString("en-US")}${el.dataset.suffix || ""}`;

if (!reduceMotion) {
  counters.forEach((el) => {
    const target = Number(el.dataset.count);
    const duration = 1600;
    const start = performance.now() + 250;
    el.textContent = formatCount(el, 0);
    const tick = (now) => {
      const t = Math.min(Math.max((now - start) / duration, 0), 1);
      el.textContent = formatCount(el, target * (1 - Math.pow(1 - t, 3)));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}

// --- Footer year ---

document.getElementById("year").textContent = new Date().getFullYear();
