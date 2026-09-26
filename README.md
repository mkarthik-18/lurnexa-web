# Lurnexa — Learning, Reimagined by AI Agents

Lurnexa is an AI-powered learning platform. You type a single learning goal, and a pipeline of specialized AI agents — Planner, Curriculum, Content, Assessment, QA, and Tutor — collaborate to generate a complete, personalized course with structured modules, detailed lessons, interactive quizzes, and live tutoring.

Built with **React 19 + TanStack Start**, **Tailwind CSS v4**, **Supabase** (Auth / Database / Realtime), and the **Gemini API** (Google Generative AI).

---

## Features

- **Goal-driven course generation** — type one learning objective, get a full course
- **AI agent pipeline** — Planner, Curriculum, Content, Assessment, QA, Tutor
- **Structured modules** — up to 10 sequenced learning modules per course
- **Detailed lessons** — markdown-formatted content with examples and key takeaways
- **Interactive quizzes** — code-based questions with instant feedback
- **Live tutor** — ask questions and get contextual answers
- **Google OAuth** — sign in seamlessly with your Google account
- **Real-time progress** — watch each agent complete its step live via Supabase Realtime

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TanStack Router/Start, Tailwind CSS v4 |
| Backend | TanStack Start server functions, Nitro |
| Database | Supabase (PostgreSQL + Realtime) |
| Auth | Supabase Auth (Google OAuth) |
| AI | Google Generative AI (Gemini) |
| Forms | React Hook Form + Zod validation |

---

## Prerequisites

- **Node.js 20+** — https://nodejs.org
- **npm** (or your preferred package manager)

---

## Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/<your-username>/lurnexa-web.git
   cd lurnexa-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create your `.env` file** in the project root (see `.env.example` for all required variables).

4. **Set up Supabase**
   - Create a new project at https://supabase.com
   - Enable **Google OAuth** in Authentication > Providers
   - Run the migrations in `supabase/migrations/` in your Supabase SQL editor
   - Copy your project URL and keys to `.env`

5. **Get a Gemini API key**
   - Go to https://aistudio.google.com/apikey
   - Create an API key and add it to `.env` as `GEMINI_API_KEY`

6. **Start the dev server**
   ```bash
   npm run dev
   ```

7. Open http://localhost:8080 in your browser.

---

## Environment Variables

| Variable | Description |
|---|---|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase publishable anon key (client-side) |
| `SUPABASE_URL` | Same Supabase project URL (server-side) |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-side) |
| `GEMINI_API_KEY` | Google Generative AI API key (server-side only) |

---

## How It Works

When a user enters a learning goal:

1. **Planner** analyzes the goal and decides the module count and timeframe
2. **Curriculum** structures modules with clear objectives and sequencing
3. **Content** writes detailed lessons for each module with examples
4. **Assessment** generates code-based quizzes with plausible distractors
5. **QA** reviews for tone, coherence, and accuracy
6. **Tutor** answers follow-up questions contextually

All agent progress is streamed in real-time via Supabase Realtime.

---

## Project Structure

```
src/
  lib/
    agents.functions.ts   # Server functions: course generation, tutoring, quiz logic
    error-reporting.ts    # Error capture and reporting utilities
  integrations/
    supabase/             # Supabase client, auth middleware, storage
  routes/
    _authenticated/       # Authenticated user pages (dashboard, course view)
    auth.tsx              # Google OAuth sign-in/sign-out
    __root.tsx            # Root layout with query client and global UI
  components/
    lurnexa/              # App-specific components (sparkle cursor, etc.)
    ui/                   # Reusable UI primitives (shadcn/ui)
```

---

## Scripts

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Lint the codebase
```

---

## License

MIT
