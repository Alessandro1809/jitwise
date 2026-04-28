# Test User

## Credenciales

| Campo    | Valor            |
|----------|------------------|
| Email    | test@jitwise.com |
| Password | Test1234!        |

## Crear usuario (Supabase SQL Editor)

```sql
DELETE FROM auth.users WHERE email = 'test@jitwise.com';

DO $$
DECLARE
  new_user_id UUID;
BEGIN
  new_user_id := gen_random_uuid();

  INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    raw_app_meta_data,
    raw_user_meta_data,
    is_super_admin,
    confirmation_token,
    recovery_token
  ) VALUES (
    '00000000-0000-0000-0000-000000000000',
    new_user_id,
    'authenticated',
    'authenticated',
    'test@jitwise.com',
    crypt('Test1234!', gen_salt('bf')),
    now(),
    now(),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{}',
    false,
    '',
    ''
  );

  INSERT INTO auth.identities (
    id,
    user_id,
    identity_data,
    provider,
    provider_id,
    last_sign_in_at,
    created_at,
    updated_at
  ) VALUES (
    new_user_id,
    new_user_id,
    jsonb_build_object('sub', new_user_id::text, 'email', 'test@jitwise.com'),
    'email',
    new_user_id::text,
    now(),
    now(),
    now()
  );

  UPDATE public.profiles
  SET
    onboarding_completed = true,
    plan                 = 'free',
    updated_at           = now()
  WHERE id = new_user_id;

END $$;
```

## Activar plan Pro

```sql
UPDATE public.profiles
SET plan = 'pro', plan_expires_at = now() + interval '1 year'
WHERE id = (SELECT id FROM auth.users WHERE email = 'test@jitwise.com');
```

## Verificar estado

```sql
SELECT u.email, p.plan, p.plan_expires_at, p.onboarding_completed
FROM auth.users u
JOIN public.profiles p ON p.id = u.id
WHERE u.email = 'test@jitwise.com';
```
