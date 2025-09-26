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

export let MODEL_LIST: ModelInfo[] = [...staticModels];

const getOllamaBaseUrl = () => {
  if (typeof window !== 'undefined') {
    // Frontend always uses localhost
    return 'http://localhost:11434';
  }

  // Backend: Use OLLAMA_API_BASE_URL if set, otherwise return undefined
  console.log('Backend OLLAMA_API_BASE_URL:', process.env.OLLAMA_API_BASE_URL);
  return process.env.OLLAMA_API_BASE_URL || undefined;
};

async function getOllamaModels(): Promise<ModelInfo[]> {
  try {
    const base_url = getOllamaBaseUrl();
    if (!base_url) {
      console.log('Ollama API Base URL is not set, skipping Ollama model fetch.');
      return [];
    }
    console.log('Ollama API Base URL:', base_url);
    const apiUrl = `${base_url}/api/tags`;
    console.log('Fetching Ollama models from:', apiUrl);
    const response = await fetch(apiUrl);
    if (!response.ok) {
      console.error('Ollama API response not OK:', response.status, response.statusText);
      const errorBody = await response.text();
      console.error('Ollama API error body:', errorBody);
      return [];
    }
    const data = await response.json() as OllamaApiResponse;

    // Map of model names to their task types and descriptions
    const modelTaskMap: Record<string, { taskType: string; description: string }> = {
      'qwen2.5-coder:7b-instruct-q4_0': { taskType: 'fullstack', description: 'Qwen 2.5 Coder (Full-stack development)' },
      'mistral:7b-instruct-q4_0': { taskType: 'general', description: 'Mistral 7B (General Q&A and small tasks)' },
      'codellama:7b-code-q4_0': { taskType: 'ui-dev', description: 'CodeLlama 7B (UI/UX development)' },
    };

    return data.models
      .filter((model: OllamaModel) => Object.keys(modelTaskMap).includes(model.name))
      .map((model: OllamaModel) => {
        const taskInfo = modelTaskMap[model.name];
        return {
          name: model.name,
          label: taskInfo.description,
          provider: 'Ollama',
          taskType: taskInfo.taskType,
        };
      });
  } catch (e) {
    console.error('Failed to fetch Ollama models:', e);
    return [];
  }
}

async function initializeModelList(): Promise<void> {
  const ollamaModels = await getOllamaModels();
  MODEL_LIST = [...ollamaModels, ...staticModels];
}
initializeModelList().then();
export { getOllamaModels, initializeModelList };
