import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://jrxrvuyadvgcrwpzbcso.supabase.co";
const SERVICE_ROLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpyeHJ2dXlhZHZnY3J3cHpiY3NvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjMwNzQ2NCwiZXhwIjoyMDg3ODgzNDY0fQ.4W_8Sc7EK8RGjYp6IRgUtKkGt1JDZ46n2qfWon0rLtg";

const TEST_EMAIL = "test@jitwise.com";
const TEST_PASSWORD = "Test1234!";

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function run() {
  // Delete existing user if present
  const { data: existing } = await supabase.auth.admin.listUsers();
  const found = existing?.users?.find((u) => u.email === TEST_EMAIL);
  if (found) {
    await supabase.auth.admin.deleteUser(found.id);
    console.log("Usuario anterior eliminado.");
  }

  // Create user via Admin API (handles schema correctly)
  const { data, error } = await supabase.auth.admin.createUser({
    email: TEST_EMAIL,
    password: TEST_PASSWORD,
    email_confirm: true,
  });

  if (error) {
    console.error("Error creando usuario:", error.message);
    process.exit(1);
  }

  const userId = data.user.id;
  console.log("Usuario creado — ID:", userId);

  // Activate profile
  const { error: profileError } = await supabase
    .from("profiles")
    .update({ onboarding_completed: true, plan: "free" })
    .eq("id", userId);

  if (profileError) {
    console.error("Error activando perfil:", profileError.message);
    process.exit(1);
  }

  console.log("Perfil activado.");
  console.log("-----------------------------");
  console.log("Email:    ", TEST_EMAIL);
  console.log("Password: ", TEST_PASSWORD);
  console.log("-----------------------------");
}

run();
