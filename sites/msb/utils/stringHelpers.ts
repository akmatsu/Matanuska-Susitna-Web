import { plural } from 'pluralize';

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function toKebabCase(str: string) {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2') // insert '-' between lowercase and uppercase
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2') // handle cases like "XMLHttpRequest"
    .replace(/_\s/gi, '-')
    .toLowerCase();
}

const ignoreWords = [
  // Articles
  'a',
  'an',
  'the',

  // Conjunctions
  'and',
  'but',
  'or',
  'nor',
  'for',
  'so',
  'yet',

  // Prepositions
  'at',
  'by',
  'for',
  'in',
  'of',
  'off',
  'on',
  'out',
  'to',
  'up',
  'as',
  'it',
  'is',
  'be',
  'am',
  'are',
  'was',
  'were',
  'been',
  'have',
];

const separators = [' ', '-', '_'];
const escapedSeparators = separators
  .map((s) => (s === '-' ? '\\-' : s))
  .join('');
const separatorRegex = new RegExp(`[${escapedSeparators}]`, 'gi');

export function toTitleCase(str: string) {
  const lowerCaseStr = str.toLowerCase();

  return separators.reduce((acc, separator) => {
    return acc
      .split(separator)
      .map((word, index) => {
        return index === 0
          ? capitalizeFirstLetter(word)
          : ignoreWords.includes(word)
            ? word
            : capitalizeFirstLetter(word);
      })
      .join(separator);
  }, lowerCaseStr);
}

export function toCamelCase(str: string) {
  return str
    .toLowerCase()
    .split(separatorRegex)
    .map((word, index) => (index > 0 ? capitalizeFirstLetter(word) : word))
    .join('');
}

export function toPascalCase(str: string) {
  return capitalizeFirstLetter(toCamelCase(str));
}

export function slugify(str: string) {
  return str.toLowerCase().replace(separatorRegex, '-');
}

export function getRedirectUrl(
  item?: {
    __typename?: string;
    url?: string | null;
    slug?: string | null;
  } | null,
) {
  if (!item) return null;
  if ('url' in item) return item.url;
  if ('slug' in item) return `/${getUrlSection(item.__typename)}${item.slug}`;
  if (item?.__typename === 'HomePage') return '/';
  if (item?.__typename === 'BoardPage') return '/boards';
  if (item?.__typename === 'ElectionsPage') return '/elections';
}

function getUrlSection(str?: string) {
  if (!str) return '';
  if (str === 'OrgUnit') {
    return 'departments/';
  }
  return `${plural(slugify(str))}/`;
}
