import { LinkButton } from '@/components/static/LinkButton';

export default function Unauthorized() {
  return (
    <section className="prose mx-auto max-w-6xl px-4 py-16">
      <div className="flex items-center gap-2">
        <h1 className="flex items-center gap-2">
          <span>Unauthorized</span>
          <span className="icon-[mdi--alert] text-error size-10"></span>
        </h1>
      </div>
      <p>
        We&apos;re sorry, but you are not authorized to access this content.
      </p>

      <p>Please click the button below to navigate to the home page.</p>

      <div className="flex gap-2">
        <LinkButton href="/" color="primary">
          Go Back
        </LinkButton>
      </div>
    </section>
  );
}
