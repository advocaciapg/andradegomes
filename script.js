// ============================================
// LAW FIRM WEBSITE - JAVASCRIPT
// ============================================

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  lastScroll = currentScroll;
});

// Mobile menu toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

mobileMenuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');

  // Change icon
  if (navMenu.classList.contains('active')) {
    mobileMenuToggle.textContent = '✕';
  } else {
    mobileMenuToggle.textContent = '☰';
  }
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link, .cta-button');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    mobileMenuToggle.textContent = '☰';
  });
});

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe all animated elements
const animatedElements = document.querySelectorAll(
  '.slide-in-left, .slide-in-right, .slide-in-up, .fade-in'
);

animatedElements.forEach(element => {
  observer.observe(element);
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
const formInputs = contactForm.querySelectorAll('input, textarea');

// Function to clear all validation messages
function clearValidationMessages() {
  formInputs.forEach(input => {
    input.setCustomValidity('');
  });
  // Force the active element to lose focus, closing any validation tooltips
  if (document.activeElement && document.activeElement.tagName !== 'BODY') {
    document.activeElement.blur();
  }
}

// Clear validation messages when scrolling
window.addEventListener('scroll', clearValidationMessages);

// Clear validation messages when clicking anywhere
document.addEventListener('click', clearValidationMessages);

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get form data
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    message: document.getElementById('message').value
  };

  // Validate form
  if (!formData.name || !formData.email || !formData.phone || !formData.message) {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    alert('Por favor, insira um e-mail válido.');
    return;
  }

  // Simulate form submission
  console.log('Form submitted:', formData);

  // Show success message
  alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');

  // Reset form
  contactForm.reset();
});

// Smooth scroll for all anchor links with navbar offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));

    if (target) {
      const navbarHeight = 80;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Counter animation for statistics
const animateCounter = (element, target, duration = 2000) => {
  let start = 0;
  const increment = target / (duration / 16);

  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target + (element.dataset.suffix || '');
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start) + (element.dataset.suffix || '');
    }
  }, 16);
};

// Observe stat cards for counter animation
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
      const number = entry.target.querySelector('.stat-number');
      const text = number.textContent;
      const value = parseInt(text.replace(/\D/g, ''));
      const suffix = text.replace(/[0-9]/g, '');

      number.dataset.suffix = suffix;
      number.textContent = '0' + suffix;

      animateCounter(number, value);
      entry.target.classList.add('counted');
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(card => {
  statObserver.observe(card);
});

// Add loading animation
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// Set placeholder background color for team member images
document.querySelectorAll('.member-image').forEach((img, index) => {
  img.style.backgroundColor = '#e2e8f0';

  // Add error handler to show placeholder if image doesn't load
  img.addEventListener('error', () => {
    img.style.backgroundColor = '#cbd5e0';
    img.alt = 'Foto do advogado';
  });
});

// Back to top button functionality
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

console.log('Law Firm Website - JavaScript loaded successfully');
