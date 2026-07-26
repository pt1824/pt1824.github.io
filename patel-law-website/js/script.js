// Law Office of Keval Patel - Main Script

document.addEventListener('DOMContentLoaded', function() {
  // Mobile navigation toggle
  const toggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.main-nav');
  
  if (toggle && nav) {
    toggle.addEventListener('click', function() {
      nav.classList.toggle('active');
      const isOpen = nav.classList.contains('active');
      toggle.setAttribute('aria-expanded', isOpen);
      // Simple icon swap could be added here
    });
    
    // Close menu when clicking a link
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
  
  // Smooth highlight of active nav based on current page
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
  
  // Simple form handling (client-side only demo)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;
      
      // Simulate submission - in production connect to backend or Formspree/etc.
      setTimeout(() => {
        alert('Thank you for contacting the Law Office of Keval Patel. We will respond to your inquiry shortly. For immediate assistance, please call 281-313-5300.');
        contactForm.reset();
        btn.textContent = originalText;
        btn.disabled = false;
      }, 800);
    });
  }
});
