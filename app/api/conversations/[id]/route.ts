import { ChatbaseConfigError } from "@/lib/chatbase/config";
import { getConversation } from "@/lib/chatbase/client";
import {
  buildPublicErrorResponse,
  buildServerConfigErrorResponse,
  buildUpstreamNetworkErrorResponse,
} from "@/lib/chatbase/errors";
import type { ChatbaseGetConversationResponse } from "@/types/chatbase";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params;

  try {
    const upstreamResponse = await getConversation(id);
    if (!upstreamResponse.ok) {
      return buildPublicErrorResponse(upstreamResponse);
    }

    const data =
      (await upstreamResponse.json()) as ChatbaseGetConversationResponse;
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
