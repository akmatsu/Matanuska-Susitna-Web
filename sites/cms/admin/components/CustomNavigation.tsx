import {
  ListNavItems,
  NavigationContainer,
  NavItem,
} from '@keystone-6/core/admin-ui/components';
import { NavigationProps } from '@keystone-6/core/types';

export function CustomNavigation({
  lists,
  authenticatedItem,
}: NavigationProps) {
  return (
    <NavigationContainer authenticatedItem={authenticatedItem}>
      <NavItem href="/">Dashboard</NavItem>
      <ListNavItems lists={lists} />
      <NavItem href="/custom-page">Manage Typesense</NavItem>
    </NavigationContainer>
  );
}
