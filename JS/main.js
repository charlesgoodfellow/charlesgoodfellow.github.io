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

  // --- Fade sections in as they scroll into view ---

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll(".section").forEach((el) => {
    el.classList.add("reveal");
    revealObserver.observe(el);
  });
}

// --- Footer year ---

document.getElementById("year").textContent = new Date().getFullYear();
