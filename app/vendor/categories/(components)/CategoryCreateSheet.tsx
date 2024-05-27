"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { CirclePlus, Loader, Save } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Image from "next/image";
import { Upload } from "lucide-react";
import useCloudinaryFileUpload from "@/hooks/useCloudinaryFileUpload";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { supabase } from "@/utils/supabase/supabaseClient";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import Link from "next/link";
import { IconCategory } from "@/components/custom/svg-icons/IconCategory";

const formSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Category Name must be at least 3 character.",
    })
    .max(40, {
      message: "Category Name must be less than 40 characters.",
    }),

  thumbnail: z.any(),

  isActive: z.string().min(1, {
    message: "Active status is required.",
  }),

  // parentCategory: z.string().optional(),
});

export default function CategoryCreateSheet({ category, setRefreshNow, categories }: any) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      thumbnail: "",
      isActive: "",
      // parentCategory: "",
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
      setRefreshNow(true);
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
          Add New Category
        </Button>
      </SheetTrigger>

      <SheetContent className="sm:max-w-sm">
        <SheetHeader className=" mb-4">
          <SheetTitle className=" flex items-center gap-2">
            Create Category <IconCategory className=" h-4 w-4 text-primary" />{" "}
          </SheetTitle>
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
                    defaultValue="">
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select " />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="true">
                        <p className=" flex items-center gap-2">
                          Active <span className="flex w-2 h-2 me-3 bg-green-500 rounded-full"></span>{" "}
                        </p>
                      </SelectItem>

                      <SelectItem
                        value="false"
                        className=" flex items-center gap-2">
                        <p className=" flex items-center gap-2">
                          Inactive <span className="flex w-2 h-2 me-3 bg-red-500 rounded-full"></span>{" "}
                        </p>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Making inactive hides the products that fall under this category.<Link href="/examples/forms">email settings</Link>.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <FormField
              control={form.control}
              name="parentCategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parent Category *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={"1"}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select " />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                      {categories?.map((category: any) => (
                        <SelectItem
                          key={category.id}
                          value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                    </SelectContent>
                  </Select>
                 
                  <FormMessage />
                </FormItem>
              )}
            /> */}

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
                <AlertTitle className="flex items-center gap-1 text-primary text-xs">
                  <Loader
                    size={14}
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
              {isCreating ? (
                <Loader
                  size={16}
                  className=" animate-spin mr-1 "
                />
              ) : (
                <Save
                  size={16}
                  className="mr-1"
                />
              )}
              Create Category
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
