import {GetServerSideProps} from "next";
import {getLocalizedStaticPaths, getStaticPageSubPaths} from "../processing/sitemapProcessing";
import {getPostsInfo} from "../utils/postRepository";

const SitemapXml = () => {
    return null;
};

export const getServerSideProps: GetServerSideProps = async ({ res, locales, defaultLocale }) => {
    const staticPageSubPaths = getStaticPageSubPaths();

    const staticPagesLocalizedPaths = getLocalizedStaticPaths(staticPageSubPaths, locales);

    const postUrls = locales.flatMap((locale) => getPostsInfo(locale, locales, defaultLocale).map((postInfo) => postInfo.url));

    const allPaths = staticPagesLocalizedPaths.concat(postUrls)

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allPaths
        .map((url) => {
            return `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
        })
        .join("")}
    </urlset>
  `;

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
};

export default SitemapXml;