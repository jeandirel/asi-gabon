export interface ChatbaseWidgetIdentifyPayload {
  token?: string;
  [key: string]: unknown;
}

export interface ChatbaseWidgetApi {
  (method: string, ...args: unknown[]): unknown;
  q?: unknown[][];
  getState?: () => string;
  identify?: (payload: ChatbaseWidgetIdentifyPayload) => void;
  open?: () => void;
  close?: () => void;
  resetUser?: () => void;
  resetChat?: () => void;
}

declare global {
  interface Window {
    chatbase?: ChatbaseWidgetApi;
  }
}

export {};
