import { TextEncoder } from "node:util";

import { NextResponse } from "next/server";

const encoder = new TextEncoder();

export function createStreamProxyResponse(upstreamResponse: Response) {
  const body = upstreamResponse.body;
  if (!body) {
    return NextResponse.json(
      {
        error: {
          code: "CHAT_STREAMING_ERROR",
          message:
            "Le flux de réponse n'a pas pu être initialisé. Réessayez dans quelques instants.",
        },
      },
      { status: 502 },
    );
  }

  const reader = body.getReader();
  const stream = new ReadableStream<Uint8Array>({
    async pull(controller) {
      try {
        const { done, value } = await reader.read();
        if (done) {
          controller.close();
          return;
        }

        controller.enqueue(value);
      } catch {
        controller.enqueue(
          encoder.encode(
            JSON.stringify({
              type: "error",
              error: {
                code: "CHAT_STREAMING_ERROR",
                message:
                  "La réponse a été interrompue pendant le streaming. Vous pouvez réessayer.",
              },
            }) + "\n",
          ),
        );
        controller.close();
      }
    },
    async cancel(reason) {
      await reader.cancel(reason);
    },
  });

  return new Response(stream, {
    status: 200,
    headers: {
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "Content-Type": "text/event-stream; charset=utf-8",
      "x-vercel-ai-ui-message-stream":
        upstreamResponse.headers.get("x-vercel-ai-ui-message-stream") ?? "v1",
    },
  });
}
