"use client";
import React, { useState } from "react";
import ColorDataTable from "./(components)/ColorDataTable";
type Props = {};

export default function Page({}: Props) {
  return (
    <div className="w-full">
      <ColorDataTable />
    </div>
  );
}
