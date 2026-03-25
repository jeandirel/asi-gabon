export const CHATBASE_ANONYMOUS_USER_STORAGE_KEY =
  "asi-gabon-chatbase-anonymous-user";

export function isValidChatbaseUserId(value: string) {
  return /^[a-zA-Z0-9._-]{1,128}$/.test(value);
}

export function normalizeChatbaseUserId(value: string) {
  return value.replace(/[^a-zA-Z0-9._-]/g, "").slice(0, 128);
}

export function createAnonymousChatbaseUserId() {
  const rawId =
    globalThis.crypto?.randomUUID?.() ??
    `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;

  return normalizeChatbaseUserId(`anon-${rawId}`);
}

export function getOrCreateAnonymousChatbaseUserId() {
  if (typeof window === "undefined") {
    return null;
  }

  const existingUserId = window.localStorage.getItem(
    CHATBASE_ANONYMOUS_USER_STORAGE_KEY,
  );

  if (existingUserId && isValidChatbaseUserId(existingUserId)) {
    return existingUserId;
  }

  const nextUserId = createAnonymousChatbaseUserId();
  window.localStorage.setItem(
    CHATBASE_ANONYMOUS_USER_STORAGE_KEY,
    nextUserId,
  );

  return nextUserId;
}
