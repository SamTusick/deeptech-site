/* Small building blocks shared by the pages. Each one carries its Tailwind
   classes so the pages read as content. `className` adds spacing per use. */

const cx = (...c) => c.filter(Boolean).join(' ');

/* ---- type ------------------------------------------------ */
export function Label({ muted, className, children, ...rest }) {
  return (
    <span
      className={cx(
        'block font-head text-[13px] font-medium tracking-[.12em] uppercase',
        muted ? 'text-ink-3' : 'text-signal',
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}

export const H1 = ({ className, ...p }) => (
  <h1 className={cx('text-[clamp(2.4rem,6vw,4.4rem)] leading-[1.04] font-bold', className)} {...p} />
);
export const H2 = ({ className, ...p }) => <h2 className={cx('text-[clamp(1.7rem,3.4vw,2.5rem)]', className)} {...p} />;
export const H3 = ({ className, ...p }) => <h3 className={cx('text-[1.2rem]', className)} {...p} />;
export const Lede = ({ className, ...p }) => (
  <p className={cx('max-w-[58ch] text-[clamp(1.08rem,1.5vw,1.25rem)] text-ink-2', className)} {...p} />
);
export const Body = ({ className, ...p }) => <p className={cx('max-w-[66ch] text-ink-2', className)} {...p} />;
export const Muted = ({ className, ...p }) => <p className={cx('text-[.95rem] text-ink-3', className)} {...p} />;

/* Wordmark split into cobalt + emerald, e.g. FGC|U, Deep|Tech */
export const Accent = ({ a, b }) => (
  <>
    <span className="text-cobalt">{a}</span>
    {b && <span className="text-signal">{b}</span>}
  </>
);

export function InlineLink({ external, ...p }) {
  return (
    <a
      className="text-signal underline decoration-1 underline-offset-[3px] hover:text-ink"
      {...(external ? { target: '_blank', rel: 'noopener' } : {})}
      {...p}
    />
  );
}

/* ---- layout ---------------------------------------------- */
/* `two` splits the content into two columns (stacked below 860px). */
export function Section({ id, two, center, children }) {
  return (
    <section id={id} className="border-t border-line py-[clamp(64px,9vw,112px)]">
      <div
        className={cx(
          'wrap',
          two && 'grid grid-cols-2 gap-[clamp(28px,5vw,72px)] max-[860px]:grid-cols-1',
          two && (center ? 'items-center' : 'items-start'),
        )}
      >
        {children}
      </div>
    </section>
  );
}

/* Label + heading + optional lede, with the standard gap below. */
export function SectionHead({ label, title, lede, children }) {
  return (
    <div className="mb-[clamp(28px,4vw,44px)]" data-rv>
      <Label className="mb-3.5">{label}</Label>
      <H2>{title}</H2>
      {lede && <Lede className="mt-4">{lede}</Lede>}
      {children}
    </div>
  );
}

/* Inner-page header (payload, join). */
export function PageHead({ label, title, children }) {
  return (
    <section className="pt-[calc(var(--top)+clamp(56px,10vh,110px))] pb-[clamp(48px,7vw,80px)]">
      <div className="wrap">
        <Label className="mb-[18px]" data-rv>{label}</Label>
        <H1 data-rv>{title}</H1>
        {children}
      </div>
    </section>
  );
}

/* ---- buttons --------------------------------------------- */
export function BtnRow({ className, ...p }) {
  return <div className={cx('flex flex-wrap gap-3', className)} {...p} />;
}

export function Btn({ primary, external, href, children, arrow = external ? '↗' : '→' }) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener' } : {})}
      className={cx(
        'group inline-flex items-center gap-2.5 rounded-[3px] border px-5 py-3 font-head text-[15px] font-semibold tracking-[.02em] transition-[background,border-color,color] duration-250 ease-soft',
        primary
          ? 'border-signal bg-signal text-[#04150D] hover:border-[#6BE6B3] hover:bg-[#6BE6B3]'
          : 'border-line-2 text-ink hover:border-ink-2 hover:bg-white/4',
      )}
    >
      {children}
      <span className="transition-transform duration-250 ease-soft group-hover:translate-x-[3px]">{arrow}</span>
    </a>
  );
}

/* ---- panels + cards -------------------------------------- */
export function Panel({ className, ...p }) {
  return <div className={cx('rounded-[4px] border border-line bg-panel p-6 backdrop-blur-[6px]', className)} {...p} />;
}

/* Footnote under a rule at the bottom of a panel */
export const PanelNote = (p) => <p className="mt-3.5 border-t border-line pt-3.5 text-[.98rem] text-ink-2" {...p} />;

export const Cards = (p) => <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4" {...p} />;

export function Card({ label, title, titleClass, status, children }) {
  return (
    <article className="rounded-[4px] border border-line bg-panel p-6">
      <Label muted className="mb-2.5">{label}</Label>
      <h3 className={cx('mb-2', titleClass ?? 'text-[1.2rem]')}>{title}</h3>
      <p className="text-[.98rem] text-ink-2">{children}</p>
      {status && <p className="mt-4 font-head text-[14px] text-signal">{status}</p>}
    </article>
  );
}

/* ---- data ------------------------------------------------ */
/* Big-number grid. items: [label, value, unit?] */
export function Facts({ items }) {
  return (
    <dl className="grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] border-t border-line-2" data-rv>
      {items.map(([dt, dd, unit]) => (
        <div key={dt} className="border-b border-line py-[22px] pr-5">
          <dt className="font-head text-[14px] text-ink-3">{dt}</dt>
          <dd className="mt-1.5 font-num text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.1] font-medium">
            {dd}
            {unit && <small className="ml-1 font-head text-[.5em] text-ink-3">{unit}</small>}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/* Two-column key/value table. rows: [heading, value, note?] */
export function Table({ rows, ...rest }) {
  const cell = 'border-b border-line py-3.5 pr-3 text-left align-top group-first:border-t group-first:border-t-line-2';
  return (
    <table className="w-full" {...rest}>
      <tbody>
        {rows.map(([th, td, note]) => (
          <tr key={th} className="group">
            <th scope="row" className={cx(cell, 'w-[40%] font-head font-medium text-ink-3')}>{th}</th>
            <td className={cx(cell, 'text-ink')}>
              {td}
              {note && <small className="block text-[.9rem] text-ink-3">{note}</small>}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* Ruled list with a short emerald dash before each item. */
export function List({ items }) {
  return (
    <ul className="border-t border-line">
      {items.map((it) => (
        <li
          key={it}
          className="flex items-baseline gap-3 border-b border-line py-[11px] text-ink-2 before:relative before:-top-1 before:h-px before:w-2 before:flex-none before:bg-signal before:content-['']"
        >
          {it}
        </li>
      ))}
    </ul>
  );
}
