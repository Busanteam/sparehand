-- Optional Supabase schema for SpareHand (cloud sync later).
-- Local MVP uses browser storage; run this when you connect Supabase.

create extension if not exists "pgcrypto";

create table if not exists workspaces (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  abn text,
  created_at timestamptz not null default now()
);

create table if not exists rate_items (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  code text not null,
  label text not null,
  unit text not null,
  unit_price_ex_gst numeric(12,2) not null,
  created_at timestamptz not null default now()
);

create table if not exists job_items (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  kind text not null check (kind in ('inbox','meeting','document','quote','webhook')),
  title text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists job_items_workspace_created_idx
  on job_items (workspace_id, created_at desc);
