"use client";
import { ListOrdered, Menu, Settings, User2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import AdminNotification from "../../components/custom/AdminNotification";
import AdminCircleUser from "../../components/custom/AdminCircleUser";
import ThemeToggleButton from "@/components/custom/ThemeToggleButton";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const changeFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const pathname = usePathname();

  return (
    <div className=" flex">
      {!isFullScreen && (
        <ScrollArea className={`${isFullScreen ? "" : "w-2/12"}  h-screen border`}>
          <div className=" flex flex-col justify-between h-screen">
            <div>
              <div>User icon and detail</div>

              <div className=" space-y-2 pt-4">
                {navItems.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="flex flex-col  hover:bg-muted rounded-md">
                    <Link
                      href={item.href}
                      className={`link ${pathname === item.href ? "bg-foreground/5" : ""} py-1.5 px-6 rounded-md  opacity-95 flex items-center gap-1  `}>
                      {item.icon} {item.name}
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <Card>
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>Unlock all features and get unlimited access to our support team.</CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Button
                  size="sm"
                  className="w-full">
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      )}

      <div className="h-screen overflow-y-scroll w-full">
        <div className="  flex items-center justify-between  h-12 px-4 shadow-md z-50">
          <Button
            className=" opacity-0"
            variant="outline"></Button>
          <div className=" flex items-center gap-4 ">
            <AdminNotification />
            <AdminCircleUser />
            <ThemeToggleButton />
          </div>
        </div>
        <div className=" px-4 mt-8 ">{children}</div>
      </div>
    </div>
  );
}

const navItems = [
  // {
  //   name: "Overview",
  //   icon: <Settings size={15} />,
  //   href: "/vendor",
  //   isTriggerDisable: true,
  // },

  // {
  //   name: "Analytics",
  //   icon: <Settings size={15} />,
  //   href: "/vendor",
  //   isTriggerDisable: true,
  // },

  {
    name: "Categories",
    icon: <Settings size={15} />,
    href: "/vendor/categories",
    isTriggerDisable: true,
  },

  {
    name: "Products",
    icon: <Settings size={15} />,
    href: "/vendor/products",
    isTriggerDisable: true,
  },

  // {
  //   name: "Orders",
  //   icon: <ListOrdered size={15} />,
  //   href: "",
  // },

  // {
  //   name: "Products",
  //   icon: <User2 size={15} />,
  //   href: "",
  // },

  // {
  //   name: "Customers",
  //   icon: <User2 size={15} />,
  //   href: "",
  // },

  // {
  //   name: "Discount",
  //   icon: <Settings size={15} />,
  //   href: "/",
  // },

  // {
  //   name: "Settings",
  //   icon: <Settings size={15} />,
  //   href: "/",
  // },
];
