import Navbar from "@/components/shered/Navbar/Navbar";
import { TComponentProps } from "@/types/componentProps-types";


const PublicLayout = ({children}: TComponentProps) => {
  return (
    <>
      <Navbar />
      <div>{children}</div>
    </>
  );
};

export default PublicLayout;