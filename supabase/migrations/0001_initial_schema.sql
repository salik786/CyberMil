-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- ─────────────────────────────────────────
-- PROFILES (extends auth.users)
-- ─────────────────────────────────────────
create type public.user_role as enum ('student', 'employer', 'admin');
create type public.job_type as enum ('full-time', 'part-time', 'casual', 'internship');
create type public.job_status as enum ('draft', 'active', 'closed');
create type public.application_status as enum ('pending', 'reviewed', 'shortlisted', 'rejected');

create table public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  role        public.user_role not null,
  full_name   text,
  avatar_url  text,
  created_at  timestamptz not null default now()
);

-- Auto-create a profile row on user signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, role, full_name)
  values (
    new.id,
    coalesce((new.raw_user_meta_data->>'role')::public.user_role, 'student'),
    new.raw_user_meta_data->>'full_name'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ─────────────────────────────────────────
-- STUDENT PROFILES
-- ─────────────────────────────────────────
create table public.student_profiles (
  user_id         uuid primary key references public.profiles(id) on delete cascade,
  tafe_campus     text,
  course          text,
  graduation_year smallint,
  bio             text,
  skills          text[] not null default '{}',
  resume_url      text,
  availability    public.job_type,
  is_visible      boolean not null default true
);

-- ─────────────────────────────────────────
-- EMPLOYER PROFILES
-- ─────────────────────────────────────────
create table public.employer_profiles (
  user_id       uuid primary key references public.profiles(id) on delete cascade,
  company_name  text not null,
  logo_url      text,
  website       text,
  industry      text,
  description   text,
  location      text,
  is_verified   boolean not null default false
);

-- ─────────────────────────────────────────
-- JOB LISTINGS
-- ─────────────────────────────────────────
create table public.job_listings (
  id              uuid primary key default uuid_generate_v4(),
  employer_id     uuid not null references public.employer_profiles(user_id) on delete cascade,
  title           text not null,
  description     text not null,
  location        text,
  job_type        public.job_type not null,
  required_skills text[] not null default '{}',
  salary_min      integer,
  salary_max      integer,
  status          public.job_status not null default 'draft',
  created_at      timestamptz not null default now(),
  expires_at      timestamptz
);

create index on public.job_listings (status, created_at desc);
create index on public.job_listings (employer_id);

-- ─────────────────────────────────────────
-- APPLICATIONS
-- ─────────────────────────────────────────
create table public.applications (
  id            uuid primary key default uuid_generate_v4(),
  student_id    uuid not null references public.student_profiles(user_id) on delete cascade,
  job_id        uuid not null references public.job_listings(id) on delete cascade,
  cover_letter  text,
  status        public.application_status not null default 'pending',
  created_at    timestamptz not null default now(),
  unique (student_id, job_id)
);

create index on public.applications (student_id);
create index on public.applications (job_id);

-- ─────────────────────────────────────────
-- SAVED JOBS
-- ─────────────────────────────────────────
create table public.saved_jobs (
  student_id  uuid not null references public.student_profiles(user_id) on delete cascade,
  job_id      uuid not null references public.job_listings(id) on delete cascade,
  saved_at    timestamptz not null default now(),
  primary key (student_id, job_id)
);

-- ─────────────────────────────────────────
-- ROW LEVEL SECURITY
-- ─────────────────────────────────────────
alter table public.profiles          enable row level security;
alter table public.student_profiles  enable row level security;
alter table public.employer_profiles enable row level security;
alter table public.job_listings      enable row level security;
alter table public.applications      enable row level security;
alter table public.saved_jobs        enable row level security;

-- profiles
create policy "Users can read own profile"
  on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

-- student_profiles
create policy "Students manage own profile"
  on public.student_profiles for all using (auth.uid() = user_id);
create policy "Employers can view visible student profiles"
  on public.student_profiles for select
  using (is_visible = true and exists (
    select 1 from public.profiles where id = auth.uid() and role = 'employer'
  ));

-- employer_profiles
create policy "Employers manage own profile"
  on public.employer_profiles for all using (auth.uid() = user_id);
create policy "Public can view verified employer profiles"
  on public.employer_profiles for select using (is_verified = true);

-- job_listings
create policy "Employers manage own listings"
  on public.job_listings for all using (auth.uid() = employer_id);
create policy "Public can view active listings"
  on public.job_listings for select using (status = 'active');

-- applications
create policy "Students manage own applications"
  on public.applications for all using (auth.uid() = student_id);
create policy "Employers view applications on their listings"
  on public.applications for select
  using (exists (
    select 1 from public.job_listings
    where id = applications.job_id and employer_id = auth.uid()
  ));
create policy "Employers update application status"
  on public.applications for update
  using (exists (
    select 1 from public.job_listings
    where id = applications.job_id and employer_id = auth.uid()
  ));

-- saved_jobs
create policy "Students manage own saved jobs"
  on public.saved_jobs for all using (auth.uid() = student_id);
