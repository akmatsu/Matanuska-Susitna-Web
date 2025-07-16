import { ElementType, ReactNode } from 'react';

export function EmailLink<T extends ElementType = 'a'>({
  email,
  children,
  subject,
  cc,
  bcc,
  body,
  as,
}: {
  email: string;
  subject?: string;
  children?: ReactNode;
  cc?: string;
  bcc?: string;
  body?: string;
  as?: T;
}) {
  const LinkAs = as || 'a';

  return (
    <LinkAs
      href={`mailto:${email}${subject ? `?subject=${subject.replace(' ', '%20')}` : ''}${cc ? `&cc=${cc}` : ''}${bcc ? `&bcc=${bcc}` : ''}${body ? `&body=${body.replace(' ', '%20')}` : ''}`}
    >
      {children ? children : email}
    </LinkAs>
  );
}
