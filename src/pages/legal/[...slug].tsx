import type { NextPage } from "next";
import { useRouter } from "next/router";
import LegalLayout from "@/src/layouts/legal";

const LegalPage: NextPage = () => {
  const router = useRouter();

  return <LegalLayout slug={(router.query.slug as string[]) || []} />;
};

export default LegalPage;
