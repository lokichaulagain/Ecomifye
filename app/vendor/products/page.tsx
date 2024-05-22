"use client";
import React, { useState, useEffect } from "react";
import { Copy, ImageOff, MoreVertical, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import moment from "moment";
import { supabase } from "@/utils/supabase/supabaseClient";
import Image from "next/image";
import ProductDataTable from "./(components)/ProductDataTable";
import ProductCreateSheet from "./(components)/ProductCreateSheet";

type Props = {};

export default function Page({}: Props) {
  const [currentProductId, setCurrentProductId] = useState<any>();

  return (
    <div className=" w-full flex flex-col xl:flex-row gap-8 lg:gap-4">
      <div className="w-full lg:w-8/12">
        <ProductDataTable setCurrentProductId={setCurrentProductId} />
      </div>
    

      {/* <div className=" w-full lg:w-4/12">
        <Component2 id={currentProductId} />
      </div> */}
    </div>
  );
}

// function Component2({ id }: any) {
//   const [isFetching, setIsFetching] = useState<boolean>(false);
//   const [category, setCategory] = useState<any>();
//   useEffect(() => {
//     const fetch = async () => {
//       setIsFetching(true);
//       const { data, error, status } = await supabase.from("Category").select().eq("id", id).single();

//       if (error) {
//         console.error("Failed to fetch category:", error.message);
//         setIsFetching(false);
//         return;
//       }

//       if (status === 200 && data) {
//         setCategory(data);
//         setIsFetching(false);
//       }
//     };

//     fetch();
//   }, [id]);

//   return (
//     <Card className="overflow-hidden ">
//       <CardHeader className="flex flex-row items-start bg-muted/50">
//         <div className="grid gap-0.5">
//           <CardTitle className="group flex items-center gap-2 text-lg">
//             {category?.name}
//             <Button
//               size="icon"
//               variant="outline"
//               className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100">
//               <Copy className="h-3 w-3" />
//               <span className="sr-only">Copy Order ID</span>
//             </Button>
//           </CardTitle>
//           <CardDescription>Category Id: {category?.id}</CardDescription>
//         </div>
//         <div className="ml-auto flex items-center gap-1">
//           {/* <CategoryCreateSheet category={category} /> */}
//           <Button
//             size="sm"
//             variant="outline"
//             className="h-8 gap-1">
//             <Truck className="h-3.5 w-3.5" />
//             <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">Track Order</span>
//           </Button>
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button
//                 size="icon"
//                 variant="outline"
//                 className="h-8 w-8">
//                 <MoreVertical className="h-3.5 w-3.5" />
//                 <span className="sr-only">More</span>
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               <DropdownMenuItem>Edit</DropdownMenuItem>
//               <DropdownMenuItem>Export</DropdownMenuItem>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem>Trash</DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </CardHeader>
//       <CardContent className="p-6 text-sm">
//         <div className="grid gap-3">
//           <div className="font-semibold">Category Details</div>
//           <ul className="grid gap-3">
//             <li className="flex items-center justify-between">
//               <span className="text-muted-foreground">Category Name</span>
//               <span>{category?.name}</span>
//             </li>
//             <li className="flex items-center justify-between">
//               <span className="text-muted-foreground">Category Id</span>
//               <span>{category?.id}</span>
//             </li>

//             <li className="flex items-center justify-between">
//               <span className="text-muted-foreground">Category Active Status</span>
//               <span>{category?.isActive}</span>
//             </li>
//           </ul>
//           <Separator className="my-2" />

//           <p className="font-semibold">Category Thumbnail</p>

//           {category?.thumbnail ? (
//             <Image
//               src={category?.thumbnail}
//               alt="category-thumbnail-image"
//               height={300}
//               width={500}
//               className=" object-cover h-[40vh] lg:h-[50vh]   "
//             />
//           ) : (
//             <button
//               type="button"
//               className="flex   overflow-hidden  aspect-square w-full items-center justify-center  rounded-md border border-dashed">
//               <div className=" absolute bg-primary/20 p-2 rounded-full ">
//                 <ImageOff className="h-4 w-4 text-primary " />
//                 <span className="sr-only">Upload</span>
//               </div>
//             </button>
//           )}
//         </div>
//         {/* <Separator className="my-4" /> */}
//       </CardContent>
//       <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
//         {category?.created_at && (
//           <div className="text-xs text-muted-foreground">
//             Created Date <time>{moment(category?.created_at).format("MMMM Do YYYY, h:mm:ss a")}</time>
//           </div>
//         )}
//         {/* <Pagination className="ml-auto mr-0 w-auto">
//           <PaginationContent>
//             <PaginationItem>
//               <Button size="icon" variant="outline" className="h-6 w-6">
//                 <ChevronLeft className="h-3.5 w-3.5" />
//                 <span className="sr-only">Previous Order</span>
//               </Button>
//             </PaginationItem>
//             <PaginationItem>
//               <Button size="icon" variant="outline" className="h-6 w-6">
//                 <ChevronRight className="h-3.5 w-3.5" />
//                 <span className="sr-only">Next Order</span>
//               </Button>
//             </PaginationItem>
//           </PaginationContent>
//         </Pagination> */}
//       </CardFooter>
//     </Card>
//   );
// }
