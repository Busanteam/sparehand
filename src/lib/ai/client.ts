import OpenAI from "openai";

export type OpenAiOptions = {
  apiKey?: string | null;
  model?: string | null;
  baseUrl?: string | null;
};

export function resolveOpenAiOptions(input: OpenAiOptions = {}) {
  const apiKey = input.apiKey?.trim() || process.env.OPENAI_API_KEY || "";
  const model =
    input.model?.trim() || process.env.OPENAI_MODEL || "gpt-4.1-mini";
  const baseUrl =
    input.baseUrl?.trim() || process.env.OPENAI_BASE_URL || undefined;
  return { apiKey, model, baseUrl };
}

export function getOpenAI(options: OpenAiOptions = {}) {
  const { apiKey, baseUrl } = resolveOpenAiOptions(options);
  if (!apiKey) return null;
  return new OpenAI({
    apiKey,
    ...(baseUrl ? { baseURL: baseUrl } : {}),
  });
}

export function hasOpenAI(options: OpenAiOptions = {}): boolean {
  return Boolean(resolveOpenAiOptions(options).apiKey);
}

/** Read BYOK headers from an incoming request. */
export function openAiOptionsFromRequest(request: Request): OpenAiOptions {
  return {
    apiKey: request.headers.get("x-sparehand-openai-key"),
    model: request.headers.get("x-sparehand-openai-model"),
    baseUrl: request.headers.get("x-sparehand-openai-base-url"),
  };
}
