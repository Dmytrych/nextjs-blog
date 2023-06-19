import {GetServerSideProps} from "next";
import {getLocalizedStaticPaths, getStaticPageSubPaths} from "../processing/sitemapProcessing";
import {getAllLocalePostUrlNames} from "../utils/postUtils";

const SitemapXml = () => {
    return null;
};

export const getServerSideProps: GetServerSideProps = async ({ res, locales, defaultLocale }) => {
    const staticPageSubPaths = getStaticPageSubPaths();

    const staticPagesLocalizedPaths = getLocalizedStaticPaths(staticPageSubPaths, locales);

    const postSubPaths = locales.flatMap((locale) => getAllLocalePostUrlNames(locale).map((postName) => `${locale}/${postName}`))
    const postPaths = postSubPaths.map((postSubPath) => `${process.env.NEXT_PUBLIC_HOST}${postSubPath}`)

    const defaultLocalePostPaths = getAllLocalePostUrlNames(defaultLocale).map((postName) => `${process.env.NEXT_PUBLIC_HOST}${postName}`)

    const allPaths = staticPagesLocalizedPaths.concat(postPaths).concat(defaultLocalePostPaths)

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