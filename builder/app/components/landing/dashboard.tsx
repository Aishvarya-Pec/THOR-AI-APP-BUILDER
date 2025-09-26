'use client';

import { useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { FaGithub, FaExternalLinkAlt, FaCode, FaRocket, FaBolt } from "react-icons/fa";
import { useLanguage } from "../../contexts/LanguageContext.client";

interface DashboardTiltProps {
  className?: string;
  children: React.ReactNode;
}

const DashboardTilt = ({ children, className = "" }: DashboardTiltProps) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current) return;

    const { left, top, width, height } = itemRef.current.getBoundingClientRect();
    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;
    const tiltX = (relativeY - 0.5) * 3;
    const tiltY = (relativeX - 0.5) * -3;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.98, 0.98, 0.98)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4 hover:border-blue-500/50 transition-all duration-300">
    <div className="flex items-center gap-3 mb-2">
      <div className="text-blue-400 text-xl">{icon}</div>
      <h4 className="font-semibold text-white">{title}</h4>
    </div>
    <p className="text-gray-300 text-sm">{description}</p>
  </div>
);

export const Dashboard = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: <FaBolt />,
      title: "Multi-LLM Support",
      description: "OpenAI, Anthropic, Ollama, Gemini, Groq & more"
    },
    {
      icon: <FaCode />,
      title: "Full-Stack Development",
      description: "Complete web applications in your browser"
    },
    {
      icon: <FaRocket />,
      title: "Instant Deployment",
      description: "Deploy directly from chat to production"
    }
  ];

  return (
    <section className="bg-black py-20">
      <div className="container mx-auto px-3 md:px-10">
        <div className="text-center mb-16">
          <h2 className="font-zentry text-4xl md:text-6xl font-black text-white mb-4">
            {t('dashboard.title')}
          </h2>
          <p className="font-circular-web text-lg text-blue-50 opacity-70 max-w-2xl mx-auto">
            {t('dashboard.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Main Dashboard Card */}
          <DashboardTilt className="order-2 lg:order-1">
            <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-8 hover:border-blue-400/50 transition-all duration-500">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <FaBolt className="text-white text-2xl" />
                </div>
                <div>
                  <h3 className="font-zentry text-2xl font-bold text-white">Thor.dev</h3>
                  <p className="text-blue-300 font-medium">AI-Powered Development</p>
                </div>
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed">
                {t('dashboard.description')}
              </p>

              <div className="grid grid-cols-1 gap-4 mb-8">
                {features.map((feature, index) => (
                  <FeatureCard
                    key={index}
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                  />
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://github.com/thor-dev/thor.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-all duration-300 font-medium"
                >
                  <FaGithub className="text-lg" />
                  View on GitHub
                </a>
                <a
                  href="https://thor.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-6 py-3 rounded-lg transition-all duration-300 font-medium"
                >
                  <FaExternalLinkAlt className="text-sm" />
                  Try Live Demo
                </a>
              </div>
            </div>
          </DashboardTilt>

          {/* Stats & Info */}
          <DashboardTilt className="order-1 lg:order-2">
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 backdrop-blur-sm border border-green-500/30 rounded-xl p-6">
                <h4 className="font-zentry text-xl font-bold text-white mb-3">
                  {t('dashboard.stats.title')}
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">8+</div>
                    <div className="text-sm text-gray-400">LLM Providers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">∞</div>
                    <div className="text-sm text-gray-400">Possibilities</div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6">
                <h4 className="font-zentry text-xl font-bold text-white mb-3">
                  {t('dashboard.integration.title')}
                </h4>
                <p className="text-gray-300 text-sm mb-4">
                  {t('dashboard.integration.description')}
                </p>
                <div className="flex flex-wrap gap-2">
                  {['React', 'Next.js', 'Vue', 'Node.js', 'Python', 'TypeScript'].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-purple-600/20 border border-purple-500/30 rounded-full text-xs text-purple-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-900/20 to-red-900/20 backdrop-blur-sm border border-orange-500/30 rounded-xl p-6">
                <h4 className="font-zentry text-xl font-bold text-white mb-3">
                  {t('dashboard.community.title')}
                </h4>
                <p className="text-gray-300 text-sm">
                  {t('dashboard.community.description')}
                </p>
              </div>
            </div>
          </DashboardTilt>
        </div>
      </div>
    </section>
  );
};