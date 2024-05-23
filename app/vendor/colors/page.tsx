"use client";
import React, { useState } from "react";
import ColorDataTable from "./(components)/ColorDataTable";
type Props = {};

export default function Page({}: Props) {
  const [currentColorId, setCurrentColorId] = useState<any>();

  return (
    <div className="w-full">
      <ColorDataTable setCurrentColorId={setCurrentColorId} />
    </div>
  );
}
