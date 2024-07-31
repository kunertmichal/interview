create table "public"."organizations" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "name" text not null,
    "owner_id" uuid not null
);


alter table "public"."organizations" enable row level security;

alter table "public"."profiles" add column "organization_id" uuid;

CREATE UNIQUE INDEX organisations_pkey ON public.organizations USING btree (id);

CREATE UNIQUE INDEX organizations_owner_id_key ON public.organizations USING btree (owner_id);

alter table "public"."organizations" add constraint "organisations_pkey" PRIMARY KEY using index "organisations_pkey";

alter table "public"."organizations" add constraint "organizations_owner_id_fkey" FOREIGN KEY (owner_id) REFERENCES profiles(id) not valid;

alter table "public"."organizations" validate constraint "organizations_owner_id_fkey";

alter table "public"."organizations" add constraint "organizations_owner_id_key" UNIQUE using index "organizations_owner_id_key";

alter table "public"."profiles" add constraint "profiles_organization_id_fkey" FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE SET NULL not valid;

alter table "public"."profiles" validate constraint "profiles_organization_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_organization_and_assign(name text, owner_id uuid)
 RETURNS uuid
 LANGUAGE plpgsql
AS $function$DECLARE
    v_org_id UUID;
BEGIN
    -- Wstawienie nowej organizacji
    INSERT INTO organizations (name, owner_id)
    VALUES (name, owner_id)
    RETURNING id INTO v_org_id;

    -- Aktualizacja użytkownika - przypisanie organization_id
    UPDATE profiles
    SET organization_id = v_org_id
    WHERE id = owner_id;

    -- Zwrócenie ID nowo utworzonej organizacji
    RETURN v_org_id;
END;$function$
;

grant delete on table "public"."organizations" to "anon";

grant insert on table "public"."organizations" to "anon";

grant references on table "public"."organizations" to "anon";

grant select on table "public"."organizations" to "anon";

grant trigger on table "public"."organizations" to "anon";

grant truncate on table "public"."organizations" to "anon";

grant update on table "public"."organizations" to "anon";

grant delete on table "public"."organizations" to "authenticated";

grant insert on table "public"."organizations" to "authenticated";

grant references on table "public"."organizations" to "authenticated";

grant select on table "public"."organizations" to "authenticated";

grant trigger on table "public"."organizations" to "authenticated";

grant truncate on table "public"."organizations" to "authenticated";

grant update on table "public"."organizations" to "authenticated";

grant delete on table "public"."organizations" to "service_role";

grant insert on table "public"."organizations" to "service_role";

grant references on table "public"."organizations" to "service_role";

grant select on table "public"."organizations" to "service_role";

grant trigger on table "public"."organizations" to "service_role";

grant truncate on table "public"."organizations" to "service_role";

grant update on table "public"."organizations" to "service_role";

create policy "Policy with security definer functions"
on "public"."organizations"
as permissive
for all
to authenticated
using (true);


create policy "Reading organization"
on "public"."organizations"
as permissive
for select
to authenticated
using ((id IN ( SELECT profiles.organization_id
   FROM profiles
  WHERE (profiles.id = auth.uid()))));


create policy "Policy with security definer functions"
on "public"."profiles"
as permissive
for all
to authenticated
using (true);



