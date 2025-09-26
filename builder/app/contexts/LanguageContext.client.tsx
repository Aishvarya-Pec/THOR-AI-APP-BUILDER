// Trivial change to force re-evaluation
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'ru' | 'zh' | 'ja' | 'ko' | 'ar' | 'hi';

interface LanguageContextClientType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContextClient = createContext<LanguageContextClientType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContextClient);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language') as Language;
      if (savedLanguage && ['en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'ko', 'ar', 'hi'].includes(savedLanguage)) {
        setLanguage(savedLanguage);
      }
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    const translations = getTranslations(language);
    const keys = key.split('.');
    let value: any = translations;
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return (
    <LanguageContextClient.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContextClient.Provider>
  );
};

const getTranslations = (lang: Language): Record<string, any> => {
  const translations: Record<Language, Record<string, any>> = {
    en: {
      nav: {
        home: "Home",
        about: "About",
        features: "Features",
        story: "Story",
        contact: "Contact",
        getStarted: "Get Started"
      },
      hero: {
        title: "THOR.DEV",
        subtitle: "THOR",
        description: "Build complete applications and projects with AI assistance. From concept to deployment - your intelligent development companion.",
        playNow: "Builder",
        watchTrailer: "Unleash Thunder"
      },
      about: {
        title: "Build <b>Anything</b>, Create <br /> <b>Everything</b> with AI",
        description: "From simple websites to complex applications - THOR.DEV uses AI to help you create, build, and deploy projects faster than ever before."
      },
      features: {
        title: "AI Builder Arsenal",
        description: "Experience the ultimate AI-powered development environment with intelligent project creation, smart code generation, and automated deployment.",
        mjolnir: {
          title: "Mjölnir",
          description: "AI-powered project scaffolding that creates complete application structures with smart templates, configurations, and best practices."
        },
        stormbreaker: {
          title: "Stormbreaker", 
          description: "Advanced AI code generation with real-time assistance, smart suggestions, and intelligent completion across all frameworks."
        },
        bifrost: {
          title: "Bifrost",
          description: "Automated deployment pipeline that handles building, testing, and deploying your applications with zero configuration."
        },
        loki: {
          title: "Loki",
          description: "Seamless support for React, Vue, Angular, Node.js, Python, Java, and more - build any type of application with AI guidance."
        },
        comingSoon: "More coming soon!"
      },
      dashboard: {
        title: "AI Development Dashboard",
        subtitle: "Experience the power of Thor.dev - an AI-powered full-stack development platform that brings the future of coding to your browser.",
        description: "Thor.dev is a revolutionary AI-powered web development agent that allows you to prompt, run, edit, and deploy full-stack applications directly from your browser. With support for multiple LLM providers and complete environment control, it's the ultimate development companion.",
        stats: {
          title: "Platform Stats"
        },
        integration: {
          title: "Tech Integration",
          description: "Seamlessly works with modern frameworks and technologies"
        },
        community: {
          title: "Open Source",
          description: "Join the community building the future of AI-powered development"
        }
      },
      contact: {
        title: "Let's b<b>u</b>ild the f<b>u</b>ture <br /> of AI-p<b>o</b>wered <br /> devel<b>o</b>pment t<b>o</b>gether",
        button: "Contact Us"
      }
    },
    es: {
      nav: {
        home: "Inicio",
        about: "Acerca de",
        features: "Características",
        contact: "Contacto",
        getStarted: "Empezar a Codificar"
      },
      hero: {
        title: "THOR.DEV",
        subtitle: "THOR",
        description: "Construisez des applications et projets complets avec l'assistance AI. Du concept au déploiement - votre compagnon de développement intelligent.",
        playNow: "Commencer à Construire",
        watchTrailer: "Commencer à Construire"
      },
      about: {
        title: "Construisez <b>N'importe Quoi</b>, Créez <br /> <b>Tout</b> avec AI",
        description: "Des sites web simples aux applications complexes - THOR.DEV utilise l'AI pour vous aider à créer, construire et déployer des projets plus rapidement que jamais."
      },
      features: {
        title: "Arsenal del Desarrollador",
        description: "Experimenta el entorno de codificación definitivo con construcción inteligente de proyectos, depuración en tiempo real y soporte multi-lenguaje.",
        mjolnir: {
          title: "Constructor de <b>P</b>royectos",
          description: "Andamiaje inteligente de proyectos y gestión en 11 lenguajes de programación con plantillas y configuraciones inteligentes."
        },
        stormbreaker: {
          title: "Depurador de <b>C</b>ódigo", 
          description: "Herramientas avanzadas de depuración con detección de errores en tiempo real, sugerencias inteligentes y correcciones instantáneas en todos los lenguajes soportados."
        },
        bifrost: {
          title: "Corrector de <b>E</b>rrores",
          description: "Resolución de errores impulsada por IA que detecta, analiza y corrige automáticamente problemas de código con sugerencias inteligentes."
        },
        loki: {
          title: "Multi-<b>L</b>enguaje",
          description: "Support perfecto para desarrollo en Python, JavaScript, Java, C++, C#, Go, Rust, PHP, Ruby, Swift y Kotlin."
        },
        comingSoon: "¡M<b>á</b>s herramientas pr<b>o</b>nto!"
      }
    },
    fr: {
      nav: {
        home: "Accueil",
        about: "À propos",
        features: "Fonctionnalités",
        contact: "Contact",
        getStarted: "Commencer à Coder"
      },
      hero: {
        title: "THOR.DEV",
        subtitle: "thor.dev",
        description: "Construisez, déboguez et corrigez du code dans 11 langages de programmation. Votre compagnon de développement tout-en-un.",
        playNow: "Commencer à Construire",
        watchTrailer: "Voir la Démo"
      },
      about: {
        title: "Construisez <b>N'importe Quoi</b>, Déboguez <br /> <b>Tout</b> en 11 Langages",
        description: "Du concept au déploiement - THOR.DEV gère tout votre flux de travail de développement avec un débogage intelligent en Python, JavaScript, Java, C++, C#, Go, Rust, PHP, Ruby, Swift et Kotlin."
      },
      features: {
        title: "Arsenal du Développeur",
        description: "Découvrez l'environnement de codage ultime avec la construction intelligente de projets, le débogage en temps réel et le support multi-langage.",
        mjolnir: {
          title: "Constructeur de <b>P</b>rojets",
          description: "Échafaudage intelligent de projets et gestion dans 11 langages de programmation avec des modèles et configurations intelligents."
        },
        stormbreaker: {
          title: "Débogueur de <b>C</b>ode", 
          description: "Outils de débogage avancés avec détection d'erreurs en temps réel, suggestions intelligentes et corrections instantanées dans tous les langages supportés."
        },
        bifrost: {
          title: "Correcteur d'<b>E</b>rreurs",
          description: "Résolution d'erreurs alimentée par IA qui détecte, analyse et corrige automatiquement les problèmes de code avec des suggestions intelligentes."
        },
        loki: {
          title: "Multi-<b>L</b>angage",
          description: "Support transparent pour le développement en Python, JavaScript, Java, C++, C#, Go, Rust, PHP, Ruby, Swift et Kotlin."
        },
        comingSoon: "Plus d'<b>o</b>utils bient<b>ô</b>t !"
      },
      contact: {
        title: "Construisons <b>e</b>nsemble<br /> la nouvelle ère du <br /> c<b>o</b>dage",
        button: "Nous Contacter"
      }
    },
    de: {
      nav: {
        home: "Startseite",
        about: "Über uns",
        features: "Features",
        contact: "Kontakt",
        getStarted: "Mit Codieren Beginnen"
      },
      hero: {
         title: "THOR.DEV",
         subtitle: "thor.dev",
        description: "Erstellen Sie vollständige Anwendungen und Projekte mit KI-Unterstützung. Vom Konzept bis zur Bereitstellung - Ihr intelligenter Entwicklungsbegleiter.",
        playNow: "Bauen beginnen",
        watchTrailer: "Bauen beginnen"
      },
      about: {
        title: "Erstellen Sie <b>Alles</b>, Entwickeln Sie <br /> <b>Alles</b> mit KI",
        description: "Von einfachen Websites bis zu komplexen Anwendungen - THOR.DEV nutzt KI, um Ihnen zu helfen, Projekte schneller als je zuvor zu erstellen, zu bauen und bereitzustellen."
      },
      features: {
        title: "KI-Builder-Arsenal",
        description: "Erleben Sie die ultimative KI-gestützte Entwicklungsumgebung mit intelligenter Projekterstellung, smarter Code-Generierung und automatisierter Bereitstellung.",
        mjolnir: {
          title: "Projekt Genesis",
          description: "KI-gestützte Projektgerüste, die vollständige Anwendungsstrukturen mit intelligenten Vorlagen, Konfigurationen und bewährten Praktiken erstellen."
        },
        stormbreaker: {
          title: "Code Forge",
          description: "Erweiterte KI-Code-Generierung mit Echtzeit-Unterstützung, intelligenten Vorschlägen und intelligenter Vervollständigung in allen Frameworks."
        },
        bifrost: {
          title: "Smart Deploy",
          description: "Automatisierte Bereitstellungspipeline, die das Erstellen, Testen und Bereitstellen Ihrer Anwendungen ohne Konfiguration übernimmt."
        },
        loki: {
          title: "Multi-Stack",
          description: "Nahtlose Unterstützung für React, Vue, Angular, Node.js, Python, Java und mehr - erstellen Sie jede Art von Anwendung mit KI-Führung."
        },
        comingSoon: "M<b>e</b>hr KI-T<b>o</b>ols k<b>o</b>mmen bald!"
      },
      contact: {
        title: "Lassen Sie uns g<b>e</b>meinsam<br /> die neue Ära des <br /> C<b>o</b>dierens aufbauen",
        button: "Kontaktieren Sie Uns"
      }
    },
    it: {
      nav: {
        home: "Home",
        about: "Chi Siamo",
        features: "Caratteristiche",
        contact: "Contatto",
        getStarted: "Inizia a Programmare"
      },
      hero: {
         title: "THOR.DEV",
         subtitle: "thor.dev",
        description: "Costruisci applicazioni e progetti completi con l'assistenza AI. Dal concetto al deployment - il tuo compagno di sviluppo intelligente.",
        playNow: "Inizia a Costruire",
        watchTrailer: "Inizia a Costruire"
      },
      about: {
        title: "Costruisci <b>Qualsiasi Cosa</b>, Crea <br /> <b>Tutto</b> con AI",
        description: "Da semplici siti web ad applicazioni complesse - THOR.DEV usa l'AI per aiutarti a creare, costruire e distribuire progetti più velocemente che mai."
      },
      features: {
        title: "Arsenal dello Sviluppatore",
        description: "Sperimenta l'ambiente di codifica definitivo con costruzione intelligente di progetti, debug in tempo reale e supporto multi-linguaggio.",
        mjolnir: {
          title: "Costruttore di <b>P</b>rogetti",
          description: "Scaffolding intelligente di progetti e gestione in 11 linguaggi di programmazione con template e configurazioni intelligenti."
        },
        stormbreaker: {
          title: "Debugger di <b>C</b>odice", 
          description: "Strumenti avanzati di debug con rilevamento errori in tempo reale, suggerimenti intelligenti e correzioni istantanee in tutti i linguaggi supportati."
        },
        bifrost: {
          title: "Correttore di <b>E</b>rrori",
          description: "Risoluzione errori alimentata da IA che rileva, analizza e corregge automaticamente problemi di codice con suggerimenti intelligenti."
        },
        loki: {
          title: "Multi-<b>L</b>inguaggio",
          description: "Supporto perfetto per lo sviluppo in Python, JavaScript, Java, C++, C#, Go, Rust, PHP, Ruby, Swift e Kotlin."
        },
        comingSoon: "Altri str<b>u</b>menti in arriv<b>o</b>!"
      }
    },
    pt: {
      nav: {
        home: "Início",
        about: "Sobre",
        features: "Recursos",
        contact: "Contato",
        getStarted: "Começar a Codificar"
      },
      hero: {
        title: "THOR.DEV",
        subtitle: "Construtor de Projetos e Depurador Definitivo",
        description: "Construa, depure e corrija código em 11 linguagens de programação. Seu companheiro de desenvolvimento tudo-em-um.",
        playNow: "Começar a Construir",
        watchTrailer: "Ver Demo"
      },
      about: {
        title: "Construa <b>Qualquer Coisa</b>, Depure <br /> <b>Tudo</b> em 11 Linguagens",
        description: "De sites simples a aplicações complexas - THOR.DEV usa AI para ajudá-lo a criar, construir e implantar projetos mais rápido do que nunca."
      },
      features: {
        title: "Arsenal do Desenvolvedor",
        description: "Experimente o ambiente de codificação definitivo com construção inteligente de projetos, depuração em tempo real e suporte multi-linguagem.",
        mjolnir: {
          title: "Construtor de <b>P</b>rojetos",
          description: "Scaffolding inteligente de projetos e gerenciamento em 11 linguagens de programação com templates e configurações inteligentes."
        },
        stormbreaker: {
          title: "Code Forge",
          description: "Geração de código AI avançada com assistência em tempo real, sugestões inteligentes e completamento inteligente em todos os frameworks."
        },
        bifrost: {
          title: "Corretor de <b>E</b>rros",
          description: "Resolução de erros alimentada por IA que detecta, analisa e corrige automaticamente problemas de código com sugestões inteligentes."
        },
        loki: {
          title: "Multi-<b>L</b>inguagem",
          description: "Suporte perfeito para desenvolvimento em Python, JavaScript, Java, C++, C#, Go, Rust, PHP, Ruby, Swift e Kotlin."
        },
        comingSoon: "M<b>a</b>is ferramentas em br<b>e</b>ve!"
      },
      contact: {
        title: "Vamos c<b>o</b>nstruir j<b>u</b>ntos<br /> a nova era da <br /> pr<b>o</b>gramação",
        button: "Entre em Contato"
      }
    },
    ru: {
      nav: {
        home: "Главная",
        about: "О нас",
        features: "Возможности",
        contact: "Контакты",
        getStarted: "Начать Программировать"
      },
      hero: {
         title: "THOR.DEV",
         subtitle: "ИИ СТРОИТЕЛЬ ПРИЛОЖЕНИЙ",
        description: "Создавайте полные приложения и проекты с помощью ИИ. От концепции до развертывания - ваш умный спутник разработки.",
        playNow: "Начать Строить",
        watchTrailer: "Начать Строить"
      },
      about: {
        title: "Создавайте <b>Всё</b>, Разрабатывайте <br /> <b>Всё</b> с ИИ",
        description: "От простых сайтов до сложных приложений - THOR.DEV использует ИИ, чтобы помочь вам создавать, строить и развертывать проекты быстрее, чем когда-либо."
      },
      features: {
        title: "Арсенал Разработчика",
        description: "Испытайте идеальную среду программирования с интеллектуальным созданием проектов, отладкой в реальном времени и поддержкой множества языков.",
        mjolnir: {
          title: "Конструктор <b>П</b>роектов",
          description: "Интеллектуальное создание каркаса проектов и управление на 11 языках программирования с умными шаблонами и конфигурациями."
        },
        stormbreaker: {
          title: "Отладчик <b>К</b>ода", 
          description: "Продвинутые инструменты отладки с обнаружением ошибок в реальном времени, умными предложениями и мгновенными исправлениями на всех поддерживаемых языках."
        },
        bifrost: {
          title: "Исправитель <b>О</b>шибок",
          description: "Разрешение ошибок на основе ИИ, которое автоматически обнаруживает, анализирует и исправляет проблемы кода с умными предложениями."
        },
        loki: {
          title: "Мульти-<b>Я</b>зык",
          description: "Безупречная поддержка разработки на Python, JavaScript, Java, C++, C#, Go, Rust, PHP, Ruby, Swift и Kotlin."
        },
        comingSoon: "Б<b>о</b>льше инструментов ск<b>о</b>ро!"
      },
      contact: {
        title: "Давайте с<b>о</b>здадим<br /> новую эру <br /> пр<b>о</b>граммирования в<b>м</b>есте",
        button: "Связаться с Нами"
      }
    },
    zh: {
      nav: {
        home: "首页",
        about: "关于",
        features: "功能",
        contact: "联系",
        getStarted: "开始编程"
      },
      hero: {
         title: "THOR.DEV",
         subtitle: "AI应用构建器",
        description: "使用AI辅助构建完整的应用程序和项目。从概念到部署 - 您的智能开发伙伴。",
        playNow: "开始构建",
        watchTrailer: "开始构建"
      },
      about: {
        title: "构建<b>任何东西</b>，使用AI创建<br /><b>一切</b>",
        description: "从简单网站到复杂应用程序 - THOR.DEV使用AI帮助您比以往更快地创建、构建和部署项目。"
      },
      features: {
        title: "开发者武器库",
        description: "体验终极编码环境，具有智能项目构建、实时调试和多语言支持。",
        mjolnir: {
          title: "项目<b>构</b>建器",
          description: "在11种编程语言中进行智能项目脚手架和管理，具有智能模板和配置。"
        },
        stormbreaker: {
          title: "代码<b>调</b>试器", 
          description: "高级调试工具，具有实时错误检测、智能建议和在所有支持语言中的即时修复。"
        },
        bifrost: {
          title: "错误<b>修</b>复器",
          description: "AI驱动的错误解决方案，自动检测、分析和修复代码问题，提供智能建议。"
        },
        loki: {
          title: "多<b>语</b>言",
          description: "无缝支持Python、JavaScript、Java、C++、C#、Go、Rust、PHP、Ruby、Swift和Kotlin开发。"
        },
        comingSoon: "更<b>多</b>工具即将<b>推</b>出！"
      },
      contact: {
        title: "让我们<b>共</b>同构建<br /> 编程的 <br /> 新<b>时</b>代",
        button: "联系我们"
      }
    },
    ja: {
      nav: {
        home: "ホーム",
        about: "について",
        features: "機能",
        contact: "お問い合わせ",
        getStarted: "コーディングを始める"
      },
      hero: {
         title: "THOR.DEV",
         subtitle: "AIアプリビルダー",
        description: "AIアシスタンスで完全なアプリケーションとプロジェクトを構築。コンセプトからデプロイメントまで - あなたのインテリジェント開発コンパニオン。",
        playNow: "構築を開始",
        watchTrailer: "構築を開始"
      },
      about: {
        title: "<b>何でも</b>構築、AIで<br /><b>すべて</b>を作成",
        description: "シンプルなウェブサイトから複雑なアプリケーションまで - THOR.DEVはAIを使用して、これまで以上に速くプロジェクトを作成、構築、デプロイするお手伝いをします。"
      },
      features: {
        title: "開発者の武器庫",
        description: "インテリジェントなプロジェクト構築、リアルタイムデバッグ、マルチ言語サポートを備えた究極のコーディング環境を体験してください。",
        mjolnir: {
          title: "プロジェクト<b>ビ</b>ルダー",
          description: "スマートテンプレートと設定を使用した11のプログラミング言語でのインテリジェントプロジェクトスキャフォールディングと管理。"
        },
        stormbreaker: {
          title: "コード<b>デ</b>バッガー", 
          description: "リアルタイムエラー検出、スマート提案、サポートされているすべての言語での即座の修正を備えた高度なデバッグツール。"
        },
        bifrost: {
          title: "エラー<b>修</b>正器",
          description: "インテリジェントな提案でコードの問題を自動的に検出、分析、修正するAI駆動のエラー解決。"
        },
        loki: {
          title: "マルチ<b>言</b>語",
          description: "Python、JavaScript、Java、C++、C#、Go、Rust、PHP、Ruby、Swift、Kotlin開発のシームレスなサポート。"
        },
        comingSoon: "さ<b>ら</b>なるツールが間<b>も</b>なく登場！"
      },
      contact: {
        title: "一<b>緒</b>にプログラミングの<br /> 新しい時代を <br /> 築<b>き</b>ましょう",
        button: "お問い合わせ"
      }
    },
    ko: {
      nav: {
        home: "홈",
        about: "소개",
        features: "기능",
        contact: "연락처",
        getStarted: "코딩 시작하기"
      },
      hero: {
         title: "THOR.DEV",
         subtitle: "AI 앱 빌더",
        description: "AI 지원으로 완전한 애플리케이션과 프로젝트를 구축하세요. 개념부터 배포까지 - 당신의 지능형 개발 동반자입니다.",
        playNow: "구축 시작하기",
        watchTrailer: "구축 시작하기"
      },
      about: {
        title: "<b>무엇이든</b> 구축하고, AI로 <br /><b>모든 것</b>을 생성",
        description: "간단한 웹사이트부터 복잡한 애플리케이션까지 - THOR.DEV는 AI를 사용하여 그 어느 때보다 빠르게 프로젝트를 생성, 구축, 배포할 수 있도록 도와줍니다."
      },
      features: {
        title: "개발자의 무기고",
        description: "지능형 프로젝트 구축, 실시간 디버깅, 다중 언어 지원을 갖춘 궁극의 코딩 환경을 경험하세요.",
        mjolnir: {
          title: "프로젝트 <b>빌</b>더",
          description: "스마트 템플릿과 구성을 사용한 11개 프로그래밍 언어에서의 지능형 프로젝트 스캐폴딩 및 관리."
        },
        stormbreaker: {
          title: "코드 <b>디</b>버거", 
          description: "실시간 오류 감지, 스마트 제안, 지원되는 모든 언어에서의 즉시 수정을 갖춘 고급 디버깅 도구."
        },
        bifrost: {
          title: "오류 <b>수</b>정기",
          description: "지능형 제안으로 코드 문제를 자동으로 감지, 분석, 수정하는 AI 기반 오류 해결."
        },
        loki: {
          title: "다중 <b>언</b>어",
          description: "Python, JavaScript, Java, C++, C#, Go, Rust, PHP, Ruby, Swift, Kotlin 개발의 원활한 지원."
        },
        comingSoon: "더 <b>많</b>은 도구가 곧 <b>출</b>시됩니다!"
      },
      contact: {
        title: "함<b>께</b> 프로그래밍의<br /> 새로운 시대를 <br /> 만<b>들</b>어 갑시다",
        button: "문의하기"
      }
    },
    ar: {
      nav: {
        home: "الرئيسية",
        about: "حول",
        features: "الميزات",
        contact: "اتصل",
        getStarted: "ابدأ البرمجة"
      },
      hero: {
         title: "THOR.DEV",
         subtitle: "منشئ تطبيقات الذكاء الاصطناعي",
        description: "ابني تطبيقات ومشاريع كاملة بمساعدة الذكاء الاصطناعي. من المفهوم إلى النشر - رفيقك الذكي في التطوير.",
        playNow: "ابدأ البناء",
        watchTrailer: "ابدأ البناء"
      },
      about: {
        title: "ابني <b>أي شيء</b>، أنشئ <br /> <b>كل شيء</b> بالذكاء الاصطناعي",
        description: "من المواقع البسيطة إلى التطبيقات المعقدة - THOR.DEV يستخدم الذكاء الاصطناعي لمساعدتك في إنشاء وبناء ونشر المشاريع أسرع من أي وقت مضى."
      },
      features: {
        title: "ترسانة المطور",
        description: "اختبر بيئة البرمجة النهائية مع بناء المشاريع الذكي والتصحيح في الوقت الفعلي ودعم متعدد اللغات.",
        mjolnir: {
          title: "منشئ <b>ال</b>مشاريع",
          description: "إنشاء وإدارة ذكية للمشاريع في 11 لغة برمجة مع قوالب وتكوينات ذكية."
        },
        stormbreaker: {
          title: "مصحح <b>ال</b>كود", 
          description: "أدوات تصحيح متقدمة مع اكتشاف الأخطاء في الوقت الفعلي واقتراحات ذكية وإصلاحات فورية في جميع اللغات المدعومة."
        },
        bifrost: {
          title: "مصحح <b>الأ</b>خطاء",
          description: "حل الأخطاء المدعوم بالذكاء الاصطناعي الذي يكتشف ويحلل ويصلح مشاكل الكود تلقائياً مع اقتراحات ذكية."
        },
        loki: {
          title: "متعدد <b>ال</b>لغات",
          description: "دعم سلس لتطوير Python و JavaScript و Java و C++ و C# و Go و Rust و PHP و Ruby و Swift و Kotlin."
        },
        comingSoon: "المزيد من <b>الأ</b>دوات قريب<b>اً</b>!"
      },
      contact: {
        title: "دعونا ن<b>ب</b>ني م<b>ع</b>اً<br /> عصر جديد من <br /> البر<b>م</b>جة",
        button: "اتصل بنا"
      }
    },
    hi: {
      nav: {
        home: "होम",
        about: "के बारे में",
        features: "विशेषताएं",
        contact: "संपर्क",
        getStarted: "कोडिंग शुरू करें"
      },
      hero: {
         title: "THOR.DEV",
         subtitle: "AI ऐप बिल्डर",
        description: "AI सहायता के साथ पूर्ण एप्लिकेशन और प्रोजेक्ट बनाएं। कॉन्सेप्ट से डिप्लॉयमेंट तक - आपका इंटेलिजेंट डेवलपमेंट साथी।",
        playNow: "निर्माण शुरू करें",
        watchTrailer: "निर्माण शुरू करें"
      },
      about: {
        title: "<b>कुछ भी</b> बनाएं, AI के साथ <br /><b>सब कुछ</b> बनाएं",
        description: "सरल वेबसाइटों से जटिल एप्लिकेशन तक - THOR.DEV AI का उपयोग करके आपको पहले से कहीं तेज़ी से प्रोजेक्ट बनाने, निर्माण करने और डिप्लॉय करने में मदद करता है।"
      },
      features: {
        title: "डेवलपर का शस्त्रागार",
        description: "इंटेलिजेंट प्रोजेक्ट बिल्डिंग, रियल-टाइम डिबगिंग, और मल्टी-लैंग्वेज सपोर्ट के साथ अल्टीमेट कोडिंग एनवायरनमेंट का अनुभव करें।",
        mjolnir: {
          title: "प्रोजेक्ट <b>बि</b>ल्डर",
          description: "स्मार्ट टेम्प्लेट्स और कॉन्फ़िगरेशन के साथ 11 प्रोग्रामिंग भाषाओं में इंटेलिजेंट प्रोजेक्ट स्कैफोल्डिंग और मैनेजमेंट।"
        },
        stormbreaker: {
          title: "कोड <b>डि</b>बगर", 
          description: "रियल-टाइम एरर डिटेक्शन, स्मार्ट सुझाव, और सभी समर्थित भाषाओं में तत्काल फिक्स के साथ एडवांस्ड डिबगिंग टूल्स।"
        },
        bifrost: {
          title: "एरर <b>फि</b>क्सर",
          description: "AI-पावर्ड एरर रिज़ॉल्यूशन जो इंटेलिजेंट सुझावों के साथ कोड की समस्याओं को स्वचालित रूप से डिटेक्ट, एनालाइज़ और फिक्स करता है।"
        },
        loki: {
          title: "मल्टी-<b>भा</b>षा",
          description: "Python, JavaScript, Java, C++, C#, Go, Rust, PHP, Ruby, Swift, और Kotlin डेवलपमेंट के लिए सीमलेस सपोर्ट।"
        },
        comingSoon: "और <b>टू</b>ल्स जल्द <b>आ</b> रहे हैं!"
      },
      contact: {
        title: "आइए मिलकर <b>प्रो</b>ग्रामिंग के<br /> नए युग का <br /> नि<b>र्मा</b>ण करें",
        button: "संपर्क करें"
      }
    }
  };

  return translations[lang] || translations.en;
};