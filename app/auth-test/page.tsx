"use client";
import { Button } from "@/components/ui/button";
import { supabase } from "@/utils/supabase/supabaseClient";
import React from "react";

export default function page() {
  const handleCreate = async () => {
    const { data, error } = await supabase.auth.admin.createUser({
      email: "superadmin@gmail.com",
      password: "Password",
      email_confirm: true,
      user_metadata: {
        role: "super-admin",
        email: "superadmin@gmail.com",
      },
      role: "super-admin", // only predefined roles can be assigned
    });
  };

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

  // const signUpNewVendor = async () => {
  //   // const { data, error } = await supabase.auth.signUp({
  //   //   email: "vendor1@gmail.com",
  //   //   password: "Password",
  //   //   options: {
  //   //     data: { role: "vendor" },
  //   //     emailRedirectTo: "https://example.com/welcome",

  //   //   },
  //   // });

  //   const { data, error } = await supabase.auth.signUp({
  //     email: "lokichaulagain@gmail.com",
  //     password: "Password",
  //     options: {
  //       data: {
  //         email: "lokichaulagain@gmail.com",
  //         role: "super-admin",
  //       },
  //     },
  //   });
  // };

  return (
    <div>
      <Button onClick={handleCreate}>Create User</Button>
    </div>
  );
}
