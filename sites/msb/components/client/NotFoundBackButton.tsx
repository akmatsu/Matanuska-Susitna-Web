'use client';
import { Button } from '@matsugov/ui';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

export function NotFoundBackButton(props: { children?: ReactNode }) {
  const router = useRouter();
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    setCanGoBack(window.history.length > 1);
  }, []);

  function handleGoBack() {
    if (canGoBack) router.back();
    else router.push('/');
  }

  const ariaLabel = canGoBack
    ? 'Go back to the previous page'
    : 'Go to home page';

  return (
    <Button
      color="primary"
      onClick={handleGoBack}
      aria-label={ariaLabel}
      title={ariaLabel}
    >
      {props.children || 'Go Back'}
    </Button>
  );
}
