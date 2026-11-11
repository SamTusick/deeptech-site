import Layout, { mount } from '../components/Layout.jsx';
import {
  Body, Card, Cards, Facts, H2, H3, Label, Lede, List, Muted, PageHead, Panel, PanelNote, Section, SectionHead, Table,
} from '../components/ui.jsx';

/* Steps past their day (Eastern time) are marked done; the first upcoming one is highlighted. */
const SCHEDULE = [
  ['2026-08-27', 'Aug 27', 'Open', 'Form teams'],
  ['2026-09-30', 'Sep 30', 'Apply', 'Proposals due'],
  ['2026-10-12', 'Oct 12', 'Pitch', 'Finalist pitches, winners announced'],
  ['2026-10-26', 'Oct 26', 'Checkpoint 1 · Design meeting', 'Question, parts, fit, measurement and safety'],
  ['2026-11-09', '≈ Nov 9', 'Checkpoint 2 · Working prototype', 'Core sensor, software and data path work'],
  ['2026-11-19', '≈ Nov 19', 'Checkpoint 3 · Flight readiness', 'Complete, tested and safe to integrate'],
  ['2026-11-23', '≈ Nov 23', 'Deliver', 'Final payload handoff'],
  ['2026-11-30', 'Nov 30+', 'Launch', 'Fly and recover'],
];

const SCORING = [
  ['Innovation', 25],
  ['Impact + applications', 20],
  ['Feasibility before launch', 20],
  ['Quality of experiment', 15],
  ['Simplicity + smart reuse', 10],
  ['Team + funding strategy', 10],
];

function Timeline() {
  const now = Date.now();
  let nextSet = false;
  return (
    <ol className="ml-1.5 border-l border-line-2" data-rv>
      {SCHEDULE.map(([date, when, title, text]) => {
        const done = new Date(`${date}T23:59:59-05:00`).getTime() < now;
        const next = !done && !nextSet;
        if (next) nextSet = true;
        return (
          <li
            key={date}
            className={`relative pb-[26px] pl-7 last:pb-0 before:absolute before:top-[7px] before:-left-1.5 before:h-[11px] before:w-[11px] before:rounded-full before:border before:content-[''] ${
              done
                ? 'before:border-ink-3 before:bg-ink-3'
                : next
                  ? 'before:border-signal before:bg-signal before:shadow-[0_0_0_4px_rgba(63,217,154,.15)]'
                  : 'before:border-line-2 before:bg-bg'
            }`}
          >
            <span className={`font-num text-[14px] ${next ? 'text-signal' : 'text-ink-3'}`}>{when}</span>
            <b className={`mt-0.5 block font-head text-[1.1rem] font-semibold ${done ? 'text-ink-2' : ''}`}>{title}</b>
            <p className="text-[.97rem] text-ink-2">{text}</p>
          </li>
        );
      })}
    </ol>
  );
}

/* Scoring weights; the longest bar is the largest weight. */
function Bars() {
  const max = Math.max(...SCORING.map(([, pc]) => pc));
  return (
    <ul data-rv>
      {SCORING.map(([name, pc]) => (
        <li
          key={name}
          className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)_48px] items-center gap-4 border-b border-line py-3 first:border-t first:border-t-line-2 max-[560px]:grid-cols-[1fr_48px] max-[560px]:gap-y-2"
        >
          <span className="font-head font-medium">{name}</span>
          <span className="h-1 overflow-hidden rounded-[2px] bg-line max-[560px]:col-span-full max-[560px]:row-start-2">
            <i className="block h-full rounded-[2px] bg-signal" style={{ width: `${(pc / max) * 100}%` }} />
          </span>
          <span className="text-right font-num text-ink-2">{pc}%</span>
        </li>
      ))}
    </ul>
  );
}

