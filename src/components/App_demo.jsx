import Header from './Header';
import Hero from './Hero';
import Benefits from './Benefits';
import Services from './Services';
import Pricing from './Pricing';
import Roadmap from './Roadmap';
import Footer from './Footer';
import ButtonGradient from '../assets/svg/ButtonGradient'
const App_demo = () => {
  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header />
        <Hero />
        <Benefits />
        {/* <Collaboration /> */}
        <Services />
        <Pricing />
        <Roadmap />
        <Footer />
      </div>

      <ButtonGradient />
    </>
  );
}
export default App_demo;