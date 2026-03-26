import { ChatbaseWidgetProvider } from "@/components/chatbase/widget-provider";
import { AssistantPage } from "@/components/pages/assistant-page";

export default function AssistantRoute() {
  const chatbaseAgentId = process.env.CHATBASE_AGENT_ID?.trim() ?? null;

  return (
    <ChatbaseWidgetProvider agentId={chatbaseAgentId}>
      <AssistantPage />
    </ChatbaseWidgetProvider>
  );
}
