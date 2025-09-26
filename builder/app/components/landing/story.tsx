import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import * as gsapAll from "gsap/all";
const { ScrollTrigger } = gsapAll;

gsap.registerPlugin(ScrollTrigger);

const Story = () => {
  const frameRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const element = frameRef.current;
    const container = containerRef.current;
    if (!element || !container) return;

    // Initial setup - keep rectangle shape always
    gsap.set(element, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0px",
      scale: 0.8,
      rotation: 0,
      opacity: 0.7,
    });

    // Create animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1,
        markers: false,
      },
    });

    // Animate the image reveal - keep rectangle shape
    tl.to(element, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0px",
      scale: 1,
      rotation: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.out",
    })
    .to(element, {
      borderRadius: "0px",
      scale: 1.02,
      rotation: 0,
      duration: 0.5,
      ease: "power1.inOut",
    }, "-=0.3")
    .to(element, {
      borderRadius: "0px",
      scale: 1,
      rotation: 0,
      duration: 0.5,
      ease: "power1.inOut",
    });

    // Floating animation - minimal movement
    gsap.to(element, {
      y: "+=5",
      duration: 3,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
    });

    // Remove all filter effects to prevent greyish appearance
  }, []);

  return (
    <div id="story" className="min-h-dvh w-screen bg-black text-blue-50 relative">
      {/* Full screen background image with overlay text */}
      <div className="story-img-container" ref={containerRef}>
        <div className="story-img-mask">
          <div className="story-img-content">
            <img
              ref={frameRef}
              src="/videos/img/happy.png"
              alt="Happy Thor.dev"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content overlay - positioned on the image */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-start pt-20 px-5 py-16">
          <p className="font-general text-sm uppercase md:text-[10px] mb-4">
            the ultimate development experience
          </p>

          <div className="text-center">
            <h1 className="font-zentry text-4xl font-black text-blue-50 sm:text-5xl md:text-6xl lg:text-7xl mx-auto mb-6">
              the st<b>o</b>ry of <br /> full st<b>a</b>ck mastery
            </h1>

            <p className="max-w-sm text-violet-50 md:max-w-md mx-auto font-robert-regular leading-relaxed">
              Where innovation meets creation, lies Thor.dev and the power of AI.
              Forge your applications with divine precision and shape the future of
              development.
            </p>
          </div>
        </div>

        <svg
          className="invisible absolute size-0"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="flt_tag">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="8"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                result="flt_tag"
              />
              <feComposite
                in="SourceGraphic"
                in2="flt_tag"
                operator="atop"
              />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default Story;
