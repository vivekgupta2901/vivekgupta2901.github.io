// ===== DARK MODE TOGGLE =====
const themeToggle = document.getElementById('theme-toggle');
const icon = themeToggle.querySelector('i');

function setTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.add('dark');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  } else {
    document.body.classList.remove('dark');
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }
  localStorage.setItem('theme', theme);
}

// Initialize theme on page load
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  setTheme(savedTheme);
} else {
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(prefersDark ? 'dark' : 'light');
}

// Toggle dark/light theme on button click
themeToggle.addEventListener('click', () => {
  if (document.body.classList.contains('dark')) {
    setTheme('light');
  } else {
    setTheme('dark');
  }
});

// ===== SMOOTH SCROLL & NAV LINK ACTIVE HIGHLIGHT =====

const heroNavLinks = document.querySelectorAll('#hero-nav a');

heroNavLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetID = link.getAttribute('href').slice(1);
    const targetSection = document.getElementById(targetID);
    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 160, // Updated offset to 160px (header height)
        behavior: 'smooth'
      });
    }

    // Update active tab on click
    heroNavLinks.forEach(lnk => lnk.classList.remove('active'));
    link.classList.add('active');
  });
});

// Highlight active nav link based on scroll position
window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY + 170; // Slightly larger than offset to avoid flicker
  heroNavLinks.forEach(link => {
    const section = document.querySelector(link.hash);
    if (section) {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
        heroNavLinks.forEach(lnk => lnk.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
});

// ===== INTERACTIVE PROJECT FILTERING =====
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Manage aria-selected and tabindex for accessibility
    filterButtons.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
      b.setAttribute('tabindex', '-1');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    btn.setAttribute('tabindex', '0');
    btn.focus();

    const filter = btn.getAttribute('data-filter');

    projectCards.forEach(card => {
      if (filter === 'all' || card.classList.contains(filter)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});
