import type { NextPage } from "next";
import Head from "next/head";
import LegalLayout from "@/src/layouts/legal";

const LegalPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>{`Cavies Labs | Legal Notice`}</title>
        <meta name="title" content={`Cavies Labs | Legal Notice`} />
        <meta name="description" content={`Legal Notice Disclosure`} />
        <meta property="og:title" content={`Cavies Labs | Legal Notice`} />
        <meta property="og:description" content={`Legal Notice Disclosure`} />
        <meta name="twitter:description" content={`Legal Notice Disclosure`} />
        <meta name="twitter:title" content={`Cavies Labs | Legal Notice`} />
      </Head>
      <LegalLayout slug={["legal-notice"]} />
    </>
  );
};

export default LegalPage;
