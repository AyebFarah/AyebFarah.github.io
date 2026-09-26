var menuBtn = document.getElementById('menuBtn');
var panel = document.getElementById('mobilePanel');
var topbar = document.querySelector('.topbar');
var navLinks = document.querySelectorAll('[data-section]');

function sectionIdFromLink(link) {
  return link.getAttribute('data-section') || (link.hash || '').replace('#', '');
}

function setActive(id) {
  navLinks.forEach(function (a) {
    a.classList.toggle('active', sectionIdFromLink(a) === id);
  });
}

function scrollToSection(id) {
  var el = document.getElementById(id);
  if (!el) return false;
  var offset = topbar ? topbar.offsetHeight + 8 : 96;
  var top = el.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  setActive(id);
  if (history.replaceState) history.replaceState(null, '', '#' + id);
  return true;
}

if (menuBtn && panel) {
  menuBtn.addEventListener('click', function () {
    var open = panel.classList.toggle('open');
    menuBtn.textContent = open ? 'Close' : 'Menu';
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

navLinks.forEach(function (a) {
  a.addEventListener('click', function (e) {
    var id = sectionIdFromLink(a);
    if (!id || !document.getElementById(id)) return;
    e.preventDefault();
    if (panel) {
      panel.classList.remove('open');
      if (menuBtn) {
        menuBtn.textContent = 'Menu';
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    }
    scrollToSection(id);
  });
});

var sections = Array.from(navLinks)
  .map(function (a) { return document.getElementById(sectionIdFromLink(a)); })
  .filter(Boolean)
  .filter(function (el, i, arr) { return arr.indexOf(el) === i; });

if (sections.length) {
  var updateFromScroll = function () {
    var offset = (topbar ? topbar.offsetHeight : 84) + 24;
    var current = sections[0];
    sections.forEach(function (sec) {
      if (sec.getBoundingClientRect().top - offset <= 0) current = sec;
    });
    if (current) setActive(current.id);
  };
  document.addEventListener('scroll', updateFromScroll, { passive: true });
  updateFromScroll();

  if (location.hash) {
    var startId = location.hash.replace('#', '');
    if (document.getElementById(startId)) {
      requestAnimationFrame(function () { scrollToSection(startId); });
    }
  }
}

var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var revealEls = document.querySelectorAll('.reveal');

if (revealEls.length && !reducedMotion && 'IntersectionObserver' in window) {
  var revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
  );
  revealEls.forEach(function (el) { revealObserver.observe(el); });
} else {
  revealEls.forEach(function (el) { el.classList.add('is-visible'); });
}

var glow = document.getElementById('cursorGlow');
var finePointer = window.matchMedia('(pointer: fine)').matches;

if (glow && finePointer && !reducedMotion) {
  var glowX = 0;
  var glowY = 0;
  var targetX = 0;
  var targetY = 0;
  var rafId = 0;

  var tick = function () {
    glowX += (targetX - glowX) * 0.12;
    glowY += (targetY - glowY) * 0.12;
    glow.style.transform = 'translate3d(' + (glowX - 180) + 'px,' + (glowY - 180) + 'px, 0)';
    rafId = requestAnimationFrame(tick);
  };

  document.addEventListener(
    'mousemove',
    function (e) {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!rafId) rafId = requestAnimationFrame(tick);
    },
    { passive: true }
  );

  document.addEventListener('mouseleave', function () { glow.style.opacity = '0'; });
  document.addEventListener('mouseenter', function () { glow.style.opacity = '1'; });
}
