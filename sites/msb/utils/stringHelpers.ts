export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
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
const separatorRegex = new RegExp(`[${separators.join('|')}]`, 'g');

export function toTitleCase(str: string) {
  const lowerCaseStr = str.toLowerCase();

  return separators.reduce((acc, separator, index) => {
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
