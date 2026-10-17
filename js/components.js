/**
 * QUANTBOT TECHNOLOGIES, LP — MINIMAL CLIENT SCRIPT
 * Native scrolling, zero bloat, zero scroll-jacking.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll offset adjustment for sticky header
  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.nav-links a, .hero-cta-bar a');

  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          const headerHeight = header ? header.offsetHeight : 0;
          const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
});
