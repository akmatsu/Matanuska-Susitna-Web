import { IframeHTMLAttributes } from 'react';

export function MDIframe(props: IframeHTMLAttributes<HTMLIFrameElement>) {
  return <iframe {...props} />;
}
