-- ============================================
-- PetGuard — Schema SQL para Supabase
-- Ejecutar en: Supabase Dashboard → SQL Editor
-- ============================================

create table usuarios (
  id uuid references auth.users on delete cascade,
  nombre text,
  email text,
  created_at timestamptz default now(),
  primary key (id)
);

create table mascotas (
  id uuid default gen_random_uuid() primary key,
  usuario_id uuid references usuarios(id) on delete cascade,
  nombre text not null,
  especie text,
  raza text,
  edad int,
  peso numeric,
  foto_url text,
  created_at timestamptz default now()
);

create table historial_clinico (
  id uuid default gen_random_uuid() primary key,
  mascota_id uuid references mascotas(id) on delete cascade,
  fecha date,
  tipo_visita text,
  veterinario text,
  descripcion text,
  proxima_cita date,
  created_at timestamptz default now()
);

-- Row Level Security
alter table usuarios enable row level security;
alter table mascotas enable row level security;
alter table historial_clinico enable row level security;

create policy "users_own_data" on usuarios for all using (auth.uid() = id);
create policy "users_own_pets" on mascotas for all using (auth.uid() = usuario_id);
create policy "users_own_history" on historial_clinico for all
  using (mascota_id in (select id from mascotas where usuario_id = auth.uid()));
