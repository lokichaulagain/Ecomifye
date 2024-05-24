"use client";
import React, { useState } from "react";
import SizeDataTable from "./(components)/SizeDataTable";
type Props = {};

export default function Page({}: Props) {
  const [currentSizeId, setCurrentSizeId] = useState<any>();
  

  return (
    <div className="w-full">
      <SizeDataTable setCurrentSizeId={setCurrentSizeId} />
    </div>
  );
}
