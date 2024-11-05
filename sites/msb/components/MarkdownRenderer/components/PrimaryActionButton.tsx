import { Button } from '@trussworks/react-uswds';

// TODO! Make the button trigger the primary action

export async function PrimaryActionButton({ label }: { label: string }) {
  return <Button type="button">{label}</Button>;
}

export function ActionButtonWrapper(props: { label: string }) {
  return <PrimaryActionButton {...props} />;
}
