export const CHATBASE_BASE_URL = "https://www.chatbase.co/api/v2";

export class ChatbaseConfigError extends Error {
  code = "CONFIG_MISSING_CHATBASE_ENV";

  constructor(message = "Missing Chatbase configuration.") {
    super(message);
    this.name = "ChatbaseConfigError";
  }
}

export function getChatbaseConfig() {
  const apiKey = process.env.CHATBASE_API_KEY?.trim();
  const agentId = process.env.CHATBASE_AGENT_ID?.trim();

  if (!apiKey || !agentId) {
    throw new ChatbaseConfigError(
      "CHATBASE_API_KEY and CHATBASE_AGENT_ID must be set on the server.",
    );
  }

  return { agentId, apiKey };
}
