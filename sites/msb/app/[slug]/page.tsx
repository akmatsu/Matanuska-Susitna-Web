import { NEXT_DEFAULT_REVALIDATE } from '@/configs/config';
import { getTopic } from '@msb/cms-sdk';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { TOPIC_INCLUDES } from './topicIncludes';
import { TopicView } from './TopicView';

type Props = { params: Promise<{ slug: string }> };

/**
 * Topics come from the Laravel CMS REST API. They live at the site root,
 * so this route also answers every root path that isn't a topic (with a
 * 404). Metadata and the page make the same request, and Next memoizes it,
 * so the CMS is called once.
 */
function loadTopic(slug: string) {
  return getTopic(slug, {
    include: TOPIC_INCLUDES,
    revalidate: NEXT_DEFAULT_REVALIDATE,
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const result = await loadTopic(slug);
  if (!result) return {};

  return {
    title: `MSB - ${result.data.title}`,
    description: result.data.description,
  };
}

export default async function TopicPage({ params }: Props) {
  const { slug } = await params;
  const result = await loadTopic(slug);

  if (!result) {
    return notFound();
  }

  return <TopicView result={result} />;
}
