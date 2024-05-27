"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { supabase } from "@/utils/supabase/supabaseClient";
import { useState } from "react";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";

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

export default function Page() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();

  // Define a submit handler
  const [isLoging, setILoging] = useState<boolean>(false);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setILoging(true);
    const { data, error } = await supabase.auth.signInWithPassword(values);
    if (error) {
      toast.error(error.message || "An error occurred during create. Please try again.");
      setILoging(false);
      return;
    }
    console.log(data)

    if (data && data.user.role === "super-admin") {
      // console.log(data.user.role);
      form.reset();
      setILoging(false);
      toast.success("Hey Chief, Welcome back to the dashboard.");
      router.push("/super-admin");
      return;
    }

    if (data && data.user.user_metadata.role === "vendor") {
      // console.log(data.user.user_metadata.role);
      form.reset();
      setILoging(false);
      toast.success("Login successful , Welcome back to the dashboard.");
      router.push("/vendor");
      return;
    }
  };

  return (
    <div className="w-full lg:grid  lg:grid-cols-2 h-screen flex items-center justify-center overflow-hidden ">
      <div className="">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8">
            <Card className="mx-auto max-w-sm border-none">
              <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>Enter your email below to login to your account</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="lokichaulagain@gmail.com"
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
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="********"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    disabled={isLoging}
                    type="submit"
                    className="w-full flex items-center">
                    {isLoging && (
                      <Loader
                        size={16}
                        className="animate-spin mr-1"
                      />
                    )}
                    Login
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full">
                    Login with Google
                  </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                  I forgot my password ?{" "}
                  <Link
                    href="#"
                    className="underline">
                    Reset Now
                  </Link>
                </div>
              </CardContent>
            </Card>
          </form>
        </Form>
      </div>

      <div className="hidden bg-muted lg:block">
        <Image
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:contrast-[1.2]"
        />
      </div>
    </div>
  );
}
