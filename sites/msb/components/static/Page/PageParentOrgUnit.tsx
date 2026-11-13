import { PageSection } from './PageSection';
import { PageListItemView, type PageListItemData } from './PageListItem';

/** The department an org unit belongs to, when it has one. */
export function PageParentOrgUnit(props: { item?: PageListItemData | null }) {
  if (props.item) {
    return (
      <PageSection title="Parent Department">
        <PageListItemView item={props.item} />
      </PageSection>
    );
  }
}
