import { globSync } from 'fast-glob';
import fs from 'node:fs/promises';
import { basename } from 'node:path';
import { defineConfig, presetIcons, presetUno, transformerDirectives } from 'unocss';

const iconPaths = globSync('./icons/*.svg');

const collectionName = 'thor';

const customIconCollection = iconPaths.reduce(
  (acc, iconPath) => {
    const [iconName] = basename(iconPath).split('.');

    acc[collectionName] ??= {};
    acc[collectionName][iconName] = async () => fs.readFile(iconPath, 'utf8');

    return acc;
  },
  {} as Record<string, Record<string, () => Promise<string>>>,
);

const BASE_COLORS = {
  white: '#FFFFFF',
  gray: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0A0A0A',
  },
  accent: {
    50: '#EEF9FF',
    100: '#D8F1FF',
    200: '#BAE7FF',
    300: '#8ADAFF',
    400: '#53C4FF',
    500: '#2BA6FF',
    600: '#1488FC',
    700: '#0D6FE8',
    800: '#1259BB',
    900: '#154E93',
    950: '#122F59',
  },
  green: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    200: '#BBF7D0',
    300: '#86EFAC',
    400: '#4ADE80',
    500: '#22C55E',
    600: '#16A34A',
    700: '#15803D',
    800: '#166534',
    900: '#14532D',
    950: '#052E16',
  },
  orange: {
    50: '#FFFAEB',
    100: '#FEEFC7',
    200: '#FEDF89',
    300: '#FEC84B',
    400: '#FDB022',
    500: '#F79009',
    600: '#DC6803',
    700: '#B54708',
    800: '#93370D',
    900: '#792E0D',
  },
  red: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444',
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
    950: '#450A0A',
  },
};

const COLOR_PRIMITIVES = {
  ...BASE_COLORS,
  alpha: {
    white: generateAlphaPalette(BASE_COLORS.white),
    gray: generateAlphaPalette(BASE_COLORS.gray[900]),
    red: generateAlphaPalette(BASE_COLORS.red[500]),
    accent: generateAlphaPalette(BASE_COLORS.accent[500]),
  },
};

