import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';
import {getLocalisedPostPath} from '../utils/mdxUtils';

export function getPostSlugs(locale: string): string[] {
  return fs.readdirSync(getLocalisedPostPath(locale));
}

type PostItems = {
  [key: string]: string;
};

export function getPostBySlug(slug: string, locale: string, fields: string[] = []): PostItems {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = join(getLocalisedPostPath(locale), `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const items: PostItems = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug;
    }
    if (field === 'content') {
      items[field] = content;
    }
    if (data[field]) {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllPosts(locale, fields: string[] = []): PostItems[] {
  const slugs = locale ? getPostSlugs(locale) : [];
  const posts = slugs
    .map((slug) => getPostBySlug(slug, locale, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
