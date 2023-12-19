import { createClient } from "@supabase/supabase-js";
import { Database } from "../types_db";

export const supabase = createClient<Database>(
    process.env.REACT_APP_SUPABASE_URL??"",
    process.env.REACT_APP_SUPABASE_ANON_KEY??""
  );