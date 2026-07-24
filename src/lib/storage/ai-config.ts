"use client";

const KEY = "sparehand_ai_config_v1";

export type AiConfig = {
  apiKey: string;
  model: string;
  baseUrl: string;
};

export const defaultAiConfig: AiConfig = {
  apiKey: "",
  model: "gpt-4.1-mini",
  baseUrl: "",
};

export function loadAiConfig(): AiConfig {
  if (typeof window === "undefined") return defaultAiConfig;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultAiConfig;
    const parsed = JSON.parse(raw) as Partial<AiConfig>;
    return {
      apiKey: parsed.apiKey?.trim() || "",
      model: parsed.model?.trim() || defaultAiConfig.model,
      baseUrl: parsed.baseUrl?.trim() || "",
    };
  } catch {
    return defaultAiConfig;
  }
}

export function saveAiConfig(config: AiConfig) {
  localStorage.setItem(
    KEY,
    JSON.stringify({
      apiKey: config.apiKey.trim(),
      model: config.model.trim() || defaultAiConfig.model,
      baseUrl: config.baseUrl.trim(),
    }),
  );
}

export function clearAiConfig() {
  localStorage.removeItem(KEY);
}

export function hasCustomerAiKey(): boolean {
  return Boolean(loadAiConfig().apiKey);
}

/** Attach the browser-stored key to API calls (never persisted on our server). */
export function aiFetchInit(init: RequestInit = {}): RequestInit {
  const config = loadAiConfig();
  const headers = new Headers(init.headers);
  headers.set("Content-Type", "application/json");
  if (config.apiKey) headers.set("x-sparehand-openai-key", config.apiKey);
  if (config.model) headers.set("x-sparehand-openai-model", config.model);
  if (config.baseUrl) headers.set("x-sparehand-openai-base-url", config.baseUrl);
  return { ...init, headers };
}
