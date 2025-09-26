import { FaDiscord, FaTwitch, FaTwitter, FaYoutube } from "react-icons/fa";

export const NAV_ITEMS = [
  { label: "home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Features", href: "#nexus" },
  { label: "Story", href: "#story" },
  { label: "Contact", href: "#contact" },
] as const;

export const LINKS = {
  sourceCode: "https://github.com/sanidhyy/game-website",
} as const;

export const SOCIAL_LINKS = [
  {
    href: "https://discord.com",
    icon: FaDiscord,
  },
  {
    href: "https://twitter.com",
    icon: FaTwitter,
  },
  {
    href: "https://youtube.com",
    icon: FaYoutube,
  },
  {
    href: "https://twitch.com",
    icon: FaTwitch,
  },
] as const;

export const VIDEO_LINKS = {
  feature1:
    "/videos/img/mjolinr.jpg",
  feature2:
    "/videos/img/strombreaker.png",
  feature3:
    "/videos/img/bifrost.png",
  feature4:
    "/videos/img/loki.png",
  feature5:
    "/videos/thor.mp4",
  hero1:
    "/videos/herothor.mp4",
  hero2:
    "https://93w95scdts.ufs.sh/f/AOfILeWJzqCcLjP2Y7QEQuN5THDwzeBx4OvmaFZjP6ysCKk3",
  hero3:
    "https://93w95scdts.ufs.sh/f/AOfILeWJzqCcpmpmzmuj1IHWSEokgRuN2hMcUpBq0xQery3i",
  hero4:
    "https://93w95scdts.ufs.sh/f/AOfILeWJzqCcpB0GHsouj1IHWSEokgRuN2hMcUpBq0xQery3",
} as const;
