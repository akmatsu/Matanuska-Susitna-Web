import { PropertyAccessMoved } from '@/components/PropertyAccessMoved';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MSB Tax Map PDF / DXF Downloads',
  description:
    'View and download tax maps in PDF or DXF format for the Matanuska-Susitna Borough.',
};

export default function TaxMapsPage() {
  return <PropertyAccessMoved />;
}
