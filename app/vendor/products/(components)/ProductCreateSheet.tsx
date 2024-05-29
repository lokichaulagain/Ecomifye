"use client";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { CirclePlus, Loader, Package, Save, Upload } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { supabase } from "@/utils/supabase/supabaseClient";
import { toast } from "sonner";
import { IconSize } from "@/components/custom/svg-icons/IconSize";
import { CurrentUserContext } from "@/app/context/current-user-context";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import useCloudinaryMultipleFileUpload from "@/hooks/useCloudinaryMultipleFileUpload";
import useCloudinaryFileUpload from "@/hooks/useCloudinaryFileUpload";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";

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

export default function ProductCreateSheet({ size, setRefreshNow }: any) {
  const { currentUser } = useContext<any>(CurrentUserContext);
  console.log(currentUser, "currentUser");

  const [previewUrl, setPreviewUrl] = useState("");
  const { uploading, handleFileUpload, imageUrl, setImageUrl } = useCloudinaryFileUpload();
  console.log(imageUrl);

  // const { uploading, handleMultipleFileUpload, imageUrls } = useCloudinaryMultipleFileUpload();
  // const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  // const handleMultipleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = event.target.files;
  //   if (files) {
  //     handleMultipleFileUpload(files);
  //     const previewUrls = Array.from(files).map((file) => URL.createObjectURL(file));
  //     setPreviewUrls(previewUrls);
  //   }
  // };

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

  // Define a submit handler
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsCreating(true);
    const { data, error, status } = await supabase
      .from("Product")
      .insert([{ ...values, thumbnail: imageUrl, vendor: currentUser?.id }])
      .select();

    if (error) {
      toast.error(error.details || "An error occurred during create. Please try again.");
      setIsCreating(false);
      return;
    }

    if (status === 201 && data) {
      form.reset();
      setIsCreating(false);
      setRefreshNow(true);
      toast.success("Product created successfully");
      setPreviewUrl("");
      setImageUrl("");
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
          Add New Product
        </Button>
      </SheetTrigger>

      <SheetContent className=" max-w-sm h-screen overflow-y-scroll pb-20">
        <SheetHeader className=" mb-4">
          <SheetTitle className=" flex items-center gap-2">
            Create Product <Package className=" h-4 w-4 text-primary" />{" "}
          </SheetTitle>
          <SheetDescription>Insert necessary data and click create product when youre done.</SheetDescription>
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

                    <FormField
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

              {/* <AccordionItem value="item-4">
                <AccordionTrigger className=" text-base hover:no-underline">Media</AccordionTrigger>
                <AccordionContent className=" grid grid-cols-1 gap-4">
                  <div className=" flex  flex-col gap-2 ">
                    <div>
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
                </AccordionContent>
              </AccordionItem> */}

              {/* <AccordionItem value="item-5">
                <AccordionTrigger className=" text-base hover:no-underline">Attributes</AccordionTrigger>
                <AccordionContent className=" grid grid-cols-1 gap-4">
                  <FormField
                    control={form.control}
                    name="height"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className=" text-foreground/85">Height</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="100"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="width"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className=" text-foreground/85">Width</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="100"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="weight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className=" text-foreground/85">Weight</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="100"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="length"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className=" text-foreground/85">Length</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="100"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem> */}
            </Accordion>

            <Button
              disabled={isCreating || uploading}
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
                  className="mr-1 "
                />
              )}
              Create Product
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}

// "use client";
// import React, { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
// import { CirclePlus, LoaderCircle } from "lucide-react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import Image from "next/image";
// import { Upload } from "lucide-react";
// import useCloudinaryFileUpload from "@/hooks/useCloudinaryFileUpload";
// import { Alert, AlertTitle } from "@/components/ui/alert";
// import { supabase } from "@/utils/supabase/supabaseClient";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { toast } from "sonner";
// import Link from "next/link";
// import { Textarea } from "@/components/ui/textarea";
// import useCloudinaryMultipleFileUpload from "@/hooks/useCloudinaryMultipleFileUpload";
// import { Label } from "@/components/ui/label";

// const formSchema = z.object({
//   name: z.string().min(2, {
//     message: "Product name must be at least 2 characters.",
//   }),

//   thumbnail: z.any(),

//   description: z.string().optional(),

//   previousPrice: z.coerce.number().optional(),
//   currentPrice: z.coerce.number().optional(),

//   isActive: z.string().min(1, {
//     message: "Active status is required.",
//   }),

//   media: z.array(z.string()).optional(),
// });

// export default function ProductCreateSheet({ product }: any) {
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: "",
//       thumbnail: "",
//       isActive: "",
//       description: "",
//       previousPrice: 0,
//       currentPrice: 0,
//       media: [],
//     },
//   });

//   const { uploading, handleMultipleFileUpload, imageUrls } = useCloudinaryMultipleFileUpload();
//   const [previewUrls, setPreviewUrls] = useState<string[]>([]);

//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     if (imageUrls.length === 0) {
//       toast.error("Please upload at least one image for the product.");
//       return;
//     }

//     // setIsCreating(true);
//     const { data, error, status } = await supabase
//       .from("Product")
//       .insert([{ ...values, thumbnail: imageUrls[0], media: imageUrls }])
//       .select();

//     if (error) {
//       toast.error(error.details || "An error occurred during create. Please try again.");
//       console.error("Failed to create product:", error.message);
//       // setIsCreating(false);
//       return;
//     }

//     if (status === 201 && data) {
//       form.reset();
//       setPreviewUrls([]);
//       // setIsCreating(false);
//       toast.success("Product created successfully");
//       return;
//     }
//   };

//   const handleMultipleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const files = event.target.files;
//     if (files) {
//       handleMultipleFileUpload(files);
//       const previewUrls = Array.from(files).map((file) => URL.createObjectURL(file));
//       setPreviewUrls(previewUrls);
//     }
//   };

