// @ts-nocheck
// Preventing TS checks with files presented in the video for a better presentation.
import type { Message } from 'ai';
import React, { type RefCallback } from 'react';
import { ClientOnly } from 'remix-utils/client-only';
import { IconButton } from '../../components/ui/IconButton';
import { Workbench } from '../../components/workbench/Workbench.client';
import { classNames } from '../../utils/classNames';
import { MODEL_LIST, DEFAULT_PROVIDER } from '../../utils/constants';
import { Messages } from './Messages.client';
import { SendButton } from './SendButton.client';
import { useState } from 'react';

import styles from './BaseChat.module.scss';


const ModelSelector = ({ model, setModel }) => {
  const [provider, setProvider] = useState(DEFAULT_PROVIDER);
  const modelList = MODEL_LIST;
  const providerList = [...new Set(MODEL_LIST.map((model) => model.provider))];

  return (
    <div className="mb-2">
      <label className="block text-sm font-medium text-thor-elements-textPrimary mb-2">
        Choose your divine model
      </label>
      <select
        value={provider}
        onChange={(e) => {
          setProvider(e.target.value);
          const firstModel = [...modelList].find(m => m.provider == e.target.value);
          setModel(firstModel ? firstModel.name : '');
        }}
        className="w-full p-2 rounded-lg border border-thor-elements-borderColor bg-thor-elements-prompt-background text-thor-elements-textPrimary focus:outline-none"
      >
        {providerList.map((provider) => (
          <option key={provider} value={provider}>
            {provider}
          </option>
        ))}
      </select>
      <select
        value={model}
        onChange={(e) => setModel(e.target.value)}
        className="w-full p-2 rounded-lg border border-thor-elements-borderColor bg-thor-elements-prompt-background text-thor-elements-textPrimary focus:outline-none"
      >
        {[...modelList].filter(e => e.provider == provider && e.name).map((modelOption) => (
          <option key={modelOption.name} value={modelOption.name}>
            {modelOption.label}
          </option>
        ))}
      </select>
    </div>
  );
};

const TEXTAREA_MIN_HEIGHT = 76;

interface BaseChatProps {
  textareaRef?: React.RefObject<HTMLTextAreaElement> | undefined;
  messageRef?: RefCallback<HTMLDivElement> | undefined;
  scrollRef?: RefCallback<HTMLDivElement> | undefined;
  showChat?: boolean;
  chatStarted?: boolean;
  isStreaming?: boolean;
  messages?: Message[];
  enhancingPrompt?: boolean;
  promptEnhanced?: boolean;
  input?: string;
  model: string;
  setModel: (model: string) => void;
  handleStop?: () => void;
  sendMessage?: (event: React.UIEvent, messageInput?: string) => void;
  handleInputChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  enhancePrompt?: () => void;
}

