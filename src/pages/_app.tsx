import type { AppProps } from "next/app";
import { FC } from "react";
import Head  from "next/head";

import { SeoComponent } from "@/src/components/seo/seo.component";

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
        <SeoComponent />
      </Head>
      <AppComponent {...{ Component, pageProps }} />
    </>
  );
}

export default MyApp;
