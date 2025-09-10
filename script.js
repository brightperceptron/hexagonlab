// Dark/Light Mode Toggle
const themeSwitch = document.getElementById('theme-switch');
const body = document.body;

// Check for saved theme in localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  body.setAttribute('data-theme', savedTheme);
  themeSwitch.checked = savedTheme === 'light';
}

// Toggle theme on switch click
themeSwitch.addEventListener('change', () => {
  if (themeSwitch.checked) {
    body.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  } else {
    body.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});
