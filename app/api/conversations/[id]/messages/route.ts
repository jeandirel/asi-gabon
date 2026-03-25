import { ChatbaseConfigError } from "@/lib/chatbase/config";
import { getConversationMessages } from "@/lib/chatbase/client";
import {
  buildPublicErrorResponse,
  buildServerConfigErrorResponse,
  buildUpstreamNetworkErrorResponse,
} from "@/lib/chatbase/errors";
import type { ChatbaseListResponse, ChatbaseMessage } from "@/types/chatbase";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: Params) {
  const { id } = await params;
  const { searchParams } = new URL(request.url);
  const cursor = searchParams.get("cursor");
  const limit = searchParams.get("limit");

  try {
    const upstreamResponse = await getConversationMessages(id, {
      cursor,
      limit: limit ? Number(limit) : undefined,
    });

    if (!upstreamResponse.ok) {
      return buildPublicErrorResponse(upstreamResponse);
    }

    const data =
      (await upstreamResponse.json()) as ChatbaseListResponse<ChatbaseMessage>;
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
