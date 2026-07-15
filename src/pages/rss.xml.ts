import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { SITE } from '../site';

export async function GET(context: APIContext) {
  const posts = (await getCollection('posts', ({ data }) => !data.draft))
    .sort((a, b) => b.data.published.valueOf() - a.data.published.valueOf());
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site ?? 'http://localhost:4321',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.published,
      link: `/posts/${post.id}/`,
      categories: post.data.tags,
    })),
  });
}
