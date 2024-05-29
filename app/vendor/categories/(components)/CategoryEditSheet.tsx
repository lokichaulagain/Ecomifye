"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { FilePenLine, Loader, Upload, X } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { supabase } from "@/utils/supabase/supabaseClient";
import { toast } from "sonner";
import { IconCategory } from "@/components/custom/svg-icons/IconCategory";
import Image from "next/image";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import useCloudinaryFileUpload from "@/hooks/useCloudinaryFileUpload";
import { Switch } from "@/components/ui/switch";

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
  publish: z.boolean().default(false),
  parent: z.coerce.number().nullable().optional(),
});
export default function CategoryEditSheet({ id, setRefreshNow, categories }: any) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      thumbnail: "",
      publish: false,
      parent: null,
    },
  });

  const [category, setCategory] = useState<any>(undefined);
  useEffect(() => {
    const fetch = async () => {
      const { data, error, status } = await supabase.from("Category").select().eq("id", id).single();
      if (error) {
        console.error("Failed to fetch category:", error.message);
        return;
      }

      if (status === 200 && data) {
        setCategory(data);
      }
    };
    fetch();
  }, [id]);

  useEffect(() => {
    if (category) {
      form.reset({
        name: category.name || "",
        thumbnail: category.thumbnail || "",
        publish: category.publish || false,
        parent: category.parent || null,
      });
    }
  }, [form, category]);

  // Define a submit handler
  const [previewUrl, setPreviewUrl] = useState("");
  const { uploading, handleFileUpload, imageUrl, setImageUrl } = useCloudinaryFileUpload();
  console.log(imageUrl);

  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsUpdating(true);
    const { data, error, status } = await supabase
      .from("Category")
      .update({ ...values, thumbnail: imageUrl })
      .eq("id", id);

    if (error) {
      setIsUpdating(false);
      toast.error(error.details || "An error occurred during update. Please try again.");
      return;
    }

    if (status == 204) {
      form.reset();
      setRefreshNow(true);
      setIsUpdating(false);
      setImageUrl("");
      toast.success("Category updated successfully.");
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
            Edit Category <IconCategory className=" h-4 w-4 text-primary" />{" "}
          </SheetTitle>
          <SheetDescription>Insert necessary data and click edit category when youre done.</SheetDescription>
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
              name="parent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parent Category</FormLabel>
                  <Select onValueChange={field.onChange}>
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
                            value={category.id.toString()}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="publish"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel className=" text-foreground/85">Publish</FormLabel>
                    <FormDescription>When checked product will be visible in store.</FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="thumbnail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Thumbnail</FormLabel>
                  <FormControl>
                    <button
                      type="button"
                      className="flex   overflow-hidden  h-60 w-60 mx-auto items-center justify-center  rounded-md border border-dashed">
                      <div className=" absolute bg-primary/20 p-2 rounded-full ">
                        {uploading ? <Loader className=" animate-spin h-4 w-4 text-primary" /> : <Upload className="h-4 w-4 text-primary " />}
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
                        className=" w-full absolute cursor-pointer  z-20 opacity-0"
                      />

                      {
                        <Image
                          src={previewUrl || category?.thumbnail || ""}
                          alt="Preview"
                          height={300}
                          width={300}
                        />
                      }
                    </button>
                  </FormControl>
                 
                  <FormMessage />
                
                  {uploading && <p className="text-primary  text-[12px] text-center -mt-14">Uploading image please wait...</p>}
                </FormItem>
              )}
            />

            <Button
              disabled={uploading || isUpdating}
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
                  className="mr-1"
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
