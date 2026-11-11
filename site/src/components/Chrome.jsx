import { useEffect, useRef, useState } from 'react';
import { APOGEE_FT, LINKS, daysToLaunch } from '../config.js';

const NAV = [
  { href: 'index.html', label: 'Home', page: 'home' },
  { href: 'index.html#rocket', label: 'Rocket' },
  { href: 'payload.html', label: 'Payload Challenge', page: 'payload' },
  { href: 'join.html', label: 'Join', page: 'join' },
];

export function SkipLink() {
  return (
    <a
      href="#main"
      className="absolute top-0 -left-[9999px] z-100 bg-signal px-4 py-2.5 font-semibold text-[#04150D] focus:top-2 focus:left-2"
    >
      Skip to content
    </a>
  );
}

/* Days to the target launch, FGCU's coordinates and Fort Myers. The thin line
   along its bottom is scroll progress, for screens too narrow for the rail. */
export function StatusStrip({ progressRef }) {
  const days = daysToLaunch();
  const cell = 'border-r border-line px-3.5';
  return (
    <div
      aria-label="Status"
      className="fixed inset-x-0 top-0 z-51 flex h-(--strip) items-center overflow-hidden border-b border-line bg-[rgba(7,9,13,.94)] font-num text-[12px] tracking-[.04em] text-ink-3 print:hidden"
    >
      <div className="wrap flex items-center whitespace-nowrap">
        <span className={`${cell} inline-flex items-center gap-[7px] pl-0! text-signal before:h-1.5 before:w-1.5 before:animate-blink before:rounded-full before:bg-current before:content-['']`}>
          {days > 0 ? `T-${days} days · target launch` : 'Target launch ~Nov 30, 2026'}
        </span>
        <span className={cell}>26.4637°N 81.7748°W</span>
        <span className="px-3.5 max-[640px]:hidden">Fort Myers, FL</span>
      </div>
      <i ref={progressRef} aria-hidden="true" className="absolute -bottom-px left-0 h-px w-0 bg-signal min-[1200px]:hidden" />
    </div>
  );
}

/* A rocket that climbs as you scroll: the top of the page is the pad,
   the bottom is the predicted apogee. Wide screens only. */
export function AltitudeRail({ progressRef }) {
  const rocket = useRef(null);
  const fill = useRef(null);
  const val = useRef(null);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      const pc = `${(p * 100).toFixed(2)}%`;
      rocket.current.style.bottom = pc;
      fill.current.style.height = pc;
      val.current.textContent = `${(Math.round((p * APOGEE_FT) / 10) * 10).toLocaleString('en-US')} ft`;
      if (progressRef.current) progressRef.current.style.width = pc;
    };
    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [progressRef]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-1/2 right-[22px] z-40 flex -translate-y-1/2 flex-col items-center gap-2.5 font-num text-[11px] text-ink-3 max-[1199px]:hidden print:hidden"
    >
      <span>ALT</span>
      <div className="relative h-[180px] w-px bg-line-2">
        <i ref={fill} className="absolute bottom-0 left-0 h-0 w-px bg-linear-to-t from-signal/0 to-signal" />
        <svg ref={rocket} viewBox="0 0 14 28" className="absolute bottom-0 left-1/2 h-7 w-3.5 max-w-none -translate-x-1/2 translate-y-1/2">
          <path className="origin-[7px_22px] animate-flicker" d="M5.2 20 7 27l1.8-7Z" fill="#E8A33D" />
          <path d="M4 14 1.5 19.5V20H4Zm6 0 2.5 5.5V20H10Z" fill="#3FD99A" />
          <path d="M7 1c2.5 2.5 3 5 3 7v11H4V8c0-2 .5-4.5 3-7Z" fill="#E9EDF3" />
          <circle cx="7" cy="8.5" r="1.3" fill="#002D72" />
        </svg>
      </div>
      <span ref={val} className="min-w-[9ch] text-center text-ink-2">0 ft</span>
    </div>
  );
}

function Brand(props) {
  return (
    <a href="index.html" className="flex items-center gap-2.5" {...props}>
      <img src="assets/img/logo-96.png" alt="" width="32" height="32" className="h-8 w-8 flex-none rounded-full" />
      <span className="font-head text-[17px] font-bold tracking-[.02em]">FGCU DeepTech</span>
    </a>
  );
}

