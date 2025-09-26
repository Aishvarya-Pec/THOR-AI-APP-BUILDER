import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useRef, useState } from 'react';
import { type ChatHistoryItem } from '../../lib/persistence';

interface HistoryItemProps {
  item: ChatHistoryItem;
  onDelete?: (event: React.UIEvent) => void;
}

export function HistoryItem({ item, onDelete }: HistoryItemProps) {
  const [hovering, setHovering] = useState(false);
  const hoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined;

    function mouseEnter() {
      setHovering(true);

      if (timeout) {
        clearTimeout(timeout);
      }
    }

    function mouseLeave() {
      setHovering(false);
    }

    hoverRef.current?.addEventListener('mouseenter', mouseEnter);
    hoverRef.current?.addEventListener('mouseleave', mouseLeave);

    return () => {
      hoverRef.current?.removeEventListener('mouseenter', mouseEnter);
      hoverRef.current?.removeEventListener('mouseleave', mouseLeave);
    };
  }, []);

  return (
    <div
      ref={hoverRef}
      className="group rounded-xl text-thor-elements-textSecondary hover:text-thor-elements-textPrimary hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10 overflow-hidden flex justify-between items-center px-3 py-2 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border border-transparent hover:border-blue-500/20 relative"
    >
      {/* Background effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
      
      <a href={`/chat/${item.urlId}`} className="flex w-full relative truncate block z-10">
        <div className="flex items-center gap-2 w-full">
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-60 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0"></div>
          <span className="truncate font-medium group-hover:text-blue-300 transition-colors duration-300">
            {item.description}
          </span>
        </div>
        <div className="absolute right-0 z-1 top-0 bottom-0 bg-gradient-to-l from-thor-elements-background-depth-2 group-hover:from-blue-500/10 to-transparent w-10 flex justify-end group-hover:w-15 group-hover:from-45%">
          {hovering && (
            <div className="flex items-center p-1 text-thor-elements-textSecondary hover:text-thor-elements-item-contentDanger">
              <Dialog.Trigger asChild>
                <button
                  className="i-ph:trash scale-110"
                  onClick={(event) => {
                    // we prevent the default so we don't trigger the anchor above
                    event.preventDefault();
                    onDelete?.(event);
                  }}
                />
              </Dialog.Trigger>
            </div>
          )}
        </div>
      </a>
    </div>
  );
}
