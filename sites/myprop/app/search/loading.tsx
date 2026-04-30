import { SearchFieldBody } from '@/components/SearchField/SearchFieldBody';
import { ResultsLoading } from './ResultsLoading';

export default function SearchLoading() {
  return (
    <>
      <SearchFieldBody />
      <ResultsLoading />
    </>
  );
}
