import { ChatbaseConfigError } from "@/lib/chatbase/config";
import { retryAssistantMessage } from "@/lib/chatbase/client";
import {
  buildPublicErrorResponse,
  buildServerConfigErrorResponse,
  buildUpstreamNetworkErrorResponse,
  buildValidationErrorResponse,
} from "@/lib/chatbase/errors";
import { createStreamProxyResponse } from "@/lib/chatbase/stream";

interface RetryRouteBody {
  conversationId?: string;
  messageId?: string;
}

export async function POST(request: Request) {
  let body: RetryRouteBody;

  try {
    body = (await request.json()) as RetryRouteBody;
  } catch {
    return buildValidationErrorResponse("La demande de relance est invalide.");
  }

  const conversationId = body.conversationId?.trim();
  const messageId = body.messageId?.trim();

  if (!conversationId || !messageId) {
    return buildValidationErrorResponse(
      "La relance nécessite un identifiant de conversation et de message.",
    );
  }

  try {
    const upstreamResponse = await retryAssistantMessage({
      conversationId,
      messageId,
    });

    if (!upstreamResponse.ok) {
      return buildPublicErrorResponse(upstreamResponse);
    }

    return createStreamProxyResponse(upstreamResponse);
  } catch (error) {
    if (error instanceof ChatbaseConfigError) {
      return buildServerConfigErrorResponse(
        "Chatbase n'est pas encore configuré. Ajoutez CHATBASE_API_KEY et CHATBASE_AGENT_ID.",
      );
    }

    return buildUpstreamNetworkErrorResponse(error);
  }
}
