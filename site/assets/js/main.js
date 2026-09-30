/* ============================================================
   FGCU DEEPTECH — SITE SCRIPT
   No dependencies. Every module bails if its markup is absent.
   ============================================================ */
(function () {
  'use strict';

  /* Target launch date. The launch card on the home page counts days to it.
     Update this when the date firms up (it is "around Nov 30, 2026 or later"). */
  var LAUNCH_DATE = '2026-11-30T00:00:00-05:00';

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ========================================================
     01 / STARFIELD
     Three slow parallax layers, a faint wash of brand colour,
     and the occasional shooting star.
     ======================================================== */
  function starfield() {
    var cv = document.getElementById('starfield');
    if (!cv) return;
    var ctx = cv.getContext('2d', { alpha: true });
    if (!ctx) return;

    var W = 0, H = 0, dpr = 1;
    var stars = [], lobes = [], meteor = null;
    var mx = 0, my = 0, tx = 0, ty = 0, sy = 0, t = 0, raf = null;

    var LAYERS = [
      { n: 0.00022, r: [0.35, 0.75], a: [0.22, 0.45], v: 0.012, p: 0.010 },
      { n: 0.00013, r: [0.55, 1.05], a: [0.35, 0.65], v: 0.024, p: 0.024 },
      { n: 0.00005, r: [0.85, 1.65], a: [0.55, 0.95], v: 0.045, p: 0.048 }
    ];

    function build() {
      var r = cv.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width; H = r.height;
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      stars = [];
      LAYERS.forEach(function (L, li) {
        var count = Math.round(W * H * L.n);
        for (var i = 0; i < count; i++) {
          stars.push({
            x: Math.random() * W,
            y: Math.random() * H,
            r: L.r[0] + Math.random() * (L.r[1] - L.r[0]),
            a: L.a[0] + Math.random() * (L.a[1] - L.a[0]),
            v: L.v, p: L.p, l: li,
            // twinkle phase; only the brightest layer twinkles noticeably
            tw: Math.random() * Math.PI * 2,
            ts: 0.4 + Math.random() * 1.1
          });
        }
      });

      lobes = [
        { x: W * 0.78, y: H * 0.16, r: Math.max(W, H) * 0.52, c: [0, 45, 114],  a: 0.10, dx: 0.0045, dy: 0.0022 },
        { x: W * 0.14, y: H * 0.82, r: Math.max(W, H) * 0.42, c: [0, 119, 73],  a: 0.06, dx: -0.0035, dy: -0.0018 },
        { x: W * 0.46, y: H * 0.52, r: Math.max(W, H) * 0.30, c: [58, 120, 232], a: 0.03, dx: 0.0025, dy: -0.003 }
      ];
    }

    function paintLobes() {
      for (var i = 0; i < lobes.length; i++) {
        var L = lobes[i];
        var x = L.x + Math.sin(t * L.dx) * W * 0.06;
        var y = L.y + Math.cos(t * L.dy) * H * 0.05;
        var g = ctx.createRadialGradient(x, y, 0, x, y, L.r);
        g.addColorStop(0, 'rgba(' + L.c.join(',') + ',' + L.a + ')');
        g.addColorStop(0.55, 'rgba(' + L.c.join(',') + ',' + (L.a * 0.28).toFixed(3) + ')');
        g.addColorStop(1, 'rgba(' + L.c.join(',') + ',0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      }
    }

    function paintStars() {
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        // drift downward, wrap at the bottom edge
        s.y += s.v;
        if (s.y > H + 2) { s.y = -2; s.x = Math.random() * W; }

        var ox = tx * s.p * 18;
        var oy = ty * s.p * 14 + sy * s.p * 0.4;
        var y = ((s.y + oy) % (H + 4) + (H + 4)) % (H + 4);
        var a = s.a;
        if (s.l === 2) a *= 0.72 + Math.sin(t * 0.02 * s.ts + s.tw) * 0.28;

        ctx.beginPath();
        ctx.arc(s.x + ox, y, s.r, 0, 6.2832);
        ctx.fillStyle = 'rgba(214,228,255,' + a.toFixed(3) + ')';
        ctx.fill();

        // the few largest stars get a soft bloom
        if (s.r > 1.35) {
          ctx.beginPath();
          ctx.arc(s.x + ox, y, s.r * 3.4, 0, 6.2832);
          ctx.fillStyle = 'rgba(143,182,255,' + (a * 0.08).toFixed(3) + ')';
          ctx.fill();
        }
      }
    }

    function paintMeteor() {
      if (!meteor) {
        if (Math.random() < 0.0016) {
          meteor = {
            x: Math.random() * W * 0.7 + W * 0.25,
            y: Math.random() * H * 0.45,
            len: 90 + Math.random() * 130,
            sp: 6 + Math.random() * 5,
            life: 1
          };
        }
        return;
      }
      var m = meteor;
      m.x -= m.sp; m.y += m.sp * 0.42; m.life -= 0.012;
      if (m.life <= 0 || m.x < -m.len) { meteor = null; return; }

      var g = ctx.createLinearGradient(m.x, m.y, m.x + m.len, m.y - m.len * 0.42);
      g.addColorStop(0, 'rgba(226,240,255,' + (0.85 * m.life).toFixed(3) + ')');
      g.addColorStop(1, 'rgba(226,240,255,0)');
      ctx.strokeStyle = g; ctx.lineWidth = 1.1;
      ctx.beginPath();
      ctx.moveTo(m.x, m.y);
      ctx.lineTo(m.x + m.len, m.y - m.len * 0.42);
      ctx.stroke();
    }

    function frame() {
      t += 1;
      tx += (mx - tx) * 0.045;
      ty += (my - ty) * 0.045;
      ctx.clearRect(0, 0, W, H);
      paintLobes();
      paintStars();
      paintMeteor();
      raf = requestAnimationFrame(frame);
    }

    function still() {
      ctx.clearRect(0, 0, W, H);
      paintLobes();
      paintStars();
    }

    build();
    if (reduced) { still(); }
    else { raf = requestAnimationFrame(frame); }

    var rt;
    window.addEventListener('resize', function () {
      clearTimeout(rt);
      rt = setTimeout(function () { build(); if (reduced) still(); }, 180);
    });

    if (!reduced) {
      window.addEventListener('pointermove', function (e) {
        mx = (e.clientX / window.innerWidth) * 2 - 1;
        my = (e.clientY / window.innerHeight) * 2 - 1;
      }, { passive: true });

      window.addEventListener('scroll', function () {
        sy = window.scrollY * 0.06;
      }, { passive: true });

      // don't burn cycles in a background tab
      document.addEventListener('visibilitychange', function () {
        if (document.hidden) { cancelAnimationFrame(raf); raf = null; }
        else if (!raf) { raf = requestAnimationFrame(frame); }
      });
    }
  }

  /* ========================================================
     02 / LAUNCH CARD — whole days to the target date
     ======================================================== */
  function launch() {
    var el = $('[data-days]');
    var strip = $('[data-strip-t]');
    if (!el && !strip) return;
    var ms = new Date(LAUNCH_DATE).getTime() - Date.now();
    var days = Math.ceil(ms / 86400000);

    if (strip && days > 0) strip.textContent = 'T-' + days + ' days · target launch';
    if (!el) return;
    var wrap = el.closest('.launch__days');
    if (days > 0) {
      el.textContent = days;
      $('span', wrap).textContent = days === 1 ? 'day to go' : 'days to go';
    } else if (wrap) {
      wrap.innerHTML = '<span>Target date reached &mdash; follow Instagram for launch updates</span>';
    }
  }

  /* ========================================================
     02b / ALTITUDE RAIL
     Scroll depth read as altitude: top of the page is the pad,
     the bottom is the ~5,000 ft predicted apogee.
     ======================================================== */
  function altitude() {
    var rail = $('.alt');
    var prog = $('.strip__prog');
    if (!rail && !prog) return;
    var APOGEE_FT = 5000;
    var rocket = rail && $('.alt__rocket', rail);
    var fill = rail && $('.alt__fill', rail);
    var val = rail && $('.alt__val', rail);
    var ticking = false;

    var update = function () {
      ticking = false;
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      var pc = (p * 100).toFixed(2) + '%';
      if (rocket) rocket.style.bottom = pc;
      if (fill) fill.style.height = pc;
      if (val) val.textContent = (Math.round(p * APOGEE_FT / 10) * 10).toLocaleString('en-US') + ' ft';
      if (prog) prog.style.width = pc;
    };
    var onScroll = function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
  }

  /* ========================================================
     03 / TIMELINE — marks past steps and the next one
     ======================================================== */
  function timeline() {
    var items = $$('[data-date]');
    if (!items.length) return;
    var now = Date.now(), nextSet = false;
    items.forEach(function (li) {
      // a step counts as done once its day is over (Eastern time)
      var end = new Date(li.getAttribute('data-date') + 'T23:59:59-05:00').getTime();
      if (end < now) li.classList.add('is-done');
      else if (!nextSet) { li.classList.add('is-next'); nextSet = true; }
    });
  }

  /* ========================================================
     04 / HEADER + DRAWER
     ======================================================== */
  function chrome() {
    var hdr = $('.hdr');
    if (hdr) {
      var onScroll = function () { hdr.classList.toggle('is-stuck', window.scrollY > 12); };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    var burger = $('.burger');
    var drawer = $('.drawer');
    if (!burger || !drawer) return;

    var toggle = function (open) {
      document.body.classList.toggle('menu-open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.style.overflow = open ? 'hidden' : '';
    };
    burger.addEventListener('click', function () {
      toggle(!document.body.classList.contains('menu-open'));
    });
    $$('a', drawer).forEach(function (a) {
      a.addEventListener('click', function () { toggle(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && document.body.classList.contains('menu-open')) toggle(false);
    });
  }

  /* ========================================================
     05 / REVEAL ON SCROLL
     ======================================================== */
  function reveal() {
    var items = $$('[data-rv]');
    if (!items.length) return;
    if (reduced || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('rv-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add('rv-in');
        io.unobserve(en.target);
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.05 });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---- boot ---------------------------------------------- */
  function boot() { starfield(); launch(); altitude(); timeline(); chrome(); reveal(); }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else { boot(); }
})();
