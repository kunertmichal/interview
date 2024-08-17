drop policy "Policy with security definer functions" on "public"."notifications";

drop function if exists "public"."create_organization_and_assign"(name text, owner_id uuid);

create table "public"."permissions" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "action" character varying not null,
    "entity" character varying not null,
    "access" character varying not null
);


alter table "public"."permissions" enable row level security;

create table "public"."profiles_to_roles" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "profile_id" uuid not null,
    "role_id" uuid not null
);


alter table "public"."profiles_to_roles" enable row level security;

create table "public"."roles" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "name" character varying not null
);


alter table "public"."roles" enable row level security;

create table "public"."roles_to_permissions" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "role_id" uuid not null default gen_random_uuid(),
    "permission_id" uuid not null default gen_random_uuid()
);


alter table "public"."roles_to_permissions" enable row level security;

CREATE UNIQUE INDEX permissions_pkey ON public.permissions USING btree (id);

CREATE UNIQUE INDEX profiles_to_roles_pkey ON public.profiles_to_roles USING btree (id);

CREATE UNIQUE INDEX roles_pkey ON public.roles USING btree (id);

CREATE UNIQUE INDEX roles_to_permissions_pkey ON public.roles_to_permissions USING btree (id);

alter table "public"."permissions" add constraint "permissions_pkey" PRIMARY KEY using index "permissions_pkey";

alter table "public"."profiles_to_roles" add constraint "profiles_to_roles_pkey" PRIMARY KEY using index "profiles_to_roles_pkey";

alter table "public"."roles" add constraint "roles_pkey" PRIMARY KEY using index "roles_pkey";

alter table "public"."roles_to_permissions" add constraint "roles_to_permissions_pkey" PRIMARY KEY using index "roles_to_permissions_pkey";

alter table "public"."profiles_to_roles" add constraint "profiles_to_roles_profile_id_fkey" FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE not valid;

alter table "public"."profiles_to_roles" validate constraint "profiles_to_roles_profile_id_fkey";

alter table "public"."profiles_to_roles" add constraint "profiles_to_roles_role_id_fkey" FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE not valid;

alter table "public"."profiles_to_roles" validate constraint "profiles_to_roles_role_id_fkey";

alter table "public"."roles_to_permissions" add constraint "roles_to_permissions_permission_id_fkey" FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE not valid;

alter table "public"."roles_to_permissions" validate constraint "roles_to_permissions_permission_id_fkey";

alter table "public"."roles_to_permissions" add constraint "roles_to_permissions_role_id_fkey" FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE not valid;

alter table "public"."roles_to_permissions" validate constraint "roles_to_permissions_role_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_organization_and_assign(org_name text, owner_id uuid)
 RETURNS uuid
 LANGUAGE plpgsql
AS $function$DECLARE
    v_org_id UUID;
    v_role_id UUID;
BEGIN
    -- Wstawienie nowej organizacji
    INSERT INTO organizations (name, owner_id)
    VALUES (org_name, owner_id)
    RETURNING id INTO v_org_id;

    -- Aktualizacja użytkownika - przypisanie organization_id
    UPDATE profiles
    SET organization_id = v_org_id
    WHERE id = owner_id;

        -- Znalezienie role_id dla "organization_owner"
    SELECT id INTO v_role_id
    FROM roles
    WHERE name = 'organization_owner';

    -- Aktualizacja roli
    INSERT INTO profiles_to_roles (profile_id, role_id)
    VALUES (owner_id, v_role_id);

    -- Zwrócenie ID nowo utworzonej organizacji
    RETURN v_org_id;
END;$function$
;

grant delete on table "public"."permissions" to "anon";

grant insert on table "public"."permissions" to "anon";

grant references on table "public"."permissions" to "anon";

grant select on table "public"."permissions" to "anon";

grant trigger on table "public"."permissions" to "anon";

grant truncate on table "public"."permissions" to "anon";

grant update on table "public"."permissions" to "anon";

grant delete on table "public"."permissions" to "authenticated";

grant insert on table "public"."permissions" to "authenticated";

grant references on table "public"."permissions" to "authenticated";

grant select on table "public"."permissions" to "authenticated";

grant trigger on table "public"."permissions" to "authenticated";

grant truncate on table "public"."permissions" to "authenticated";

grant update on table "public"."permissions" to "authenticated";

grant delete on table "public"."permissions" to "service_role";

grant insert on table "public"."permissions" to "service_role";

grant references on table "public"."permissions" to "service_role";

grant select on table "public"."permissions" to "service_role";

