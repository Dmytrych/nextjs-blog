import fs from 'fs';
import path from 'path';

// POSTS_PATH is useful when you want to get the path to a specific file
export const POSTS_PATH = path.join(process.cwd(), 'posts');

export function getLocalisedPostPath(locale: string): string {
  return path.join(POSTS_PATH, locale);
}

// postFilePaths is the list of all mdx files inside the POSTS_PATH directory
export function getAllLocalePostFilePaths(locale: string): string[] {
  try{
    return getMdxFilePathsFromLocaleFolder(locale);
  }
  catch {
    throw new Error(`Could not find posts paths for locale: ${locale}`)
  }
}

function getMdxFilePathsFromLocaleFolder(locale: string): string[] {
  return fs.readdirSync(path.join(POSTS_PATH, locale))
    // Only include md(x) files
    .filter((path) => /\.mdx?$/.test(path));
}
