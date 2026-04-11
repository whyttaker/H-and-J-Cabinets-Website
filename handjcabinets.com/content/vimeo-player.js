/* ─── Minimal Vimeo Player ───────────────────────────────────────────────────
   Shows video thumbnail with a custom white play button.
   Hides all Vimeo UI. On click, loads the player with autoplay.
   Include after nav.js on any page with .video-wrap Vimeo iframes:
     <script src="/content/vimeo-player.js"></script>
   ────────────────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  /* ── CSS ────────────────────────────────────────────────────────────────── */
  var style = document.createElement('style');
  style.textContent = [
    '.vimeo-overlay {',
    '  position: absolute;',
    '  inset: 0;',
    '  z-index: 10;',
    '  cursor: pointer;',
    '  display: flex;',
    '  align-items: center;',
    '  justify-content: center;',
    '  background: #080807 center/cover no-repeat;',
    '  transition: opacity 0.5s ease;',
    '}',
    /* Subtle dark tint over the thumbnail so the white button reads clearly */
    '.vimeo-overlay::after {',
    '  content: "";',
    '  position: absolute;',
    '  inset: 0;',
    '  background: rgba(0,0,0,0.12);',
    '  transition: background 0.25s ease;',
    '}',
    '.vimeo-overlay:hover::after {',
    '  background: rgba(0,0,0,0.06);',
    '}',
    '.vimeo-overlay.hidden {',
    '  opacity: 0;',
    '  pointer-events: none;',
    '}',
    '.vimeo-play-btn {',
    '  background: rgba(255,255,255,0.08);',
    '  backdrop-filter: blur(20px) saturate(160%);',
    '  -webkit-backdrop-filter: blur(20px) saturate(160%);',
    '  border-radius: 50%;',
    '  border: none;',
    '  padding: 0;',
    '  cursor: pointer;',
    '  width: 56px;',
    '  height: 56px;',
    '  display: flex;',
    '  align-items: center;',
    '  justify-content: center;',
    '  position: relative;',
    '  z-index: 1;',
    '  box-shadow:',
    '    0 0 0 1px rgba(255,255,255,0.25),',       /* glass rim */
    '    inset 0 1px 1px rgba(255,255,255,0.45),', /* top inner highlight */
    '    inset 0 -1px 1px rgba(0,0,0,0.12),',      /* bottom inner shadow */
    '    0 8px 32px rgba(0,0,0,0.18);',            /* ambient shadow */
    '  transition: background 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;',
    '}',
    '.vimeo-play-btn svg {',
    '  width: 18px;',
    '  height: 18px;',
    '  margin-left: 1px;',   /* slight left offset */
    '}',
    '.vimeo-overlay:hover .vimeo-play-btn {',
    '  background: rgba(255,255,255,0.14);',
    '  box-shadow:',
    '    0 0 0 1px rgba(255,255,255,0.35),',
    '    inset 0 1px 2px rgba(255,255,255,0.55),',
    '    inset 0 -1px 1px rgba(0,0,0,0.1),',
    '    0 8px 36px rgba(0,0,0,0.22);',
    '  transform: scale(1.08);',
    '}',
  ].join('\n');
  document.head.appendChild(style);

  /* ── Play SVG — thin circle + triangle ─────────────────────────────────── */
  var PLAY_SVG =
    '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<polygon points="5,2 22,12 5,22" fill="white"/>' +
    '</svg>';

  /* ── Extract numeric video ID from a Vimeo player URL ───────────────────── */
  function videoId(src) {
    var m = src.match(/vimeo\.com\/video\/(\d+)/);
    return m ? m[1] : null;
  }

  /* ── Wire up each .video-wrap containing a Vimeo iframe ─────────────────── */
  function setupWrap(wrap) {
    var iframe = wrap.querySelector('iframe[src*="vimeo"]');
    if (!iframe) return;

    var id = videoId(iframe.src);

    /* Build overlay */
    var overlay = document.createElement('div');
    overlay.className = 'vimeo-overlay';
    overlay.setAttribute('aria-hidden', 'true');

    var btn = document.createElement('button');
    btn.className = 'vimeo-play-btn';
    btn.setAttribute('aria-label', 'Play video');
    btn.innerHTML = PLAY_SVG;
    overlay.appendChild(btn);
    wrap.appendChild(overlay);

    /* Fetch thumbnail via Vimeo oEmbed (CORS-safe public endpoint) */
    if (id) {
      fetch('https://vimeo.com/api/oembed.json?url=https://vimeo.com/' + id)
        .then(function (r) { return r.json(); })
        .then(function (data) {
          if (data.thumbnail_url) {
            /* Use the largest available thumbnail */
            var thumb = data.thumbnail_url.replace(/_\d+x\d+/, '_1280');
            overlay.style.backgroundImage = 'url(' + thumb + ')';
          }
        })
        .catch(function () { /* fallback: keep dark background */ });
    }

    /* On click: start playback, fade out overlay */
    overlay.addEventListener('click', function () {
      var src = iframe.src.replace(/[&?]autoplay=\d/, '');
      var sep = src.indexOf('?') !== -1 ? '&' : '?';
      iframe.src = src + sep + 'autoplay=1';
      overlay.classList.add('hidden');
    });
  }

  function init() {
    document.querySelectorAll('.video-wrap').forEach(setupWrap);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
