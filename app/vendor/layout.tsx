// "use client";
// import { ListOrdered, Menu, Settings, User2 } from "lucide-react";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import AdminNotification from "../../components/custom/AdminNotification";
// import AdminCircleUser from "../../components/custom/AdminCircleUser";
// import ThemeToggleButton from "@/components/custom/ThemeToggleButton";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// export default function Layout({ children }: { children: React.ReactNode }) {
//   const [isFullScreen, setIsFullScreen] = useState(false);

//   const changeFullScreen = () => {
//     setIsFullScreen(!isFullScreen);
//   };

//   const pathname = usePathname();

//   return (
//     <div className=" flex">
//       {!isFullScreen && (
//         <ScrollArea className={`${isFullScreen ? "" : "w-2/12"}  h-screen border`}>
//           <div className=" flex flex-col justify-between h-screen">
//             <div>
//               <div>User icon and detail</div>

//               <div className=" space-y-2 pt-4">
//                 {navItems.map((item: any, index: number) => (
//                   <div
//                     key={index}
//                     className="flex flex-col  hover:bg-muted rounded-md">
//                     <Link
//                       href={item.href}
//                       className={`link ${pathname === item.href ? "bg-foreground/5" : ""} py-1.5 px-6 rounded-md  opacity-95 flex items-center gap-1  `}>
//                       {item.icon} {item.name}
//                     </Link>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <Card>
//               <CardHeader className="p-2 pt-0 md:p-4">
//                 <CardTitle>Upgrade to Pro</CardTitle>
//                 <CardDescription>Unlock all features and get unlimited access to our support team.</CardDescription>
//               </CardHeader>
//               <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
//                 <Button
//                   size="sm"
//                   className="w-full">
//                   Upgrade
//                 </Button>
//               </CardContent>
//             </Card>
//           </div>
//         </ScrollArea>
//       )}

//       <div className="h-screen overflow-y-scroll w-full">
//         <div className="  flex items-center justify-between  h-12 px-4 shadow-md z-50">
//           <Button
//             className=" opacity-0"
//             variant="outline"></Button>
//           <div className=" flex items-center gap-4 ">
//             <AdminNotification />
//             <AdminCircleUser />
//             <ThemeToggleButton />
//           </div>
//         </div>
//         <div className=" px-4 mt-8 ">{children}</div>
//       </div>
//     </div>
//   );
// }

// const navItems = [
//   // {
//   //   name: "Overview",
//   //   icon: <Settings size={15} />,
//   //   href: "/vendor",
//   //   isTriggerDisable: true,
//   // },

//   // {
//   //   name: "Analytics",
//   //   icon: <Settings size={15} />,
//   //   href: "/vendor",
//   //   isTriggerDisable: true,
//   // },

//   {
//     name: "Categories",
//     icon: <Settings size={15} />,
//     href: "/vendor/categories",
//     isTriggerDisable: true,
//   },

//   {
//     name: "Products",
//     icon: <Settings size={15} />,
//     href: "/vendor/products",
//     isTriggerDisable: true,
//   },

//   // {
//   //   name: "Orders",
//   //   icon: <ListOrdered size={15} />,
//   //   href: "",
//   // },

//   // {
//   //   name: "Products",
//   //   icon: <User2 size={15} />,
//   //   href: "",
//   // },

//   // {
//   //   name: "Customers",
//   //   icon: <User2 size={15} />,
//   //   href: "",
//   // },

//   // {
//   //   name: "Discount",
//   //   icon: <Settings size={15} />,
//   //   href: "/",
//   // },

//   // {
//   //   name: "Settings",
//   //   icon: <Settings size={15} />,
//   //   href: "/",
//   // },
// ];

"use client";
import Link from "next/link";
import { Bell, CircleUser, Home, LineChart, Menu, Package, Package2, Search, ShoppingCart, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link
              href="/"
              className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">Acme Inc</span>
            </Link>
            <Button
              variant="outline"
              size="icon"
              className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {/* */}

              {menuItems.map((item: any, index: number) => (
                <Link
                  key={index}
                  href={item.href}
                  className={`${pathname === item.href ? " bg-muted  text-primary transition-all hover:text-primary" : "   text-muted-foreground transition-all hover:text-primary "} 
                  flex items-center gap-3  px-3 py-2
                  rounded-lg`}>
                  {/* <ShoppingCart className="h-4 w-4" /> */}
                  {item.icon}
                  {item.label}
                  {item.badge && <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">{item.badge}</Badge>}
                </Link>
              ))}
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Card x-chunk="dashboard-02-chunk-0">
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
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                {menuItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${item.extraClasses || ""}`}>
                    {item.icon}
                    <span >{item.label}</span>
                    {item.badge && <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">{item.badge}</Badge>}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Upgrade to Pro</CardTitle>
                    <CardDescription>Unlock all features and get unlimited access to our support team.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      size="sm"
                      className="w-full">
                      Upgrade
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <div className="flex flex-1  p-4 lg:p-6">{children}</div>
      </div>
    </div>
  );
}

const menuItems = [
  { href: "#", icon: <Home className="h-5 w-5" />, label: "Dashboard", extraClasses: "text-muted-foreground hover:text-foreground" },
  { href: "/vendor/orders", icon: <ShoppingCart className="h-5 w-5" />, label: "Orders", extraClasses: "bg-muted text-foreground hover:text-foreground", badge: 6 },
  { href: "/vendor/products", icon: <Package className="h-5 w-5" />, label: "Products", extraClasses: "text-muted-foreground hover:text-foreground" },
  { href: "#", icon: <Users className="h-5 w-5" />, label: "Customers", extraClasses: "text-muted-foreground hover:text-foreground" },
  { href: "#", icon: <LineChart className="h-5 w-5" />, label: "Analytics", extraClasses: "text-muted-foreground hover:text-foreground" },
  { href: "/vendor/categories", icon: <LineChart className="h-5 w-5" />, label: "Categories", extraClasses: "text-muted-foreground hover:text-foreground" },
];
