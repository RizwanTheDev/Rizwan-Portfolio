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
    const isActive = mobileToggle?.classList.toggle('active');
    navMenu?.classList.toggle('active');
    document.body.classList.toggle('mobile-nav-active');
    // Swap icon between list and X
    if (mobileToggle) {
      const icon = mobileToggle.querySelector('i');
      if (icon) icon.className = isActive ? 'bi bi-x-lg' : 'bi bi-list';
    }
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

  // Scroll-triggered animations via IntersectionObserver
  function initScrollAnimations() {
    const isMobile = window.innerWidth <= 1024;

    // ── Progress bars fill on scroll ──
    document.querySelectorAll('.progress-bar').forEach(bar => {
      const target = bar.style.width;
      bar.style.setProperty('--bar-width', target);
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          obs.unobserve(entry.target);
          setTimeout(() => entry.target.classList.add('bar-animate'), 200);
        });
      }, { threshold: 0.3 });
      obs.observe(bar);
    });

    // ── Typewriter on all [data-typewriter] paragraphs ──
    document.querySelectorAll('[data-typewriter]').forEach(el => {
      const html = el.innerHTML.trim();
      const text = el.textContent.trim();
      el.textContent = '';
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          obs.unobserve(entry.target);
          let i = 0;
          const tick = () => {
            if (i < text.length) {
              el.textContent = text.slice(0, ++i);
              setTimeout(tick, 35);
            } else {
              el.innerHTML = html;
            }
          };
          tick();
        });
      }, { threshold: 0.5 });
      obs.observe(el);
    });




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
    // Remove skeleton preloader
    if (preloader) {
      setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
          preloader.remove();
        }, 400);
      }, 800);
    }

    // Initialize PureCounter
    if (typeof PureCounter !== 'undefined') {
      new PureCounter();
    }

    // Scroll Progress Bar
    const scrollProgress = document.getElementById('scrollProgress');
    if (scrollProgress) {
      window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
      }, { passive: true });
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

    // Pin dropdown just below the header using a CSS variable
    function syncNavTop() {
      if (header) {
        document.documentElement.style.setProperty('--nav-top', header.offsetHeight + 'px');
      }
    }
    syncNavTop();
    window.addEventListener('resize', syncNavTop);
    window.addEventListener('scroll', syncNavTop, { passive: true });

    mobileToggle?.addEventListener('click', (e) => {
      e.stopPropagation();
      syncNavTop();
      toggleMobileNav();
    });
    // Close mobile nav when clicking outside of it
    document.addEventListener('click', (e) => {
      const target = e.target;
      if (!navMenu || !mobileToggle) return;
      const clickedInsideNav = navMenu.contains(target) || mobileToggle.contains(target);
      if (!clickedInsideNav && navMenu.classList.contains('active')) {
        toggleMobileNav();
      }
    });

    // Close mobile nav on resize when switching to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
        toggleMobileNav();
      }
    });
    scrollTop?.addEventListener('click', scrollToTop);

    // Close mobile nav when clicking on nav links
    document.querySelectorAll('.navmenu a').forEach(link => {
      link.addEventListener('click', closeMobileNav);
    });

    // Initialize animations
    addRevealAnimations();
    initScrollAnimations();
    
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
    
    // Add staggered animation to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.1}s`;
    });

    // Theme handling: read saved preference or follow system
    const themeToggles = document.querySelectorAll('.theme-toggle');
    function applyTheme(theme) {
      if (theme === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
      else document.documentElement.removeAttribute('data-theme');
      // Update icons for all toggles
      themeToggles.forEach(toggle => {
        const icon = toggle.querySelector('i');
        if (!icon) return;
        if (theme === 'dark') {
          icon.className = 'bi bi-moon-stars';
          toggle.setAttribute('aria-label', 'Switch to light theme');
        } else {
          icon.className = 'bi bi-brightness-high';
          toggle.setAttribute('aria-label', 'Switch to dark theme');
        }
      });
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) applyTheme(savedTheme);
    else {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      applyTheme(prefersDark ? 'dark' : 'light');
    }

    if (themeToggles.length) {
      themeToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
          const currentlyDark = document.documentElement.getAttribute('data-theme') === 'dark';
          const next = currentlyDark ? 'light' : 'dark';
          applyTheme(next);
          localStorage.setItem('theme', next);
        });
      });
    }
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


// Mobile viewport height fix
function setVH() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Set on load and resize
window.addEventListener('load', setVH);
window.addEventListener('resize', setVH);
window.addEventListener('orientationchange', setVH);
