'use client';
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useRef } from "react";
import { useNavigate } from "@remix-run/react";

import { Button } from "./button";
import { VIDEO_LINKS } from "../../constants";
import { useLanguage } from "../../contexts/LanguageContext.client";

// let ScrollTrigger: any;
gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)",
      borderRadius: "0 0 40% 10%",
    });

    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0 0 0 0",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  return (
    <section id="hero" className="relative h-dvh w-screen overflow-x-hidden">
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div>
          <video
            ref={videoRef}
            src={VIDEO_LINKS.hero1}
            autoPlay
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover object-center"
          />
        </div>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10 flex justify-start">
            <div className="text-left ml-8 sm:ml-16 md:ml-24">
              <h2 className="special-font hero-heading text-white">
                {t('hero.subtitle')}
              </h2>

              <p className="mb-5 max-w-96 font-robert-regular text-white ml-2">
                {t('hero.description')}
              </p>

              <div className="flex gap-4 mt-6 justify-start">
                <Button
                  containerClass="bg-blue-50 hover:bg-blue-100"
                  onClick={() => navigate('/?builder=true')}
                >
                  Unleash Thunder
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
