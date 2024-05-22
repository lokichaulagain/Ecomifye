"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { CirclePlus, LoaderCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { supabase } from "@/utils/supabase/supabaseClient";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(31, {
    message: "Size must be at least 1 character.",
  }),

  description: z.string().optional(),
});

export default function SizeCreateSheet({ size }: any) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  // Define a submit handler
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsCreating(true);
    const { data, error, status } = await supabase.from("Size").insert([values]).select();

    if (error) {
      toast.error(error.details || "An error occurred during create. Please try again.");
      console.error("Failed to create size:", error.message);
      setIsCreating(false);
      return;
    }

    if (status === 201 && data) {
      form.reset();
      setIsCreating(false);
      toast.success("Size created successfully");
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
          Add New
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader className=" mb-4">
          <SheetTitle>Create Size</SheetTitle>
          <SheetDescription>Insert necessary data and click create size when youre done.</SheetDescription>
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
                  <FormLabel>Size *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="XL"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Extra Large"
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
              {isCreating && (
                <LoaderCircle
                  size={16}
                  className=" animate-spin mr-1 "
                />
              )}
              Create Size
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
