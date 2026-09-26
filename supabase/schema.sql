-- ============================================================
-- Lurnexa Database Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- 1. Courses
create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  title text not null,
  goal_prompt text not null,
  status text not null default 'generating',
  timeframe text,
  level text,
  format text,
  summary text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. Modules
create table if not exists public.modules (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  title text not null,
  objective text,
  "order" integer not null default 0,
  created_at timestamptz not null default now()
);

-- 3. Lessons
create table if not exists public.lessons (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references public.modules(id) on delete cascade,
  title text not null,
  content text not null,
  generated_by_agent text not null default 'Content Agent',
  "order" integer not null default 0,
  created_at timestamptz not null default now()
);

-- 4. Assessments
create table if not exists public.assessments (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references public.modules(id) on delete cascade,
  type text not null default 'quiz',
  content_json jsonb not null default '{}'::jsonb,
  generated_by_agent text not null default 'Assessment Agent',
  created_at timestamptz not null default now()
);

-- 5. Agent Runs
create table if not exists public.agent_runs (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  agent_name text not null,
  status text not null default 'queued',
  "order" integer not null default 0,
  started_at timestamptz,
  completed_at timestamptz,
  output_summary text,
  created_at timestamptz not null default now()
);

-- ============================================================
-- Indexes
-- ============================================================
create index if not exists idx_courses_user_id on public.courses(user_id);
create index if not exists idx_modules_course_id on public.modules(course_id);
create index if not exists idx_lessons_module_id on public.lessons(module_id);
create index if not exists idx_assessments_module_id on public.assessments(module_id);
create index if not exists idx_agent_runs_course_id on public.agent_runs(course_id);

-- ============================================================
-- Enable Row Level Security
-- ============================================================
alter table public.courses enable row level security;
alter table public.modules enable row level security;
alter table public.lessons enable row level security;
alter table public.assessments enable row level security;
alter table public.agent_runs enable row level security;

-- ============================================================
-- RLS Policies
-- ============================================================

-- Courses: users see only their own
create policy "Users view own courses" on public.courses
  for select using (auth.uid()::text = user_id);

create policy "Users insert own courses" on public.courses
  for insert with check (auth.uid()::text = user_id);

create policy "Users update own courses" on public.courses
  for update using (auth.uid()::text = user_id);

create policy "Users delete own courses" on public.courses
  for delete using (auth.uid()::text = user_id);

-- Modules: users see modules of their courses
create policy "Users view own modules" on public.modules
  for select using (
    exists (
      select 1 from public.courses
      where courses.id = modules.course_id
        and courses.user_id = auth.uid()::text
    )
  );

create policy "Users insert own modules" on public.modules
  for insert with check (
    exists (
      select 1 from public.courses
      where courses.id = modules.course_id
        and courses.user_id = auth.uid()::text
    )
  );

create policy "Users update own modules" on public.modules
  for update using (
    exists (
      select 1 from public.courses
      where courses.id = modules.course_id
        and courses.user_id = auth.uid()::text
    )
  );

create policy "Users delete own modules" on public.modules
  for delete using (
    exists (
      select 1 from public.courses
      where courses.id = modules.course_id
        and courses.user_id = auth.uid()::text
    )
  );

-- Lessons: users see lessons of their modules
create policy "Users view own lessons" on public.lessons
  for select using (
    exists (
      select 1 from public.modules
      join public.courses on courses.id = modules.course_id
      where modules.id = lessons.module_id
        and courses.user_id = auth.uid()::text
    )
  );

create policy "Users insert own lessons" on public.lessons
  for insert with check (
    exists (
      select 1 from public.modules
      join public.courses on courses.id = modules.course_id
      where modules.id = lessons.module_id
        and courses.user_id = auth.uid()::text
    )
  );

create policy "Users update own lessons" on public.lessons
  for update using (
    exists (
      select 1 from public.modules
      join public.courses on courses.id = modules.course_id
      where modules.id = lessons.module_id
        and courses.user_id = auth.uid()::text
    )
  );

create policy "Users delete own lessons" on public.lessons
  for delete using (
    exists (
      select 1 from public.modules
      join public.courses on courses.id = modules.course_id
      where modules.id = lessons.module_id
        and courses.user_id = auth.uid()::text
    )
  );

-- Assessments: users see assessments of their modules
create policy "Users view own assessments" on public.assessments
  for select using (
    exists (
      select 1 from public.modules
      join public.courses on courses.id = modules.course_id
      where modules.id = assessments.module_id
        and courses.user_id = auth.uid()::text
    )
  );

create policy "Users insert own assessments" on public.assessments
  for insert with check (
    exists (
      select 1 from public.modules
      join public.courses on courses.id = modules.course_id
      where modules.id = assessments.module_id
        and courses.user_id = auth.uid()::text
    )
  );

create policy "Users update own assessments" on public.assessments
  for update using (
    exists (
      select 1 from public.modules
      join public.courses on courses.id = modules.course_id
      where modules.id = assessments.module_id
        and courses.user_id = auth.uid()::text
    )
  );

create policy "Users delete own assessments" on public.assessments
  for delete using (
    exists (
      select 1 from public.modules
      join public.courses on courses.id = modules.course_id
      where modules.id = assessments.module_id
        and courses.user_id = auth.uid()::text
    )
  );

-- Agent Runs: users see runs of their courses
create policy "Users view own agent runs" on public.agent_runs
  for select using (
    exists (
      select 1 from public.courses
      where courses.id = agent_runs.course_id
        and courses.user_id = auth.uid()::text
    )
  );

create policy "Users insert own agent runs" on public.agent_runs
  for insert with check (
    exists (
      select 1 from public.courses
      where courses.id = agent_runs.course_id
        and courses.user_id = auth.uid()::text
    )
  );

create policy "Users update own agent runs" on public.agent_runs
  for update using (
    exists (
      select 1 from public.courses
      where courses.id = agent_runs.course_id
        and courses.user_id = auth.uid()::text
    )
  );
