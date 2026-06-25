import { PageTitle } from '@/components/PageTitle';

export default function SearchLayout(props: { children: React.ReactNode }) {
  return (
    <main>
      <PageTitle title="Search" />
      {props.children}
    </main>
  );
}
