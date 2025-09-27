import type { ModelInfo, OllamaApiResponse, OllamaModel } from './types';

export const WORK_DIR_NAME = 'project';
export const WORK_DIR = `/home/${WORK_DIR_NAME}`;
export const MODIFICATIONS_TAG_NAME = 'thor_file_modifications';
export const MODEL_REGEX = /^\[Model: (.*?)\]\n\n/;
export const DEFAULT_MODEL = 'x-ai/grok-4-fast:free';
export const DEFAULT_PROVIDER = 'OpenRouter';

// OpenRouter free models
const staticModels: ModelInfo[] = [
  { name: 'x-ai/grok-4-fast:free', label: 'Grok 4 Fast (Quick tasks and responses)', provider: 'OpenRouter', taskType: 'fast' },
  { name: 'google/gemini-2.0-flash-exp:free', label: 'Gemini 2.0 Flash (Landing pages)', provider: 'OpenRouter', taskType: 'design' },
  { name: 'deepseek/deepseek-chat-v3.1:free', label: 'DeepSeek V3 (Complex analysis and heavy tasks)', provider: 'OpenRouter', taskType: 'heavy' },
];

export const MODEL_LIST: ModelInfo[] = [...staticModels];
