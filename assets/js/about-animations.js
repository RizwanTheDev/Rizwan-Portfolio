/**
 * About Page — Scroll Animations
 */
(function () {
  'use strict';

  function observeAll(selector, stagger) {
    const els = document.querySelectorAll(selector);
    if (!els.length) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (!entry.isIntersecting) return;
        const d = stagger ? i * 100 : (parseInt(entry.target.dataset.delay) || 0);
        setTimeout(() => entry.target.classList.add('is-visible'), d);
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.1 });
    els.forEach(el => obs.observe(el));
  }

  function init() {
    // About Me + Technical Skills section titles
    observeAll('.about-text-reveal', false);
    observeAll('.about-text-reveal-delay', false);

    // Profile card & about content block
    observeAll('.about-profile-anim', false);
    observeAll('.about-content-anim', false);

    // Skill bars — left column
    observeAll('.about-skill-left', true);
    // Skill bars — right column
    observeAll('.about-skill-right', true);

    // What I Do cards — staggered by data-delay
    observeAll('.about-card-anim', false);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
