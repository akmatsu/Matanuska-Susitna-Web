import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import { ComponentProps } from 'react';
import { BasePage } from './BasePage';
import { PageActions } from './Page';

const basePageWithPrimaryAction = gql(`
  fragment BasePageWithPrimaryActionInfo on Service {
    ...BasePageInfo
    primaryAction {
      ...ExternalActionFields
    }
    secondaryActions {
      ...ExternalActionFields
    }
  }
`);

export function BasePageWithPrimaryAction(
  props: Omit<ComponentProps<typeof BasePage>, 'actions' | 'data'> & {
    data?: FragmentType<typeof basePageWithPrimaryAction> | null;
  },
) {
  const page = getFragmentData(basePageWithPrimaryAction, props.data);

  if (!page) return;

  return (
    <BasePage
      {...props}
      data={page}
      actionsSlot={
        <PageActions
          secondaryActions={page.secondaryActions}
          primaryAction={page.primaryAction}
        />
      }
    />
  );
}
