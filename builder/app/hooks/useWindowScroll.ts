import { useState, useEffect } from "react";

export const useWindowScroll = () => {
  const [state, setState] = useState({
    x: typeof window !== "undefined" ? window.pageXOffset : 0,
    y: typeof window !== "undefined" ? window.pageYOffset : 0,
  });

  useEffect(() => {
    const handler = () => {
      setState({
        x: window.pageXOffset,
        y: window.pageYOffset,
      });
    };

    window.addEventListener("scroll", handler, {
      capture: false,
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, []);

  return state;
};