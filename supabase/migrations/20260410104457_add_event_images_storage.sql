insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
	'event-images',
	'event-images',
	true,
	5242880,
	array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
set
	public = excluded.public,
	file_size_limit = excluded.file_size_limit,
	allowed_mime_types = excluded.allowed_mime_types;

create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
	select exists (
		select 1
		from public.profiles p
		where p.id = auth.uid()
		and p.role = 'admin'
	);
$$;

create policy "admins can upload event images"
on storage.objects
for insert
to authenticated
with check (
	bucket_id = 'event-images'
	and public.is_admin()
);

create policy "admins can select event images"
on storage.objects
for select
to authenticated
using (
	bucket_id = 'event-images'
	and public.is_admin()
);

create policy "admins can update event images"
on storage.objects
for update
to authenticated
using (
	bucket_id = 'event-images'
	and public.is_admin()
)
with check (
	bucket_id = 'event-images'
	and public.is_admin()
);

create policy "admins can delete event images"
on storage.objects
for delete
to authenticated
using (
	bucket_id = 'event-images'
	and public.is_admin()
);
