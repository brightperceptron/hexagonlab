const navToggle = document.getElementById('nav-toggle');
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('header nav a, #mobile-menu a');
const revealElements = document.querySelectorAll('.reveal');

function updateActiveNav() {
  const offset = window.scrollY + window.innerHeight * 0.35;
  let activeId = sections[0]?.id;

  sections.forEach((section) => {
    if (offset >= section.offsetTop) {
      activeId = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${activeId}`);
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealElements.forEach((element) => revealObserver.observe(element));

navToggle?.addEventListener('click', () => {
  document.body.toggleAttribute('data-menu-open');
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
});

navLinks.forEach((link) => {
  if (!link.hash) return;
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const target = document.querySelector(link.hash);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    document.body.removeAttribute('data-menu-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', () => {
  if (window.lucide) {
    lucide.createIcons();
  }
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
  updateActiveNav();

  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.setTimeout(() => {
      preloader.classList.add('preloader-hidden');
    }, 300);
  }
});
