// @ts-check
// const sass = require('sass');
import * as sass from 'sass';

/**
 * Configure Sass to load USWDS assets, and expose a Sass function for setting the
 * correct relative path to image or font assets, when the site is hosted from a subdirectory.
 */
export default function sassOptions(basePath = '') {
  return {
    // ! This only need to go out 2 directories because it is relative to next.config.mjs not to the location of this file.
    includePaths: [
      '../../node_modules/@uswds',
      '../../node_modules/@uswds/uswds/packages',
    ],
    functions: {
      'add-base-path($path)': (path) => {
        return new sass.SassString(`${basePath}${path.getValue()}`);
      },
    },
  };
}
