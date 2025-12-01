import { ComponentProps, ElementType, ReactNode } from 'react';

export function PhoneLink<T extends ElementType = 'a'>({
  phoneNumber,
  as,
  children,
  icon,
  ...props
}: Omit<Omit<ComponentProps<T>, 'href'>, 'children'> & {
  phoneNumber: string;
  as?: T;
  children?: ReactNode;
  icon?: boolean;
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

  if (icon) {
    return (
      <LinkAs
        href={`tel:${countryCode}${areaCode}${centralOfficeCode}${lineNumber}`}
        aria-label={`Call ${formattedPhoneNumber}`}
        title={`Call ${formattedPhoneNumber}`}
        className="flex size-8 rounded-full items-center justify-center bg-primary"
        {...props}
      >
        <span className="icon-[mdi--phone] text-white size-5" />
      </LinkAs>
    );
  }

  return (
    <LinkAs
      href={`tel:${countryCode}${areaCode}${centralOfficeCode}${lineNumber}`}
      {...props}
    >
      {children ? children : formattedPhoneNumber}
    </LinkAs>
  );
}
