alter table public.inquiries
  add column if not exists order_number text;

create unique index if not exists inquiries_order_number_key
  on public.inquiries (order_number)
  where order_number is not null;

update public.inquiries
set order_number = 'KS-' || to_char(created_at at time zone 'Asia/Kolkata', 'YYYYMMDD') || '-' || upper(substr(replace(id::text, '-', ''), 1, 4))
where order_number is null;
