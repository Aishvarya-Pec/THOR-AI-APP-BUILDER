import gsap from "gsap";
import React, { useEffect, useRef } from "react";

import { cn } from "../../lib/utils";

interface AnimatedTitleProps {
  containerClass?: string;
  children: React.ReactNode;
}

export const AnimatedTitle: React.FC<AnimatedTitleProps> = ({
  children,
  containerClass,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none reverse",
          refreshPriority: 1, // Higher priority for text animations
        },
      });

      titleAnimation.to(".animated-word", {
        opacity: 1,
        transform: "translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)",
        ease: "power2.inOut",
        stagger: 0.02,
        duration: 0.8,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const content = children?.toString() || '';
  const lines = content.split('<br />');

  return (
    <div ref={containerRef} className={cn("animated-title", containerClass)}>
      {lines.map((line, lineIndex) => (
        <h1
          key={lineIndex}
          className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3"
        >
          <span
            className="animated-word"
            dangerouslySetInnerHTML={{ __html: line }}
          />
        </h1>
      ))}
    </div>
  );
};
