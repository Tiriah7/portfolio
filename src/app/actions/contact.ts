"use server";

import { query } from "@/lib/db";

export async function submitContact(formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  await query(
    "INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3)",
    [name, email, message]
  );
}