//   const [previewUrl, setPreviewUrl] = useState("");
//   const { uploading: erer, handleFileUpload, imageUrl } = useCloudinaryFileUpload();
//   console.log(imageUrl);
//   return (
//     <section>
//       <Sheet>
//         <SheetTrigger asChild>
//           <Button>
//             <CirclePlus
//               size={16}
//               className=" mr-1"
//             />
//             Add New
//           </Button>
//         </SheetTrigger>

//         <SheetContent className=" sm:max-w-xxl">
//           <SheetHeader className=" mb-4">
//             <SheetTitle>Create Product</SheetTitle>
//             <SheetDescription>Insert necessary data and click create product when youre done.</SheetDescription>
//           </SheetHeader>

//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)}>
//               <div className="grid grid-cols-1 gap-4">
//                 <FormField
//                   control={form.control}
//                   name="name"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className=" text-foreground/85">Product Name *</FormLabel>
//                       <FormControl>
//                         <Input
//                           placeholder="Polo Fleece Jacket"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="previousPrice"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className=" text-foreground/85">Previous Price </FormLabel>
//                       <FormControl>
//                         <Input
//                           type="number"
//                           placeholder="1500"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="currentPrice"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className=" text-foreground/85">Current Price *</FormLabel>
//                       <FormControl>
//                         <Input
//                           type="number"
//                           placeholder="1200"
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="isActive"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className=" text-foreground/85">Active Status *</FormLabel>
//                       <Select
//                         onValueChange={field.onChange}
//                         defaultValue={field.value}>
//                         <FormControl>
//                           <SelectTrigger>
//                             <SelectValue placeholder="Select " />
//                           </SelectTrigger>
//                         </FormControl>
//                         <SelectContent>
//                           <SelectItem value="true">Active</SelectItem>
//                           <SelectItem value="false">Inactive</SelectItem>
//                         </SelectContent>
//                       </Select>
//                       <FormDescription>
//                         Making inactive hides the products that fall under this product.<Link href="/examples/forms">email settings</Link>.
//                       </FormDescription>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 {uploading && (
//                   <Alert>
//                     <AlertTitle className="flex items-center gap-1 text-primary">
//                       <LoaderCircle
//                         size={16}
//                         className=" animate-spin"
//                       />
//                       Uploading Image to cloudinary please wait...
//                     </AlertTitle>
//                   </Alert>
//                 )}

//                 {/* <Button
//                 className=" float-end"
//                 type="submit">
//                 Create Product
//               </Button> */}
//               </div>

//               <div className=" flex flex-col gap-4 mt-4">
//                 <div className="">
//                   <div className=" grid grid-cols-1 gap-4  ">
//                     <FormField
//                       control={form.control}
//                       name="thumbnail"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel className=" text-foreground/85">Product Thumbnail *</FormLabel>
//                           <FormControl>
//                             <button
//                               type="button"
//                               className="flex   overflow-hidden h-72   w-full items-center justify-center  rounded-md border border-dashed">
//                               <div className=" absolute bg-primary/20 p-2 rounded-full ">
//                                 <Upload className="h-4 w-4 text-primary " />
//                                 <span className="sr-only">Upload</span>
//                               </div>
//                               <Input
//                                 onChange={(e: any) => {
//                                   field.onChange(e.target.files[0]);
//                                   handleFileUpload(e.target.files[0]);
//                                   const preview = URL?.createObjectURL(e.target.files[0]);
//                                   setPreviewUrl(preview);
//                                 }}
//                                 type="file"
//                                 className=" w-full fixed cursor-pointer   z-20 opacity-0"
//                               />

//                               {previewUrl && (
//                                 <Image
//                                   src={previewUrl}
//                                   alt="Preview"
//                                   height={300}
//                                   width={300}
//                                   className=" "
//                                 />
//                               )}
//                             </button>
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />

//                     <div className=" flex  flex-col gap-2 ">
//                     <div>
//                       <Label>Media </Label>
//                       <button
//                         type="button"
//                         className="flex mt-2   overflow-hidden h-44 w-full  items-center justify-center  rounded-md border border-dashed">
//                         <div className=" absolute bg-primary/20 p-2 rounded-full ">
//                           <Upload className="h-4 w-4 text-primary " />

//                           <span className="sr-only">Upload</span>
//                         </div>
//                         <p className=" text-xs mt-16">Select multiple images</p>
//                         <Input
//                           multiple
//                           onChange={handleMultipleFile}
//                           type="file"
//                           className=" w-full fixed cursor-pointer   z-20 opacity-0"
//                         />
//                       </button>
//                     </div>

//                     <div className=" flex gap-4 ">
//                       {previewUrls.map((url, index) => (
//                         <Image
//                           key={index}
//                           src={url}
//                           alt="Preview"
//                           height={100}
//                           width={100}
//                           className="object-cover border border-dotted  rounded-md"
//                         />
//                       ))}
//                     </div>
//                     </div>
//                   </div>
//                 </div>

//                 <FormField
//                   control={form.control}
//                   name="description"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className=" text-foreground/85">Description *</FormLabel>
//                       <FormControl>
//                         <Textarea
//                           className=" h-40"
//                           placeholder="This is a description of the product."
//                           {...field}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>

//               <Button
//                 // disabled={uploading |}
//                 className=" float-end mt-4"
//                 type="submit">
//                 {/* {isCreating && ( */}
//                 <LoaderCircle
//                   size={16}
//                   className=" animate-spin mr-1 "
//                 />
//                 {/* )}{" "} */}
//                 Create Product
//               </Button>
//             </form>
//           </Form>
//         </SheetContent>
//       </Sheet>
//     </section>
//   );
// }
