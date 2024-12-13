import { ThreeColumnLayout } from '@/components/ThreeColumnLayout';
import React from 'react';

export default async function Community({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <section className="usa-section">
      <p>Muffins</p>
      {/* {
      data?.service && (
        <ThreeColumnLayout></ThreeColumnLayout>
      )
    } */}
    </section>
  );
}
