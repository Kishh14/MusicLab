import Header from "../components/landing_page/Header";
import Hero from "../components/landing_page/Hero";
import Benefits from "../components/landing_page/Benefits";
import Services from "../components/landing_page/Services";
import Pricing from "../components/landing_page/Pricing";
import Roadmap from "../components/landing_page/Roadmap";
import Footer from "../components/landing_page/Footer";
import ButtonGradient from "../assets/svg/ButtonGradient";

const App_demo = () => {
  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header />
        <Hero />
        <Benefits />
        <Services />
        <Pricing />
        <Roadmap />
        <Footer />
      </div>

      <ButtonGradient />
    </>
  );
};

export default App_demo;
