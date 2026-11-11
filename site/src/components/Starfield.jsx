import { useEffect, useRef } from 'react';

/* Three slow parallax layers, a faint wash of brand colour,
   and the occasional shooting star. Static under prefers-reduced-motion. */
const LAYERS = [
  { n: 0.00022, r: [0.35, 0.75], a: [0.22, 0.45], v: 0.012, p: 0.010 },
  { n: 0.00013, r: [0.55, 1.05], a: [0.35, 0.65], v: 0.024, p: 0.024 },
  { n: 0.00005, r: [0.85, 1.65], a: [0.55, 0.95], v: 0.045, p: 0.048 },
];

export default function Starfield() {
  const ref = useRef(null);

  useEffect(() => {
    const cv = ref.current;
    const ctx = cv?.getContext('2d', { alpha: true });
    if (!ctx) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let W = 0, H = 0, dpr = 1;
    let stars = [], lobes = [], meteor = null;
    let mx = 0, my = 0, tx = 0, ty = 0, sy = 0, t = 0, raf = null;

    function build() {
      const r = cv.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width; H = r.height;
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      stars = [];
      LAYERS.forEach((L, li) => {
        const count = Math.round(W * H * L.n);
        for (let i = 0; i < count; i++) {
          stars.push({
            x: Math.random() * W,
            y: Math.random() * H,
            r: L.r[0] + Math.random() * (L.r[1] - L.r[0]),
            a: L.a[0] + Math.random() * (L.a[1] - L.a[0]),
            v: L.v, p: L.p, l: li,
            // twinkle phase; only the brightest layer twinkles noticeably
            tw: Math.random() * Math.PI * 2,
            ts: 0.4 + Math.random() * 1.1,
          });
        }
      });

      const big = Math.max(W, H);
      lobes = [
        { x: W * 0.78, y: H * 0.16, r: big * 0.52, c: [0, 45, 114], a: 0.10, dx: 0.0045, dy: 0.0022 },
        { x: W * 0.14, y: H * 0.82, r: big * 0.42, c: [0, 119, 73], a: 0.06, dx: -0.0035, dy: -0.0018 },
        { x: W * 0.46, y: H * 0.52, r: big * 0.30, c: [58, 120, 232], a: 0.03, dx: 0.0025, dy: -0.003 },
      ];
    }

    function paintLobes() {
      for (const L of lobes) {
        const x = L.x + Math.sin(t * L.dx) * W * 0.06;
        const y = L.y + Math.cos(t * L.dy) * H * 0.05;
        const c = L.c.join(',');
        const g = ctx.createRadialGradient(x, y, 0, x, y, L.r);
        g.addColorStop(0, `rgba(${c},${L.a})`);
        g.addColorStop(0.55, `rgba(${c},${(L.a * 0.28).toFixed(3)})`);
        g.addColorStop(1, `rgba(${c},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      }
    }

    function paintStars() {
      for (const s of stars) {
        // drift downward, wrap at the bottom edge
        s.y += s.v;
        if (s.y > H + 2) { s.y = -2; s.x = Math.random() * W; }

        const ox = tx * s.p * 18;
        const oy = ty * s.p * 14 + sy * s.p * 0.4;
        const y = (((s.y + oy) % (H + 4)) + (H + 4)) % (H + 4);
        let a = s.a;
        if (s.l === 2) a *= 0.72 + Math.sin(t * 0.02 * s.ts + s.tw) * 0.28;

        ctx.beginPath();
        ctx.arc(s.x + ox, y, s.r, 0, 6.2832);
        ctx.fillStyle = `rgba(214,228,255,${a.toFixed(3)})`;
        ctx.fill();

        // the few largest stars get a soft bloom
        if (s.r > 1.35) {
          ctx.beginPath();
          ctx.arc(s.x + ox, y, s.r * 3.4, 0, 6.2832);
          ctx.fillStyle = `rgba(143,182,255,${(a * 0.08).toFixed(3)})`;
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
            life: 1,
          };
        }
        return;
      }
      const m = meteor;
      m.x -= m.sp; m.y += m.sp * 0.42; m.life -= 0.012;
      if (m.life <= 0 || m.x < -m.len) { meteor = null; return; }

      const g = ctx.createLinearGradient(m.x, m.y, m.x + m.len, m.y - m.len * 0.42);
      g.addColorStop(0, `rgba(226,240,255,${(0.85 * m.life).toFixed(3)})`);
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
    if (reduced) still();
    else raf = requestAnimationFrame(frame);

    let rt;
    const onResize = () => {
      clearTimeout(rt);
      rt = setTimeout(() => { build(); if (reduced) still(); }, 180);
    };
    const onPointer = (e) => {
      mx = (e.clientX / window.innerWidth) * 2 - 1;
      my = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onScroll = () => { sy = window.scrollY * 0.06; };
    // don't burn cycles in a background tab
    const onVisibility = () => {
      if (document.hidden) { cancelAnimationFrame(raf); raf = null; }
      else if (!raf) raf = requestAnimationFrame(frame);
    };

    window.addEventListener('resize', onResize);
    if (!reduced) {
      window.addEventListener('pointermove', onPointer, { passive: true });
      window.addEventListener('scroll', onScroll, { passive: true });
      document.addEventListener('visibilitychange', onVisibility);
    }

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(rt);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <>
      <canvas
        ref={ref}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-2 h-full w-full print:hidden"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-1 bg-[radial-gradient(110%_60%_at_80%_-10%,rgba(0,45,114,.38),transparent_60%),radial-gradient(80%_50%_at_0%_110%,rgba(0,119,73,.12),transparent_60%)] print:hidden"
      />
    </>
  );
}
