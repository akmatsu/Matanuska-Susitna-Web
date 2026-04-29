import Image from 'next/image';
import './global.tw.css';
import Link from 'next/link';

export const metadata = {
  metadataBase:
    process.env.NODE_ENV === 'production'
      ? new URL('https://myproperty.matsu.gov')
      : undefined,
  title: 'MyProperty',
  description: "The Borough's super awesome property application",
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-background text-foreground p-2 font-sans antialiased">
        <div className="mx-auto max-w-240">
          <header className="text-center">
            <Link href="/" aria-label="Home">
              <div className="relative mx-auto aspect-340/27 w-full max-w-170">
                <Image
                  src="/msb_print.gif"
                  alt="The Matanuska-Susitna Borough Logo followed by the text 'Matanuska-Susitna Borough' in large bold text"
                  fill
                  className="object-cover"
                  loading="eager"
                />
              </div>
            </Link>
          </header>
          {props.children}
        </div>
      </body>
    </html>
  );
}
