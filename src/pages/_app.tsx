import type { AppProps } from "next/app";
import { FC } from "react";
import Script from "next/script";
import Head from "next/head";

import "../../styles/globals.css";
import "../../styles/globals.scss";

const AppComponent: FC<{ Component: any; pageProps: any }> = ({
  Component,
  pageProps,
}) => {
  return <Component {...pageProps} />;
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* TODO: remove this metatag once we go live */}
        <meta name="robots" content="noindex" />

        <html lang="en" />

        {/* Primary meta tags*/}
        <title>Cavies Labs | Transform the future of Web3 Gaming</title>
        <meta
          name="keywords"
          content="cavies,web3,gamefi,crypto,unorthodox,infrastructure,multichain,btc,eth,solana,polygon,unorthodox infrastructure,blockchain,web3 gaming"
        />
        <meta
          name="title"
          content="Cavies Labs | Transform the future of Web3 Gaming"
        />
        <meta
          name="description"
          content="We build a friendly way toward mass adoption of blockchain-enabled games - an unorthodox Web3 gaming infrastructure"
        />

        {/* For OpenGraph/Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cavies.xyz/" />
        <meta
          property="og:title"
          content="Cavies Labs | Transform the future of Web3 Gaming"
        />
        <meta
          property="og:description"
          content="We build a friendly way toward mass adoption of blockchain-enabled games - an unorthodox Web3 gaming infrastructure"
        />
        <meta
          property="og:image"
          content="https://cavies.xyz/assets/images/hamster-top-c.png"
        />
        <meta
          property="og:image:alt"
          content="Cavies Labs | Transform the future of Web3 Gaming"
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:locale:alternate" content="en_GB" />

        {/* For Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://cavies.xyz/" />
        <meta
          property="twitter:title"
          content="Cavies Labs | Transform the future of Web3 Gaming"
        />
        <meta
          property="twitter:description"
          content="We build a friendly way toward mass adoption of blockchain-enabled games - an unorthodox Web3 gaming infrastructure"
        />
        <meta
          property="twitter:image"
          content="https://cavies.xyz/assets/images/hamster-top-c.png"
        />

        {/*  Icon stuffs */}
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="https://cavies.xyz/assets/icons/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="https://cavies.xyz/assets/icons/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="https://cavies.xyz/assets/icons/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="https://cavies.xyz/assets/icons/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="https://cavies.xyz/assets/icons/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="https://cavies.xyz/assets/icons/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="https://cavies.xyz/assets/icons/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="https://cavies.xyz/assets/icons/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="https://cavies.xyz/assets/icons/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="https://cavies.xyz/assets/icons/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="https://cavies.xyz/assets/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="https://cavies.xyz/assets/icons/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="https://cavies.xyz/assets/icons/favicon-16x16.png"
        />
        <link
          rel="icon"
          href="https://cavies.xyz/assets/icons/favicon.ico"
          type="image/x-icon"
        />
        <link rel="manifest" href="https://cavies.xyz/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta
          name="msapplication-TileImage"
          content="https://cavies.xyz/assets/icons/ms-icon-144x144.png"
        />
        <meta name="theme-color" content="#ffffff" />

        {/*  Google Analytics */}
        <Script
          async={true}
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-RL35P8RT0R"
        />
        <Script strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-RL35P8RT0R');`}
        </Script>
      </Head>
      <AppComponent {...{ Component, pageProps }} />
    </>
  );
}

export default MyApp;
