import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { useWindowScroll } from "../../hooks/useWindowScroll";
import { useNavigate } from "@remix-run/react";

import { NAV_ITEMS } from "../../constants";
import { cn } from "../../lib/utils";
import { useLanguage } from "../../contexts/LanguageContext.client";

import { Button } from "./button";
import { LanguageSelector } from "./LanguageSelector";

export const Navbar = () => {
  const navContainerRef = useRef<HTMLDivElement>(null);
  const audioElementRef = useRef<HTMLAudioElement>(null);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(false);

  const { y: currentScrollY } = useWindowScroll();

  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prevAudioPlaying) => !prevAudioPlaying);
    setIsIndicatorActive((prevIndicatorActive) => !prevIndicatorActive);
  };

  useEffect(() => {
    const audioElement = audioElementRef.current;
    if (!audioElement) return;

    // Handle audio loading to prevent abort errors
    const handleLoadStart = () => {
      console.log('Audio loading started');
    };
    
    const handleCanPlay = () => {
      console.log('Audio can play');
    };

    const handleError = (e: Event) => {
      console.warn('Audio error:', e);
    };

    const handleAbort = (e: Event) => {
      console.warn('Audio loading aborted:', e);
    };

    audioElement.addEventListener('loadstart', handleLoadStart);
    audioElement.addEventListener('canplay', handleCanPlay);
    audioElement.addEventListener('error', handleError);
    audioElement.addEventListener('abort', handleAbort);

    return () => {
      audioElement.removeEventListener('loadstart', handleLoadStart);
      audioElement.removeEventListener('canplay', handleCanPlay);
      audioElement.removeEventListener('error', handleError);
      audioElement.removeEventListener('abort', handleAbort);
    };
  }, []);

  useEffect(() => {
    if (isAudioPlaying) void audioElementRef.current?.play();
    else audioElementRef.current?.pause();
  }, [isAudioPlaying]);

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current?.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current?.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current?.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  return (
    <header
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <div className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          <div className="flex items-center gap-7">
            <a href="#hero" className="transition hover:opacity-75">
              <img src="/videos/img/thorlogo.png" alt="Logo" className="w-16" />
            </a>
          </div>

          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {NAV_ITEMS.map(({ label, href }) => (
                <a key={href} href={href} className="nav-hover-btn">
                  {t(`nav.${label.toLowerCase()}`)}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4 ml-10">
              <LanguageSelector />

              <Button
                containerClass="hidden md:block"
                onClick={() => navigate('/?builder=true')}
              >
                {t('nav.getStarted')}
              </Button>
              
              <button
                onClick={toggleAudioIndicator}
                className="ml-4 flex items-center space-x-1 p-2 transition hover:opacity-75"
                title="Play Audio"
              >
                <audio
                  ref={audioElementRef}
                  src="/audio/loop.mp3"
                  className="hidden"
                  loop
                  preload="metadata"
                  onError={(e) => console.warn('Audio loading error:', e)}
                  onAbort={(e) => console.warn('Audio loading aborted:', e)}
                />

                {Array(4)
                  .fill("")
                  .map((_, i) => {
                    return (
                      <div
                        key={i + 1}
                        className={cn(
                          "indicator-line",
                          isIndicatorActive && "active"
                        )}
                        style={{ animationDelay: `${(i + 1) * 0.1}s` }}
                      />
                    );
                  })}
              </button>


            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};
