import Link from 'next/link';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export function MarkdownRenderer(props: { children: string }) {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: (props) => {
          const isExternal = props.href?.startsWith('http');
          return (
            <Link
              href={props.href as string}
              className={`usa-link ${isExternal ? 'usa-link--external' : ''}`}
              target={isExternal ? '_blank' : '_self'}
              referrerPolicy={
                isExternal ? 'no-referrer' : 'strict-origin-when-cross-origin'
              }
            >
              {props.children}
            </Link>
          );
        },
      }}
    >
      {props.children}
    </Markdown>
  );
}
