import { Html, Head, Main, NextScript } from "next/document";
import { FC } from "react";
import { SeoComponent } from "@/src/components/seo/seo.component";

const Document: FC = () => {
  return (
    <Html lang={"en"}>
      <Head>
        <SeoComponent />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
