"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { supabase } from "@/utils/supabase/supabaseClient";
import { toast } from "sonner";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ReloadIcon } from "@radix-ui/react-icons";
import useCloudinaryFileUpload from "@/hooks/useCloudinaryFileUpload";
import Image from "next/image";
import ButtonActionLoader from "@/components/custom/ButtonActionLoader";

type Props = {
  setRefreshNow: React.Dispatch<React.SetStateAction<boolean>>;
};

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be between 2-20 characters.",
    })
    .max(20, {
      message: "Name must be between 2-20 characters.",
    }),

  image: z.string().optional(),
  description: z.string().optional(),
});

export default function ProductCreateDialog({ setRefreshNow }: Props) {
  const [imageUrl, setImageUrl] = useState<string>("");

  // Define your form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      image: "",
      description: "",
    },
  });

  // Define a submit handler
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsCreating(true);
    const { data, error, status } = await supabase.from("Product").insert([values]).select();

    if (error) {
      toast.error(error.details || "An error occurred during create. Please try again.");
      console.error("Failed to create product:", error.message);
      setIsCreating(false);
      return;
    }

    if (status === 201 && data) {
      setRefreshNow(true);
      form.reset();
      setIsCreating(false);
      toast.success("Product created successfully");
      return;
    }
  };

  useEffect(() => {
    form.setValue("image", imageUrl);
  }, [form, imageUrl]);
  const { uploading, handleFileUpload } = useCloudinaryFileUpload();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create product</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[725px]">
        <DialogHeader>
          <DialogTitle>Create product</DialogTitle>
          <DialogDescription>Make changes to your profile here. Click save when youre done.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className=" grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name *</FormLabel>
                    <Input
                      placeholder="Enter category name"
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Product Image *<span className="text-primary/85  text-xs">[image must be less than 1MB]</span>
                    </FormLabel>
                    <div className=" flex items-center  gap-2">
                      <Input
                        type="file"
                        onChange={(event) => handleFileUpload(event.target.files?.[0], setImageUrl)}
                      />

                      <>
                        {uploading ? (
                          <div className=" flex flex-col gap-2 rounded-md items-center justify-center h-9 w-9 border">
                            <ButtonActionLoader />
                          </div>
                        ) : (
                          <Image
                            width={100}
                            height={100}
                            src={imageUrl}
                            alt="img"
                            className="p-0.5 rounded-md overflow-hidden h-9 w-9 border"
                          />
                        )}
                      </>
                    </div>
                  </FormItem>
                )}
              />
            </div>


            <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description Name *</FormLabel>
                    <Input
                      placeholder="Enter Description name"
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

            <div className=" flex justify-end mt-8">
              <Button
                type="submit"
                disabled={isCreating}>
                {isCreating && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                {isCreating ? " Please wait" : " Create Product"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
