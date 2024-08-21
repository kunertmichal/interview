set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.react_to_organization_invite(notification_id uuid, new_status character varying)
 RETURNS void
 LANGUAGE plpgsql
AS $function$DECLARE
  invite_id UUID;
  org_id UUID;
  user_id UUID;
  role_id UUID;
BEGIN
  -- Pobierz ID użytkownika z powiadomienia
  SELECT notifications.user_id
  INTO user_id
  FROM notifications
  WHERE notifications.id = notification_id;

  -- Pobierz ID roli team_member
  SELECT roles.id
  INTO role_id
  FROM roles
  WHERE roles.name = 'organization_member';

  -- Utwórz rekord w profiles_to_roles
  INSERT INTO profiles_to_roles (profile_id, role_id)
  VALUES (user_id, role_id);

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


