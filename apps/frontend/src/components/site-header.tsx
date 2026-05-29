"use client";

import { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Search } from "lucide-react";

import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "@/components/theme-toggle";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/complaints": "Complaints",
  "/customers": "Parties",
  "/staff": "Staff",
  "/settings": "Settings",
};

export function SiteHeader() {
  const pathname = usePathname();

  const currentTitle = useMemo(() => {
    const matchedEntry = Object.entries(pageTitles).find(([route]) => pathname === route || pathname.startsWith(`${route}/`));
    return matchedEntry?.[1] ?? "Admin";
  }, [pathname]);

  return (
    <header className="sticky top-0 z-20 flex h-(--header-height) shrink-0 items-center border-b border-border/70 bg-background/95 backdrop-blur">
      <div className="flex w-full items-center gap-3 px-4 md:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="h-4" />
        <div className="min-w-0">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <Link href="/dashboard" className="text-muted-foreground transition hover:text-foreground">
                  Admin
                </Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{currentTitle}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <div className="relative hidden w-64 lg:block">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="rounded-xl pl-9" placeholder="Search complaints, parties..." />
          </div>
          <ThemeToggle />
          <Button variant="outline" size="icon" className="rounded-xl">
            <Bell className="size-4" />
            <span className="sr-only">Notifications</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
