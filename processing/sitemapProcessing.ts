import fs from "fs";
import path from "path";

const sitemapIgnoredFiles = [
    "api",
    "_app.tsx",
    "_document.tsx",
    "404.tsx",
    "sitemap.xml.tsx",
    "posts",
    "index.tsx"]

export function getStaticPageSubPaths() {
    const staticPageFiles = getFilteredPageFiles()
    return staticPageFiles.map((pageFileName) => getFileNameWithoutExtension(pageFileName) );
}

export function getLocalizedStaticPaths(staticPageSubPaths, locales) {
    const staticPagesLocalizedPaths = locales.flatMap((locale) => {
        return staticPageSubPaths.map((staticPagePath) => `${process.env.NEXT_PUBLIC_HOST}/${locale}/${staticPagePath}`);
    })

    const staticPagesDefaultPaths = staticPageSubPaths.map((staticPagePath) => `${process.env.NEXT_PUBLIC_HOST}/${staticPagePath}`);

    return staticPagesLocalizedPaths.concat(staticPagesDefaultPaths)
}

function getFileNameWithoutExtension(fileName: string): string {
    return path.parse(fileName).name;
}

function getFilteredPageFiles(): string[] {
    return fs
        .readdirSync("pages")
        .filter((staticPage) => !sitemapIgnoredFiles.includes(staticPage))
}