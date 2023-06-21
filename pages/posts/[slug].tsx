import { format, parseISO } from 'date-fns';
import fs from 'fs';
import matter from 'gray-matter';
import {GetStaticPaths, GetStaticProps} from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import Head from 'next/head';
import Image from 'next/image';
import path from 'path';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import Layout from '../../components/Layout';
import { MetaProps } from '../../types/layout';
import { PostType } from '../../types/post';
import {getAllLocalePostUrlNames, getLocalisedPostPath} from '../../utils/postUtils';
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import Link from "next/link";
import React from "react";
import {getPostsInfo, IPostInfo} from "../../utils/postRepository";

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components = {
  Head,
  Image,
  a: (props) => <Link {...props} />,
}

type PostPageProps = {
  source: MDXRemoteSerializeResult;
  frontMatter: PostType;
  suggestedPostsInfo: IPostInfo[];
};

const PostPage = ({ source, frontMatter, suggestedPostsInfo }: PostPageProps): JSX.Element => {
  const customMeta: MetaProps = {
    title: `${frontMatter.title} - Habaznia Dmytro`,
    description: frontMatter.description,
    // image: `${WEBSITE_HOST_URL}${frontMatter.image}`,
    date: frontMatter.date,
    type: 'article',
  };

  return (
    <>
      <Layout customMeta={customMeta}>
        <div>
          {suggestedPostsInfo.map((post, index) => <div key={index}>
            <Link href={post.url}>{post.url}</Link>
          </div>)}
        </div>
        <article>
          <h1 className="mb-3 text-gray-900 dark:text-white">
            {frontMatter.title}
          </h1>
          <p className="mb-10 text-sm text-gray-500 dark:text-gray-400">
            {format(parseISO(frontMatter.date), 'MMMM dd, yyyy')}
          </p>
          <div className="prose dark:prose-dark">
            <MDXRemote {...source} components={components} />
          </div>
        </article>
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params, locale, locales, defaultLocale }) => {
  const postFilePath = path.join(getLocalisedPostPath(locale), `${params.slug}.mdx`);
  const morePostsInfo = getPostsInfo(locale, locales, defaultLocale);
  const source = fs.readFileSync(postFilePath);

  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        rehypeCodeTitles,
        rehypePrism,
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ['anchor'],
            },
          },
        ],
      ],
      format: 'mdx',
    },
    scope: data,
  });

  return {
    props: {
      suggestedPostsInfo: morePostsInfo,
      source: mdxSource,
      frontMatter: data,
      ...(await serverSideTranslations(locale, ['common']))
    },
  };
};

export const getStaticPaths: GetStaticPaths = async ({locales}) => {
  let paths = [];

  locales.map((locale) => {
    paths = paths.concat(getAllLocalePostUrlNames(locale)
        // Map the path into the static paths object required by Next.js
        .map((slug) => ({ params: { slug }, locale })));
  })

  return {
    paths,
    fallback: false,
  };
};

export default PostPage;
