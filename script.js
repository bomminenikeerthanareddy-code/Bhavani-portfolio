// Mobile navigation
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

navToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation");
  });
});

// Keep the active navigation item in sync with the visible section.
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-link");
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });
sections.forEach((section) => sectionObserver.observe(section));

// Light/dark mode persists for the visitor.
const themeToggle = document.querySelector(".theme-toggle");
const savedTheme = localStorage.getItem("bhavani-theme");
if (savedTheme === "light") document.body.classList.add("light-mode");
if (savedTheme === "dark") document.body.classList.add("dark-mode");

themeToggle.addEventListener("click", () => {
  const darkMode = document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode", !darkMode);
  localStorage.setItem("bhavani-theme", darkMode ? "dark" : "light");
  themeToggle.setAttribute("aria-label", darkMode ? "Switch to light mode" : "Switch to dark mode");
});

// Reveal sections as they enter the viewport.
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

// Client-side form validation. A backend or form service is required to receive messages.
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector(".form-status");
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = contactForm.elements.name.value.trim();
  const email = contactForm.elements.email.value.trim();
  const message = contactForm.elements.message.value.trim();
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!name || !email || !message) {
    formStatus.textContent = "Please complete all required fields.";
    formStatus.classList.add("error");
    return;
  }
  if (!validEmail) {
    formStatus.textContent = "Please enter a valid email address.";
    formStatus.classList.add("error");
    return;
  }
  formStatus.classList.remove("error");
  formStatus.textContent = "Thanks! Your message is ready to be connected to a backend.";
  contactForm.reset();
});

document.querySelector("#year").textContent = new Date().getFullYear();
