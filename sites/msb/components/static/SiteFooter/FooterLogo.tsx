import Link from 'next/link';

export function FooterLogo() {
  return (
    <Link href="/">
      <div className="flex flex-col items-center gap-2 md:flex-row">
        <div className="relative aspect-square size-20 md:size-15">
          {/* <Image src /> */}
        </div>
      </div>
    </Link>
  );
}
