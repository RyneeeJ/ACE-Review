"use strict";
/////////////////////////////////////////////
// HTML ELEMENTS
/////////////////////////////////////////////

const courseBtnContainer = document.querySelector(".program-btn--container");
const courseTabs = document.querySelectorAll(".program--tab");
const menuBtn = document.querySelector(".menu-btn");
const header = document.querySelector(".header");
const enrollBtn = document.querySelectorAll(".enroll-cta");
const closeModalbtn = document.querySelector(".btn--close-modal");
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");
const registerWindow = document.querySelector(".register-window");
const submitFormBtn = document.querySelector(".btn--submit");
const regForm = document.querySelector(".form");
const inputFirstName = document.querySelector("#input-first-name");
const inputLastName = document.querySelector("#input-last-name");
const inputEmail = document.querySelector("#input-email");
const slides = document.querySelectorAll(".testimonial-slide");
const btnRight = document.querySelector(".btn--right");
const btnLeft = document.querySelector(".btn--left");
const dotContainer = document.querySelector(".dots");
/////////////////////////////////////////////
// FUNCTIONS & STATE VARIABLES
/////////////////////////////////////////////

let curSlide = 0;

const openModalWindow = function () {
  header.classList.remove("nav-open");
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModalWindow = function () {
  overlay.classList.add("hidden");
  modal.classList.add("hidden");
  regForm.reset();
};

const activateDot = function (slide) {
  document
    .querySelectorAll(".dots--dot")
    .forEach((d) => d.classList.remove("dot--active"));

  document
    .querySelector(`.dots--dot[data-slide="${slide}"]`)
    .classList.add("dot--active");
};

const goToSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${(i - slide) * 100}%)`;
  });
};

const nextSlide = function () {
  if (curSlide === slides.length - 1) curSlide = 0;
  else curSlide++;
  goToSlide(curSlide);
  activateDot(curSlide);
};

const prevSlide = function () {
  if (curSlide === 0) curSlide = slides.length - 1;
  else curSlide--;
  goToSlide(curSlide);
  activateDot(curSlide);
};

const createDots = function () {
  slides.forEach((_, i) => {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots--dot" data-slide="${i}"></button>`
    );
  });
};

const init = function () {
  goToSlide(0);
  createDots();
  activateDot(0);
};
/////////////////////////////////////////////
// LOGIC
/////////////////////////////////////////////

// Open and close nav/menu window
menuBtn.addEventListener("click", () => {
  header.classList.toggle("nav-open");
});

// Switch different programs
courseBtnContainer.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn--tab");
  if (!btn) return;

  const allBtns = [...btn.parentNode.children];
  allBtns.forEach((btn) => {
    btn.classList.remove("btn--tab-active");
  });

  btn.classList.add("btn--tab-active");

  courseTabs.forEach((tab) => {
    tab.classList.add("hidden");

    if (btn.dataset.tab === tab.dataset.program) tab.classList.remove("hidden");
  });
});

// Open modal window
enrollBtn.forEach((btn) => {
  btn.addEventListener("click", openModalWindow);
});

// Submit form
regForm.addEventListener("submit", (e) => {
  e.preventDefault();
  closeModalWindow();
});

// Close modal window
closeModalbtn.addEventListener("click", () => {
  closeModalWindow();
});

overlay.addEventListener("click", () => {
  closeModalWindow();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModalWindow();
});

// Testimonial slider

btnRight.addEventListener("click", nextSlide);

btnLeft.addEventListener("click", prevSlide);
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") nextSlide();
  if (e.key === "ArrowLeft") prevSlide();
});

dotContainer.addEventListener("click", (e) => {
  const dot = e.target.closest(".dots--dot");
  if (!dot) return;
  const slide = dot.dataset.slide;
  goToSlide(slide);
  activateDot(slide);
});

init();

const heroBtnContainer = document.querySelector(".hero-btn-container");
const footerContainer = document.querySelector(".footer--grid");
const scrollWindow = function (e) {
  // This selector also works
  // const link = e.target.closest("a:link");
  const link = e.target.closest("[href]");
  if (!link) return;
  const href = link.getAttribute("href");

  if (href === "#") {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  } else if (href !== "#" && href.startsWith("#"))
    document.querySelector(href).scrollIntoView({ behavior: "smooth" });

  return true;
};

heroBtnContainer.addEventListener("click", (e) => {
  e.preventDefault();

  scrollWindow(e);
});

header.addEventListener("click", (e) => {
  e.preventDefault();
  const scrolled = scrollWindow(e);

  if (scrolled) header.classList.remove("nav-open");
});

footerContainer.addEventListener("click", (e) => {
  e.preventDefault();
  scrollWindow(e);
});

// Sticky navigation bar/header

const sectionWhy = document.querySelector(".section--why");
const heroSection = document.querySelector(".section--hero");

const headerHeight = header.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    header.classList.add("sticky-nav");
    document.body.style.marginTop = `${headerHeight}px`;
  } else {
    header.classList.remove("sticky-nav");
    document.body.style.marginTop = "0";
  }
};

const heroObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${headerHeight}px`,
});

heroObserver.observe(heroSection);

// Reveal Section
const sections = document.querySelectorAll(".section");
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");

  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

sections.forEach((section) => {
  section.classList.add("section--hidden");
  sectionObserver.observe(section);
});

// Highlight active section link

const switchLink = function (entries) {
  const [entry] = entries;
  const linkContainer = document.querySelector(
    `[href='#${entry.target.id}']`
  ).parentElement;

  console.log(entry);
  if (!entry.isIntersecting) return;

  const allLinks = [...linkContainer.parentElement.children];
  allLinks.forEach((link) => link.classList.remove("active-link"));
  linkContainer.classList.add("active-link");
};
console.log(window.innerWidth);

const thresholdValue = window.innerWidth > 620 ? 0.8 : 0.6;

const sectionObserverLink = new IntersectionObserver(switchLink, {
  root: null,
  threshold: thresholdValue,
});

sections.forEach((section) => {
  sectionObserverLink.observe(section);
});
