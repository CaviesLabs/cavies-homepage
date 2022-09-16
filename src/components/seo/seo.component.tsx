import { FC } from "react";

export const SeoComponent: FC = () => {
  return (
    <>
      {/* TODO: remove this metatag once we go live */}
      <meta name="robots" content="noindex" />

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
      <meta name="twitter:card" content="summary" />
      <meta property="twitter:url" content="https://cavies.xyz/" />
      <meta
        name="twitter:title"
        content="Cavies Labs | Building towards the future of Web3 Gaming"
      />
      <meta
        name="twitter:description"
        content="We build and contribute to the Web3 gaming landscape using unorthodox and friendly solutions"
      />
      <meta name="twitter:image" content="<banner-link>" />
      <meta
        name="twitter:image:alt"
        content="Cavies Labs | Building towards the future of Web3 Gaming"
      />
      <meta name="robots" content="noindex" />

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
        href="https://cavies.xyz/favicon.ico"
        type="image/x-icon"
      />
      <link rel="manifest" href="https://cavies.xyz/manifest.json" />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css"
      ></link>
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta
        name="msapplication-TileImage"
        content="https://cavies.xyz/assets/icons/ms-icon-144x144.png"
      />
      <meta name="theme-color" content="#ffffff" />

      {/*  Google Analytics */}
      <script
        async={true}
        src="https://www.googletagmanager.com/gtag/js?id=G-RL35P8RT0R"
      />
      <script src="https://cavies.xyz/assets/js/ga.js" />
    </>
  );
};
