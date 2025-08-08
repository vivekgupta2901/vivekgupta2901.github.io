// ===== DARK MODE TOGGLE =====
const themeToggle = document.getElementById('theme-toggle');
const icon = themeToggle.querySelector('i');

// Function to delete all cookies for the current domain
function clearAllCookies() {
  const cookies = document.cookie.split(";");

  for (let cookie of cookies) {
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
    // Set the cookie expiration date to past to delete
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
  }
}

// Clear cookies on page load
window.addEventListener('load', () => {
  clearAllCookies();
  // Optionally refresh the page once after clearing cookies if needed
  // location.reload();
});

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

// Initialize theme from localStorage or system preference
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
      // Use native scrollIntoView with smooth behavior and rely on scroll-padding-top CSS for offset
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Update active tab on click immediately
    heroNavLinks.forEach(lnk => lnk.classList.remove('active'));
    link.classList.add('active');
  });
});

// Update active nav tab on scroll
window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY + 170; // buffer for fixed header height
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

