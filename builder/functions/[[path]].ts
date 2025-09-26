import type { AppLoadContext } from "@remix-run/cloudflare";
import { createPagesFunctionHandler } from "@remix-run/cloudflare-pages";
import * as build from "../build/server";

interface Env {
  KV_NAMESPACE: KVNamespace;
  R2_BUCKET: R2Bucket;
  D1_DATABASE: D1Database;
  OPENAI_LIKE_API_BASE_URL: string;
  OPENAI_LIKE_API_KEY: string;
  OLLAMA_API_BASE_URL: string;
}

export const onRequest = createPagesFunctionHandler({
  build,
  loadContext(context) {
    return {
      cloudflare: context.env,
    };
  },
});