import React from "react";

type Props = {
  title: string;
};

export default function IndicatorRed({ title }: Props) {
  return (
    <span className="inline-flex items-center bg-red-100 text-red-600 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
      <span className="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
      {title}
    </span>
  );
}
