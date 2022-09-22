import { FC } from "react";
import MainLayout from "@/src/layouts/main";

interface Props {
  slug: string[];
}

const LegalLayout: FC<Props> = ({ slug }) => {
  console.log("Page slug", slug);

  return (
    <MainLayout>
      <div className="legal-layout">
        <h1>Cavies Legal Document</h1>
      </div>
    </MainLayout>
  );
};

export default LegalLayout;
