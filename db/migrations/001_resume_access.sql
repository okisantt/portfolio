create extension if not exists pgcrypto;

do $$ begin
  create type resume_request_status as enum (
    'pending_verification',
    'pending_approval',
    'approved',
    'rejected',
    'expired'
  );
exception
  when duplicate_object then null;
end $$;

create table if not exists resume_requests (
  id uuid primary key default gen_random_uuid(),
  public_id uuid not null unique default gen_random_uuid(),
  first_name text not null check (char_length(first_name) between 1 and 60),
  last_name text not null check (char_length(last_name) between 1 and 60),
  email text not null check (char_length(email) <= 254),
  email_normalized text not null,
  status resume_request_status not null default 'pending_verification',
  otp_digest text,
  otp_expires_at timestamptz,
  otp_attempts smallint not null default 0 check (otp_attempts between 0 and 5),
  otp_sent_at timestamptz,
  email_verified_at timestamptz,
  reviewed_at timestamptz,
  retention_until timestamptz not null default (now() + interval '90 days'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists resume_requests_status_idx on resume_requests (status, created_at desc);
create index if not exists resume_requests_email_idx on resume_requests (email_normalized, created_at desc);
create index if not exists resume_requests_retention_idx on resume_requests (retention_until);

create table if not exists resume_access_tokens (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null unique references resume_requests(id) on delete cascade,
  token_digest text not null unique,
  expires_at timestamptz not null,
  max_uses smallint not null default 3 check (max_uses between 1 and 10),
  use_count smallint not null default 0 check (use_count >= 0),
  revoked_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists resume_access_tokens_expiry_idx on resume_access_tokens (expires_at);

create table if not exists resume_security_events (
  id bigint generated always as identity primary key,
  request_id uuid references resume_requests(id) on delete cascade,
  event_type text not null check (char_length(event_type) <= 60),
  ip_digest text not null,
  user_agent text not null,
  created_at timestamptz not null default now()
);

create index if not exists resume_security_events_created_idx on resume_security_events (created_at desc);

create table if not exists resume_rate_limits (
  key_digest text primary key,
  window_started_at timestamptz not null,
  hits integer not null check (hits > 0)
);

alter table resume_requests enable row level security;
alter table resume_access_tokens enable row level security;
alter table resume_security_events enable row level security;
alter table resume_rate_limits enable row level security;

comment on table resume_requests is 'Solicitações de acesso ao currículo; acesso exclusivo do servidor.';
comment on table resume_access_tokens is 'Tokens temporários armazenados apenas como HMAC.';
