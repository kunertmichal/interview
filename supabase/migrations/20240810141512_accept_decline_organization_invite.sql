drop policy "Reading organization" on "public"."organizations";

create table "public"."organization_invites" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "sender_id" uuid not null default gen_random_uuid(),
    "receiver_id" uuid not null default gen_random_uuid(),
    "organization_id" uuid not null default gen_random_uuid(),
    "status" character varying not null
);


alter table "public"."organization_invites" enable row level security;

CREATE UNIQUE INDEX organization_invites_pkey ON public.organization_invites USING btree (id);

alter table "public"."organization_invites" add constraint "organization_invites_pkey" PRIMARY KEY using index "organization_invites_pkey";

alter table "public"."organization_invites" add constraint "organization_invites_organization_id_fkey" FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE not valid;

alter table "public"."organization_invites" validate constraint "organization_invites_organization_id_fkey";

alter table "public"."organization_invites" add constraint "organization_invites_receiver_id_fkey" FOREIGN KEY (receiver_id) REFERENCES profiles(id) ON DELETE CASCADE not valid;

alter table "public"."organization_invites" validate constraint "organization_invites_receiver_id_fkey";

alter table "public"."organization_invites" add constraint "organization_invites_sender_id_fkey" FOREIGN KEY (sender_id) REFERENCES profiles(id) ON DELETE CASCADE not valid;

alter table "public"."organization_invites" validate constraint "organization_invites_sender_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_organization_invite_and_notification(sender_id uuid, receiver_id uuid, organization_id uuid, status character varying, type character varying, content text, user_id uuid)
 RETURNS void
 LANGUAGE plpgsql
AS $function$BEGIN
    -- Wstawienie nowego zaproszenia
    INSERT INTO organization_invites (sender_id, receiver_id, organization_id, status)
    VALUES (sender_id, receiver_id, organization_id, status);

    -- Wstawienie nowej notyfikacji
    INSERT INTO notifications (type, content, is_read, action_url, user_id)
    VALUES (type, content, FALSE, NULL, user_id);
END;$function$
;

CREATE OR REPLACE FUNCTION public.react_to_organization_invite(notification_id uuid, new_status character varying)
 RETURNS void
 LANGUAGE plpgsql
AS $function$DECLARE
  invite_id UUID;
  org_id UUID;
  user_id UUID;
BEGIN
  -- Pobierz ID użytkownika z powiadomienia
  SELECT notifications.user_id
  INTO user_id
  FROM notifications
  WHERE notifications.id = notification_id;

  -- Pobierz ID zaproszenia na podstawie user_id i typu powiadomienia
  SELECT organization_invites.id, organization_invites.organization_id
  INTO invite_id, org_id
  FROM organization_invites
  JOIN notifications ON notifications.user_id = organization_invites.receiver_id
  WHERE notifications.id = notification_id 
    AND notifications.type = 'organization_invite' 
    AND organization_invites.status = 'pending';

  -- Sprawdź, czy zaproszenie istnieje
  IF invite_id IS NULL THEN
    RAISE EXCEPTION 'invite_id not found';
  END IF;

  -- Aktualizuj status zaproszenia
  UPDATE organization_invites
  SET status = new_status
  WHERE organization_invites.id = invite_id;

  -- Jeśli zaproszenie zostało zaakceptowane, zaktualizuj profil użytkownika
  IF new_status = 'accepted' THEN
    UPDATE profiles
    SET organization_id = org_id
    WHERE profiles.id = user_id;
  END IF;

    -- Oznacz powiadomienie jako przeczytane
  UPDATE notifications
  SET is_read = TRUE
  WHERE notifications.id = notification_id;
END$function$
;

grant delete on table "public"."organization_invites" to "anon";

grant insert on table "public"."organization_invites" to "anon";

grant references on table "public"."organization_invites" to "anon";

grant select on table "public"."organization_invites" to "anon";

grant trigger on table "public"."organization_invites" to "anon";

grant truncate on table "public"."organization_invites" to "anon";

grant update on table "public"."organization_invites" to "anon";

grant delete on table "public"."organization_invites" to "authenticated";

grant insert on table "public"."organization_invites" to "authenticated";

grant references on table "public"."organization_invites" to "authenticated";

grant select on table "public"."organization_invites" to "authenticated";

grant trigger on table "public"."organization_invites" to "authenticated";

grant truncate on table "public"."organization_invites" to "authenticated";

grant update on table "public"."organization_invites" to "authenticated";

grant delete on table "public"."organization_invites" to "service_role";

grant insert on table "public"."organization_invites" to "service_role";

grant references on table "public"."organization_invites" to "service_role";

grant select on table "public"."organization_invites" to "service_role";

grant trigger on table "public"."organization_invites" to "service_role";

grant truncate on table "public"."organization_invites" to "service_role";

grant update on table "public"."organization_invites" to "service_role";

create policy "Policy with security definer functions"
on "public"."organization_invites"
as permissive
for all
to authenticated
using (true);



