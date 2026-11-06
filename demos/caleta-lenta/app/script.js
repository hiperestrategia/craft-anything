/* Caleta Lenta — Scripts v2 */
(function() {
  'use strict';

  /* Header dropdowns */
  var ddOpen = null;
  document.addEventListener('click', function(e) {
    var btn = e.target.closest('.header__dd-btn');
    if (btn) {
      e.stopPropagation();
      var panel = btn.parentElement.querySelector('.header__dd-panel');
      if (!panel) return;
      if (panel.classList.contains('open')) { panel.classList.remove('open'); ddOpen = null; return; }
      if (ddOpen) { ddOpen.classList.remove('open'); }
      panel.classList.add('open');
      ddOpen = panel;
      return;
    }
    /* Close if clicking outside */
    if (ddOpen && !e.target.closest('.header__dd-panel') && !e.target.closest('.header__dd')) {
      ddOpen.classList.remove('open');
      ddOpen = null;
    }
  });

  /* Hero destination dropdowns */
  var heroDestBtn = document.getElementById('hero-dest-btn');
  var heroDestMenu = document.getElementById('hero-dest-menu');
  var heroDateBtn = document.getElementById('hero-date-btn');
  var heroDateMenu = document.getElementById('hero-date-menu');

  function toggleHero(menu) {
    if (menu.classList.contains('open')) { menu.classList.remove('open'); return; }
    if (heroDestMenu) heroDestMenu.classList.remove('open');
    if (heroDateMenu) heroDateMenu.classList.remove('open');
    menu.classList.add('open');
  }

  if (heroDestBtn) heroDestBtn.addEventListener('click', function(e) { e.stopPropagation(); toggleHero(heroDestMenu); });
  if (heroDateBtn) heroDateBtn.addEventListener('click', function(e) { e.stopPropagation(); toggleHero(heroDateMenu); });

  document.addEventListener('click', function(e) {
    if (!e.target.closest('.hero__search')) {
      if (heroDestMenu) heroDestMenu.classList.remove('open');
      if (heroDateMenu) heroDateMenu.classList.remove('open');
    }
  });

  /* Mobile menu */
  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobile-menu');
  var mobileClose = document.getElementById('mobile-close');
  var mobileBackdrop = mobileMenu ? mobileMenu.querySelector('.mobile-menu__backdrop') : null;

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function() {
      mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', mobileMenu.classList.contains('open') ? 'true' : 'false');
    });
  }
  if (mobileClose) mobileClose.addEventListener('click', function() { mobileMenu.classList.remove('open'); if (hamburger) hamburger.setAttribute('aria-expanded', 'false'); });
  if (mobileBackdrop) mobileBackdrop.addEventListener('click', function() { mobileMenu.classList.remove('open'); if (hamburger) hamburger.setAttribute('aria-expanded', 'false'); });

  /* Review scroll */
  var scrollContainer = document.getElementById('reviews-scroll');
  var reviewNext = document.getElementById('review-next');
  if (scrollContainer && reviewNext) {
    reviewNext.addEventListener('click', function() { scrollContainer.scrollBy({ left: 290, behavior: 'smooth' }); });
  }

  /* Trip filter buttons */
  var filters = document.querySelectorAll('.trip-filter');
  filters.forEach(function(f) {
    f.addEventListener('click', function() {
      filters.forEach(function(ff) { ff.classList.remove('active'); });
      f.classList.add('active');
    });
  });

  /* Inquiry form */
  var form = document.getElementById('inquiry-form');
  var confirmBox = document.getElementById('inquiry-confirm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      form.style.display = 'none';
      if (confirmBox) confirmBox.style.display = 'block';
    });
  }

  /* "Send us a message" button */
  var sendBtn = document.querySelector('.help-link__text--btn');
  if (sendBtn) sendBtn.addEventListener('click', function() { window.location.href = 'inquiry.html'; });
})();