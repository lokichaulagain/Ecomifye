"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { FilePenLine, Loader } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { supabase } from "@/utils/supabase/supabaseClient";
import { toast } from "sonner";
import { IconSize } from "@/components/custom/svg-icons/IconSize";

const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Size must be at least 1 character.",
    })
    .max(40, {
      message: "Size must be less than 40 characters.",
    }),

  description: z
    .string()
    .max(40, {
      message: "Size must be less than 40 characters.",
    })
    .optional(),
});

export default function SizeEditSheet({ id, setRefreshNow }: any) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const [size, setSize] = useState<any>(undefined);
  useEffect(() => {
    const fetch = async () => {
      const { data, error, status } = await supabase.from("Size").select().eq("id", id).single();
      if (error) {
        console.error("Failed to fetch size:", error.message);
        return;
      }

      if (status === 200 && data) {
        setSize(data);
      }
    };
    fetch();
  }, [id]);

  useEffect(() => {
    if (size) {
      form.reset({
        name: size.name || "",
        description: size.description || "",
      });
    }
  }, [form, size]);

  // Define a submit handler
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsUpdating(true);
    const { data, error, status } = await supabase.from("Size").update(values).eq("id", id);

    if (error) {
      setIsUpdating(false);
      toast.error(error.details || "An error occurred during update. Please try again.");
      return;
    }

    if (status == 204) {
      setRefreshNow(true);
      form.reset();
      setIsUpdating(false);
      toast.success("Size updated successfully.");
      return;
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <span className=" flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ">View Details</span>
      </SheetTrigger>

      <SheetContent className="sm:max-w-sm">
        <SheetHeader className=" mb-4">
          <SheetTitle className=" flex items-center gap-2">
            Edit Size <IconSize className=" h-4 w-4 text-primary" />{" "}
          </SheetTitle>
          <SheetDescription>Insert necessary data and click edit size when youre done.</SheetDescription>
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
              disabled={isUpdating}
              className=" float-end"
              type="submit">
              {isUpdating ? (
                <Loader
                  size={16}
                  className=" animate-spin mr-1 "
                />
              ) : (
                <FilePenLine
                  size={16}
                  className="mr-1 "
                />
              )}
              Save Changes
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
