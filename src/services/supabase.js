import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://tgzsciesnrnuesinbkep.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRnenNjaWVzbnJudWVzaW5ia2VwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg0MjgyODEsImV4cCI6MjAzNDAwNDI4MX0.voS3e-KiE_wfce1E4XWNy4ekJ4T45WVaHXIMgHiqdpY";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
