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
import { Textarea } from "@/components/ui/textarea";
import useCloudinaryMultipleFileUpload from "@/hooks/useCloudinaryMultipleFileUpload";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),

  thumbnail: z.any(),

  description: z.string().optional(),

  previousPrice: z.coerce.number().optional(),
  currentPrice: z.coerce.number().optional(),

  isActive: z.string().min(1, {
    message: "Active status is required.",
  }),

  media: z.array(z.string()).optional(),
});

export default function ProductCreateSheet({ product }: any) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      thumbnail: "",
      isActive: "",
      description: "",
      previousPrice: 0,
      currentPrice: 0,
      media: [],
    },
  });

  const { uploading, handleMultipleFileUpload, imageUrls } = useCloudinaryMultipleFileUpload();
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (imageUrls.length === 0) {
      toast.error("Please upload at least one image for the product.");
      return;
    }

    // setIsCreating(true);
    const { data, error, status } = await supabase
      .from("Product")
      .insert([{ ...values, thumbnail: imageUrls[0], media: imageUrls }])
      .select();

    if (error) {
      toast.error(error.details || "An error occurred during create. Please try again.");
      console.error("Failed to create product:", error.message);
      // setIsCreating(false);
      return;
    }

    if (status === 201 && data) {
      form.reset();
      setPreviewUrls([]);
      // setIsCreating(false);
      toast.success("Product created successfully");
      return;
    }
  };

  const handleMultipleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      handleMultipleFileUpload(files);
      const previewUrls = Array.from(files).map((file) => URL.createObjectURL(file));
      setPreviewUrls(previewUrls);
    }
  };

  const [previewUrl, setPreviewUrl] = useState("");
  const { uploading: erer, handleFileUpload, imageUrl } = useCloudinaryFileUpload();
  console.log(imageUrl);
  return (
    <section>
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

        <SheetContent className=" sm:max-w-xxl">
          <SheetHeader className=" mb-4">
            <SheetTitle>Create Product</SheetTitle>
            <SheetDescription>Insert necessary data and click create product when youre done.</SheetDescription>
          </SheetHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Polo Fleece Jacket"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="previousPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Previous Price </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="1500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="currentPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Price *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="1200"
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
                        Making inactive hides the products that fall under this product.<Link href="/examples/forms">email settings</Link>.
                      </FormDescription>
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

                {/* <Button
                className=" float-end"
                type="submit">
                Create Product
              </Button> */}
              </div>

              <div className=" flex flex-col gap-4 mt-4">
                <div className="">
                  <div className=" grid grid-cols-2 gap-4  ">
                    <FormField
                      control={form.control}
                      name="thumbnail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product Thumbnail *</FormLabel>
                          <FormControl>
                            <button
                              type="button"
                              className="flex   overflow-hidden h-72   w-full items-center justify-center  rounded-md border border-dashed">
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
                                  height={300}
                                  width={300}
                                  className=" "
                                />
                              )}
                            </button>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className=" flex  flex-col gap-2 ">
                    <div>
                      <Label>Media </Label>
                      <button
                        type="button"
                        className="flex mt-2   overflow-hidden h-44 w-full  items-center justify-center  rounded-md border border-dashed">
                        <div className=" absolute bg-primary/20 p-2 rounded-full ">
                          <Upload className="h-4 w-4 text-primary " />

                          <span className="sr-only">Upload</span>
                        </div>
                        <p className=" text-xs mt-16">Select multiple images</p>
                        <Input
                          multiple
                          onChange={handleMultipleFile}
                          type="file"
                          className=" w-full fixed cursor-pointer   z-20 opacity-0"
                        />
                      </button>
                    </div>

                    <div className=" flex gap-4 ">
                      {previewUrls.map((url, index) => (
                        <Image
                          key={index}
                          src={url}
                          alt="Preview"
                          height={100}
                          width={100}
                          className="object-cover border border-dotted  rounded-md"
                        />
                      ))}
                    </div>
                    </div>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description *</FormLabel>
                      <FormControl>
                        <Textarea
                          className=" h-40"
                          placeholder="This is a description of the product."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                // disabled={uploading |}
                className=" float-end mt-4"
                type="submit">
                {/* {isCreating && ( */}
                <LoaderCircle
                  size={16}
                  className=" animate-spin mr-1 "
                />
                {/* )}{" "} */}
                Create Product
              </Button>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </section>
  );
}
