-- Optional Supabase schema for SpareHand (cloud sync / hired builds).
-- Local MVP uses browser storage; run this when you connect Supabase.

create extension if not exists "pgcrypto";

create table if not exists workspaces (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  abn text,
  tax_rate numeric(6,4) not null default 0.10,
  currency text not null default 'AUD',
  currency_locale text not null default 'en-AU',
  pdf_brand_color text not null default '#0f766e',
  created_at timestamptz not null default now()
);

create table if not exists workspace_members (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  user_id uuid not null,
  role text not null check (role in ('admin','estimator','office')),
  created_at timestamptz not null default now(),
  unique (workspace_id, user_id)
);

create table if not exists clients (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  name text not null,
  email text,
  phone text,
  site_address text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists rate_items (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  trade_id text,
  code text not null,
  label text not null,
  unit text not null,
  unit_price_ex_gst numeric(12,2) not null,
  created_at timestamptz not null default now()
);

create table if not exists quotes (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  client_id uuid references clients(id) on delete set null,
  client_name text not null default '',
  status text not null check (status in ('draft','sent','accepted','declined')),
  payload jsonb not null default '{}'::jsonb,
  totals jsonb not null default '{}'::jsonb,
  tax_rate numeric(6,4) not null default 0.10,
  currency text not null default 'AUD',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists quote_versions (
  id uuid primary key default gen_random_uuid(),
  quote_id uuid not null references quotes(id) on delete cascade,
  status text not null,
  snapshot jsonb not null,
  note text,
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

create index if not exists quotes_workspace_status_idx
  on quotes (workspace_id, status, updated_at desc);

create index if not exists clients_workspace_name_idx
  on clients (workspace_id, name);
