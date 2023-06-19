import fs from 'fs';
import path from 'path';

// POSTS_PATH is useful when you want to get the path to a specific file
export const POSTS_PATH = path.join(process.cwd(), 'posts');

export function getLocalisedPostPath(locale: string): string {
  return path.join(POSTS_PATH, locale);
}

// postFilePaths is the list of all mdx files inside the POSTS_PATH directory
export function getAllLocalePostFileNames(locale: string): string[] {
  try{
    return getMdxFileNamesFromLocaleFolder(locale);
  }
  catch {
    throw new Error(`Could not find posts paths for locale: ${locale}`)
  }
}

export function getPostLocales(postName: string, allLocales: string[]): string[] {
  return allLocales.filter((locale) => getAllLocalePostUrlNames(locale).includes(postName))
}

export function getAllLocalePostUrlNames(locale: string): string[] {
  return getAllLocalePostFileNames(locale)
      // Remove file extensions for page paths
      .map((path) => path.replace(/\.mdx?$/, ''));
}

function getMdxFileNamesFromLocaleFolder(locale: string): string[] {
  return fs.readdirSync(path.join(POSTS_PATH, locale))
    // Only include md(x) files
    .filter((path) => /\.mdx?$/.test(path));
}
