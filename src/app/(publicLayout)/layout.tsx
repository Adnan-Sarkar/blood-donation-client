import Navbar from "@/components/shered/Navbar/Navbar";
import { TComponentProps } from "@/types/componentProps-types";
import Footer from "@/components/shered/Footer/Footer";


const PublicLayout = ({children}: TComponentProps) => {
  return (
    <>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default PublicLayout;