import { NotFoundBackButton } from '@/components/client/NotFoundBackButton';

export const metadata = {
  title: 'MSB - Page Not Found',
};

export default function NotFound() {
  return (
    <section className="prose mx-auto max-w-6xl px-4 py-16">
      <div className="flex items-center gap-2">
        <h1 className="flex items-center gap-2">
          <span>Page Not Found</span>
          <span className="icon-[mdi--alert] text-warning size-10"></span>
        </h1>
      </div>
      <p>
        We&apos;re sorry, we can&apos;t find the page you&apos;re looking for.
        It&apos;s possible it might have been removed, or changed location.
      </p>

      <p>Please click the button below to navigate to our home page.</p>

      <div className="flex gap-2">
        <NotFoundBackButton />
      </div>
    </section>
  );
}
