# ASI Gabon

ASI Gabon is now structured as a Next.js App Router application that preserves the exported Google Stitch design while wiring the assistant experience to Chatbase. The current project is prepared for both API mode and widget mode; with the current plan limitation, the production path is the official Chatbase widget plus secure JWT identification.

## Required environment variables

Create a local `.env.local` file with:

```bash
CHATBASE_API_KEY=your-chatbase-api-key
CHATBASE_AGENT_ID=your-chatbase-agent-id
CHATBOT_IDENTITY_SECRET=your-chatbase-widget-identity-secret
```

Values that must be provided by you:

- `CHATBASE_API_KEY`
- `CHATBASE_AGENT_ID`
- `CHATBOT_IDENTITY_SECRET` for widget identity verification

## User identity

If no authenticated user system is wired in, the app now generates a browser-persisted anonymous `userId` automatically for Chatbase widget identification. This ID:

- is stored in `localStorage`
- is stable across reloads on the same browser
- follows Chatbase constraints (`anon-...`, max 128 chars, only `a-zA-Z0-9._-`)

When you add a real authentication system later, the widget identity route can sign a real stable user ID instead.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Test streaming

1. Go to `/assistant`.
2. Send a message in the existing Stitch chat UI.
3. Verify that the Chatbase widget opens from the Stitch-designed assistant page.
4. If `CHATBOT_IDENTITY_SECRET` is configured, verify that `/api/chatbase/identity` returns a signed JWT and the anonymous user remains stable across reloads.

## Build

```bash
npm run build
npm start
```

## Usage

- `/` keeps the Stitch landing page and routes CTAs into the assistant.
- `/assistant` is the Stitch-designed launcher page for the official Chatbase widget.
- `/services`, `/a-propos`, and `/support` preserve the remaining exported Stitch screens.

## Chatbase integration

Server-side Chatbase code lives in:

- `lib/chatbase/`
- `app/api/chat/`
- `app/api/conversations/[id]/`
- `app/api/chatbase/identity/`

Client-side widget and identity glue live in:

- `components/chatbase/`
- `lib/chatbase-widget/`
- `components/pages/assistant-page.tsx`
