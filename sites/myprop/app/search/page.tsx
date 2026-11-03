import { PropertyAccessMoved } from '@/components/PropertyAccessMoved';

export const metadata = {
  title: 'MyProperty - Search',
  description:
    'Search for real property information in the Matanuska-Susitna Borough with myProperty. Access parcel data, ownership details, assessments, and maps.',
};

export default function SearchPage() {
  return <PropertyAccessMoved />;
}
