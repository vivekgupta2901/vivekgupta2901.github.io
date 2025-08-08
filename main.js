// Smooth scrolling for nav links
document.querySelectorAll('#navbar a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetID = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetID);
    if(targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 45, // adjust for navbar height
        behavior: 'smooth'
      });
    }
  });
});

// Highlight active navbar link on scroll
window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY + 50; // offset for navbar
  document.querySelectorAll('#navbar a').forEach(link => {
    const section = document.querySelector(link.hash);
    if(section.offsetTop <= scrollPos && (section.offsetTop + section.offsetHeight) > scrollPos) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});

// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeToggle.children[0].classList.toggle('fa-moon');
  themeToggle.children[0].classList.toggle('fa-sun');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});
// Remember theme
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
  themeToggle.children[0].classList.remove('fa-moon');
  themeToggle.children[0].classList.add('fa-sun');
}

// Animations on load
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.fade-in').forEach(el => {
    el.style.opacity = 1;
    el.style.transform = 'none';
  });
});

// Interactive Project Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.filter-btn.active').classList.remove('active');
    btn.classList.add('active');
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

