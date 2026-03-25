create extension if not exists pgcrypto;

create table if not exists public.profiles (
	id uuid primary key references auth.users(id) on delete cascade,
	email text unique not null,
	nick text not null,
	role text not null default 'user' check (role in ('admin', 'user')),
	approval_status text not null default 'pending' check (approval_status in ('pending', 'approved', 'rejected')),
	created_at timestamptz not null default now()
);

create table if not exists public.events (
	id uuid primary key default gen_random_uuid(),
	title text not null,
	event_begin timestamptz not null,
	event_end timestamptz not null,
	content text not null,
	status text not null default 'draft' check (status in ('draft', 'published')),
	logo_path text,
	cover_path text,
	created_by uuid references public.profiles(id) on delete set null,
	created_at timestamptz not null default now(),
	updated_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
	insert into public.profiles (id, email, nick, role, approval_status)
	values (
		new.id,
		new.email,
		coalesce(new.raw_user_meta_data->>'nick', ''),
		'user',
		'pending'
	);
	return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
	select exists (
		select 1
		from public.profiles
		where id = auth.uid()
			and role = 'admin'
	);
$$;

create or replace function public.is_approved()
returns boolean
language sql
stable
as $$
	select exists (
		select 1
		from public.profiles
		where id = auth.uid()
			and approval_status = 'approved'
	);
$$;

alter table public.profiles enable row level security;
alter table public.events enable row level security;

create policy "user can read own profile"
on public.profiles
for select
to authenticated
using (id = auth.uid());

create policy "admin can read all profiles"
on public.profiles
for select
to authenticated
using (public.is_admin());

create policy "admin can update profiles"
on public.profiles
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "approved users can read published events"
on public.events
for select
to authenticated
using (
	public.is_approved()
	and status = 'published'
);

create policy "admins can read all events"
on public.events
for select
to authenticated
using (public.is_admin());

create policy "admins can insert events"
on public.events
for insert
to authenticated
with check (public.is_admin());

create policy "admins can update events"
on public.events
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "admins can delete events"
on public.events
for delete
to authenticated
using (public.is_admin());
