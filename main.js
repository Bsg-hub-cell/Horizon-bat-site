/* ===================================
   HORIZON BAT — Scripts principaux
   =================================== */

// ---------- HEADER SCROLL ----------
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ---------- MOBILE MENU ----------
const burger = document.getElementById('burger');
const nav    = document.getElementById('nav');

burger.addEventListener('click', () => {
  const open = burger.classList.toggle('open');
  nav.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
});

// Close nav on link click
nav.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    nav.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  });
});

// ---------- ACTIVE NAV LINK ----------
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav__link');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === '#' + entry.target.id
        );
      });
    }
  });
}, { threshold: 0.35, rootMargin: '-72px 0px 0px 0px' });

sections.forEach(s => observer.observe(s));

// ---------- SCROLL ANIMATIONS ----------
const aosEls = document.querySelectorAll('[data-aos]');
const aosObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      aosObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

aosEls.forEach(el => aosObserver.observe(el));

// ---------- COUNTER ANIMATION ----------
function animateCounter(el) {
  const target = +el.dataset.target;
  const duration = 1800;
  const step = 16;
  const increment = target / (duration / step);
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.round(current);
  }, step);
}

const counterEls = document.querySelectorAll('.stat__number');
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counterEls.forEach(el => counterObserver.observe(el));

// ---------- CONTACT (WhatsApp — pas de formulaire) ----------
// Le formulaire a été remplacé par un bouton WhatsApp direct.

// ---------- SMOOTH SCROLL OFFSET ----------
// Compensate for fixed header height (72px)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
