import { NextResponse } from "next/server";

import type { ChatbaseErrorResponse, PublicApiError } from "@/types/chatbase";

export const FRIENDLY_CHATBASE_ERRORS: Record<string, string> = {
  AUTH_EXPIRED_API_KEY:
    "La connexion au service d'assistance a expiré. Réessayez plus tard.",
  AUTH_INVALID_API_KEY:
    "La connexion au service d'assistance est invalide. Vérifiez la configuration serveur.",
  AUTH_MISSING_API_KEY:
    "Le service d'assistance n'est pas encore configuré côté serveur.",
  CHAT_AGENT_CREDITS_EXHAUSTED:
    "L'agent ASI Gabon a atteint sa limite de crédits. Réessayez plus tard.",
  CHAT_CONVERSATION_NOT_ONGOING:
    "Cette conversation n'est plus active. Une nouvelle conversation est nécessaire.",
  CHAT_CREDITS_EXHAUSTED:
    "Le service d'assistance a momentanément atteint sa limite de crédits.",
  CHAT_STREAMING_ERROR:
    "La réponse a été interrompue pendant la génération. Vous pouvez réessayer.",
  INTERNAL_SERVER_ERROR:
    "Le service d'assistance rencontre un incident temporaire. Réessayez dans quelques instants.",
  RATE_LIMIT_TOO_MANY_REQUESTS:
    "Trop de requêtes ont été envoyées en peu de temps. Patientez avant de réessayer.",
  SUBSCRIPTION_PLAN_REQUIRED:
    "Le plan Chatbase actuel ne permet pas encore cet accès API.",
  VALIDATION_INVALID_BODY:
    "Le message n'a pas pu être envoyé. Vérifiez son contenu puis réessayez.",
};

export function getFriendlyErrorMessage(code: string, fallback?: string) {
  return FRIENDLY_CHATBASE_ERRORS[code] ?? fallback ?? "Une erreur inattendue est survenue.";
}

export function parseRetryAfter(value: string | null) {
  if (!value) {
    return null;
  }

  const asNumber = Number(value);
  if (Number.isFinite(asNumber)) {
    return Math.max(0, Math.round(asNumber));
  }

  const asDate = Date.parse(value);
  if (Number.isFinite(asDate)) {
    const seconds = Math.ceil((asDate - Date.now()) / 1000);
    return Math.max(0, seconds);
  }

  return null;
}

export function logChatbaseRequestId(
  level: "error" | "warn",
  message: string,
  requestId: string | null,
) {
  const prefix = requestId ? `[chatbase:${requestId}]` : "[chatbase]";
  const logger = level === "warn" ? console.warn : console.error;
  logger(`${prefix} ${message}`);
}

export async function buildPublicErrorResponse(response: Response) {
  const requestId = response.headers.get("x-request-id");
  const retryAfter = parseRetryAfter(response.headers.get("Retry-After"));

  let parsed: ChatbaseErrorResponse | null = null;
  try {
    parsed = (await response.json()) as ChatbaseErrorResponse;
  } catch {
    parsed = null;
  }

  const code = parsed?.error?.code ?? `HTTP_${response.status}`;
  const rawMessage = parsed?.error?.message;
  const publicError: PublicApiError = {
    code,
    message: getFriendlyErrorMessage(code, rawMessage),
    retryAfter,
  };

  logChatbaseRequestId(
    response.status >= 500 ? "error" : "warn",
    `${code}: ${rawMessage ?? "Unknown upstream error"}`,
    requestId,
  );

  return NextResponse.json({ error: publicError }, { status: response.status });
}

export function buildServerConfigErrorResponse(message: string) {
  return NextResponse.json(
    {
      error: {
        code: "CONFIG_MISSING_CHATBASE_ENV",
        message,
      } satisfies PublicApiError,
    },
    { status: 503 },
  );
}

export function buildValidationErrorResponse(message: string) {
  return NextResponse.json(
    {
      error: {
        code: "VALIDATION_INVALID_BODY",
        message,
      } satisfies PublicApiError,
    },
    { status: 400 },
  );
}

export function buildUpstreamNetworkErrorResponse(error: unknown) {
  const cause = error instanceof Error && "cause" in error ? error.cause : null;
  const causeCode =
    cause && typeof cause === "object" && "code" in cause
      ? String(cause.code)
      : null;

  const publicMessage =
    causeCode === "UNABLE_TO_GET_ISSUER_CERT_LOCALLY"
      ? "Le serveur n'arrive pas à établir une connexion sécurisée au service d'assistance. Vérifiez la configuration réseau ou le certificat de confiance de la machine."
      : "Le serveur n'arrive pas à joindre le service d'assistance pour le moment. Réessayez plus tard.";

  const detail =
    error instanceof Error ? `${error.name}: ${error.message}` : "Unknown upstream network error";

  logChatbaseRequestId(
    "error",
    causeCode ? `${detail} (${causeCode})` : detail,
    null,
  );

  return NextResponse.json(
    {
      error: {
        code: "UPSTREAM_NETWORK_ERROR",
        message: publicMessage,
      } satisfies PublicApiError,
    },
    { status: 502 },
  );
}