export default defineConfig({
  shortcuts: {
    'thor-ease-cubic-bezier': 'ease-[cubic-bezier(0.4,0,0.2,1)]',
    'transition-theme': 'transition-[background-color,border-color,color] duration-150 thor-ease-cubic-bezier',
    kdb: 'bg-thor-elements-code-background text-thor-elements-code-text py-1 px-1.5 rounded-md',
    'max-w-chat': 'max-w-[var(--chat-max-width)]',
  },
  rules: [
    /**
     * This shorthand doesn't exist in Tailwind and we overwrite it to avoid
     * any conflicts with minified CSS classes.
     */
    ['b', {}],
  ],
  theme: {
    fontFamily: {
      zentry: ['zentry', 'sans-serif'],
      general: ['general', 'sans-serif'],
      'circular-web': ['circular-web', 'sans-serif'],
      'robert-medium': ['robert-medium', 'sans-serif'],
      'robert-regular': ['robert-regular', 'sans-serif'],
    },
    colors: {
      ...COLOR_PRIMITIVES,
      blue: {
        50: '#dfdff0',
        75: '#dfdff2',
        100: '#f0f2fa',
        200: '#101010',
        300: '#4fb7dd',
      },
      violet: {
        300: '#5724ff',
      },
      yellow: {
        100: '#8e983f',
        300: '#edff66',
      },
      thor: {
        elements: {
          borderColor: 'var(--thor-elements-borderColor)',
          borderColorActive: 'var(--thor-elements-borderColorActive)',
          background: {
            depth: {
              1: 'var(--thor-elements-bg-depth-1)',
              2: 'var(--thor-elements-bg-depth-2)',
              3: 'var(--thor-elements-bg-depth-3)',
              4: 'var(--thor-elements-bg-depth-4)',
            },
          },
          textPrimary: 'var(--thor-elements-textPrimary)',
          textSecondary: 'var(--thor-elements-textSecondary)',
          textTertiary: 'var(--thor-elements-textTertiary)',
          code: {
            background: 'var(--thor-elements-code-background)',
            text: 'var(--thor-elements-code-text)',
          },
          button: {
            primary: {
              background: 'var(--thor-elements-button-primary-background)',
              backgroundHover: 'var(--thor-elements-button-primary-backgroundHover)',
              text: 'var(--thor-elements-button-primary-text)',
            },
            secondary: {
              background: 'var(--thor-elements-button-secondary-background)',
              backgroundHover: 'var(--thor-elements-button-secondary-backgroundHover)',
              text: 'var(--thor-elements-button-secondary-text)',
            },
            danger: {
              background: 'var(--thor-elements-button-danger-background)',
              backgroundHover: 'var(--thor-elements-button-danger-backgroundHover)',
              text: 'var(--thor-elements-button-danger-text)',
            },
          },
          item: {
            contentDefault: 'var(--thor-elements-item-contentDefault)',
            contentActive: 'var(--thor-elements-item-contentActive)',
            contentAccent: 'var(--thor-elements-item-contentAccent)',
            contentDanger: 'var(--thor-elements-item-contentDanger)',
            backgroundDefault: 'var(--thor-elements-item-backgroundDefault)',
            backgroundActive: 'var(--thor-elements-item-backgroundActive)',
            backgroundAccent: 'var(--thor-elements-item-backgroundAccent)',
            backgroundDanger: 'var(--thor-elements-item-backgroundDanger)',
          },
          actions: {
            background: 'var(--thor-elements-actions-background)',
            code: {
              background: 'var(--thor-elements-actions-code-background)',
            },
          },
          artifacts: {
            background: 'var(--thor-elements-artifacts-background)',
            backgroundHover: 'var(--thor-elements-artifacts-backgroundHover)',
            borderColor: 'var(--thor-elements-artifacts-borderColor)',
            inlineCode: {
              background: 'var(--thor-elements-artifacts-inlineCode-background)',
              text: 'var(--thor-elements-artifacts-inlineCode-text)',
            },
          },
          messages: {
            background: 'var(--thor-elements-messages-background)',
            linkColor: 'var(--thor-elements-messages-linkColor)',
            code: {
              background: 'var(--thor-elements-messages-code-background)',
            },
            inlineCode: {
              background: 'var(--thor-elements-messages-inlineCode-background)',
              text: 'var(--thor-elements-messages-inlineCode-text)',
            },
          },
          icon: {
            success: 'var(--thor-elements-icon-success)',
            error: 'var(--thor-elements-icon-error)',
            primary: 'var(--thor-elements-icon-primary)',
            secondary: 'var(--thor-elements-icon-secondary)',
            tertiary: 'var(--thor-elements-icon-tertiary)',
          },
          preview: {
            addressBar: {
              background: 'var(--thor-elements-preview-addressBar-background)',
              backgroundHover: 'var(--thor-elements-preview-addressBar-backgroundHover)',
              backgroundActive: 'var(--thor-elements-preview-addressBar-backgroundActive)',
              text: 'var(--thor-elements-preview-addressBar-text)',
              textActive: 'var(--thor-elements-preview-addressBar-textActive)',
            },
          },
          terminals: {
            background: 'var(--thor-elements-terminals-background)',
            buttonBackground: 'var(--thor-elements-terminals-buttonBackground)',
          },
          dividerColor: 'var(--thor-elements-dividerColor)',
          loader: {
            background: 'var(--thor-elements-loader-background)',
            progress: 'var(--thor-elements-loader-progress)',
          },
          prompt: {
            background: 'var(--thor-elements-prompt-background)',
          },
          sidebar: {
            dropdownShadow: 'var(--thor-elements-sidebar-dropdownShadow)',
            buttonBackgroundDefault: 'var(--thor-elements-sidebar-buttonBackgroundDefault)',
            buttonBackgroundHover: 'var(--thor-elements-sidebar-buttonBackgroundHover)',
            buttonText: 'var(--thor-elements-sidebar-buttonText)',
          },
          cta: {
            background: 'var(--thor-elements-cta-background)',
            text: 'var(--thor-elements-cta-text)',
          },
        },
      },
    },
  },
  transformers: [transformerDirectives()],
  presets: [
    presetUno({
      dark: {
        light: '[data-theme="light"]',
        dark: '[data-theme="dark"]',
      },
    }),
    presetIcons({
      warn: true,
      collections: {
        ...customIconCollection,
      },
    }),
  ],
});

/**
 * Generates an alpha palette for a given hex color.
 *
 * @param hex - The hex color code (without alpha) to generate the palette from.
 * @returns An object where keys are opacity percentages and values are hex colors with alpha.
 *
 * Example:
 *
 * ```
 * {
 *   '1': '#FFFFFF03',
 *   '2': '#FFFFFF05',
 *   '3': '#FFFFFF08',
 * }
 * ```
 */
function generateAlphaPalette(hex: string) {
  return [1, 2, 3, 4, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].reduce(
    (acc, opacity) => {
      const alpha = Math.round((opacity / 100) * 255)
        .toString(16)
        .padStart(2, '0');

      acc[opacity] = `${hex}${alpha}`;

      return acc;
    },
    {} as Record<number, string>,
  );
}
