import { Button } from '@matsugov/ui';
import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16 prose">
      <div className="flex gap-2 items-center">
        <h1 className="flex gap-2 items-center">
          <span>Page Not Found</span>
          <span className="iconify mdi--alert size-10 text-warning"></span>
        </h1>
      </div>
      <p>
        We're sorry, we can't find the page you're looking for. It's possible it
        might have been removed, or changed location.
      </p>

      <p>Please click the button below to navigate to our home page.</p>

      <div className="flex gap-2">
        <Button as={Link} href="/">
          Go Back
        </Button>
      </div>
    </section>
  );
}
