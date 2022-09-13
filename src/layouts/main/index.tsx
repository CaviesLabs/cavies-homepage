import { FC, ReactNode } from "react";
import Header from "@/src/components/header";
import Footer from "@/src/components/footer";

interface Props {
  children: ReactNode;
}

const MainLayout: FC<Props> = ({ children }) => {
  return (
    <div className="main-layout">
      <Header />
      <div className="content-wrapper">{children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