export const BaseChat = React.forwardRef<HTMLDivElement, BaseChatProps>(
  (
    {
      textareaRef,
      messageRef,
      scrollRef,
      showChat = true,
      chatStarted = false,
      isStreaming = false,
      enhancingPrompt = false,
      promptEnhanced = false,
      messages,
      input = '',
      model,
      setModel,
      sendMessage,
      handleInputChange,
      enhancePrompt,
      handleStop,
    },
    ref,
  ) => {
    const TEXTAREA_MAX_HEIGHT = chatStarted ? 400 : 200;

    return (
      <div
        ref={ref}
        className={classNames(
          styles.BaseChat,
          'relative flex h-full w-full overflow-hidden bg-transparent',
        )}
        data-chat-visible={showChat}
      >
        <div ref={scrollRef} className="flex overflow-y-auto w-full h-full">
          <div className={classNames(styles.Chat, 'flex flex-col w-full max-w-4xl mx-auto', {
            'h-full': chatStarted,
            'min-h-screen': !chatStarted
          })}>
            {!chatStarted && (
              <div id="intro" className="w-full flex flex-col items-center text-center relative pt-16 pb-8">
                {/* Lightning background effect */}
                <div className="absolute inset-0 -z-10 opacity-20">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-blue-500/30 via-purple-500/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
                </div>
                
                <div className="relative max-w-4xl mx-auto px-8">
                  <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-300 via-purple-400 to-yellow-300 bg-clip-text text-transparent animate-pulse" style={{ fontFamily: 'zentry, sans-serif' }}>
                    Where Thunder Strikes
                  </h1>
                  
                  <p className="mb-8 text-xl text-thor-elements-textSecondary max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'robert-regular, sans-serif' }}>
                    Harness the divine power of Thor to forge legendary applications. 
                    <br />
                    <span className="text-blue-400 font-semibold">Command the storm of creativity</span> and bring your visions to life with godlike speed.
                  </p>
                </div>
              </div>
            )}
            <div
              className={classNames('px-6', {
                'h-full flex flex-col pt-6': chatStarted,
                'flex flex-col items-center pt-8': !chatStarted,
              })}
            >
              <ClientOnly>
                {() => {
                  return chatStarted ? (
                    <Messages
                      ref={messageRef}
                      className="flex flex-col w-full flex-1 max-w-chat px-4 pb-6 mx-auto z-1"
                      messages={messages}
                      isStreaming={isStreaming}
                    />
                  ) : null;
                }}
              </ClientOnly>
              <div
                className={classNames('relative w-full max-w-4xl mx-auto z-prompt', {
                  'sticky bottom-0': chatStarted,
                })}
              >
                <ModelSelector
                  model={model}
                  setModel={setModel}
                />
                <div className="relative bg-thor-elements-prompt-background border border-thor-elements-borderColor rounded-lg overflow-hidden">
                  <textarea
                    ref={textareaRef}
                    className={`w-full pl-4 pt-4 pr-16 focus:outline-none resize-none text-md text-thor-elements-textPrimary placeholder-thor-elements-textTertiary bg-transparent`}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        if (event.shiftKey) {
                          return;
                        }

                        event.preventDefault();

                        sendMessage?.(event);
                      }
                    }}
                    value={input}
                    onChange={(event) => {
                      handleInputChange?.(event);
                    }}
                    style={{
                      minHeight: TEXTAREA_MIN_HEIGHT,
                      maxHeight: TEXTAREA_MAX_HEIGHT,
                    }}
                    placeholder="How can Thor help you today?"
                    translate="no"
                  />
                  <ClientOnly>
                    {() => (
                      <SendButton
                        show={input.length > 0 || isStreaming}
                        isStreaming={isStreaming}
                        onClick={(event) => {
                          if (isStreaming) {
                            handleStop?.();
                            return;
                          }

                          sendMessage?.(event);
                        }}
                      />
                    )}
                  </ClientOnly>
                  <div className="flex justify-between text-sm p-4 pt-2">
                    <div className="flex gap-1 items-center">
                      <IconButton
                        title="Enhance prompt"
                        disabled={input.length === 0 || enhancingPrompt}
                        className={classNames({
                          'opacity-100!': enhancingPrompt,
                          'text-thor-elements-item-contentAccent! pr-1.5 enabled:hover:bg-thor-elements-item-backgroundAccent!':
                            promptEnhanced,
                        })}
                        onClick={() => enhancePrompt?.()}
                      >
                        {enhancingPrompt ? (
                          <>
                            <div className="i-svg-spinners:90-ring-with-bg text-thor-elements-loader-progress text-xl"></div>
                            <div className="ml-1.5">Enhancing prompt...</div>
                          </>
                        ) : (
                          <>
                            <div className="i-ph:lightning-fill text-xl"></div>
                            {promptEnhanced && <div className="ml-1.5">Prompt enhanced</div>}
                          </>
                        )}
                      </IconButton>
                    </div>
                    {input.length > 3 ? (
                      <div className="text-xs text-thor-elements-textTertiary">
                        Use <kbd className="kdb">Shift</kbd> + <kbd className="kdb">Return</kbd> for a new line
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="bg-transparent pb-6">{/* Ghost Element */}</div>
              </div>
            </div>
          </div>
          <ClientOnly>{() => <Workbench chatStarted={chatStarted} isStreaming={isStreaming} />}</ClientOnly>
        </div>
      </div>
    );
  },
);
