import type { AppProps } from "next/app";
import { FC } from "react";
import { CookieConnsentComponent } from "@/src/components/cookie-consent";
import { ThemeProvider } from "next-themes";

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
      <ThemeProvider>
        <AppComponent {...{ Component, pageProps }} />
        <CookieConnsentComponent />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
