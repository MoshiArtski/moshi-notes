// utils/getUser.ts
import { createClient } from "@/utils/supabase/server";

export async function getUser() {
  const {
    data: { user },
  } = await createClient().auth.getUser();
  return user;
}
