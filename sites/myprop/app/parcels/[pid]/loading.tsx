import { PropertyAccessMoved } from '@/components/PropertyAccessMoved';

// Shows the moved message right away. The button links to the Property Access
// home page until the parcel lookup finishes and the page swaps in its deep link.
export default function ParcelDetailLoading() {
  return <PropertyAccessMoved />;
}
