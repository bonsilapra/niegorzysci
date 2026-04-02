# Local setup

Run the local db with:
```
npx supabase start
```

Start with:
```
npm run dev
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
