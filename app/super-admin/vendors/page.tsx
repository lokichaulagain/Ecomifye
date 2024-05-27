"use client";
import React from "react";
import VendorDataTable from "./(components)/VendorDataTable";
type Props = {};

export default function Page({}: Props) {
  return (
    <div className="w-full">
      <VendorDataTable />
    </div>
  );
}
