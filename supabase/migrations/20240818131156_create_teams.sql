create table "public"."team_members" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "profile_id" uuid not null default gen_random_uuid(),
    "role_id" uuid not null default gen_random_uuid(),
    "team_id" uuid not null default gen_random_uuid()
);


alter table "public"."team_members" enable row level security;

create table "public"."teams" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "name" character varying not null,
    "organization_id" uuid default gen_random_uuid()
);


alter table "public"."teams" enable row level security;

CREATE UNIQUE INDEX team_members_pkey ON public.team_members USING btree (id);

CREATE UNIQUE INDEX teams_pkey ON public.teams USING btree (id);

alter table "public"."team_members" add constraint "team_members_pkey" PRIMARY KEY using index "team_members_pkey";

alter table "public"."teams" add constraint "teams_pkey" PRIMARY KEY using index "teams_pkey";

alter table "public"."team_members" add constraint "team_members_profile_id_fkey" FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE not valid;

alter table "public"."team_members" validate constraint "team_members_profile_id_fkey";

alter table "public"."team_members" add constraint "team_members_role_id_fkey" FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL not valid;

alter table "public"."team_members" validate constraint "team_members_role_id_fkey";

alter table "public"."team_members" add constraint "team_members_team_id_fkey" FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE not valid;

alter table "public"."team_members" validate constraint "team_members_team_id_fkey";

alter table "public"."teams" add constraint "teams_organization_id_fkey" FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE not valid;

alter table "public"."teams" validate constraint "teams_organization_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_team_and_assign(team_name character varying, org_id uuid, owner_id uuid)
 RETURNS uuid
 LANGUAGE plpgsql
AS $function$DECLARE
  new_team_id UUID;
  owner_role_id UUID;
BEGIN
  -- Utworzenie nowego zespołu
  INSERT INTO teams (name, organization_id)
  VALUES (team_name, org_id)
  RETURNING id INTO new_team_id;

  -- Znalezienie ID roli właściciela zespołu
  SELECT id INTO owner_role_id
  FROM roles
  WHERE name = 'team_owner';

  -- Sprawdzenie czy rola właściciela zespołu istnieje
  IF owner_role_id IS NULL THEN
    RAISE EXCEPTION 'Role team_owner does not exist';
  END IF;

  -- Dodanie właściciela do zespołu
  INSERT INTO team_members (profile_id, role_id, team_id)
  VALUES (owner_id, owner_role_id, new_team_id);

  -- Zwrócenie ID nowo utworzonego zespołu
  RETURN new_team_id;
END;$function$
;

grant delete on table "public"."team_members" to "anon";

grant insert on table "public"."team_members" to "anon";

grant references on table "public"."team_members" to "anon";

grant select on table "public"."team_members" to "anon";

grant trigger on table "public"."team_members" to "anon";

grant truncate on table "public"."team_members" to "anon";

grant update on table "public"."team_members" to "anon";

grant delete on table "public"."team_members" to "authenticated";

grant insert on table "public"."team_members" to "authenticated";

grant references on table "public"."team_members" to "authenticated";

grant select on table "public"."team_members" to "authenticated";

grant trigger on table "public"."team_members" to "authenticated";

grant truncate on table "public"."team_members" to "authenticated";

grant update on table "public"."team_members" to "authenticated";

grant delete on table "public"."team_members" to "service_role";

grant insert on table "public"."team_members" to "service_role";

grant references on table "public"."team_members" to "service_role";

grant select on table "public"."team_members" to "service_role";

grant trigger on table "public"."team_members" to "service_role";

grant truncate on table "public"."team_members" to "service_role";

grant update on table "public"."team_members" to "service_role";

grant delete on table "public"."teams" to "anon";

grant insert on table "public"."teams" to "anon";

grant references on table "public"."teams" to "anon";

grant select on table "public"."teams" to "anon";

grant trigger on table "public"."teams" to "anon";

grant truncate on table "public"."teams" to "anon";

grant update on table "public"."teams" to "anon";

grant delete on table "public"."teams" to "authenticated";

grant insert on table "public"."teams" to "authenticated";

grant references on table "public"."teams" to "authenticated";

grant select on table "public"."teams" to "authenticated";

grant trigger on table "public"."teams" to "authenticated";

grant truncate on table "public"."teams" to "authenticated";

grant update on table "public"."teams" to "authenticated";

grant delete on table "public"."teams" to "service_role";

grant insert on table "public"."teams" to "service_role";

grant references on table "public"."teams" to "service_role";

grant select on table "public"."teams" to "service_role";

grant trigger on table "public"."teams" to "service_role";

grant truncate on table "public"."teams" to "service_role";

grant update on table "public"."teams" to "service_role";

create policy "Policy with security definer functions"
on "public"."team_members"
as permissive
for all
to authenticated
using (true);


create policy "Policy with security definer functions"
on "public"."teams"
as permissive
for all
to authenticated
using (true);



