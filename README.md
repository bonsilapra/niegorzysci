# Local setup

Start with:
```
npm run dev
```

## Database

Run the local db with:
```
npx supabase start
```

### Local migrations

Creating new migration:
```
npx supabase migration new migration_name
```
Then restart:
```
npx supabase start
npx supabase db reset
```

To check migrations:
```
npx supabase migration list
```

to undo:
```
npx supabase db reset --last 1
or
npx supabase migration down --local --last 1
```

### For production

To push migration to prod:
```
npx supabase db push
```

Full reset:
```
npxsupabase db remote reset
```

### Seeds

to dump:
```
npx supabase db dump --local --data-only > supabase/seed.sql
```

to reset:

```
npx supabase db reset
```
