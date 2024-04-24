"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Image from "next/image";

export default function Page() {
  const makeDeploy = async () => {
    console.log(1);
    const response = await axios.post("/api/deploy");
    console.log(response);
  };
  return (
    <main className=" h-screen flex items-center justify-center">
      <Button onClick={makeDeploy}>One click deploy</Button>
      <p className=" text-3xl text-zinc-800/90">Ecomifye</p>
    </main>
  );
}
