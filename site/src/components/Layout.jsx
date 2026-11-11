import { StrictMode, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import Starfield from './Starfield.jsx';
import { AltitudeRail, Footer, Header, SkipLink, StatusStrip } from './Chrome.jsx';
import '../index.css';

/* Fade [data-rv] elements in as they scroll into view. */
function useReveal() {
  useEffect(() => {
    const items = [...document.querySelectorAll('[data-rv]')];
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('rv-in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (!en.isIntersecting) continue;
          en.target.classList.add('rv-in');
          io.unobserve(en.target);
        }
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.05 },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function Layout({ current, children }) {
  const progress = useRef(null);
  useReveal();
  return (
    <>
      <SkipLink />
      <Starfield />
      <StatusStrip progressRef={progress} />
      <AltitudeRail progressRef={progress} />
      <Header current={current} />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}

/** Mount a page component into #root. */
export function mount(Page) {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <Page />
    </StrictMode>,
  );
}
