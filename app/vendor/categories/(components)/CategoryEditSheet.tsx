"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { FilePenLine, Loader, Upload } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { supabase } from "@/utils/supabase/supabaseClient";
import { toast } from "sonner";
import { IconCategory } from "@/components/custom/svg-icons/IconCategory";
import Image from "next/image";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useCloudinaryFileUpload from "@/hooks/useCloudinaryFileUpload";
import Link from "next/link";
import { Alert, AlertTitle } from "@/components/ui/alert";

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
});
export default function CategoryEditSheet({ id, setRefreshNow }: any) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      thumbnail: "",
      isActive: "",
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
        isActive: category.isActive.toString() || "",
      });
    }
  }, [form, category]);

  // Define a submit handler
  const [previewUrl, setPreviewUrl] = useState("");
  const { uploading, handleFileUpload, imageUrl } = useCloudinaryFileUpload();
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
      setRefreshNow(true);
      form.reset();
      setIsUpdating(false);
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
              name="isActive"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Active Status *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={category?.isActive === true ? "true" : "false"}>
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

                      <Image
                        src={previewUrl || category?.thumbnail}
                        alt="Preview"
                        height={400}
                        width={400}
                        className=" object-cover "
                      />
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
