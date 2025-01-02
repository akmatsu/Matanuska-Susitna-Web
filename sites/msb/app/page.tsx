import {
  Featured,
  Hero,
  FeaturedContent,
  Meetings,
  LinkButton,
} from '@/components';

export default function Home() {
  return (
    <div>
      <Hero />
      <Featured />

      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="mb-4 text-3xl font-bold">Upcoming Meetings</h2>

        <Meetings />
      </section>
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="mb-4 text-3xl font-bold">
          Announcement & Public Notices
        </h2>

        <FeaturedContent />
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="mb-4 text-3xl font-bold">Can't find what you need?</h2>
        <p className="text-xl mb-4">
          Use the search bar or reach out to us directly — we're here to help.
        </p>

        <LinkButton href="#" color="primary">
          Contact us
        </LinkButton>
      </section>
    </div>
  );
}
