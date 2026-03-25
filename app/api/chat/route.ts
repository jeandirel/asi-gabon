import { ChatbaseConfigError } from "@/lib/chatbase/config";
import { streamChatMessage } from "@/lib/chatbase/client";
import {
  buildPublicErrorResponse,
  buildServerConfigErrorResponse,
  buildUpstreamNetworkErrorResponse,
  buildValidationErrorResponse,
} from "@/lib/chatbase/errors";
import { createStreamProxyResponse } from "@/lib/chatbase/stream";

interface ChatRouteBody {
  conversationId?: string | null;
  message?: string;
  userId?: string | null;
}

export async function POST(request: Request) {
  let body: ChatRouteBody;

  try {
    body = (await request.json()) as ChatRouteBody;
  } catch {
    return buildValidationErrorResponse("Le message envoyé est invalide.");
  }

  const message = body.message?.trim();
  if (!message) {
    return buildValidationErrorResponse("Veuillez saisir une question avant l'envoi.");
  }

  try {
    const upstreamResponse = await streamChatMessage({
      message,
      conversationId: body.conversationId ?? null,
      userId: body.userId ?? null,
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
