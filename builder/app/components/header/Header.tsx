import { useStore } from '@nanostores/react';
import { chatStore } from '../../lib/stores/chat';
import { IconButton } from '../../components/ui/IconButton';

export function Header() {
  const { showSidebar } = useStore(chatStore);

  const toggleSidebar = () => {
    chatStore.setKey('showSidebar', !showSidebar);
  };

  return (
    <header className="flex items-center justify-between p-5 h-[var(--header-height)]">
      <div className="flex items-center gap-4 z-logo text-thor-elements-textPrimary">
        <IconButton
          onClick={toggleSidebar}
          title="Toggle Sidebar"
          className="mr-2"
        >
          <div className="i-ph:sidebar text-lg" />
        </IconButton>
        <a href="http://localhost:3000" className="text-2xl font-semibold text-accent flex items-center hover:opacity-80 transition-opacity mjolnir-effect">
          <img src="/videos/img/thorlogo.png" alt="Thor Logo" className="w-[46px] h-auto inline-block" />
          <span className="ml-3 text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-yellow-400 bg-clip-text text-transparent font-zentry tracking-wider thor-text thor-runes">
            THOR
          </span>
        </a>
      </div>
      <div className="flex items-center">
        <a
          href="/"
          className="px-4 py-2 text-sm bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg font-semibold"
          title="Go to Landing Page"
        >
          Home
        </a>
      </div>
    </header>
  );
}
