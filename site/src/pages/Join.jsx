import Layout, { mount } from '../components/Layout.jsx';
import { Accent, Btn, BtnRow, Card, Cards, H2, Label, Lede, PageHead, Section, SectionHead, Table } from '../components/ui.jsx';
import { LINKS } from '../config.js';

const CHANNELS = [
  ['GroupMe', LINKS.groupme, 'Meeting times, locations and day-to-day updates.'],
  ['Eagle Link', LINKS.eaglelink, 'Our official FGCU student organization page.'],
  ['Instagram', LINKS.instagram, 'Photos and news from the build and the launch. @deeptechfgcu'],
];

function Join() {
  return (
    <Layout current="join">
      <PageHead label="Get involved" title={<>Join <Accent a="Deep" b="Tech" />.</>}>
        <Lede className="mt-[22px]" data-rv>
          The easiest way in is to come to a general body meeting. Join the GroupMe to see when and where the next
          one is.
        </Lede>
      </PageHead>

      {/* CHANNELS */}
      <Section>
        <SectionHead label="Find us" title="Where the club lives." />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-4" data-rv>
          {CHANNELS.map(([name, href, text]) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener"
              className="block rounded-[4px] border border-line bg-panel px-6 py-[22px] transition-[border-color,background] duration-250 ease-soft hover:border-signal hover:bg-signal/5"
            >
              <b className="flex justify-between font-head text-[1.2rem] font-semibold after:text-signal after:content-['↗']">{name}</b>
              <span className="mt-1.5 block text-[.96rem] text-ink-2">{text}</span>
            </a>
          ))}
        </div>
      </Section>

      {/* MEETINGS */}
      <Section two>
        <SectionHead
          label="Meetings"
          title="When we meet."
          lede="Time and location can vary, so check GroupMe or Eagle Link before you head over."
        />
        <Table
          data-rv
          rows={[
            ['General body', <>Usually every other Thursday, 5&nbsp;PM</>, 'Time and location may vary'],
            ['Team meetings', 'More frequent, set by each team', 'Starts once teams are selected'],
          ]}
        />
      </Section>

      {/* TEAMS */}
      <Section>
        <SectionHead
          label="Teams"
          title="Two teams this semester."
          lede="The club is splitting into two teams. Selection is happening soon — watch GroupMe for details."
        />
        <Cards data-rv>
          <Card label="Team 01" title="Rocket Building">Builds and flies the rocket.</Card>
          <Card label="Team 02" title="Outreach & Marketing">Gets the word out about the club and the launch.</Card>
        </Cards>
      </Section>

      {/* PAYLOAD */}
      <Section two center>
        <div data-rv>
          <Label>Have an experiment idea?</Label>
          <H2 className="mt-3.5">Fly it with the Payload Challenge.</H2>
          <Lede className="mt-4">Two student teams get $500 each and a spot on our rocket for their experiment.</Lede>
        </div>
        <BtnRow data-rv>
          <Btn primary href="payload.html">Challenge details</Btn>
        </BtnRow>
      </Section>
    </Layout>
  );
}

mount(Join);
