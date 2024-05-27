"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { CirclePlus, Loader, LoaderCircle, Save } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { supabase } from "@/utils/supabase/supabaseClient";
import { toast } from "sonner";
import { IconColor } from "@/components/custom/svg-icons/IconColor";

const formSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Color name must be at least 3 characters.",
    })
    .max(20, {
      message: "Size must be less than 20 characters.",
    }),

  hex: z
    .string()
    .min(7, {
      message: "Hex must be at least 7 characters.",
    })
    .max(7, {
      message: "Size must be less than 7 characters.",
    })
    .optional(),
});

export default function ColorCreateSheet({ setRefreshNow }: any) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      hex: "",
    },
  });

  // Define a submit handler
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsCreating(true);
    const { data, error, status } = await supabase.from("Color").insert([values]).select();

    if (error) {
      toast.error(error.details || "An error occurred during create. Please try again.");
      console.error("Failed to create color:", error.message);
      setIsCreating(false);
      return;
    }

    if (status === 201 && data) {
      form.reset();
      setIsCreating(false);
      setRefreshNow(true);
      toast.success("Color created successfully");
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
          Add New Color
        </Button>
      </SheetTrigger>

      <SheetContent className="sm:max-w-sm">
        <SheetHeader className=" mb-4">
          <SheetTitle className=" flex items-center gap-2">
            Create Color <IconColor className=" h-4 w-4 text-primary" />
          </SheetTitle>
          <SheetDescription>Insert necessary data and click create color when youre done.</SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color Name *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Light Blue"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="hex"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color Hex *</FormLabel>
                  <FormControl>
                    <Input
                      type="color"
                      placeholder="#000000"
                      {...field}
                    />
                  </FormControl>

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
                  className=" mr-1"
                />
              )}{" "}
              Create Color
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
