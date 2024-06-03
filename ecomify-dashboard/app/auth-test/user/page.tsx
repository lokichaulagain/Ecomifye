"use client";
import { Button } from "@/components/ui/button";
import { supabase } from "@/utils/supabase/supabaseClient";
import React from "react";

export default function page() {
  const handleCreate = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: "user1@gmail.com",
      password: "Password",
      options: {
        data: {
          email: "user1@gmail.com",
          role: "user",
        },
      },
    });
  };

  return (
    <div>
      <Button onClick={handleCreate}>Create User (Normal user )</Button>
    </div>
  );
}
