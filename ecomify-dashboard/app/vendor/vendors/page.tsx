import EmptyDataSection from "@/components/custom/empty-data-section";
import React from "react";
import VendorCreateSheet from "./(components)/vendor-create-sheet";
type Props = {};

export default function page({}: Props) {
  return (
    <>
      <EmptyDataSection
        heading="Vendors"
        title="You have no vendors"
        description="Vendors need to be registered before creating their ecommerce."
        child={<VendorCreateSheet />}
      />
    </>
  );
}
