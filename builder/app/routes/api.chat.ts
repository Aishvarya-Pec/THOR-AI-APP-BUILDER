// @ts-nocheck
// Preventing TS checks with files presented in the video for a better presentation.
import { type ActionFunctionArgs } from '@remix-run/cloudflare';
import { MAX_RESPONSE_SEGMENTS, MAX_TOKENS } from '../lib/.server/llm/constants';
import { CONTINUE_PROMPT } from '../lib/.server/llm/prompts';
import { streamText, type Messages, type StreamingOptions } from '../lib/.server/llm/stream-text';
import SwitchableStream from '../lib/.server/llm/switchable-stream';
import { json } from '@remix-run/cloudflare';

export async function loader({ context }: ActionFunctionArgs) {
  const ollamaBaseUrl = context.cloudflare.env.OLLAMA_API_BASE_URL || 'not set';
  const openRouterApiKey = context.cloudflare.env.OPENAI_LIKE_API_KEY || 'not set';
  const openRouterBaseUrl = context.cloudflare.env.OPENAI_LIKE_API_BASE_URL || 'not set';

  let ollamaApiStatus = 'not tested';
  let ollamaApiError = null;

  if (ollamaBaseUrl !== 'not set') {
    try {
      const response = await fetch(`${ollamaBaseUrl}/api/tags`);
      if (response.ok) {
        ollamaApiStatus = 'success';
      } else {
        ollamaApiStatus = `failed: ${response.status} ${response.statusText}`;
        ollamaApiError = await response.text();
      }
    } catch (error) {
      ollamaApiStatus = 'error';
      ollamaApiError = error.message;
    }
  }

  return json({
    ollamaBaseUrl,
    openRouterApiKey,
    openRouterBaseUrl,
    ollamaApiStatus,
    ollamaApiError,
  });
}

export async function action(args: ActionFunctionArgs) {
  return chatAction(args);
}

async function chatAction({ context, request }: ActionFunctionArgs) {
  const { messages } = await request.json<{ messages: Messages }>();

  const stream = new SwitchableStream();

  try {
    const options: StreamingOptions = {
      toolChoice: 'none',
      onFinish: async ({ text: content, finishReason }) => {
        if (finishReason !== 'length') {
          return stream.close();
        }

        if (stream.switches >= MAX_RESPONSE_SEGMENTS) {
          throw Error('Cannot continue message: Maximum segments reached');
        }

        const switchesLeft = MAX_RESPONSE_SEGMENTS - stream.switches;

        console.log(`Reached max token limit (${MAX_TOKENS}): Continuing message (${switchesLeft} switches left)`);

        messages.push({ role: 'assistant', content });
        messages.push({ role: 'user', content: CONTINUE_PROMPT });

        const result = await streamText(messages, context.cloudflare.env, options);

        return stream.switchSource(result.toAIStream());
      },
    };

    const result = await streamText(messages, context.cloudflare.env, options);

    stream.switchSource(result.toAIStream());

    return new Response(stream.readable, {
      status: 200,
      headers: {
        contentType: 'text/plain; charset=utf-8',
      },
    });
  } catch (error) {
    console.log(error);

    throw new Response(null, {
      status: 500,
      statusText: 'Internal Server Error',
    });
  }
}
