"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";
type Props = {};

export default function Page({}: Props) {
  const [loading, setLoading] = useState(false);
  const [url, seturl] = useState("");

  const handleDeploy = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/deploy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      seturl(`https://${data.url}`);
    } catch (error: any) {
      console.error("Error deploying project:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className=" grid grid-cols-4 gap-4 mt-20">
        <div className=" h-64 shadow-sm border flex flex-col gap-8 items-center justify-center">
          {" "}
          Template 1{" "}
          <Button
            onClick={handleDeploy}
            disabled={loading}>
            {" "}
            {loading ? "Deploying..." : "Deploy Project"}
          </Button>{" "}
        </div>
        <div className=" h-64 shadow-sm border flex flex-col gap-8 items-center justify-center">
          Template 2{" "}
          <Button
            onClick={handleDeploy}
            disabled={loading}>
            {" "}
            {loading ? "Deploying..." : "Deploy Project"}
          </Button>{" "}
        </div>
        <div className=" h-64 shadow-sm border flex flex-col gap-8 items-center justify-center">
          Template 3{" "}
          <Button
            onClick={handleDeploy}
            disabled={loading}>
            {" "}
            {loading ? "Deploying..." : "Deploy Project"}
          </Button>{" "}
        </div>
        <div className=" h-64 shadow-sm border flex flex-col gap-8 items-center justify-center">
          Template 4{" "}
          <Button
            onClick={handleDeploy}
            disabled={loading}>
            {" "}
            {loading ? "Deploying..." : "Deploy Project"}
          </Button>{" "}
        </div>
        <div className=" h-64 shadow-sm border flex flex-col gap-8 items-center justify-center">
          Template 5{" "}
          <Button
            onClick={handleDeploy}
            disabled={loading}>
            {" "}
            {loading ? "Deploying..." : "Deploy Project"}
          </Button>{" "}
        </div>
        <div className=" h-64 shadow-sm border flex flex-col gap-8 items-center justify-center">
          Template 6{" "}
          <Button
            onClick={handleDeploy}
            disabled={loading}>
            {" "}
            {loading ? "Deploying..." : "Deploy Project"}
          </Button>{" "}
        </div>
        <div className=" h-64 shadow-sm border flex flex-col gap-8 items-center justify-center">
          Template 7{" "}
          <Button
            onClick={handleDeploy}
            disabled={loading}>
            {" "}
            {loading ? "Deploying..." : "Deploy Project"}
          </Button>{" "}
        </div>
        <div className=" h-64 shadow-sm border flex flex-col gap-8 items-center justify-center">
          Template 8{" "}
          <Button
            onClick={handleDeploy}
            disabled={loading}>
            {" "}
            {loading ? "Deploying..." : "Deploy Project"}
          </Button>{" "}
        </div>
      </div>
      {url && (
        <a href={url}>
          <Button>Visit your site</Button>
        </a>
      )}
    </div>
  );
}
