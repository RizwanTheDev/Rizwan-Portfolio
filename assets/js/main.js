/**
 * Modern Portfolio JavaScript
 */

(function() {
  'use strict';

  // DOM Elements
  const header = document.querySelector('.header');
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.navmenu ul');
  const scrollTop = document.querySelector('.scroll-top');
  const preloader = document.querySelector('#preloader');

  // Header scroll effect
  function handleScroll() {
    if (window.scrollY > 100) {
      header?.classList.add('scrolled');
      scrollTop?.classList.add('active');
    } else {
      header?.classList.remove('scrolled');
      scrollTop?.classList.remove('active');
    }
  }

  // Mobile navigation toggle
  function toggleMobileNav() {
    navMenu?.classList.toggle('active');
    document.body.classList.toggle('mobile-nav-active');
    
    // Animate hamburger menu
    const spans = mobileToggle?.querySelectorAll('span');
    spans?.forEach((span, index) => {
      if (navMenu?.classList.contains('active')) {
        if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
        if (index === 1) span.style.opacity = '0';
        if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
      } else {
        span.style.transform = 'none';
        span.style.opacity = '1';
      }
    });
  }

  // Close mobile nav when clicking on links
  function closeMobileNav() {
    if (navMenu?.classList.contains('active')) {
      toggleMobileNav();
    }
  }

  // Smooth scroll to top
  function scrollToTop(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // Animate elements on scroll
  function animateOnScroll() {
    const elements = document.querySelectorAll('[data-aos]');
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('animate-fade-in-up');
      }
    });
  }

  // Skills animation
  function animateSkills() {
    const skillBars = document.querySelectorAll('.progress-bar');
    
    skillBars.forEach(bar => {
      const rect = bar.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const width = bar.style.width || bar.getAttribute('aria-valuenow') + '%';
        bar.style.width = width;
      }
    });
  }

  // Counter animation
  function animateCounters() {
    const counters = document.querySelectorAll('.purecounter');
    
    counters.forEach(counter => {
      const rect = counter.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0 && !counter.classList.contains('animated')) {
        counter.classList.add('animated');
        const target = parseInt(counter.getAttribute('data-purecounter-end'));
        const duration = parseInt(counter.getAttribute('data-purecounter-duration')) * 1000;
        const start = parseInt(counter.getAttribute('data-purecounter-start')) || 0;
        
        animateCounter(counter, start, target, duration);
      }
    });
  }

  function animateCounter(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        current = end;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current);
    }, 16);
  }

  // Typing effect for hero text
  function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    
    type();
  }

  // Initialize typing effect
  function initTypingEffect() {
    const heroTitle = document.querySelector('.hero h2');
    if (heroTitle) {
      const originalText = heroTitle.textContent;
      typeWriter(heroTitle, originalText, 100);
    }
  }

  // Parallax effect for hero background
  function parallaxEffect() {
    const hero = document.querySelector('.hero');
    if (hero) {
      const scrolled = window.pageYOffset;
      const rate = scrolled * 0.3;
      hero.style.backgroundPosition = `center ${rate}px`;
    }
  }

  // Optimized scroll-based animations
  let ticking = false;
  function scrollAnimations() {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        // Animate elements based on scroll position
        document.querySelectorAll('.card, .stats-item').forEach((element) => {
          const elementTop = element.getBoundingClientRect().top;
          const elementVisible = 100;
          
          if (elementTop < windowHeight - elementVisible) {
            element.style.transform = 'translateY(0)';
            element.style.opacity = '1';
          }
        });
        

        
        ticking = false;
      });
      ticking = true;
    }
  }

  // Add smooth reveal animations
  function addRevealAnimations() {
    const reveals = document.querySelectorAll('.card, .stats-item, .resume-item');
    
    reveals.forEach((element, index) => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      element.style.transition = 'all 0.6s ease';
      element.style.transitionDelay = `${index * 0.1}s`;
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      }, { threshold: 0.1 });
      
      observer.observe(element);
    });
  }

  // Add tooltips to social links
  function addSocialTooltips() {
    document.querySelectorAll('.header-social-links a').forEach(link => {
      const className = link.className;
      let tooltip = 'Social';
      if (className.includes('twitter')) tooltip = 'Twitter';
      else if (className.includes('facebook')) tooltip = 'Facebook';
      else if (className.includes('instagram')) tooltip = 'Instagram';
      else if (className.includes('linkedin')) tooltip = 'LinkedIn';
      
      link.setAttribute('data-tooltip', tooltip);
    });
  }

  // Initialize everything when DOM is loaded
  function init() {
    // Remove preloader faster
    if (preloader) {
      setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
          preloader.remove();
        }, 200);
      }, 500);
    }

    // Initialize PureCounter
    if (typeof PureCounter !== 'undefined') {
      new PureCounter();
    }

    // Optimized scroll event listener
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      scrollTimeout = setTimeout(() => {
        handleScroll();
        animateSkills();
        animateCounters();
        scrollAnimations();
      }, 10);
    }, { passive: true });

    mobileToggle?.addEventListener('click', toggleMobileNav);
    scrollTop?.addEventListener('click', scrollToTop);

    // Close mobile nav when clicking on nav links
    document.querySelectorAll('.navmenu a').forEach(link => {
      link.addEventListener('click', closeMobileNav);
    });

    // Initialize animations
    addRevealAnimations();
    
    // Add social tooltips
    addSocialTooltips();
    
    // Initialize typing effect faster
    setTimeout(initTypingEffect, 200);

    // Set active nav link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.navmenu a').forEach(link => {
      if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
      }
    });

    // Add hover effects to social links
    document.querySelectorAll('.header-social-links a').forEach(link => {
      link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.1)';
      });
      
      link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
      });
    });

    // Add click ripple effect to buttons
    document.querySelectorAll('.btn').forEach(button => {
      button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });

    // Initial scroll check
    handleScroll();
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Add CSS for ripple effect
  const style = document.createElement('style');
  style.textContent = `
    .btn {
      position: relative;
      overflow: hidden;
    }
    
    .ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      transform: scale(0);
      animation: ripple-animation 0.6s linear;
      pointer-events: none;
    }
    
    @keyframes ripple-animation {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

})();