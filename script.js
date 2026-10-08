const projects = [
  {
    title: "Personal Portfolio",
    description:
      "This website: a cinematic, responsive portfolio built with HTML, CSS, and JavaScript.",
    technologies: ["HTML", "CSS", "JavaScript"],
    liveUrl: "#home",
    githubUrl: "https://github.com/your-username",
    imageLabel: "Portfolio visual placeholder",
  },
  {
    title: "Student Project",
    description:
      "A placeholder card for a class or personal study project. Swap the title, description, and links.",
    technologies: ["HTML", "CSS", "JavaScript"],
    liveUrl: "",
    githubUrl: "https://github.com/your-username",
    imageLabel: "Student project visual placeholder",
  },
  {
    title: "Web Design Project",
    description:
      "A placeholder for a layout or visual design experiment. Add a screenshot later if you like.",
    technologies: ["HTML", "CSS", "JavaScript"],
    liveUrl: "",
    githubUrl: "https://github.com/your-username",
    imageLabel: "Web design visual placeholder",
  },
];

const header = document.getElementById("site-header");
const navToggle = document.getElementById("nav-toggle");
const siteNav = document.getElementById("site-nav");
const projectGrid = document.getElementById("project-grid");
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function setNavOpen(isOpen) {
  document.body.classList.toggle("nav-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
}

function closeNav() {
  setNavOpen(false);
}

function initMobileNav() {
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    setNavOpen(!isOpen);
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeNav();
    }
  });
}

function initNavbarScroll() {
  const update = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 16);
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
}

function initReveal() {
  const items = document.querySelectorAll(".reveal");

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -40px 0px" }
  );

  items.forEach((item) => observer.observe(item));
}

function renderProjects() {
  projectGrid.innerHTML = projects
    .map((project) => {
      const liveLabel = project.liveUrl === "#home" ? "View live" : "View Project";
      const liveButton = project.liveUrl
        ? `<a class="btn btn-primary" href="${project.liveUrl}">${liveLabel}</a>`
        : `<span class="btn btn-primary" aria-disabled="true">View Project</span>`;
      const githubButton = project.githubUrl
        ? `<a class="btn btn-secondary" href="${project.githubUrl}" rel="noopener noreferrer">GitHub</a>`
        : "";

      return `
        <article class="project-card reveal">
          <div class="project-visual" role="img" aria-label="${project.imageLabel}">
            <span></span>
          </div>
          <div class="project-body">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <ul class="tech-list">
              ${project.technologies.map((tech) => `<li>${tech}</li>`).join("")}
            </ul>
            <div class="project-actions">
              ${liveButton}
              ${githubButton}
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function initContactForm() {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("contact-name").value.trim();
    const email = document.getElementById("contact-email").value.trim();
    const message = document.getElementById("contact-message").value.trim();

    formStatus.classList.remove("is-success", "is-error");

    if (!name || !email || !message) {
      formStatus.textContent = "Please fill in your name, email, and message.";
      formStatus.classList.add("is-error");
      return;
    }

    if (!isValidEmail(email)) {
      formStatus.textContent = "Please enter a valid email address.";
      formStatus.classList.add("is-error");
      return;
    }

    formStatus.textContent =
      "Thanks. This is a front-end demo, so the message was not sent anywhere.";
    formStatus.classList.add("is-success");
    contactForm.reset();
  });
}

renderProjects();
initMobileNav();
initNavbarScroll();
initReveal();
initContactForm();
