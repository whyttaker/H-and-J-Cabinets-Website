/* ─── Global Navigation ─────────────────────────────────────────────────────
   Inject shared header HTML + CSS + scroll behaviour + mobile menu.
   Include as first element inside <body>:
     <script src="/content/nav.js?v=2"></script>
   ──────────────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  /* ── CSS ──────────────────────────────────────────────────────────────── */
  var style = document.createElement('style');
  style.textContent = [
    /* ─ Header ─ */
    '.site-header {',
    '  position: fixed;',
    '  top: 0; left: 0; right: 0;',
    '  z-index: 200;',
    '  display: flex;',
    '  align-items: center;',
    '  justify-content: space-between;',
    '  padding: 22px var(--inset, clamp(24px, 5vw, 72px));',
    '  background: linear-gradient(to bottom, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0) 100%);',
    '  transition: background 0.4s, backdrop-filter 0.4s;',
    '}',
    '.site-header.scrolled {',
    '  background: rgba(0,0,0,0.92);',
    '  backdrop-filter: blur(12px);',
    '  -webkit-backdrop-filter: blur(12px);',
    '  border-bottom: 1px solid rgba(212,168,67,0.12);',
    '}',

    /* ─ Logo ─ */
    '.site-logo {',
    '  display: flex;',
    '  align-items: center;',
    '  gap: 14px;',
    '  text-decoration: none;',
    '  position: relative;',
    '  z-index: 210;',
    '}',
    '.site-logo img {',
    '  width: 38px; height: 38px;',
    '  object-fit: contain;',
    '}',
    '.logo-name {',
    '  font-family: "Cormorant Garamond", Georgia, serif;',
    '  font-size: clamp(20px, 2vw, 28px);',
    '  font-weight: 400;',
    '  letter-spacing: 0.18em;',
    '  text-transform: uppercase;',
    '  color: #d4a843;',
    '  line-height: 1.1;',
    '  display: flex;',
    '  flex-direction: column;',
    '  text-shadow: 0 1px 3px rgba(0,0,0,0.95), 0 2px 16px rgba(0,0,0,0.7);',
    '  transition: text-shadow 0.4s, color 0.4s;',
    '}',
    '.site-header.scrolled .logo-name { text-shadow: none; color: #d4a843; }',
    '.logo-name span {',
    '  font-size: 10px;',
    '  letter-spacing: 0.22em;',
    '  color: rgba(255,255,255,0.75);',
    '  font-weight: 400;',
    '}',

    /* ─ Desktop nav ─ */
    '.site-nav {',
    '  display: flex;',
    '  align-items: center;',
    '  gap: clamp(20px, 3vw, 40px);',
    '  list-style: none;',
    '}',
    '.site-nav a {',
    '  font-family: "EB Garamond", Georgia, serif;',
    '  font-size: 13px;',
    '  letter-spacing: 0.18em;',
    '  text-transform: uppercase;',
    '  color: rgba(242,237,230,0.9);',
    '  text-shadow: 0 1px 8px rgba(0,0,0,0.65);',
    '  text-decoration: none;',
    '  transition: color 0.3s, text-shadow 0.3s;',
    '  position: relative;',
    '  padding-bottom: 3px;',
    '}',
    '.site-nav a::after {',
    '  content: "";',
    '  position: absolute;',
    '  bottom: 0; left: 0;',
    '  width: 0; height: 1px;',
    '  background: transparent;',
    '  transition: width 0.35s ease;',
    '}',
    '.site-nav a:hover,',
    '.site-nav a.active { color: var(--gold, #d4a843); text-shadow: 0 1px 6px rgba(0,0,0,0.4); }',
    '.site-nav a:hover::after,',
    '.site-nav a.active::after { width: 100%; }',
    '.site-header.scrolled .site-nav a { color: var(--grey, #7a7672); text-shadow: none; }',
    '.site-header.scrolled .site-nav a::after { background: var(--gold, #d4a843); }',
    '.site-header.scrolled .site-nav a:hover,',
    '.site-header.scrolled .site-nav a.active { color: var(--gold, #d4a843); }',

    /* ─ Hamburger button ─ */
    '.nav-hamburger {',
    '  display: none;',
    '  align-items: center;',
    '  justify-content: center;',
    '  width: 36px; height: 36px;',
    '  background: none;',
    '  border: none;',
    '  cursor: pointer;',
    '  padding: 0;',
    '  position: relative;',
    '  z-index: 210;',
    '}',
    '.nav-hamburger svg {',
    '  width: 22px; height: 14px;',
    '  overflow: visible;',
    '}',
    '.nav-hamburger svg line {',
    '  stroke: var(--cream, #f2ede6);',
    '  stroke-width: 1.2;',
    '  stroke-linecap: round;',
    '  transform-origin: center;',
    '  transition: transform 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease;',
    '}',
    /* open state — top line rotates to \ , bottom to / forming X */
    '.nav-hamburger.open svg line:nth-child(1) { transform: translateY(7px) rotate(45deg); }',
    '.nav-hamburger.open svg line:nth-child(2) { opacity: 0; transform: scaleX(0); }',
    '.nav-hamburger.open svg line:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }',

    /* ─ Mobile overlay ─ */
    '.nav-overlay {',
    '  display: none;',
    '  position: fixed;',
    '  inset: 0;',
    '  z-index: 205;',
    '  background: #080808;',
    '  flex-direction: column;',
    '  align-items: center;',
    '  justify-content: center;',
    '  opacity: 0;',
    '  transition: opacity 0.4s ease;',
    '}',
    '.nav-overlay.open { display: flex; }',
    '.nav-overlay.visible { opacity: 1; }',

    /* close button */
    '.nav-overlay-close {',
    '  position: absolute;',
    '  top: 24px; right: 28px;',
    '  background: none;',
    '  border: none;',
    '  cursor: pointer;',
    '  color: var(--cream, #f2ede6);',
    '  font-family: "Cormorant Garamond", Georgia, serif;',
    '  font-size: 32px;',
    '  font-weight: 300;',
    '  line-height: 1;',
    '  opacity: 0.7;',
    '  transition: opacity 0.2s, color 0.2s;',
    '  padding: 4px 8px;',
    '}',
    '.nav-overlay-close:hover { opacity: 1; color: var(--gold, #d4a843); }',

    /* links */
    '.nav-overlay ul {',
    '  list-style: none;',
    '  display: flex;',
    '  flex-direction: column;',
    '  align-items: center;',
    '  gap: 4px;',
    '  padding: 0;',
    '}',
    '.nav-overlay ul li a {',
    '  font-family: "Cormorant Garamond", Georgia, serif;',
    '  font-size: clamp(36px, 11vw, 56px);',
    '  font-weight: 300;',
    '  font-style: italic;',
    '  letter-spacing: 0.06em;',
    '  color: rgba(242,237,230,0.85);',
    '  text-decoration: none;',
    '  display: block;',
    '  padding: 8px 32px;',
    '  transition: color 0.25s, opacity 0.25s;',
    '}',
    '.nav-overlay ul li a:hover { color: var(--gold, #d4a843); opacity: 1; }',
    '.nav-overlay ul li a.active {',
    '  color: var(--gold, #d4a843);',
    '  font-style: normal;',
    '}',

    '.nav-overlay-rule {',
    '  width: 32px; height: 1px;',
    '  background: rgba(212,168,67,0.3);',
    '  margin: 28px auto;',
    '}',

    /* ─ Breakpoints ─ */
    '@media (max-width: 900px) {',
    '  .site-header { padding: 18px 28px; }',
    '  .site-nav { gap: 22px; }',
    '}',
    '@media (max-width: 768px) {',
    '  .site-nav { display: none; }',
    '  .nav-hamburger { display: flex; }',
    '}',
  ].join('\n');
  document.head.appendChild(style);

  /* ── Active-page detection ────────────────────────────────────────────── */
  var path = window.location.pathname.replace(/\/?$/, '/');

  var links = [
    { href: '/',                label: 'Home'           },
    { href: '/difference/',     label: 'Difference' },
    { href: '/featured-homes/', label: 'Projects'       },
    { href: '/contact/',        label: 'Contact'        },
    { href: '/careers/',        label: 'Careers'        },
    { href: '/about/',          label: 'About'          },
  ];

  function buildItems(closeOnClick) {
    return links.map(function (l) {
      var active = (l.href === '/' ? path === '/' : path.indexOf(l.href) === 0);
      return '<li><a href="' + l.href + '"' +
        (active ? ' class="active" aria-current="page"' : '') +
        (closeOnClick ? ' data-nav-close' : '') +
        '>' + l.label + '</a></li>';
    }).join('');
  }

  /* ── Header HTML ──────────────────────────────────────────────────────── */
  var hdr = document.createElement('header');
  hdr.className = 'site-header';
  hdr.id = 'site-header';
  hdr.innerHTML =
    '<a href="/" class="site-logo">' +
      '<img src="/content/pictures/favicon.png"' +
           ' alt="H &amp; J Cabinets logo, fine custom cabinetry Orange County California since 1988"' +
           ' width="40" height="40">' +
      '<div class="logo-name">H &amp; J Cabinets</div>' +
    '</a>' +
    '<nav aria-label="Primary"><ul class="site-nav">' + buildItems(false) + '</ul></nav>' +
    '<button class="nav-hamburger" aria-label="Open menu" aria-expanded="false">' +
      '<svg viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
        '<line x1="0" y1="1" x2="22" y2="1"/>' +
        '<line x1="0" y1="7" x2="22" y2="7"/>' +
        '<line x1="0" y1="13" x2="22" y2="13"/>' +
      '</svg>' +
    '</button>';

  /* ── Mobile overlay ───────────────────────────────────────────────────── */
  var overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  overlay.setAttribute('aria-hidden', 'true');
  overlay.id = 'nav-overlay';
  overlay.innerHTML =
    '<button class="nav-overlay-close" aria-label="Close menu">&#215;</button>' +
    '<div class="nav-overlay-rule"></div>' +
    '<ul>' + buildItems(true) + '</ul>' +
    '<div class="nav-overlay-rule"></div>';

  /* Insert header before this script, overlay right after header */
  var s = document.currentScript;
  s.parentNode.insertBefore(hdr, s);
  s.parentNode.insertBefore(overlay, s);

  /* ── Hamburger toggle ─────────────────────────────────────────────────── */
  var btn = hdr.querySelector('.nav-hamburger');

  function openMenu() {
    overlay.classList.add('open');
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { overlay.classList.add('visible'); });
    });
    btn.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    overlay.classList.remove('visible');
    btn.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    setTimeout(function () { overlay.classList.remove('open'); }, 350);
  }

  btn.addEventListener('click', function () {
    btn.classList.contains('open') ? closeMenu() : openMenu();
  });

  /* Close button inside overlay */
  overlay.querySelector('.nav-overlay-close').addEventListener('click', closeMenu);

  /* Close on overlay link click */
  overlay.addEventListener('click', function (e) {
    if (e.target.hasAttribute('data-nav-close')) closeMenu();
  });

  /* Close on Escape */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && btn.classList.contains('open')) closeMenu();
  });

  /* ── Scroll behaviour ─────────────────────────────────────────────────── */
  window.addEventListener('scroll', function () {
    hdr.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  /* ── Scroll reveal (only if page hasn't set up its own observer) ─────── */
  function _navSetupReveal() {
    if (window.__revealReady) return;
    // Keep a strong reference on window so the observer is not GC'd
    window._navRevealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          window._navRevealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(function (el) {
      window._navRevealObserver.observe(el);
    });
  }
  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', _navSetupReveal);
  } else {
    _navSetupReveal();
  }

})();
