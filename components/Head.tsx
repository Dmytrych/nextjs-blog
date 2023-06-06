import NextHead from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { MetaProps } from '../types/layout';

const Head = ({ customMeta }: { customMeta?: MetaProps }): JSX.Element => {
  const router = useRouter();
  const meta: MetaProps = {
    title: 'Dmytro Habaznia - Website',
    description:
      'Web developer from Kyiv, Ukraine',
    //image: `${process.env.NEXT_HOST}/images/site-preview.png`,
    type: 'website',
    ...customMeta,
  };

  return (
    <NextHead>
      <title>{meta.title}</title>
      <link rel="icon" href="/favicon.ico" type="image/x-icon"/>
      <link rel="apple-touch-icon" href="/favicon.ico" />
      <meta content={meta.description} name="description" />
      <meta property="og:url" content={`${process.env.NEXT_PUBLIC_HOST}${router.asPath}`} />
      <link rel="canonical" href={`${process.env.NEXT_PUBLIC_HOST}${router.defaultLocale}${router.asPath}`} />
      {router.locales.map((locale) => <link key={locale} rel="alternate" hrefLang={locale} href={`${process.env.NEXT_PUBLIC_HOST}${locale}${router.asPath}`} />)}
      <link rel="alternate" hrefLang="x-default" href={`${process.env.NEXT_PUBLIC_HOST}${router.defaultLocale}${router.asPath}`} />
      <meta property="og:type" content={meta.type} />
      <meta property="og:site_name" content="Dmytro Habaznia - Website" />
      <meta property="og:description" content={meta.description} />
      <meta property="og:title" content={meta.title} />
      {/*<meta property="og:image" content={meta.image} />*/}
      {meta.date && (
        <meta property="article:published_time" content={meta.date} />
      )}
    </NextHead>
  );
};

export default Head;
