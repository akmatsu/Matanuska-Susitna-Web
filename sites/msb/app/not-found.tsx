import { Button } from '@matsugov/ui/Button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16 prose">
      <div className="flex gap-2 items-center">
        <h1 className="flex gap-2 items-center">
          <span>Page Not Found</span>
          <span className="icon-[mdi--alert] size-10 text-warning"></span>
        </h1>
      </div>
      <p>
        We&apos;re sorry, we can&apos;t find the page you&apos;re looking for.
        It&apos;s possible it might have been removed, or changed location.
      </p>

      <p>Please click the button below to navigate to our home page.</p>

      <div className="flex gap-2">
        <Button as={Link} href="/" color="primary">
          Go Back
        </Button>
      </div>
    </section>
  );
}
