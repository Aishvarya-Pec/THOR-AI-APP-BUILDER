import type { ITheme } from '@xterm/xterm';

const style = getComputedStyle(document.documentElement);
const cssVar = (token: string) => style.getPropertyValue(token) || undefined;

export function getTerminalTheme(overrides?: ITheme): ITheme {
  return {
    cursor: cssVar('--thor-elements-terminal-cursorColor'),
    cursorAccent: cssVar('--thor-elements-terminal-cursorColorAccent'),
    foreground: cssVar('--thor-elements-terminal-textColor'),
    background: cssVar('--thor-elements-terminal-backgroundColor'),
    selectionBackground: cssVar('--thor-elements-terminal-selection-backgroundColor'),
    selectionForeground: cssVar('--thor-elements-terminal-selection-textColor'),
    selectionInactiveBackground: cssVar('--thor-elements-terminal-selection-backgroundColorInactive'),

    // ansi escape code colors
    black: cssVar('--thor-elements-terminal-color-black'),
    red: cssVar('--thor-elements-terminal-color-red'),
    green: cssVar('--thor-elements-terminal-color-green'),
    yellow: cssVar('--thor-elements-terminal-color-yellow'),
    blue: cssVar('--thor-elements-terminal-color-blue'),
    magenta: cssVar('--thor-elements-terminal-color-magenta'),
    cyan: cssVar('--thor-elements-terminal-color-cyan'),
    white: cssVar('--thor-elements-terminal-color-white'),
    brightBlack: cssVar('--thor-elements-terminal-color-brightBlack'),
    brightRed: cssVar('--thor-elements-terminal-color-brightRed'),
    brightGreen: cssVar('--thor-elements-terminal-color-brightGreen'),
    brightYellow: cssVar('--thor-elements-terminal-color-brightYellow'),
    brightBlue: cssVar('--thor-elements-terminal-color-brightBlue'),
    brightMagenta: cssVar('--thor-elements-terminal-color-brightMagenta'),
    brightCyan: cssVar('--thor-elements-terminal-color-brightCyan'),
    brightWhite: cssVar('--thor-elements-terminal-color-brightWhite'),

    ...overrides,
  };
}
