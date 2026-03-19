'use client';
import { FooterButton } from '@matsugov/ui';

export function FooterAuthButtons(props: {
  children: React.ReactNode;
  action: () => Promise<void>;
}) {
  return (
    <FooterButton onClick={() => props.action()}>{props.children}</FooterButton>
  );
}