function Payload() {
  return (
    <Layout current="payload">
      <PageHead
        label="Fall 2026 student competition"
        title={
          <>
            Rocket Payload
            <br />
            <span className="text-cobalt">Challenge</span>
          </>
        }
      >
        <Lede className="mt-[22px]" data-rv>
          Two student payloads. One real rocket flight. Design a small experiment that tests a technology with a
          possible real-world application, and fly it on the FGCU DeepTech rocket.
        </Lede>
        <Muted className="mt-[18px]" data-rv>Student-led · advisor-supported · FGCU reviewed</Muted>
      </PageHead>

      {/* AT A GLANCE */}
      <Section>
        <Facts
          items={[
            ['Student teams selected', '2'],
            ['Payload component award, per team', '$500'],
            ['Real rocket flight', '1'],
            ['Target launch', 'Jan 1st', '2027 or later'],
          ]}
        />
        <Body className="mt-7" data-rv>
          Selected teams receive $500 for payload components, technical support, an integration path, and the
          chance to test a minimum viable product under real flight conditions — with real data to guide the next
          step. Rough ideas are welcome; no finalized design is required.
        </Body>
      </Section>

      {/* APPROACH */}
      <Section two>
        <SectionHead
          label="The approach"
          title="Think like a startup: prove the riskiest assumption."
          lede="Don't build the final product. Build the smallest experiment that answers the most important question. One clear question, one useful experiment."
        />
        <Table
          data-rv
          rows={[
            ['01 · Problem', 'What matters?'],
            ['02 · Key question', 'What must be true?'],
            ['03 · Measure', 'What data answers it?'],
            ['04 · Success', 'What result counts?'],
            ['05 · Next move', 'What happens after?'],
          ]}
        />
      </Section>

      {/* WHO */}
      <Section two>
        <div data-rv>
          <Label>Who can enter</Label>
          <H2 className="mt-3.5 mb-6">Every major can contribute to a flight experiment.</H2>
          <List
            items={[
              'FGCU students from any major',
              'Preferably 1–6 students per team',
              'No aerospace, coding, electronics or engineering experience required',
            ]}
          />
        </div>
        <div data-rv>
          <H3 className="mb-4">Build a complementary team</H3>
          <List items={['Technology', 'Experiment design', 'Business case', 'Build & test', 'Funding', 'Communication']} />
          <Muted className="mt-4">Faculty and industry experts may support teams as mentors.</Muted>
        </div>
      </Section>

      {/* ENVELOPE */}
      <Section>
        <SectionHead
          label="Payload envelope"
          title="Design inside a simple starting envelope."
          lede="The rocket team will confirm final limits and integration details before flight."
        />
        <Cards data-rv>
          <Card label="Approximate volume" title="6 in × 10 in" titleClass="font-num text-[2rem]">
            Plan your enclosure, connectors, access and mounting within this space.
          </Card>
          <Card label="Approximate mass range" title="0.55–11 lb" titleClass="font-num text-[2rem]">
            250–5,000 g. Smaller and lighter payloads are strongly encouraged.
          </Card>
        </Cards>
        <Body className="mt-6" data-rv>
          Tell the rocket team early if you need a camera view, optical access, radio communication, or unusual
          integration support.
        </Body>
      </Section>

      {/* IDEAS + BUILD */}
      <Section two>
        <div data-rv>
          <Label>Ideas</Label>
          <H2 className="mt-3.5 mb-4">Almost any technology can become a payload.</H2>
          <Body className="mb-[22px]">
            The flight must teach you something that matters beyond the competition. These are prompts, not
            boundaries — propose a different idea if the flight can test it.
          </Body>
          <Table
            rows={[
              ['Fluids + thermal', 'Flow, cooling, life support'],
              ['Aerodynamics', 'Drag, control, imaging'],
              ['Landing systems', 'Parachutes, cargo, recovery'],
              ['AI / sensing / positioning', 'Vision, sensors, positioning'],
              ['Environment', 'Air, particles, remote sensing'],
              ['Materials + structures', 'Stress, vibration, manufacturing'],
            ]}
          />
        </div>
        <div data-rv>
          <Label>Keep it simple</Label>
          <H2 className="mt-3.5 mb-4">A winning payload is simple enough to finish.</H2>
          <Body className="mb-[22px]">
            You receive no extra points for complexity. Buy what exists; build only what proves your idea.
          </Body>
          <Table
            rows={[
              ['Sensor', 'Measure the effect'],
              ['MCU / computer', 'Run the logic'],
              ['Battery', 'Power the test'],
              ['Memory', 'Save the data'],
              ['Enclosure', 'Hold it securely'],
            ]}
          />
          <Muted className="mt-4">
            Arduino, Raspberry Pi, ESP32, commercial sensors, GPS, cameras, 3D-printed parts and open-source software
            are all fair game.
          </Muted>
        </div>
      </Section>

      {/* APPLICATION + PITCH */}
      <Section two>
        <div data-rv>
          <Label>The application</Label>
          <H2 className="mt-3.5 mb-4">Fits in 1–3 pages.</H2>
          <Body className="mb-[22px]">
            Rough concepts are welcome and a short presentation is acceptable. Estimates are fine; a finished design
            is not required. A drawing or simple diagram is encouraged.
          </Body>
          <Table
            rows={[
              ['01 · Your team', 'Names, majors, roles'],
              ['02 · The problem', 'Who cares and why'],
              ['03 · Your idea', 'Technology in plain language'],
              ['04 · The experiment', 'Question, measurement, success'],
              ['05 · The payload', 'Size, mass, components, power, radio'],
              ['06 · Your plan', 'Build, ground test, budget, fundraising support'],
            ]}
          />
        </div>
        <div data-rv>
          <Label>If shortlisted</Label>
          <H2 className="mt-3.5 mb-4">Tell the story in five minutes.</H2>
          <Body className="mb-[22px]">
            A 5-minute presentation plus about 5 minutes of questions. Polish matters less than clarity and execution.
          </Body>
          <List
            items={[
              'What problem are you solving?',
              'What is your idea?',
              'Why is it useful or interesting?',
              'What will the rocket help you test?',
              'Can your team build it before launch?',
            ]}
          />
        </div>
      </Section>

      {/* SCORING */}
      <Section two>
        <SectionHead
          label="Judging"
          title="Strong ideas win only when they can be executed."
          lede="Safety and fit are checked first. Qualifying proposals are then scored on six criteria. A simple experiment that answers a valuable question can beat a more complex proposal."
        />
        <Bars />
      </Section>

      {/* SAFETY */}
      <Section two>
        <div data-rv>
          <Label>Safety</Label>
          <H2 className="mt-3.5 mb-4">Disclose unusual features early.</H2>
          <Body className="mb-[22px]">
            You aren't expected to arrive knowing rocket safety. You are expected to tell us what your payload
            contains. Flag these items:
          </Body>
          <List
            items={[
              'Liquids or chemicals',
              'Pressurized containers',
              'Heaters or powerful batteries',
              'Radio transmitters or lasers',
              'Magnets or sharp components',
              'Moving or external mechanisms',
            ]}
          />
        </div>
        <div data-rv>
          <H3 className="mb-4">The payload must not interfere with</H3>
          <List items={['Flight computer', 'Parachutes', 'Tracking system', 'Rocket structure', 'Propulsion system']} />
          <Muted className="mt-4">
            FGCU safety and research-compliance review is required before hardware or flight. Use commercially or
            publicly available, or approved, components — no controlled technical data or restricted technology.
          </Muted>
        </div>
      </Section>

      {/* SCHEDULE */}
      <Section id="schedule" two>
        <SectionHead
          label="Schedule"
          title="The schedule rewards early, simple decisions."
          lede="Three checkpoints move the payload toward flight. They're designed to help teams succeed, not to eliminate them. The launch date may move; build deadlines still matter."
        />
        <Timeline />
      </Section>

      {/* AFTER */}
      <Section two>
        <div data-rv>
          <Label>Ground testing</Label>
          <H2 className="mt-3.5 mb-4">Your rocket flight should not be the first test.</H2>
          <Body className="mb-[22px]">Ground testing makes flight data trustworthy. Before flight, confirm that:</Body>
          <List
            items={[
              'The battery lasts long enough',
              'Memory saves the data',
              'Components remain attached',
              'Sensors and cameras record',
              'Software starts reliably',
              'The payload survives shaking',
            ]}
          />
        </div>
        <Panel data-rv>
          <Label muted className="mb-2.5">After the flight</Label>
          <p className="text-[.98rem] text-ink-2">
            Recover the payload and data. Explain what worked, what surprised you, what you learned, and what you
            would test next.
          </p>
          <p className="mt-3.5 text-[.98rem] text-ink">
            <strong>A result that disproves your assumption can still be a successful experiment.</strong>
          </p>
          <PanelNote>
            Students should retain the ability to develop their ideas beyond the competition, subject to applicable
            FGCU policies and any separate agreements.
          </PanelNote>
        </Panel>
      </Section>

      {/* CLOSER */}
      <Section>
        <div data-rv>
          <Label>Find a problem. Build the simplest test. Fly it.</Label>
          <H2 className="mt-3.5">Two FGCU venture teams will put their ideas on a real rocket.</H2>
          <Lede className="mt-4">Questions and team feedback with advisors Mattia Barbarossa and Luca Principi.</Lede>
        </div>
      </Section>
    </Layout>
  );
}

mount(Payload);
