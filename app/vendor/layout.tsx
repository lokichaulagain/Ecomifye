"use client";
import Link from "next/link";
import { Bell, CircleUser, Home, Loader, Menu, Package, Package2, Search, ShoppingCart, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname, useRouter } from "next/navigation";
import { IconSize } from "@/components/custom/svg-icons/IconSize";
import { IconColor } from "@/components/custom/svg-icons/IconColor";
import { IconCategory } from "@/components/custom/svg-icons/IconCategory";
import { supabase } from "@/utils/supabase/supabaseClient";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ThemeToggleButton from "@/components/custom/ThemeToggleButton";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  console.log(pathname);

  const router = useRouter();
  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        toast.error(error.message || "Something went wrong . Please try again.");
        return;
      }

      if (data && data.session?.user.user_metadata.role !== "vendor") {
        router.push("/");
        return;
      }
    };
    fetchSession();
  }, [router]);

  const [isLogingOut, seIstLogingOut] = useState<boolean>(false);
  const handleLogout = async () => {
    seIstLogingOut(true);
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error(error.message || "Cound not sign out. Please try again.");
      seIstLogingOut(false);
      return;
    }

    if (!error) {
      toast.success("You have been signed out successfully.");
      seIstLogingOut(false);
      router.push("/");
      return;
    }
  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link
              href="/vendor"
              className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">Ecomify Inc</span>
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
                    <span>{item.label}</span>
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

          <ThemeToggleButton />
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
              <DropdownMenuItem
                disabled={isLogingOut}
                onClick={handleLogout}>
                {" "}
                {isLogingOut && (
                  <Loader
                    size={14}
                    className=" me-1 animate-spin"
                  />
                )}{" "}
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <div className="flex flex-1  p-4 lg:p-6">{children}</div>
      </div>
    </div>
  );
}

const menuItems = [
  { href: "/vendor", icon: <Home className="h-5 w-5" />, label: "Dashboard", extraClasses: "text-muted-foreground hover:text-foreground" },
  { href: "/vendor/orders", icon: <ShoppingCart className="h-5 w-5" />, label: "Orders", extraClasses: "bg-muted text-foreground hover:text-foreground", badge: 6 },
  { href: "/vendor/products", icon: <Package className="h-5 w-5" />, label: "Products", extraClasses: "text-muted-foreground hover:text-foreground" },
  { href: "/vendor/customers", icon: <Users className="h-5 w-5" />, label: "Customers", extraClasses: "text-muted-foreground hover:text-foreground" },
  { href: "/vendor/categories", icon: <IconCategory className="h-5 w-5" />, label: "Categories", extraClasses: "text-muted-foreground hover:text-foreground" },
  { href: "/vendor/colors", icon: <IconColor className="h-5 w-5" />, label: "Colors", extraClasses: "text-muted-foreground hover:text-foreground" },
  { href: "/vendor/sizes", icon: <IconSize className="h-5 w-5" />, label: "Sizes", extraClasses: "text-muted-foreground hover:text-foreground" },
];
