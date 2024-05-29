import React from "react";

type Props = {
  title: string;
};

export default function IndicatorGreen({ title }: Props) {
  return (
    <span className="inline-flex items-center bg-green-100 text-green-600 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
      <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
      {title}
    </span>
  );
}
