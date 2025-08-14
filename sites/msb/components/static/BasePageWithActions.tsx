import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import { ComponentProps } from 'react';
import { BasePage } from './BasePage';
import { PageActions } from './Page';

const basePageWithActions = gql(`
  fragment BasePageWithActionsInfo on BasePageWithActions {
    ...BasePageInfo
    actions {
      ...ActionList
    }
  }
`);

export function BasePageWithActions(
  props: Omit<ComponentProps<typeof BasePage>, 'actionsSlot' | 'data'> & {
    data?: FragmentType<typeof basePageWithActions> | null;
  },
) {
  const page = getFragmentData(basePageWithActions, props.data);

  if (!page) return;

  return (
    <BasePage
      {...props}
      data={page}
      actionsSlot={<PageActions actions={page.actions} />}
    />
  );
}
