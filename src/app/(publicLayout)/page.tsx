import HeroSection from "@/components/shered/HeroSection/HeroSection";
import AboutUs from "@/components/shered/AboutUs/AboutUs";
import Services from "@/components/shered/Services/Services";
import DonationTips from "@/components/shered/DonationTips/DonationTips";
import Donors from "@/components/shered/Donors/Donors";
import Reviews from "@/components/shered/Reviews/Reviews";


const PublicLayoutPage = () => {
  return (
    <>
      <HeroSection />
      <DonationTips />
      <Donors />
      <AboutUs />
      <Services />
      <Reviews />
    </>
  );
};

export default PublicLayoutPage;