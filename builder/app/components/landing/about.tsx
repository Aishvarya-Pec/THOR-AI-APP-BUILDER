"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { AnimatedTitle } from "./animated-title";
import { useLanguage } from "../../contexts/LanguageContext.client";

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const { t } = useLanguage();
  
  useGSAP(() => {
    // Create a context for this component's animations
    const ctx = gsap.context(() => {
      // Enhanced clip animation for the image reveal with multiple stages
      const clipAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: "#clip",
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1.2,
          markers: false,
          refreshPriority: 1,
        },
      });

      // Stage 1: Initial reveal with smooth clip-path transition
      clipAnimation
        .fromTo(".mask-clip-path",
          {
            clipPath: "polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)",
            borderRadius: "0 0 40% 10%",
          },
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            borderRadius: "0 0 0 0",
            duration: 0.6,
            ease: "power2.out",
          }
        )
        .fromTo(".about-image img",
          {
            scale: 0.8,
            opacity: 0.7,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
          },
          "<"
        )
        // Stage 2: Remove filter effects to prevent greyish appearance
        .to(".about-image img", {
          scale: 1.02,
          duration: 0.4,
          ease: "power1.inOut",
        }, "-=0.2");

      // Parallax effect for the image
      gsap.to(".about-image img", {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: "#clip",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          refreshPriority: 0,
        }
      });
    });

    // Cleanup function
    return () => {
      ctx.revert();
    };
  });

  return (
    <div id="about" className="min-h-screen w-screen bg-black text-white">
      <div className="relative mb-8 pt-36 flex flex-col items-center gap-5">
        <AnimatedTitle containerClass="mt-5 !text-white text-center">
          {t('about.title')}
        </AnimatedTitle>

        <div className="about-subtext text-center">
          <p className="font-robert-regular text-blue-200 max-w-2xl text-lg">
            {t('about.description')}
          </p>
        </div>
      </div>

      <div className="h-dvh w-screen relative overflow-hidden" id="clip">
        {/* Background Image with Animation */}
        <div className="mask-clip-path about-image absolute inset-0">
          <img
            src="/videos/img/about.png"
            alt="Background"
            className="absolute left-0 top-0 size-full object-cover"
          />
        </div>

        {/* AI Models Grid - overlay on background image */}
        <div className="absolute inset-0 z-20 flex items-center justify-center px-5 py-16 pointer-events-none">
          <div className="max-w-7xl mx-auto pointer-events-auto">
            {/* OpenRouter Models */}
            <div className="mb-12">
              <h3 className="text-5xl font-bold text-center mb-8 font-zentry text-blue-50">
                ☁️ OpenRouter Models (Cloud)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-black/90 backdrop-blur-md border border-thor-elements-borderColor/40 rounded-xl p-6 hover:border-blue-400/60 hover:bg-black transition-all duration-300 hover:transform hover:scale-105 shadow-2xl group">
                  <div className="flex items-center mb-4">
                    <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mr-4 shadow-lg shadow-blue-500/30"></div>
                    <div className="text-xl font-bold font-zentry text-blue-50 group-hover:text-blue-300 transition-colors">Gemini 2.0 Flash</div>
                  </div>
                  <div className="text-sm font-robert-regular text-thor-elements-textSecondary leading-relaxed">Landing pages & creative content generation</div>
                  <div className="mt-3 flex items-center text-xs text-blue-400 font-medium">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
                    Cloud Optimized
                  </div>
                </div>
                <div className="bg-black/90 backdrop-blur-md border border-thor-elements-borderColor/40 rounded-xl p-6 hover:border-green-400/60 hover:bg-black transition-all duration-300 hover:transform hover:scale-105 shadow-2xl group">
                  <div className="flex items-center mb-4">
                    <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-green-600 rounded-full mr-4 shadow-lg shadow-green-500/30"></div>
                    <div className="text-xl font-bold font-zentry text-blue-50 group-hover:text-green-300 transition-colors">Grok 4 Fast</div>
                  </div>
                  <div className="text-sm font-robert-regular text-thor-elements-textSecondary leading-relaxed">Quick tasks & instant responses</div>
                  <div className="mt-3 flex items-center text-xs text-green-400 font-medium">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                    Lightning Fast
                  </div>
                </div>
                <div className="bg-black/90 backdrop-blur-md border border-thor-elements-borderColor/40 rounded-xl p-6 hover:border-purple-400/60 hover:bg-black transition-all duration-300 hover:transform hover:scale-105 shadow-2xl group">
                  <div className="flex items-center mb-4">
                    <div className="w-4 h-4 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full mr-4 shadow-lg shadow-purple-500/30"></div>
                    <div className="text-xl font-bold font-zentry text-blue-50 group-hover:text-purple-300 transition-colors">DeepSeek V3</div>
                  </div>
                  <div className="text-sm font-robert-regular text-thor-elements-textSecondary leading-relaxed">Complex analysis & heavy computation</div>
                  <div className="mt-3 flex items-center text-xs text-purple-400 font-medium">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></span>
                    Maximum Power
                  </div>
                </div>
              </div>
            </div>

            {/* Ollama Models */}
            <div className="mb-16">
              <h3 className="text-5xl font-bold text-center mb-8 font-zentry text-blue-50">
                🖥️ Ollama Models (Local)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-black/90 backdrop-blur-md border border-thor-elements-borderColor/40 rounded-xl p-6 hover:border-indigo-400/60 hover:bg-black transition-all duration-300 hover:transform hover:scale-105 shadow-2xl group">
                  <div className="flex items-center mb-4">
                    <div className="w-4 h-4 bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-full mr-4 shadow-lg shadow-indigo-500/30"></div>
                    <div className="text-xl font-bold font-zentry text-blue-50 group-hover:text-indigo-300 transition-colors">Qwen 2.5 Coder 7B</div>
                  </div>
                  <div className="text-sm font-robert-regular text-thor-elements-textSecondary leading-relaxed">Full-stack development & coding</div>
                  <div className="mt-3 flex items-center text-xs text-indigo-400 font-medium">
                    <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2 animate-pulse"></span>
                    Code Master
                  </div>
                </div>
                <div className="bg-black/90 backdrop-blur-md border border-thor-elements-borderColor/40 rounded-xl p-6 hover:border-orange-400/60 hover:bg-black transition-all duration-300 hover:transform hover:scale-105 shadow-2xl group">
                  <div className="flex items-center mb-4">
                    <div className="w-4 h-4 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full mr-4 shadow-lg shadow-orange-500/30"></div>
                    <div className="text-xl font-bold font-zentry text-blue-50 group-hover:text-orange-300 transition-colors">Mistral 7B</div>
                  </div>
                  <div className="text-sm font-robert-regular text-thor-elements-textSecondary leading-relaxed">General Q&A & conversational tasks</div>
                  <div className="mt-3 flex items-center text-xs text-orange-400 font-medium">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mr-2 animate-pulse"></span>
                    Versatile AI
                  </div>
                </div>
                <div className="bg-black/90 backdrop-blur-md border border-thor-elements-borderColor/40 rounded-xl p-6 hover:border-teal-400/60 hover:bg-black transition-all duration-300 hover:transform hover:scale-105 shadow-2xl group">
                  <div className="flex items-center mb-4">
                    <div className="w-4 h-4 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full mr-4 shadow-lg shadow-teal-500/30"></div>
                    <div className="text-xl font-bold font-zentry text-blue-50 group-hover:text-teal-300 transition-colors">CodeLlama 7B</div>
                  </div>
                  <div className="text-sm font-robert-regular text-thor-elements-textSecondary leading-relaxed">UI/UX development & design</div>
                  <div className="mt-3 flex items-center text-xs text-teal-400 font-medium">
                    <span className="w-2 h-2 bg-teal-400 rounded-full mr-2 animate-pulse"></span>
                    Design Expert
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
