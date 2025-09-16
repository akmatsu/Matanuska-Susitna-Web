export const primaryNav = [
  { href: '/services', label: 'Services' },
  { href: '/communities', label: 'Communities' },
  { href: '/government', label: 'Government' },
  { href: '/departments', label: 'Departments' },
  { href: '/top-pages', label: 'Top Pages' },
];

export const NEXT_DEFAULT_REVALIDATE = process.env
  .NEXT_PUBLIC_DEFAULT_REVALIDATE
  ? parseInt(process.env.NEXT_PUBLIC_DEFAULT_REVALIDATE, 10)
  : 60;
