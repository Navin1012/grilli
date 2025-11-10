'use strict';

/*---------------------------
  PRELOADER
---------------------------*/
const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", () => {
  preloader?.classList.add("loaded");
  document.body.classList.add("loaded");
});

/* Utility - Add event on multiple elements */
const addEvent = (elements, event, handler) =>
  elements.forEach(el => el.addEventListener(event, handler));


/*---------------------------
  NAVBAR
---------------------------*/
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = () => {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
};

addEvent(navTogglers, "click", toggleNavbar);


/*---------------------------
  HEADER + BACK TO TOP
---------------------------*/
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

const updateHeader = () => {
  const currentScroll = window.scrollY;

  if (currentScroll > 50) {
    header.classList.add("active");
    backTopBtn?.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn?.classList.remove("active");
  }

  header.classList.toggle("hide", currentScroll > lastScrollPos && currentScroll > 50);

  lastScrollPos = currentScroll;
};

window.addEventListener("scroll", updateHeader);


/*---------------------------
  HERO SLIDER
---------------------------*/
const slides = document.querySelectorAll("[data-hero-slider-item]");
const nextBtn = document.querySelector("[data-next-btn]");
const prevBtn = document.querySelector("[data-prev-btn]");

let index = 0;
let autoSlideInterval = null;

const showSlide = (i) => {
  slides.forEach(s => s.classList.remove("active"));
  slides[i].classList.add("active");
};

const nextSlide = () => {
  index = (index + 1) % slides.length;
  showSlide(index);
};

const prevSlide = () => {
  index = (index - 1 + slides.length) % slides.length;
  showSlide(index);
};

nextBtn?.addEventListener("click", nextSlide);
prevBtn?.addEventListener("click", prevSlide);

const startAutoSlide = () => autoSlideInterval = setInterval(nextSlide, 7000);
const stopAutoSlide = () => clearInterval(autoSlideInterval);

[nextBtn, prevBtn].forEach(btn => {
  btn?.addEventListener("mouseover", stopAutoSlide);
  btn?.addEventListener("mouseout", startAutoSlide);
});

window.addEventListener("load", startAutoSlide);


/*---------------------------
  PARALLAX EFFECT
---------------------------*/
const parallaxItems = document.querySelectorAll("[data-parallax-item]");

window.addEventListener("mousemove", ({ clientX, clientY }) => {
  const xPercent = (clientX / window.innerWidth - 0.5) * -20;
  const yPercent = (clientY / window.innerHeight - 0.5) * -20;

  parallaxItems.forEach(item => {
    const speed = Number(item.dataset.parallaxSpeed);
    item.style.transform = `translate3d(${xPercent * speed}px, ${yPercent * speed}px, 0)`;
  });
});


/*=====================
  SCROLL + STAGGER REVEAL
=====================*/

const revealElements = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
  revealElements.forEach((el, index) => {
    const triggerPoint = window.innerHeight - 100;
    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < triggerPoint) {
      // Set stagger delay automatically
      el.style.setProperty("--delay", `${index * 0.15}s`);
      el.classList.add("show");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

