import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import React from 'react';
import '../styles/globals.css';
import Script from "next/script";

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <>
        <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6281606897577273"
            crossOrigin="anonymous"
            strategy="beforeInteractive"
        />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-86D2228H6F"
          strategy="beforeInteractive"
        />
        <Script
          id='google-analytics'
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
  
            gtag('config', 'G-86D2228H6F');`,
          }}
        />
        <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
            <Component {...pageProps} />
        </ThemeProvider>
    </>
  );
};

export default MyApp;
