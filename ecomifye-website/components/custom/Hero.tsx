"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
type Props = {};

export default function Hero({}: Props) {
  return (
    <div className="w-full xl:w-7/12 mx-auto pt-28 min-h-screen flex flex-col justify-around px-2 md:px-0">
      <main className="  flex flex-col items-center gap-8">
        <Button className=" bg-transparent hover:bg-primary-400/20  border border-primary-400/60 rounded-full text-sm flex items-center gap-4">
          Announcing Early Adopters Plan{" "}
          <IconArrowRightShort
            height={22}
            width={22}
          />{" "}
        </Button>
        <p className="text-primary-50 text-4xl  md:text-6xl text-center">Run your business smarter.</p>
        <p className="text-primary-300/90  md:w-7/12 text-center">Midsaw provides you with greater insight into your business and automates the boring tasks, allowing you to focus on what you love to do instead.</p>
        <div className=" space-x-4 flex items-center">
          <Button className=" bg-transparent hover:bg-primary-400/20 border border-primary-400/60 py-6 text-primary-50 ">Get 3 monts free</Button>

          <Link target="_blank" href={"https://www.youtube.com/watch?v=dQw4w9WgXcQ"}>
            <Button
              variant="outline"
              className=" py-6 border-none text-primary-950    bg-primary-50 hover:bg-primary-50/80">
              <IconBxPlayCircle />
              Watch video
            </Button>
          </Link>
        </div>
      </main>

      <TrustedBy />
    </div>
  );
}

function IconArrowRightShort(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 16 16"
      height="1em"
      width="1em"
      {...props}>
      <path
        fillRule="evenodd"
        d="M4 8a.5.5 0 01.5-.5h5.793L8.146 5.354a.5.5 0 11.708-.708l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L10.293 8.5H4.5A.5.5 0 014 8z"
      />
    </svg>
  );
}

function TrustedBy() {
  return (
    <div className="py-14">
      <div className="max-w-screen-xl mx-auto ">
        <h3 className="font-semibold text-sm text-primary-300/90 text-center uppercase">Trusted by these six companies so far</h3>
        <div className="mt-6">
          <ul className=" gap-y-6 grid grid-cols-4 items-center justify-center  [&>*]:px-4 lg:divide-x text-primary-300/90 divide-primary-400/90 text-lg md:text-2xl">
            {/* LOGO 1 */}
            <li className="flex items-center  gap-1 ">
              <IconGithub className="hidden sm:block" />
              Github
            </li>

            <li className="flex items-center  gap-1 ">
              <IconGithub className="hidden sm:block" /> WebX
            </li>

            <li className="flex items-center  gap-1 ">
              <IconGithub className="hidden sm:block" /> Byteio
            </li>

            <li className="flex items-center  gap-1 ">
              <IconGithub className="hidden sm:block" /> Tuki
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function IconGithub(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      {...props}>
      <path d="M15 22v-4a4.8 4.8 0 00-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 004 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function IconBxPlayCircle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height="1em"
      width="1em"
      className=" h-6 w-6 mr-1 "
      {...props}>
      <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
      <path d="M9 17l8-5-8-5z" />
    </svg>
  );
}
