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
import DialogTriggerAction from "@/components/custom/DialogTriggerAction";
import useCloudinaryFileUpload from "@/hooks/useCloudinaryFileUpload";
import ButtonActionLoader from "@/components/custom/ButtonActionLoader";
import Image from "next/image";
import { ICategoryOut } from "@/interfaces/category";

type Props = {
  id: number;
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
});

export default function CategoryEditDialog({ id, setRefreshNow }: Props) {
  const [imageUrl, setImageUrl] = useState<string>("");

  // Define your form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      image: "",
    },
  });

  const [isFetching, setIsFetching] = useState<boolean>(false);
  //   const [category, setCategory] = useState<ICategoryOut | undefined>(undefined);
  const [category, setCategory] = useState<ICategoryOut | undefined>(undefined);
  useEffect(() => {
    const fetch = async () => {
      setIsFetching(true);
      const { data, error, status } = await supabase.from("Category").select().eq("id", id).single();

      if (error) {
        console.error("Failed to fetch category:", error.message);
        setIsFetching(false);
        return;
      }

      if (status === 200 && data) {
        setCategory(data);
        setIsFetching(false);
      }
    };

    fetch();
  }, [id]);

  useEffect(() => {
    if (category) {
      form.reset({
        name: category.name || "",
        image: category.image || "",
      });
    }
  }, [form, category]);

  // Define a submit handler
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsUpdating(true);
    const { data, error, status } = await supabase.from("Category").update(values).eq("id", id);

    if (error) {
      setIsUpdating(false);
      toast.error(error.details || "An error occurred during update. Please try again.");
      return;
    }

    if (status == 204) {
      setRefreshNow(true);
      form.reset();
      setIsUpdating(false);
      toast.success("Category updated successfully.");
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
        <p>
          <DialogTriggerAction title="Edit category" />
        </p>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[725px]">
        <DialogHeader>
          <DialogTitle>Update category</DialogTitle>
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
                    <FormLabel>Category Name *</FormLabel>
                    <Input
                      placeholder="TRAVEL EXPENSES"
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
                      Category Image *<span className="text-primary/85  text-xs">[image must be less than 1MB]</span>
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
                            src={imageUrl || category?.image || ""}
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

            <div className=" flex justify-end mt-8">
              <Button
                type="submit"
                disabled={isUpdating}>
                {isUpdating && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                {isUpdating ? " Please wait" : " Update Category"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
