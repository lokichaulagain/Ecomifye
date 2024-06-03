"use server"
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";

import React from "react";

export async function HAHA() {
  const supabase = createClient();
  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };
  return (
    <div>
      <Button onClick={handleLogin}>Login with google</Button>
    </div>
  );
}
