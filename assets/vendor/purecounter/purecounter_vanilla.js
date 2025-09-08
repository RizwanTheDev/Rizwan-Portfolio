/**
 * Simple PureCounter Implementation
 */
class PureCounter {
  constructor() {
    this.init();
  }

  init() {
    const counters = document.querySelectorAll('.purecounter');
    
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
          this.animateCounter(entry.target);
          entry.target.classList.add('counted');
        }
      });
    }, observerOptions);

    counters.forEach(counter => {
      observer.observe(counter);
    });
  }

  animateCounter(element) {
    const start = parseInt(element.getAttribute('data-purecounter-start')) || 0;
    const end = parseInt(element.getAttribute('data-purecounter-end')) || 100;
    const duration = parseInt(element.getAttribute('data-purecounter-duration')) || 2;
    
    const range = end - start;
    const increment = range / (duration * 60); // 60 FPS
    let current = start;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        current = end;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current);
    }, 1000 / 60);
  }
}

// Auto-initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new PureCounter());
} else {
  new PureCounter();
}