grant trigger on table "public"."permissions" to "service_role";

grant truncate on table "public"."permissions" to "service_role";

grant update on table "public"."permissions" to "service_role";

grant delete on table "public"."profiles_to_roles" to "anon";

grant insert on table "public"."profiles_to_roles" to "anon";

grant references on table "public"."profiles_to_roles" to "anon";

grant select on table "public"."profiles_to_roles" to "anon";

grant trigger on table "public"."profiles_to_roles" to "anon";

grant truncate on table "public"."profiles_to_roles" to "anon";

grant update on table "public"."profiles_to_roles" to "anon";

grant delete on table "public"."profiles_to_roles" to "authenticated";

grant insert on table "public"."profiles_to_roles" to "authenticated";

grant references on table "public"."profiles_to_roles" to "authenticated";

grant select on table "public"."profiles_to_roles" to "authenticated";

grant trigger on table "public"."profiles_to_roles" to "authenticated";

grant truncate on table "public"."profiles_to_roles" to "authenticated";

grant update on table "public"."profiles_to_roles" to "authenticated";

grant delete on table "public"."profiles_to_roles" to "service_role";

grant insert on table "public"."profiles_to_roles" to "service_role";

grant references on table "public"."profiles_to_roles" to "service_role";

grant select on table "public"."profiles_to_roles" to "service_role";

grant trigger on table "public"."profiles_to_roles" to "service_role";

grant truncate on table "public"."profiles_to_roles" to "service_role";

grant update on table "public"."profiles_to_roles" to "service_role";

grant delete on table "public"."roles" to "anon";

grant insert on table "public"."roles" to "anon";

grant references on table "public"."roles" to "anon";

grant select on table "public"."roles" to "anon";

grant trigger on table "public"."roles" to "anon";

grant truncate on table "public"."roles" to "anon";

grant update on table "public"."roles" to "anon";

grant delete on table "public"."roles" to "authenticated";

grant insert on table "public"."roles" to "authenticated";

grant references on table "public"."roles" to "authenticated";

grant select on table "public"."roles" to "authenticated";

grant trigger on table "public"."roles" to "authenticated";

grant truncate on table "public"."roles" to "authenticated";

grant update on table "public"."roles" to "authenticated";

grant delete on table "public"."roles" to "service_role";

grant insert on table "public"."roles" to "service_role";

grant references on table "public"."roles" to "service_role";

grant select on table "public"."roles" to "service_role";

grant trigger on table "public"."roles" to "service_role";

grant truncate on table "public"."roles" to "service_role";

grant update on table "public"."roles" to "service_role";

grant delete on table "public"."roles_to_permissions" to "anon";

grant insert on table "public"."roles_to_permissions" to "anon";

grant references on table "public"."roles_to_permissions" to "anon";

grant select on table "public"."roles_to_permissions" to "anon";

grant trigger on table "public"."roles_to_permissions" to "anon";

grant truncate on table "public"."roles_to_permissions" to "anon";

grant update on table "public"."roles_to_permissions" to "anon";

grant delete on table "public"."roles_to_permissions" to "authenticated";

grant insert on table "public"."roles_to_permissions" to "authenticated";

grant references on table "public"."roles_to_permissions" to "authenticated";

grant select on table "public"."roles_to_permissions" to "authenticated";

grant trigger on table "public"."roles_to_permissions" to "authenticated";

grant truncate on table "public"."roles_to_permissions" to "authenticated";

grant update on table "public"."roles_to_permissions" to "authenticated";

grant delete on table "public"."roles_to_permissions" to "service_role";

grant insert on table "public"."roles_to_permissions" to "service_role";

grant references on table "public"."roles_to_permissions" to "service_role";

grant select on table "public"."roles_to_permissions" to "service_role";

grant trigger on table "public"."roles_to_permissions" to "service_role";

grant truncate on table "public"."roles_to_permissions" to "service_role";

grant update on table "public"."roles_to_permissions" to "service_role";

create policy "Policy with security definer functions"
on "public"."permissions"
as permissive
for all
to authenticated
using (true);


create policy "Policy with security definer functions"
on "public"."profiles_to_roles"
as permissive
for all
to authenticated
using (true);


create policy "Policy with security definer functions"
on "public"."roles"
as permissive
for all
to authenticated
using (true);


create policy "Policy with security definer functions"
on "public"."roles_to_permissions"
as permissive
for all
to authenticated
using (true);


create policy "Policy with security definer functions"
on "public"."notifications"
as permissive
for all
to authenticated
using (true);



