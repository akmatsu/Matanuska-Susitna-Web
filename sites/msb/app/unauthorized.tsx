import { Button } from '@matsugov/ui';
import Link from 'next/link';

export default function Unauthorized() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16 prose">
      <div className="flex gap-2 items-center">
        <h1 className="flex gap-2 items-center">
          <span>Unauthorized</span>
          <span className="iconify mdi--alert size-10 text-error"></span>
        </h1>
      </div>
      <p>We're sorry, but you are not authorized to access this content.</p>

      <p>Please click the button below to navigate to the home page.</p>

      <div className="flex gap-2">
        <Button as={Link} href="/">
          Go Back
        </Button>
      </div>
    </section>
  );
}
