import { ChatbaseConfigError } from "@/lib/chatbase/config";
import { updateMessageFeedback } from "@/lib/chatbase/client";
import {
  buildPublicErrorResponse,
  buildServerConfigErrorResponse,
  buildUpstreamNetworkErrorResponse,
  buildValidationErrorResponse,
} from "@/lib/chatbase/errors";
import type { ChatbaseMessage } from "@/types/chatbase";

interface FeedbackRouteBody {
  conversationId?: string;
  feedback?: "negative" | "positive" | null;
  messageId?: string;
}

export async function PATCH(request: Request) {
  let body: FeedbackRouteBody;

  try {
    body = (await request.json()) as FeedbackRouteBody;
  } catch {
    return buildValidationErrorResponse("La demande d'avis est invalide.");
  }

  const conversationId = body.conversationId?.trim();
  const messageId = body.messageId?.trim();
  const feedback = body.feedback ?? null;

  if (!conversationId || !messageId) {
    return buildValidationErrorResponse(
      "L'avis nécessite un identifiant de conversation et de message.",
    );
  }

  if (feedback !== null && feedback !== "positive" && feedback !== "negative") {
    return buildValidationErrorResponse("La valeur d'avis demandée est invalide.");
  }

  try {
    const upstreamResponse = await updateMessageFeedback(
      conversationId,
      messageId,
      feedback,
    );

    if (!upstreamResponse.ok) {
      return buildPublicErrorResponse(upstreamResponse);
    }

    const data = (await upstreamResponse.json()) as { data: ChatbaseMessage };
    return Response.json(data);
  } catch (error) {
    if (error instanceof ChatbaseConfigError) {
      return buildServerConfigErrorResponse(
        "Chatbase n'est pas encore configuré. Ajoutez CHATBASE_API_KEY et CHATBASE_AGENT_ID.",
      );
    }

    return buildUpstreamNetworkErrorResponse(error);
  }
}
