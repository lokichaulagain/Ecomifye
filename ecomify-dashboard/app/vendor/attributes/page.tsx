"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SizeDataTable from "../sizes/(components)/SizeDataTable";
import ColorDataTable from "../colors/(components)/ColorDataTable";
import { IconSize } from "@/components/custom/svg-icons/IconSize";
import { IconColor } from "@/components/custom/svg-icons/IconColor";

export default function Page() {
  return (
    <Tabs
      defaultValue="color"
      className=" w-full">
      <TabsList className="grid  grid-cols-2 w-[200px]">
        <TabsTrigger value="color"> <IconColor className=" mr-2"/> Colors</TabsTrigger>
        <TabsTrigger value="size"> <IconSize className=" mr-2"/> Sizes</TabsTrigger>
      </TabsList>
      <TabsContent value="color">
        <ColorDataTable />
      </TabsContent>
      <TabsContent value="size">
        <SizeDataTable />
      </TabsContent>
    </Tabs>
  );
}
