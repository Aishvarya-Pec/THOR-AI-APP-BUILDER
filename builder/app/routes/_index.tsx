import { ClientOnly } from "remix-utils/client-only";
import { LanguageProvider } from "../contexts/LanguageContext.client";
import { Navbar } from '../components/landing/navbar';
import { Hero } from '../components/landing/hero';
import { About } from '../components/landing/about';
import { Features } from '../components/landing/features';
import Story from '../components/landing/story';
import { Contact } from '../components/landing/contact';
import { Footer } from '../components/landing/footer';
import { json, type LoaderFunctionArgs, type MetaFunction } from '@remix-run/cloudflare';
import { useSearchParams } from '@remix-run/react';
import { Header } from '../components/header/Header';
import { useStore } from '@nanostores/react';
import { chatStore } from '../lib/stores/chat';
import { Menu } from '../components/sidebar/Menu.client';
import { BaseChat } from '../components/chat/BaseChat';
import { Chat } from '../components/chat/Chat.client';

export const meta: MetaFunction = () => {
  return [{ title: 'THOR - AI APP BUILDER' }, { name: 'description', content: 'Talk with Thor, an AI assistant for building applications' }];
};

export const loader = async (args: LoaderFunctionArgs) => {
  return json({});
};


function SidebarWrapper() {
  const { showSidebar } = useStore(chatStore);
  
  return (
    <div 
      className={`fixed left-0 top-[var(--header-height)] h-[calc(100vh-var(--header-height))] z-50 transition-transform duration-300 ${
        showSidebar ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <Menu />
    </div>
  );
}

export default function Index() {
  const [searchParams] = useSearchParams();
  const showBuilder = searchParams.get('builder') === 'true';

  if (showBuilder) {
    return (
      <div className="flex flex-col h-full w-full">
        <Header />
        <div className="flex flex-1 relative">
          <ClientOnly fallback={null}>
            {() => <SidebarWrapper />}
          </ClientOnly>
          <div className="flex-1">
            <ClientOnly fallback={<BaseChat model="" setModel={() => {}} />}>
              {() => <Chat />}
            </ClientOnly>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ClientOnly fallback={null}>
      {() => (
        <LanguageProvider>
          <main className="min-h-screen bg-black text-white">
            <Navbar />
            <Hero />
            <About />
            <Features />
            <Story />
            <Contact />
            <Footer />
          </main>
        </LanguageProvider>
      )}
    </ClientOnly>
  );
}
