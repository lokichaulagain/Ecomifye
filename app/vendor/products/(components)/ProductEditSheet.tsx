"use client";
import React, { useContext, useEffect, useState } from "react";
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
import { CurrentUserContext } from "@/app/context/current-user-context";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const formSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: "Title must be at least 1 character.",
    })
    .max(100, {
      message: "Title must be less than 100 characters.",
    }),

  subtitle: z.string().optional(),
  description: z.string().optional(),
  material: z.string().optional(),
  slug: z.string().optional(),

  weight: z.string().optional(),
  height: z.string().optional(),
  width: z.string().optional(),
  length: z.string().optional(),

  discountable: z.boolean().default(false),
  category: z.coerce.number().nullable(),
  publish: z.boolean().default(false),

  thumbnail: z.any(),
});

export default function ProductEditSheet({ id, setRefreshNow, products }: any) {
  const { currentUser } = useContext<any>(CurrentUserContext);
  console.log(currentUser, "currentUser");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      description: "",
      material: "",
      slug: "",

      weight: "",
      height: "",
      width: "",
      length: "",

      discountable: false,
      category: null,
      publish: false,

      thumbnail: "",
    },
  });

  const [categories, setCategories] = React.useState<any[]>([]);
  React.useEffect(() => {
    const fetch = async () => {
      let { data, error } = await supabase.from("Category").select("*").eq("vendor", currentUser?.id).order("created_at", { ascending: false });

      if (error) {
        console.log(error.message);
      }

      if (data) {
        setCategories(data || []);
      }
    };
    currentUser && fetch();
  }, [currentUser]);

  const [product, setProduct] = useState<any>(undefined);
  useEffect(() => {
    const fetch = async () => {
      const { data, error, status } = await supabase.from("Product").select().eq("id", id).single();
      if (error) {
        console.error("Failed to fetch product:", error.message);
        return;
      }

      if (status === 200 && data) {
        setProduct(data);
      }
    };
    fetch();
  }, [id]);

  useEffect(() => {
    if (product) {
      form.reset({
        title: product.title || "",
        subtitle: product.subtitle || "",
        description: product.description || "",
        material: product.material || "",
        slug: product.slug || "",

        weight: product.weight || "",
        height: product.height || "",
        width: product.width || "",
        length: product.length || "",

        discountable: product.discountable || false,
        category: product.category || null,
        publish: product.publish || false,

        thumbnail: product.thumbnail || "",
      });
    }
  }, [form, product]);

  // Define a submit handler
  const [previewUrl, setPreviewUrl] = useState("");
  const { uploading, handleFileUpload, imageUrl, setImageUrl } = useCloudinaryFileUpload();
  console.log(imageUrl);

  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsUpdating(true);
    const { data, error, status } = await supabase
      .from("Product")
      .update({ ...values, thumbnail: imageUrl, vendor: currentUser?.id })
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
      toast.success("Product updated successfully.");
      return;
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <span className=" flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ">View Details</span>
      </SheetTrigger>

      <SheetContent className="max-w-sm h-screen overflow-y-scroll pb-20">
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
            <Accordion
              type="single"
              collapsible
              className=" space-y-4">
              <AccordionItem value="item-1">
                <AccordionTrigger className=" text-base hover:no-underline ">General information *</AccordionTrigger>
                <AccordionContent>
                  <div className=" grid grid-cols-1 gap-6 mb-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className=" text-foreground/85">Title *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Denim Jacket"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription className=" text-foreground/60">Give your product a short and clear title. 50-60 characters is the recommended length for search engines.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="subtitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className=" text-foreground/85">Subtitle</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Warm & Comfortable"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="slug"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className=" text-foreground/85">Slug</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="denim-jacket-1"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription className=" text-foreground/60">The slug is the part of the URL that identifies the product. If not specified, it will be generated from the title.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
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
                      name="material"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className=" text-foreground/85">Material</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="100% Cotton"
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* <FormField
                      control={form.control}
                      name="thumbnail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className=" text-foreground/85">Product Thumbnail *</FormLabel>
                          <FormControl>
                            <button
                              type="button"
                              className="flex   overflow-hidden h-60 w-60 mx-auto  items-center justify-center   rounded-md border border-dashed">
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
                                className=" w-full absolute  cursor-pointer z-50  opacity-0"
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
                          {uploading && <p className="text-primary  text-[12px] text-center -mt-14">Uploading image please wait...</p>}
                        </FormItem>
                      )}
                    /> */}

                    <FormField
                      control={form.control}
                      name="thumbnail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product Thumbnail</FormLabel>
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
                                  src={previewUrl || product?.thumbnail || ""}
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

                    <FormField
                      control={form.control}
                      name="discountable"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                          <div className="space-y-0.5">
                            <FormLabel className=" text-foreground/85">Discountable</FormLabel>
                            <FormDescription>When unchecked discounts will not be applied to this product.</FormDescription>
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
                      name="publish"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                          <div className="space-y-0.5">
                            <FormLabel className=" text-foreground/85">Publish</FormLabel>
                            <FormDescription>When unchecked product wont be publish and is stored on draft.</FormDescription>
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
                  </div>

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className=" text-foreground/85">Description</FormLabel>
                        <FormControl>
                          <Textarea
                            className="h-40"
                            placeholder="A denim jacket is a jacket, typically made of denim, often slightly loose-fitting and with a front opening and pockets."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Button
              disabled={isUpdating || uploading}
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
