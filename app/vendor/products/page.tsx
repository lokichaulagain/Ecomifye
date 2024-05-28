"use client";
import React from "react";
import ProductDataTable from "./(components)/ProductDataTable";
type Props = {};

export default function Page({}: Props) {
  return (
    <div className="w-full">
      <ProductDataTable />
    </div>
  );
}
