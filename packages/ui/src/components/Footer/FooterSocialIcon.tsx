import clsx from 'clsx';

export function FooterSocialIcon({
  as = 'a',
  ...props
}: {
  label: string;
  href: string;
  as?: React.ElementType;
}) {
  const Link = as;
  return (
    <Link
      href={props.href}
      target="_blank"
      className="bg-primary hover:bg-primary-dark flex aspect-square size-14 items-center justify-center rounded-full transition-colors"
      as={as}
    >
      <span
        className={clsx('iconify size-8 text-white', {
          'icon-[mdi--facebook]': props.label === 'Facebook',
          'icon-[mdi--twitter]': props.label === 'Twitter',
          'icon-[mdi--youtube]': props.label === 'YouTube',
          'icon-[mdi--instagram]': props.label === 'Instagram',
          'icon-[mdi--rss]': props.label === 'RSS',
        })}
      ></span>
    </Link>
  );
}
