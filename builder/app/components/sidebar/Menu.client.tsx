import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { Dialog, DialogButton, DialogDescription, DialogRoot, DialogTitle } from '../../components/ui/Dialog';
import { ThemeSwitch } from '../../components/ui/ThemeSwitch';
import { db, deleteById, getAll, chatId, type ChatHistoryItem } from '../../lib/persistence';
import { logger } from '../../utils/logger';
import { HistoryItem } from './HistoryItem';
import { binDates } from './date-binning';
import { useStore } from '@nanostores/react';
import { chatStore } from '../../lib/stores/chat';

type DialogContent = { type: 'delete'; item: ChatHistoryItem } | null;

export function Menu() {
  const menuRef = useRef<HTMLDivElement>(null);
  const [list, setList] = useState<ChatHistoryItem[]>([]);
  const { showSidebar } = useStore(chatStore);
  const [dialogContent, setDialogContent] = useState<DialogContent>(null);

  const loadEntries = useCallback(() => {
    if (db) {
      getAll(db)
        .then((list) => list.filter((item) => item.urlId && item.description))
        .then(setList)
        .catch((error) => toast.error(error.message));
    }
  }, []);

  const deleteItem = useCallback((event: React.UIEvent, item: ChatHistoryItem) => {
    event.preventDefault();

    if (db) {
      deleteById(db, item.id)
        .then(() => {
          loadEntries();

          if (chatId.get() === item.id) {
            // hard page navigation to clear the stores
            window.location.pathname = '/';
          }
        })
        .catch((error) => {
          toast.error('Failed to delete conversation');
          logger.error(error);
        });
    }
  }, []);

  const closeDialog = () => {
    setDialogContent(null);
  };

  useEffect(() => {
    if (showSidebar) {
      loadEntries();
    }
  }, [showSidebar, loadEntries]);

  return (
    <div
      ref={menuRef}
      className="flex flex-col side-menu w-[350px] h-full bg-thor-elements-background-depth-2 border-r rounded-r-3xl border-thor-elements-borderColor shadow-xl shadow-thor-elements-sidebar-dropdownShadow text-sm relative overflow-hidden"
    >
      {/* Thor-themed background effect */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-500/20 via-purple-500/10 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-radial from-yellow-400/10 to-transparent rounded-full blur-xl"></div>
      </div>
      

      
      <div className="flex-1 flex flex-col h-full w-full overflow-hidden relative">
        <div className="p-4">
          <a
            href="/"
            className="group flex gap-3 items-center bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 text-thor-elements-sidebar-buttonText border border-blue-500/20 hover:border-blue-400/40 rounded-xl p-3 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] relative overflow-hidden"
          >
            {/* Button background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative flex items-center gap-3 w-full">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
                <span className="inline-block i-thor:chat scale-110 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-thor-elements-textPrimary group-hover:text-blue-300 transition-colors duration-300">
                  Start new chat
                </span>
              </div>
            </div>
          </a>
        </div>
        
        <div className="px-6 py-3 border-b border-thor-elements-borderColor/30">
          <div className="flex items-center gap-2">
            <div className="text-thor-elements-textPrimary font-bold text-lg bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Sacred Chronicles
            </div>
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 animate-pulse"></div>
          </div>
          <div className="text-thor-elements-textTertiary text-xs mt-1">Your legendary conversations</div>
        </div>
        
        <div className="flex-1 overflow-scroll pl-5 pr-4 pb-5 pt-3">
          {list.length === 0 && (
            <div className="pl-2 py-8 text-center">
              <div className="text-thor-elements-textTertiary text-sm mb-2">⚡ No chronicles yet ⚡</div>
              <div className="text-thor-elements-textTertiary text-xs opacity-70">
                Begin your first divine conversation to create legendary tales
              </div>
            </div>
          )}
          <DialogRoot open={dialogContent !== null}>
            {binDates(list).map(({ category, items }) => (
              <div key={category} className="mt-6 first:mt-0 space-y-2">
                <div className="text-thor-elements-textTertiary sticky top-0 z-1 bg-thor-elements-background-depth-2 pl-3 pt-3 pb-2 rounded-lg border-l-2 border-blue-500/30">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-500"></div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-thor-elements-textSecondary">
                      {category === 'Today' ? 'Divine Moments' : 
                       category === 'Yesterday' ? 'Recent Legends' :
                       category === 'Previous 7 days' ? 'Weekly Chronicles' :
                       category === 'Previous 30 days' ? 'Monthly Sagas' :
                       'Ancient Tales'}
                    </span>
                  </div>
                </div>
                {items.map((item) => (
                  <HistoryItem key={item.id} item={item} onDelete={() => setDialogContent({ type: 'delete', item })} />
                ))}
              </div>
            ))}
            <Dialog onBackdrop={closeDialog} onClose={closeDialog}>
              {dialogContent?.type === 'delete' && (
                <>
                  <DialogTitle>Delete Chat?</DialogTitle>
                  <DialogDescription asChild>
                    <div>
                      <p>
                        You are about to delete <strong>{dialogContent.item.description}</strong>.
                      </p>
                      <p className="mt-1">Are you sure you want to delete this chat?</p>
                    </div>
                  </DialogDescription>
                  <div className="px-5 pb-4 bg-thor-elements-background-depth-2 flex gap-2 justify-end">
                    <DialogButton type="secondary" onClick={closeDialog}>
                      Cancel
                    </DialogButton>
                    <DialogButton
                      type="danger"
                      onClick={(event) => {
                        deleteItem(event, dialogContent.item);
                        closeDialog();
                      }}
                    >
                      Delete
                    </DialogButton>
                  </div>
                </>
              )}
            </Dialog>
          </DialogRoot>
        </div>
        <div className="flex items-center border-t border-thor-elements-borderColor p-4">
          <ThemeSwitch className="ml-auto" />
        </div>
      </div>
    </div>
  );
}
