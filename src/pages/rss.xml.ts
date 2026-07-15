import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { withBase } from '../paths';
import { SITE } from '../site';

export async function GET(context: APIContext) {
  const posts = (await getCollection('posts', ({ data }) => !data.draft))
    .sort((a, b) => b.data.published.valueOf() - a.data.published.valueOf());
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: new URL(withBase('/'), context.site ?? 'http://localhost:4321').toString(),
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.published,
      link: withBase(`/posts/${post.id}/`),
      categories: post.data.tags,
    })),
  });
}
