"use client";
import React from "react";
import { Button } from "@/components/ui/button";
type Props = {};

export default function Header({}: Props) {
  return (
    <header className=" flex items-center justify-center">
      <div className="text-primary-50 bg-primary-950/95 text-[14px] fixed w-11/12 sm:w-9/12 md:w-7/12 lg:w-5/12 xl:w-4/12 mx-auto top-4 border border-primary-400/60 rounded-2xl px-4 py-2 flex  items-center justify-between">
        <div className=" flex items-center gap-1">
          <IconCircularSaw fontSize={30} />
          <span className=" text-lg">Midsaw</span>
        </div>
        <span className=" hidden sm:block">Pricing</span>
        <span className=" hidden sm:block">Support</span>
        <span className=" hidden sm:block">Update</span>
        <Button
          variant="outline"
          className="hidden sm:block bg-primary-50 hover:bg-primary-50/80 text-primary-950">
          Sign in
        </Button>

        <IconMenu
          fontSize={22}
          className="block sm:hidden"
        />
      </div>
    </header>
  );
}

function IconCircularSaw(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}>
      <path d="M13 11a1 1 0 011 1 1 1 0 01-1 1 1 1 0 01-1-1 1 1 0 011-1M7.86 6.25A6.997 6.997 0 0113 4c3.5 0 6.44 2.61 6.93 6H22v2h-6a3 3 0 00-3-3 3 3 0 00-3 3H2v-2h.05c.2-2.27 1.09-4.34 2.45-6l3.36 2.25M6.73 7.89L5.06 6.77c-.53.98-.88 2.07-1 3.23h2.01c.11-.75.33-1.46.66-2.11m.67 7.51L6 14h5.79c.24.42.71.7 1.21.7s.97-.28 1.21-.7H20v1.4c-1.61-.98-1.54.35-1.54.35v1.96l-1.96 1.96c-.5-1.75-1.4-.77-1.4-.77l-1.4 1.4h-2.8c.98-1.61-.35-1.54-.35-1.54H8.59L6.63 16.8c1.75-.49.77-1.4.77-1.4z" />
    </svg>
  );
}

function IconMenu(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 1024 1024"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}>
      <path d="M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z" />
    </svg>
  );
}
