import { createClient } from "@supabase/supabase-js";
import { Database } from "../types_db";

export const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL??"https://eeneqkxcgwlngbdyhixv.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY??"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVlbmVxa3hjZ3dsbmdiZHloaXh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI5MTQxNjAsImV4cCI6MjAxODQ5MDE2MH0.Wz_c8CFwHK3wWg1mVbWJq-PPjMt8djB5eO60PQ9K7mQ"
  );