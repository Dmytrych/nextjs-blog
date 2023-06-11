import {getAllLocalePostFilePaths} from "./mdxUtils";

export function getAllLocalePostUrlNames(locale: string): string[] {
    return getAllLocalePostFilePaths(locale)
        // Remove file extensions for page paths
        .map((path) => path.replace(/\.mdx?$/, ''));
}