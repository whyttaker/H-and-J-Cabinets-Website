/* ─── Global Footer ──────────────────────────────────────────────────────────
   Inject shared footer HTML + CSS.
   Replace the <footer class="site-footer">…</footer> block with:
     <script src="/content/footer.js?v=1"></script>
   ──────────────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  /* ── CSS ──────────────────────────────────────────────────────────────── */
  var style = document.createElement('style');
  style.textContent = [
    '.site-footer {',
    '  border-top: 1px solid rgba(212,168,67,0.15);',
    '  padding: 48px var(--inset, clamp(24px,5vw,72px));',
    '  display: flex;',
    '  flex-direction: column;',
    '  align-items: center;',
    '  gap: 24px;',
    '}',
    '.footer-logo {',
    '  display: flex;',
    '  align-items: center;',
    '  gap: 12px;',
    '  text-decoration: none;',
    '}',
    '.footer-logo img {',
    '  width: 32px; height: 32px;',
    '  object-fit: contain;',
    '  border-radius: 50%;',
    '  border: 1px solid rgba(212,168,67,0.25);',
    '  opacity: 0.7;',
    '}',
    '.footer-logo span {',
    '  font-family: "Cormorant Garamond", Georgia, serif;',
    '  font-size: 14px;',
    '  font-weight: 300;',
    '  letter-spacing: 0.2em;',
    '  text-transform: uppercase;',
    '  color: #7a7672;',
    '}',
    '.footer-links {',
    '  list-style: none;',
    '  display: flex;',
    '  flex-wrap: wrap;',
    '  justify-content: center;',
    '  gap: 10px 28px;',
    '}',
    '.footer-links a {',
    '  font-family: "EB Garamond", Georgia, serif;',
    '  font-size: 12px;',
    '  letter-spacing: 0.22em;',
    '  text-transform: uppercase;',
    '  color: #7a7672;',
    '  text-decoration: none;',
    '  transition: color 0.3s;',
    '}',
    '.footer-links a:hover { color: #d4a843; }',
    '.footer-social {',
    '  display: flex;',
    '  gap: 20px;',
    '  align-items: center;',
    '}',
    '.footer-social a {',
    '  display: flex;',
    '  align-items: center;',
    '  justify-content: center;',
    '  color: rgba(122,118,114,0.7);',
    '  text-decoration: none;',
    '  transition: color 0.3s;',
    '}',
    '.footer-social a:hover { color: #d4a843; }',
    '.footer-social svg {',
    '  width: 18px; height: 18px;',
    '  fill: currentColor;',
    '}',
    '.footer-copy {',
    '  font-family: "EB Garamond", Georgia, serif;',
    '  font-size: 12px;',
    '  letter-spacing: 0.1em;',
    '  color: rgba(122,118,114,0.5);',
    '}',
  ].join('\n');
  document.head.appendChild(style);

  /* ── Footer HTML ──────────────────────────────────────────────────────── */
  var footer = document.createElement('footer');
  footer.className = 'site-footer';
  footer.innerHTML =
    '<a href="/" class="footer-logo">' +
      '<img src="/content/pictures/logo.png" alt="H &amp; J Cabinets logo">' +
      '<span>H &amp; J Cabinets</span>' +
    '</a>' +

    '<ul class="footer-links">' +
      '<li><a href="/featured-homes/">Projects</a></li>' +
      '<li><a href="/contact/">Contact</a></li>' +
      '<li><a href="/careers/">Careers</a></li>' +
      '<li><a href="/about/">About</a></li>' +
    '</ul>' +

    '<div class="footer-social">' +
      /* Instagram */
      '<a href="https://www.instagram.com/hjcabinets/" target="_blank" rel="noopener" aria-label="Instagram">' +
        '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
          '<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>' +
        '</svg>' +
      '</a>' +
      /* Houzz */
      '<a href="https://www.houzz.com/pro/hnjcabs/h-j-cabinets" target="_blank" rel="noopener" aria-label="Houzz">' +
        '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
          '<path d="M 12 0 L 0 6.5 L 0 24 L 8 24 L 8 15 L 16 15 L 16 24 L 24 24 L 24 11 L 12 5 Z M 16 13 L 8 13 L 8 7.5 L 16 11 Z"/>' +
        '</svg>' +
      '</a>' +
      /* YouTube */
      '<a href="https://youtube.com/@HJCabinets" target="_blank" rel="noopener" aria-label="YouTube">' +
        '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
          '<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>' +
        '</svg>' +
      '</a>' +
    '</div>' +

    '<p class="footer-copy">&copy; 2025 H &amp; J Cabinets. All rights reserved.</p>';

  /* Insert before this script tag */
  var s = document.currentScript;
  s.parentNode.insertBefore(footer, s);

})();
