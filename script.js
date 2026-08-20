/* ============================================================
   Dra. Thaisa Mattos — Neurologia
   Script principal
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Header: sombra ao rolar ---------- */
  var header = document.querySelector('.site-header');
  function handleScroll() {
    if (!header) return;
    if (window.scrollY > 12) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }
  handleScroll();
  window.addEventListener('scroll', handleScroll, { passive: true });

  /* ---------- Botão voltar ao topo ---------- */
  var backToTop = document.getElementById('backToTop');
  if (backToTop) {
    function handleBackToTopVisibility() {
      if (window.scrollY > 500) {
        backToTop.classList.add('is-visible');
      } else {
        backToTop.classList.remove('is-visible');
      }
    }
    handleBackToTopVisibility();
    window.addEventListener('scroll', handleBackToTopVisibility, { passive: true });
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Menu hamburger (mobile) ---------- */
  var hamburger = document.querySelector('.hamburger');
  var navMenu = document.querySelector('.nav-menu');
  var navOverlay = document.querySelector('.nav-overlay');

  function openMenu() {
    hamburger.classList.add('is-active');
    navMenu.classList.add('is-open');
    if (navOverlay) navOverlay.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('is-active');
    navMenu.classList.remove('is-open');
    if (navOverlay) navOverlay.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function () {
      var isOpen = navMenu.classList.contains('is-open');
      if (isOpen) { closeMenu(); } else { openMenu(); }
    });

    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    if (navOverlay) {
      navOverlay.addEventListener('click', closeMenu);
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  /* ---------- FAQ Accordion ---------- */
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    var question = item.querySelector('.faq-question');
    if (!question) return;
    question.addEventListener('click', function () {
      var isOpen = item.classList.contains('is-open');
      faqItems.forEach(function (other) {
        other.classList.remove('is-open');
        var q = other.querySelector('.faq-question');
        if (q) q.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('is-open');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---------- Ano dinâmico no rodapé ---------- */
  var yearEl = document.querySelector('[data-year]');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---------- Destaca link ativo do menu conforme rolagem ---------- */
  var sections = document.querySelectorAll('main section[id]');
  var navLinks = document.querySelectorAll('.nav-menu a[href*="#"]');

  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          navLinks.forEach(function (link) {
            link.classList.remove('active');
            var href = link.getAttribute('href') || '';
            if (href.indexOf('#' + id) !== -1 && href.indexOf('.html') === -1 || href === '#' + id) {
              link.classList.add('active');
            }
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(function (section) { observer.observe(section); });
  }

});
