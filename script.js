// Highlight active nav link on scroll
const navLinks = document.querySelectorAll('.nav-links a');
const sections = Array.from(navLinks).map(link => document.getElementById(link.getAttribute('data-section')));

function setActiveLink() {
  let index = sections.length - 1;
  for (let i = 0; i < sections.length; i++) {
    if (sections[i] && window.scrollY + 120 < sections[i].offsetTop) {
      index = i - 1;
      break;
    }
  }
  navLinks.forEach(link => link.classList.remove('active'));
  if (index >= 0) navLinks[index].classList.add('active');
}
window.addEventListener('scroll', setActiveLink);
window.addEventListener('load', setActiveLink);

const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');

toggle.addEventListener('click', () => {
  nav.classList.toggle('active');
});

// Close nav on link click (mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    if(window.innerWidth <= 768) {
      nav.classList.remove('active');
    }
  });
});

// Smooth scroll with offset for nav links
function getNavbarHeight() {
  const header = document.querySelector('header');
  return header ? header.offsetHeight : 70;
}
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if(href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if(target) {
        const navHeight = getNavbarHeight();
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  });
});

// Section reveal on scroll
const revealSections = document.querySelectorAll('.section-reveal');
const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.85;
  revealSections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    if(sectionTop < triggerBottom) {
      section.classList.add('visible');
    }
  });
};
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Certificate Modal
const modal = document.getElementById('certificateModal');
const viewCertificateBtn = document.getElementById('viewCertificate');
const closeBtn = document.querySelector('.close');

viewCertificateBtn.addEventListener('click', function(e) {
  e.preventDefault();
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
});

closeBtn.addEventListener('click', function() {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto'; // Restore scrolling
});

window.addEventListener('click', function(e) {
  if (e.target === modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && modal.style.display === 'block') {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});
  
