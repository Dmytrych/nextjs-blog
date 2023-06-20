import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import React, {useEffect} from 'react';
import '../styles/globals.css';
import Script from "next/script";
import {useRouter} from "next/router";
import * as gtag from "../lib/gtag"
import {appWithTranslation} from "next-i18next";

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  const router = useRouter();

  if (process.env.NEXT_PUBLIC_DISABLE_GOOGLE_ANALYTICS === "false"){
    useEffect(() => {
      const handleRouteChange = (url) => {
        gtag.pageview(url);
      };

      router.events.on("routeChangeComplete", handleRouteChange);

      return () => {
        router.events.off("routeChangeComplete", handleRouteChange);
      };
    }, [router.events]);
  }

  return (
    <>
        {process.env.NEXT_PUBLIC_DISABLE_GOOGLE_ANALYTICS === "false" && (<>
          <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6281606897577273"
            crossOrigin="anonymous"
            strategy="beforeInteractive"
          />
          <Script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-XC84ZYE7YF"
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
            
              gtag('config', 'G-XC84ZYE7YF', {
                page_path: window.location.pathname
              });`,
            }}
          />
        </>)}
        <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
            <Component {...pageProps} />
        </ThemeProvider>
    </>
  );
};

export default appWithTranslation(MyApp);
