import type { AppProps } from "next/app";
import { FC } from "react";

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
      <AppComponent {...{ Component, pageProps }} />
    </>
  );
}

export default MyApp;
