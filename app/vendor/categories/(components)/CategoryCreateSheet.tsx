"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { CirclePlus, LoaderCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Image from "next/image";
import { Upload } from "lucide-react";
import useCloudinaryFileUpload from "@/hooks/useCloudinaryFileUpload";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { supabase } from "@/utils/supabase/supabaseClient";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import Link from "next/link";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Category name must be at least 3 characters.",
  }),

  thumbnail: z.any(),

  isActive: z.string().min(1, {
    message: "Active status is required.",
  }),
});

export default function CategoryCreateSheet({ category }: any) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      thumbnail: "",
      isActive: "",
    },
  });

  console.log(category);

  // Define a submit handler
  const { uploading, handleFileUpload, imageUrl } = useCloudinaryFileUpload();
  const [previewUrl, setPreviewUrl] = useState("");
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!imageUrl) {
      toast.error("Please upload an image for the category.");
      return;
    }

    setIsCreating(true);
    const { data, error, status } = await supabase
      .from("Category")
      .insert([{ ...values, thumbnail: imageUrl }])
      .select();

    if (error) {
      toast.error(error.details || "An error occurred during create. Please try again.");
      console.error("Failed to create category:", error.message);
      setIsCreating(false);
      return;
    }

    if (status === 201 && data) {
      form.reset();
      setPreviewUrl("");
      setIsCreating(false);
      toast.success("Category created successfully");
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
          <SheetTitle>Create Category</SheetTitle>
          <SheetDescription>Insert necessary data and click create category when youre done.</SheetDescription>
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
                  <FormLabel>Category Name *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Hats & Caps"
                      {...field}
                    />
                  </FormControl>
                  {/* <FormDescription>This is your public display name.</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Active Status *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select " />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="true">Active</SelectItem>
                      <SelectItem value="false">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Making inactive hides the products that fall under this category.<Link href="/examples/forms">email settings</Link>.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="thumbnail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Thumbnail *</FormLabel>
                  <FormControl>
                    <button
                      type="button"
                      className="flex   overflow-hidden  aspect-square w-full items-center justify-center  rounded-md border border-dashed">
                      <div className=" absolute bg-primary/20 p-2 rounded-full ">
                        <Upload className="h-4 w-4 text-primary " />
                        <span className="sr-only">Upload</span>
                      </div>
                      <Input
                        onChange={(e: any) => {
                          field.onChange(e.target.files[0]);
                          handleFileUpload(e.target.files[0]);
                          const preview = URL?.createObjectURL(e.target.files[0]);
                          setPreviewUrl(preview);
                        }}
                        type="file"
                        className=" w-full fixed cursor-pointer   z-20 opacity-0"
                      />

                      {previewUrl && (
                        <Image
                          src={previewUrl}
                          alt="Preview"
                          height={400}
                          width={400}
                          className=" object-cover "
                        />
                      )}
                    </button>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {uploading && (
              <Alert>
                <AlertTitle className="flex items-center gap-1 text-primary">
                  <LoaderCircle
                    size={16}
                    className=" animate-spin"
                  />
                  Uploading Image to cloudinary please wait...
                </AlertTitle>
              </Alert>
            )}

            <Button
              disabled={uploading || isCreating}
              className=" float-end"
              type="submit">
              {isCreating && (
                <LoaderCircle
                  size={16}
                  className=" animate-spin mr-1 "
                />
              )}{" "}
              Create Category
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
