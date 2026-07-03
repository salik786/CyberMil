-- Dev seed data — only run against local Supabase instance
-- supabase db reset will apply migrations then run this file

-- Note: auth.users are created via supabase dashboard or auth API in dev.
-- This seeds profile data assuming user IDs already exist.

-- Example: to seed locally, create two users via `supabase auth signup` first,
-- then replace the UUIDs below with their actual IDs.

-- insert into public.employer_profiles (user_id, company_name, industry, location, description, is_verified)
-- values ('EMPLOYER_UUID', 'Acme Corp', 'Technology', 'Melbourne, VIC', 'We build things.', true);

-- insert into public.job_listings (employer_id, title, description, job_type, required_skills, status, salary_min, salary_max)
-- values ('EMPLOYER_UUID', 'Junior Web Developer', 'Join our team...', 'full-time', ARRAY['JavaScript', 'React'], 'active', 60000, 75000);
