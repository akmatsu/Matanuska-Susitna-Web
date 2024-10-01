'use client';

import { useEffect, useState } from 'react';
import { SideNav } from '@trussworks/react-uswds';
import Link from 'next/link';

type Headers = { id: string; tag: string; text?: string }[];
type TreeNode = {
  id: string;
  tag: string;
  text?: string;
  level: number;
  children: TreeNode[];
};

const buildHeaderTree = (headers: Headers) => {
  const tree: TreeNode[] = [];
  const stack: TreeNode[] = [];

  headers.forEach((header) => {
    const level = parseInt(header.tag.replace('H', ''));
    const node: TreeNode = { ...header, level, children: [] };

    while (stack.length && stack[stack.length - 1].level >= level) {
      stack.pop();
    }

    if (stack.length === 0) {
      tree.push(node);
    } else {
      stack[stack.length - 1].children.push(node);
    }

    stack.push(node);
  });

  return tree;
};

const TreeRenderer = ({
  nodes,
  isSubnav,
}: {
  nodes: TreeNode[];
  isSubnav?: boolean;
}) => {
  return (
    <SideNav
      isSubnav={isSubnav}
      items={nodes.map((node) => (
        <div key={node.id}>
          <Link href={`#${node.id}`}>{node.text}</Link>
          {!!node.children?.length && (
            <TreeRenderer nodes={node.children} isSubnav />
          )}
        </div>
      ))}
    />
  );
};

export function CoreSideNav() {
  const [headerTree, setHeaderTree] = useState<TreeNode[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const headerElements = document.querySelectorAll(
        'main h1, main h2, main h3, main h4, main h5, main h6',
      );

      const headerArray = Array.from(headerElements).map((header, index) => {
        if (!header.id) {
          header.id = `header-${header.textContent?.replace(' ', '-') || index}`;
        }
        return {
          id: header.id,
          tag: header.tagName,
          text: header.textContent || undefined,
        };
      });

      const tree = buildHeaderTree(headerArray);
      setHeaderTree(tree);
    }
  }, []);

  return <TreeRenderer nodes={headerTree} />;
}
