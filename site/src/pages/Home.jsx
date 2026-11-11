import Layout, { mount } from '../components/Layout.jsx';
import {
  Accent, Btn, BtnRow, Card, Cards, Facts, H1, H3, InlineLink, Label, Lede, Muted,
  Panel, PanelNote, Section, SectionHead, H2,
} from '../components/ui.jsx';
import { LINKS, daysToLaunch } from '../config.js';

const LEADERSHIP = [
  ['Mia Mellor', 'President'],
  ['George Alenchery', 'Secretary'],
  ['Luca Principi', 'Advisor'],
  ['Mattia Barbarossa', 'Advisor'],
];

function LaunchCard() {
  const days = daysToLaunch();
  return (
    <Panel data-rv aria-label="Target launch">
      <Label muted className="mb-2.5">Target launch</Label>
      <div className="font-head text-[1.1rem] font-semibold">Around November 30, 2026</div>
      <div className="mt-1.5 mb-1 flex items-baseline gap-3">
        {days > 0 ? (
          <>
            <b className="font-num text-[clamp(2.6rem,5vw,3.4rem)] leading-none font-medium text-ink">{days}</b>
            <span className="font-head text-ink-2">{days === 1 ? 'day to go' : 'days to go'}</span>
          </>
        ) : (
          <span className="font-head text-ink-2">Target date reached — follow Instagram for launch updates</span>
        )}
      </div>
      <PanelNote>The date may move with weather, readiness, site requirements and safety.</PanelNote>
    </Panel>
  );
}

function Home() {
  return (
    <Layout current="home">
      {/* HERO */}
      <section className="flex min-h-[min(92vh,860px)] items-center pt-[calc(var(--top)+clamp(48px,10vh,120px))] pb-[clamp(56px,8vh,96px)]">
        <div className="wrap grid grid-cols-[minmax(0,1.4fr)_minmax(0,.8fr)] items-end gap-[clamp(32px,5vw,72px)] max-[900px]:grid-cols-1 max-[900px]:items-start">
          <div>
            <Label className="mb-5" data-rv>Florida Gulf Coast University</Label>
            <H1 data-rv>
              Student rocketry
              <br />
              at <Accent a="FGC" b="U" />.
            </H1>
            <Lede className="mt-6" data-rv>
              FGCU DeepTech is a student club designing, building and flying a high-power rocket — and giving
              other FGCU students the chance to put their own experiments on board.
            </Lede>
            <BtnRow className="mt-[34px]" data-rv>
              <Btn primary href="join.html">Join the club</Btn>
              <Btn href="payload.html">Payload Challenge</Btn>
            </BtnRow>
          </div>
          <LaunchCard />
        </div>
      </section>

      {/* ROCKET */}
      <Section id="rocket" two>
        <SectionHead
          label="The rocket"
          title="About twelve feet tall, flying on an L-class motor."
          lede={
            <>
              This season's vehicle is a high-power rocket built by the Rocket Building Team. It will also carry
              the two student payloads selected in the <InlineLink href="payload.html">Payload Challenge</InlineLink>.
            </>
          }
        >
          <Muted className="mt-[18px]">Performance figures are predictions and will be updated as the design is finalized.</Muted>
        </SectionHead>
        <Facts
          items={[
            ['Height', '~12', 'ft'],
            ['Motor', 'L900'],
            ['Predicted apogee', '~5,000', 'ft'],
            ['Predicted top speed', '~0.55', 'Mach'],
          ]}
        />
      </Section>

      {/* PAYLOAD CHALLENGE */}
      <Section id="challenge" two>
        <div data-rv>
          <Label>Fall 2026 · Payload Challenge</Label>
          <H2 className="mt-3.5">Two student payloads. One real rocket flight.</H2>
          <Lede className="mt-4">
            FGCU students from any major design a small experiment that tests a technology with a real-world
            application. Two teams are selected, each receives $500 for payload components, and both experiments fly
            on our rocket.
          </Lede>
          <BtnRow className="mt-7">
            <Btn href="payload.html">Challenge details</Btn>
          </BtnRow>
        </div>
        <Facts
          items={[
            ['Teams selected', '2'],
            ['Award per team', '$500'],
            ['Payload space', '6×10', 'in'],
            ['Winners announced', 'Oct 12'],
          ]}
        />
      </Section>

      {/* TEAMS + PEOPLE */}
      <Section id="team">
        <SectionHead
          label="The club"
          title="Two teams, one launch."
          lede="We're splitting into two teams this semester. Members are being selected now."
        />
        <Cards data-rv>
          <Card label="Team 01" title="Rocket Building" status="Selection coming soon">Builds and flies the rocket.</Card>
          <Card label="Team 02" title="Outreach & Marketing" status="Selection coming soon">
            Gets the word out about the club and the launch.
          </Card>
        </Cards>

        <H3 className="mt-14 mb-4" data-rv>Leadership</H3>
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] border-t border-line-2" data-rv>
          {LEADERSHIP.map(([name, role]) => (
            <li key={name} className="border-b border-line py-5 pr-4">
              <b className="block font-head text-[1.15rem] font-semibold">{name}</b>
              <span className="text-[.95rem] text-ink-3">{role}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* SPONSORS */}
      <Section id="sponsors">
        <SectionHead label="Sponsors" title="Thank you to our sponsors." />
        <div className="rounded-[4px] border border-dashed border-line-2 p-[clamp(24px,4vw,40px)] text-center" data-rv>
          <p className="mx-auto max-w-[52ch] text-ink-2">
            Sponsor recognition is coming soon. Interested in supporting student rocketry at FGCU? Reach out on{' '}
            <InlineLink external href={LINKS.instagram}>Instagram</InlineLink> or through{' '}
            <InlineLink external href={LINKS.eaglelink}>Eagle Link</InlineLink>.
          </p>
        </div>
      </Section>

      {/* GET INVOLVED */}
      <Section two center>
        <div data-rv>
          <Label>Get involved</Label>
          <H2 className="mt-3.5">Come to a general body meeting.</H2>
          <Lede className="mt-4">
            Usually every other Thursday at 5&nbsp;PM. Time and location can vary, so check GroupMe or Eagle Link
            before you head over.
          </Lede>
        </div>
        <BtnRow data-rv>
          <Btn primary href="join.html">How to join</Btn>
          <Btn external href={LINKS.instagram}>Photos on Instagram</Btn>
        </BtnRow>
      </Section>
    </Layout>
  );
}

mount(Home);
