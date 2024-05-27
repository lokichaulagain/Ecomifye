"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Check, CirclePlus, Copy, Loader, RefreshCw, Save } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { supabase } from "@/utils/supabase/supabaseClient";
import { toast } from "sonner";
import { IconStore } from "@/components/custom/svg-icons/IconStore";

const formSchema = z.object({
  email: z
    .string()
    .min(8, {
      message: "Vendor email must be at least 8 character.",
    })
    .max(40, {
      message: "Vendor email must be less than 40 characters.",
    })
    .email(),

  password: z
    .string()
    .min(7, {
      message: "Password must be at least 7 character.",
    })
    .max(22, {
      message: "Password must be less than 22 characters.",
    }),
});

export default function VendorCreateSheet({ size, setRefreshNow }: any) {
  const [password, setPassword] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const [isRotatePassword, setIsRotatePassword] = useState<boolean>(false);
  const generatePassword = () => {
    setIsRotatePassword(true);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?";
    let newPassword = "";
    for (let i = 0; i < 12; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(newPassword);
    form.setValue("password", newPassword);
    setTimeout(() => {
      setIsRotatePassword(false);
    }, 500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    toast.info("Password copied to clipboard");
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000); // 2 seconds
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Define a submit handler
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsCreating(true);
    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          email: values.email,
          role: "vendor",
        },
      },
    });

    if (error) {
      toast.error(error.message || "An error occurred during create. Please try again.");
      setIsCreating(false);
      return;
    }

    if (data) {
      form.reset();
      setIsCreating(false);
      setRefreshNow(true);
      toast.success("Vendor created successfully");
      return;
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <CirclePlus
            size={16}
            className=" mr-1"
          />
          Add New Vendor
        </Button>
      </SheetTrigger>

      <SheetContent className="sm:max-w-sm">
        <SheetHeader className=" mb-4">
          <SheetTitle className=" flex items-center gap-2">
            Create Vendor <IconStore className=" h-4 w-4 text-primary" />{" "}
          </SheetTitle>
          <SheetDescription>Insert necessary data and click create vendor when youre done.</SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vendor Email *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="vendor@gmail.com"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password *</FormLabel>
                  <div className=" flex items-center gap-4 ">
                    <FormControl>
                      <Input
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>

                    <div className=" flex items-center gap-1">
                      <Button
                        type="button"
                        variant={"outline"}
                        onClick={generatePassword}
                        className="mr-2">
                        <RefreshCw
                          className={`${isRotatePassword ? "animate-spin" : ""}`}
                          size={16}
                        />
                      </Button>
                      <Button
                        type="button"
                        variant={"outline"}
                        onClick={copyToClipboard}>
                        {isCopied ? <Check size={16} /> : <Copy size={16} />}
                      </Button>
                    </div>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={isCreating}
              className=" float-end"
              type="submit">
              {isCreating ? (
                <Loader
                  size={16}
                  className=" animate-spin mr-1 "
                />
              ) : (
                <Save
                  size={16}
                  className="mr-1 "
                />
              )}
              Create Vendor
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
