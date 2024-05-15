import Header from "../components/landing_page/Header";
import Hero from "../components/landing_page/Hero";
import Benefits from "../components/landing_page/Benefits";
import Services from "../components/landing_page/Services";
import Roadmap from "../components/landing_page/Roadmap";
import Footer from "../components/landing_page/Footer";
import ButtonGradient from "../assets/svg/ButtonGradient";

const LandingPage = () => {
  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header />
        <Hero />
        <Benefits />
        <Services />
        <Roadmap />
        <Footer />
      </div>

      <ButtonGradient />
    </>
  );
};

export default LandingPage;
