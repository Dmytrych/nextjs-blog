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
            id="Adsense-id"
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6281606897577273"
            crossOrigin="anonymous"
            strategy="beforeInteractive"
        />
        <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
            <Component {...pageProps} />
        </ThemeProvider>
    </>
  );
};

export default MyApp;
