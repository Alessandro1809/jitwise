"use server";

import { redirect } from "next/navigation";

export async function submitContact(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!email || !message) {
    redirect("/contact?sent=0");
  }

  // TODO: Replace with real email or DB integration.
  console.log("Contact form submission", { name, email, message });

  redirect("/contact?sent=1");
}
