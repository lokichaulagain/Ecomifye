import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fbggruxahrktrgxelttm.supabase.co";

// Servoce_role secret
// const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZiZ2dydXhhaHJrdHJneGVsdHRtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxMzgzOTg0MiwiZXhwIjoyMDI5NDE1ODQyfQ.FCDB5j7LQ4cN3TuOxFw1kPcQSKsDqyQ1Qo6IOq7T1jg";

// not anonymous key
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZiZ2dydXhhaHJrdHJneGVsdHRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM4Mzk4NDIsImV4cCI6MjAyOTQxNTg0Mn0.VSRkKSkfEWwxVnrZ1Chr7t4_Azu4wn-jiP4Nl3kYZ50";
export const supabase = createClient(supabaseUrl, supabaseKey);

