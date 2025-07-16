import { ComponentProps, ElementType, ReactNode } from 'react';

export function PhoneLink<T extends ElementType = 'a'>({
  phoneNumber,
  as,
  children,
  ...props
}: Omit<Omit<ComponentProps<T>, 'href'>, 'children'> & {
  phoneNumber: string;
  as?: T;
  children?: ReactNode;
}) {
  const LinkAs = as || 'a';
  const matches = phoneNumber.match(/(\d)?.*(\d{3}).*(\d{3}).*(\d{4})/);
  const formattedCountryCode = matches?.[1] ? `+${matches[1]} ` : '';
  const formattedAreaCode = matches?.[2] ? `(${matches[2]}) ` : '';
  const countryCode = matches?.[1] ? `+${matches[1]}` : '+1';
  const areaCode = matches?.[2] || '907';
  const centralOfficeCode = matches?.[3];
  const lineNumber = matches?.[4];

  const formattedPhoneNumber = `${formattedCountryCode}${formattedAreaCode}${centralOfficeCode}-${lineNumber}`;

  return (
    <LinkAs
      href={`tel:${countryCode}${areaCode}${centralOfficeCode}${lineNumber}`}
      {...props}
    >
      {children ? children : formattedPhoneNumber}
    </LinkAs>
  );
}