export function Header({ current }) {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const bar = 'absolute right-[11px] left-[11px] h-[1.5px] bg-ink transition-transform duration-300 ease-soft';

  return (
    <>
      <header
        className={`fixed inset-x-0 top-(--strip) z-50 h-(--hdr) border-b backdrop-blur-[12px] transition-[background,border-color] duration-300 ease-soft print:hidden ${
          stuck ? 'border-line bg-[rgba(7,9,13,.92)]' : 'border-transparent bg-[rgba(7,9,13,.6)]'
        }`}
      >
        <div className="wrap flex h-full items-center justify-between gap-5">
          <Brand aria-label="FGCU DeepTech home" />
          <nav aria-label="Primary" className="flex items-center gap-1 max-[820px]:hidden">
            {NAV.map((n) => {
              const on = n.page === current;
              return (
                <a
                  key={n.label}
                  href={n.href}
                  aria-current={on ? 'page' : undefined}
                  className={`px-3 py-2 font-head text-[15px] font-medium transition-colors duration-200 ease-soft hover:text-ink ${
                    on ? 'rounded-none text-ink shadow-[inset_0_-2px_0_var(--color-signal)]' : 'rounded-[3px] text-ink-2'
                  }`}
                >
                  {n.label}
                </a>
              );
            })}
          </nav>
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="drawer"
            onClick={() => setOpen(!open)}
            className="relative hidden h-9 w-10 rounded-[3px] border border-line-2 max-[820px]:block"
          >
            <span className={`${bar} top-[13px] ${open ? 'translate-y-1 rotate-45' : ''}`} />
            <span className={`${bar} bottom-[13px] ${open ? '-translate-y-1 -rotate-45' : ''}`} />
          </button>
        </div>
      </header>
      <nav
        id="drawer"
        aria-label="Mobile"
        className={`fixed inset-x-0 top-(--top) bottom-0 z-49 flex-col bg-[rgba(7,9,13,.98)] px-(--gut) pt-5 pb-10 min-[821px]:hidden! print:hidden ${open ? 'flex' : 'hidden'}`}
      >
        {NAV.map((n) => (
          <a
            key={n.label}
            href={n.href}
            onClick={() => setOpen(false)}
            aria-current={n.page === current ? 'page' : undefined}
            className={`border-b border-line py-3.5 font-head text-[1.5rem] font-semibold ${n.page === current ? 'text-ink' : 'text-ink-2'}`}
          >
            {n.label}
          </a>
        ))}
      </nav>
    </>
  );
}

export function Footer() {
  const link = 'text-ink-2 hover:text-signal';
  const h4 = 'mb-3 font-head text-[14px] font-medium text-ink-3';
  return (
    <footer className="border-t border-line pt-12 pb-9">
      <div className="wrap">
        <div className="grid grid-cols-[minmax(0,1.4fr)_repeat(2,minmax(0,.8fr))] gap-8 max-[720px]:grid-cols-1">
          <div>
            <Brand />
            <p className="mt-3 max-w-[36ch] text-[.95rem] text-ink-3">
              Student rocketry club at Florida Gulf Coast University, Fort Myers, Florida.
            </p>
          </div>
          <div>
            <h4 className={h4}>Site</h4>
            <ul className="*:mb-1.5">
              <li><a className={link} href="index.html#rocket">Rocket</a></li>
              <li><a className={link} href="payload.html">Payload Challenge</a></li>
              <li><a className={link} href="join.html">Join</a></li>
            </ul>
          </div>
          <div>
            <h4 className={h4}>Find us</h4>
            <ul className="*:mb-1.5">
              <li><a className={link} href={LINKS.instagram} target="_blank" rel="noopener">Instagram</a></li>
              <li><a className={link} href={LINKS.groupme} target="_blank" rel="noopener">GroupMe</a></li>
              <li><a className={link} href={LINKS.eaglelink} target="_blank" rel="noopener">Eagle Link</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-line pt-5 text-[.9rem] text-ink-3">
          © 2026 FGCU DeepTech · A student organization at Florida Gulf Coast University
        </div>
      </div>
    </footer>
  );
}
