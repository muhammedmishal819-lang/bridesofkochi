-- BridesOfKochi.com — Supabase schema + seed
-- Run this in Supabase SQL Editor

create table if not exists vendors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  category text not null check (category in ('photographer','makeup_artist')),
  area text not null,
  starting_price integer not null,
  price_range text not null check (price_range in ('Under 25k','25k-50k','50k+')),
  style text not null default '',
  bio text default '',
  profile_image text default '',
  gallery_images text[] default '{}',
  instagram_url text default '',
  whatsapp_number text default '',
  rating decimal default 4.8,
  review_count integer default 0,
  is_featured boolean default false,
  is_verified boolean default true,
  created_at timestamptz default now()
);

create index if not exists idx_vendors_category on vendors(category);
create index if not exists idx_vendors_slug on vendors(slug);
create index if not exists idx_vendors_featured on vendors(is_featured);

alter table vendors enable row level security;

drop policy if exists "public read" on vendors;
create policy "public read" on vendors for select using (true);

drop policy if exists "public insert" on vendors;
create policy "public insert" on vendors for insert with check (true);

drop policy if exists "public update" on vendors;
create policy "public update" on vendors for update using (true);

drop policy if exists "public delete" on vendors;
create policy "public delete" on vendors for delete using (true);

-- Seed 12 vendors
insert into vendors (name, slug, category, area, starting_price, price_range, style, bio, profile_image, gallery_images, instagram_url, whatsapp_number, rating, review_count, is_featured, is_verified) values
('Lens & Light Kochi','lens-and-light-kochi','photographer','Kakkanad',45000,'25k-50k','Candid, Cinematic','Candid-first wedding team shooting across Kochi for 8 years. Calm crew, same-day teaser reels and premium albums.','https://images.unsplash.com/photo-1606216794074-735e91aa2c92?q=80&w=1200&auto=format&fit=crop',array['https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop','https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop','https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop'],'https://instagram.com/lensandlight.kochi','9847012345',4.9,132,true,true),
('Malabar Frames','malabar-frames','photographer','Fort Kochi',65000,'50k+','Cinematic, Traditional','Fort Kochi studio known for cinematic films and heritage backdrops. Drone, LED wall portraits and full-day coverage.','https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop',array['https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1200&auto=format&fit=crop','https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1200&auto=format&fit=crop','https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=1200&auto=format&fit=crop'],'https://instagram.com/malabarframes','9847023456',4.8,98,true,true),
('Shutter Stories','shutter-stories-kochi','photographer','Edappally',28000,'25k-50k','Candid, Traditional','Budget-friendly candid + traditional combo for intimate weddings and home functions around Edappally and Kalamassery.','https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop',array['https://images.unsplash.com/photo-1606216794074-735e91aa2c92?q=80&w=1200&auto=format&fit=crop','https://images.unsplash.com/photo-1591604466107-ec97de577aff?q=80&w=1200&auto=format&fit=crop','https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop'],'https://instagram.com/shutterstories.kochi','9847034567',4.7,76,false,true),
('Candid Karma','candid-karma','photographer','Kaloor',55000,'50k+','Candid','Two-women candid crew loved by brides for comfort and natural posing. Unposed mornings, emotional evenings.','https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1200&auto=format&fit=crop',array['https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop','https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop','https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1200&auto=format&fit=crop'],'https://instagram.com/candidkarma','9847045678',4.9,154,true,true),
('Eternal Knots','eternal-knots','photographer','Tripunithura',32000,'25k-50k','Traditional, Cinematic','Traditional Kerala wedding specialists. Full mundapuri coverage, muhurtham moments and family portraits done right.','https://images.unsplash.com/photo-1591604466107-ec97de577aff?q=80&w=1200&auto=format&fit=crop',array['https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop','https://images.unsplash.com/photo-1606216794074-735e91aa2c92?q=80&w=1200&auto=format&fit=crop','https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=1200&auto=format&fit=crop'],'https://instagram.com/eternalknots','9847056789',4.6,61,false,true),
('Pixel Priyan Films','pixel-priyan-films','photographer','Panampilly Nagar',80000,'50k+','Cinematic','Premium cinema-style wedding films with SFX teaser, couple story shoot in Fort Kochi and Mattancherry.','https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1200&auto=format&fit=crop',array['https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop','https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop','https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1200&auto=format&fit=crop'],'https://instagram.com/pixelpriyan','9847067890',5.0,48,false,true),
('Glow by Anjali','glow-by-anjali','makeup_artist','Kakkanad',15000,'Under 25k','HD, Natural','HD bridal makeup with soft Kerala glow. Trial available in Kakkanad studio, saree draping included.','https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=1200&auto=format&fit=crop',array['https://images.unsplash.com/photo-1610173826608-bd1f53a52db1?q=80&w=1200&auto=format&fit=crop','https://images.unsplash.com/photo-1457972729786-0411a8b2b626?q=80&w=1200&auto=format&fit=crop','https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1200&auto=format&fit=crop'],'https://instagram.com/glowbyanjali','9847078901',4.9,187,true,true),
('Airbrush Asha Menon','airbrush-asha-menon','makeup_artist','Panampilly Nagar',28000,'25k-50k','Airbrush, HD','Kochi bridal airbrush specialist for long-lasting sweat-proof finish. Destination weddings handled.','https://images.unsplash.com/photo-1610173826608-bd1f53a52db1?q=80&w=1200&auto=format&fit=crop',array['https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=1200&auto=format&fit=crop','https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1200&auto=format&fit=crop','https://images.unsplash.com/photo-1457972729786-0411a8b2b626?q=80&w=1200&auto=format&fit=crop'],'https://instagram.com/airbrushasha','9847089012',4.8,112,true,true),
('Natural Nidhi Bridal','natural-nidhi-bridal','makeup_artist','Edappally',12000,'Under 25k','Natural, HD','No-makeup makeup specialist for morning muhurthams. Skin-prep routine and hairstyle included.','https://images.unsplash.com/photo-1457972729786-0411a8b2b626?q=80&w=1200&auto=format&fit=crop',array['https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=1200&auto=format&fit=crop','https://images.unsplash.com/photo-1610173826608-bd1f53a52db1?q=80&w=1200&auto=format&fit=crop','https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=1200&auto=format&fit=crop'],'https://instagram.com/naturalnidhi','9847090123',4.7,89,false,true),
('Diva Divya Kochi','diva-divya-kochi','makeup_artist','Fort Kochi',18000,'Under 25k','HD, Airbrush','Bridal + family packages. On-venue touch-up box and pre-bridal glow plan for 30 days.','https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=1200&auto=format&fit=crop',array['https://images.unsplash.com/photo-1457972729786-0411a8b2b626?q=80&w=1200&auto=format&fit=crop','https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=1200&auto=format&fit=crop','https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1200&auto=format&fit=crop'],'https://instagram.com/divadivya.kochi','9847101234',4.8,143,false,true),
('Lakme Leela Studio','lakme-leela-studio','makeup_artist','Kaloor',22000,'Under 25k','Airbrush, Natural','Studio in Kaloor with trial room. Christian, Hindu and Muslim bridal looks with custom lens + lash bar.','https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=1200&auto=format&fit=crop',array['https://images.unsplash.com/photo-1610173826608-bd1f53a52db1?q=80&w=1200&auto=format&fit=crop','https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=1200&auto=format&fit=crop','https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1200&auto=format&fit=crop'],'https://instagram.com/leelastudio.kaloor','9847112345',4.6,67,false,true),
('Serene Sona Makeovers','serene-sona-makeovers','makeup_artist','Tripunithura',30000,'25k-50k','HD, Natural, Airbrush','Luxury bridal makeovers with premium palettes. Groom styling add-on available.','https://images.unsplash.com/photo-1596704017254-9b121068fb31?q=80&w=1200&auto=format&fit=crop',array['https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=1200&auto=format&fit=crop','https://images.unsplash.com/photo-1457972729786-0411a8b2b626?q=80&w=1200&auto=format&fit=crop','https://images.unsplash.com/photo-1610173826608-bd1f53a52db1?q=80&w=1200&auto=format&fit=crop'],'https://instagram.com/serenesona','9847123456',4.9,95,true,true)
on conflict (slug) do nothing;
