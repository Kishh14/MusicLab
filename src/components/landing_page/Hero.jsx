import { curve, heroBackground, robot } from "../../assets";
import Button from "./Button";
import Section from "./Section";
import { BackgroundCircles, Gradient } from "../design/Hero";
import { heroIcons } from "../../constants";
import { ScrollParallax } from "react-just-parallax";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Generating from "./Generating";

const Hero = () => {
  const parallaxRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Section
      className="pt-[12rem] -mt-[5.25rem]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <div className="container relative" ref={parallaxRef}>
        <div
          className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]"
          style={{ backdropFilter: "blur(7px" }}
        >
          <h1 className="h1 mb-6">
            Make Music Together, Anywhere, Anytime with {` `}
            <span className="inline-block relative">
              MusicLab{" "}
              <img
                src={curve}
                className="absolute top-full left-0 w-full xl:-mt-2"
                width={624}
                height={28}
                alt="Curve"
              />
            </span>
          </h1>
          <p className="body-1 max-w-3xl mx-auto mb-6 text-n-2 lg:mb-8">
            Experience the future of music collaboration with MusicLab, where
            musicians come together in real-time to create, compose, and
            innovate.
          </p>
          <Button
            href={isLoggedIn ? "/home" : "/signup"}
            white
            className={"mb-7"}
          >
            Get started
          </Button>
        </div>
        <div className="relative max-w-[23rem] mx-auto md:max-w-5xl xl:mb-24">
          <div className="relative z-1 p-0.5 rounded-2xl bg-conic-gradient">
            <div className="relative bg-n-8 rounded-[1rem]">
              <div className="h-[1.4rem] bg-n-10 rounded-t-[0.9rem]" />

              <div className="aspect-[33/40] rounded-b-[0.9rem] overflow-hidden md:aspect-[688/490] lg:aspect-[1024/490]">
                <img
                  src={robot}
                  className="w-full scale-[1.7] translate-y-[8%] md:scale-[1] md:-translate-y-[10%] lg:-translate-y-[23%]"
                  width={1024}
                  height={490}
                  alt="AI"
                />

                <Generating className="absolute left-4 right-4 bottom-5 md:left-1/2 md:right-auto md:bottom-8 md:w-[31rem] md:-translate-x-1/2" />
              </div>
            </div>

            <Gradient />
          </div>
          <div className="absolute -top-[52%] left-1/2 w-[234%] -translate-x-1/2 md:-top-[46%] md:w-[138%] lg:-top-[109%]">
            <img
              src={
                "https://static7.depositphotos.com/1004573/790/v/450/depositphotos_7908005-stock-illustration-musical-vector-background.jpg"
              }
              className="w-full"
              width={1440}
              height={1800}
              alt="hero"
            />
          </div>

          <BackgroundCircles />
        </div>
      </div>
    </Section>
  );
};

export default Hero;
