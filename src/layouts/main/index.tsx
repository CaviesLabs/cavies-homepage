import { Head } from "next/document";
import { FC, ReactNode } from "react";
import Header from "@/src/components/header";
import Footer from "@/src/components/footer";

interface Props {
  children: ReactNode;
}

const MainLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <>
        <Head>
          {/* Primary meta tags*/}
          <title>Cavies | TRANSFORM THE FUTURE OF WEB3 GAMING</title>
          <meta name="title" content="Cavies | TRANSFORM THE FUTURE OF WEB3 GAMING" />
          <meta name="description"
                content="UNORTHODOX WEB3 GAMING INFRASTRUCTURE - Building towards mass adoption of blockchain-enabled games - the friendly way" />

          {/* For OpenGraph/Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://cavies.xyz/" />
          <meta property="og:title" content="Cavies | TRANSFORM THE FUTURE OF WEB3 GAMING" />
          <meta property="og:description" content="UNORTHODOX WEB3 GAMING INFRASTRUCTURE - Building towards mass adoption of blockchain-enabled games - the friendly way" />
          <meta property="og:image" content="https://cavies.xyz/assets/images/hamster-top-c.png" />

          {/* For Twitter */}
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://cavies.xyz/" />
          <meta property="twitter:title" content="Cavies | TRANSFORM THE FUTURE OF WEB3 GAMING" />
          <meta property="twitter:description" content="UNORTHODOX WEB3 GAMING INFRASTRUCTURE - Building towards mass adoption of blockchain-enabled games - the friendly way" />
          <meta property="twitter:image" content="https://cavies.xyz/assets/images/hamster-top-c.png" />
        </Head>
      </>
      <div className="main-layout">
        <Header />
        <div className="content-wrapper">{children}</div>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
