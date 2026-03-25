import jwt from "jsonwebtoken";

import {
  buildServerConfigErrorResponse,
  buildValidationErrorResponse,
} from "@/lib/chatbase/errors";
import { isValidChatbaseUserId } from "@/lib/chatbase-widget/user-id";

interface IdentityRouteBody {
  userId?: string;
}

export async function POST(request: Request) {
  let body: IdentityRouteBody;

  try {
    body = (await request.json()) as IdentityRouteBody;
  } catch {
    return buildValidationErrorResponse("La demande d'identification est invalide.");
  }

  const userId = body.userId?.trim();
  if (!userId || !isValidChatbaseUserId(userId)) {
    return buildValidationErrorResponse(
      "Le userId doit respecter le format Chatbase attendu.",
    );
  }

  const secret = process.env.CHATBOT_IDENTITY_SECRET?.trim();
  if (!secret) {
    return buildServerConfigErrorResponse(
      "CHATBOT_IDENTITY_SECRET est requis pour l'identification sécurisée du widget Chatbase.",
    );
  }

  const token = jwt.sign(
    {
      user_id: userId,
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    },
    secret,
    { algorithm: "HS256" },
  );

  return Response.json({ token });
}
