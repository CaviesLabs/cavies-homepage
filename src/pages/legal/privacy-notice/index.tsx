import type { NextPage } from "next";
import Head from "next/head";
import LegalLayout from "@/src/layouts/legal";

const LegalPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>{`Cavies Labs | Privacy Notice`}</title>
        <meta name="title" content={`Cavies Labs | Privacy Notice`} />
        <meta name="description" content={`Privacy Notice Disclosure`} />
        <meta property="og:title" content={`Cavies Labs | Privacy Notice`} />
        <meta property="og:description" content={`Privacy Notice Disclosure`} />
        <meta
          name="twitter:description"
          content={`Privacy Notice Disclosure`}
        />
        <meta name="twitter:title" content={`Cavies Labs | Privacy Notice`} />
      </Head>
      <LegalLayout slug={["privacy-notice"]} />
    </>
  );
};

export default LegalPage;
