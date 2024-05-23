"use client";
import { Button } from "@/components/ui/button";
import { supabase } from "@/utils/supabase/supabaseClient";
import React from "react";

export default function page() {
  // const handleCreate = async () => {
  //   const { data, error } = await supabase.auth.admin.createUser({
  //     email: "lokichaulagain4@gmail.com",
  //     password: "Password",
  //     email_confirm: true,
  //     user_metadata: {
  //       // full_name: values.full_name,
  //       // username: values.username,
  //       // role: values.role,
  //     },
  //     role: "something"   // only predefined roles can be assigned
  //   });
  // };

  // const handleCreate = async () => {
  //   const { data, error } = await supabase.auth.signUp({
  //     email: "lokichaulagain2@gmail.com",
  //     password: "Password",
  //     options: {
  //       data: {
  //         role: "vendor",
  //         email: "lokichaulagain2@gmail.com",
  //       },
  //     },
  //   });
  // };

  const signUpNewVendor = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: "vendor4@gmail.com",
      password: "Password",
      options: {
        data: { role: "vendor" },
        emailRedirectTo: "https://example.com/welcome",
      },
    });
  };

  return (
    <div>
      <Button onClick={signUpNewVendor}>Create User</Button>
    </div>
  );
}
