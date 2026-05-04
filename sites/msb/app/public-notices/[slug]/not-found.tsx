import { LinkButton } from '@/components/static/LinkButton';

export default function NotFound() {
  return (
    <section className="prose mx-auto max-w-6xl px-4 py-16">
      <div className="flex items-center gap-2">
        <h1 className="flex items-center gap-2">
          <span>Public Notice Expired</span>
        </h1>
      </div>
      <p>
        This public notice has expired and is no longer available. It may have
        been removed or changed location.
      </p>

      <p>Click the button below to view our current public notices.</p>

      <div className="flex flex-col gap-2">
        <LinkButton href="/public-notices" color="primary">
          View Current Public Notices
        </LinkButton>
        <LinkButton href="/" color="primary">
          Go Home
        </LinkButton>
      </div>
    </section>
  );
}
