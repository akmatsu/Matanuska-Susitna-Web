import { Button } from '@trussworks/react-uswds';

export async function PrimaryActionButton({ label }: { label: string }) {
  return <Button type="button">{label}</Button>;
}

export function ActionButtonWrapper(props: { label: string }) {
  return <PrimaryActionButton {...props} />;
}
