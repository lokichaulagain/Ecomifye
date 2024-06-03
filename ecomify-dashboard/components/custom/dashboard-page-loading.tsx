import React from "react";
import { Button } from "../ui/button";
type Props = {
  heading: string;
  title: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
  child?: React.ReactNode;
};

export default function DashboardLoadingPage({ heading, title, description, buttonText, child }: Props) {
  return (
    <div className="flex flex-1 flex-col gap-4 h-full">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">{heading}</h1>
      </div>
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
          {buttonText && <Button className="mt-4">{buttonText}</Button>}
          <div className="mt-4">{child}</div>
        </div>
      </div>
    </div>
  );
}
