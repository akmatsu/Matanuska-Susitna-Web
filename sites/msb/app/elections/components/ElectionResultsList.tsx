import { gql } from '@msb/js-sdk/gql';

const ElectionResultsListFragment = gql(`
  fragment ElectionResultsList on ElectionResult {
    id
    election {
      title
      electionDate
    }
    document {
      ...DocumentLink
    }
  }
  
`);

export function ElectionResultsList(props: {}) {
  return;
}
