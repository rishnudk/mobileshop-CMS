"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquareWarning,
  Settings,
  ShieldCheck,
  Users,
  Wrench,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const navItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Complaints",
    url: "/complaints",
    icon: MessageSquareWarning,
  },
  {
    title: "Customers",
    url: "/customers",
    icon: Users,
  },
  {
    title: "Staff",
    url: "/staff",
    icon: Wrench,
  },
];

const secondaryItems = [
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

const user = {
  name: "Aarav Menon",
  email: "admin@mobileshopcms.com",
  avatar: "",
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="border-b border-sidebar-border/70 p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="rounded-2xl bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90 hover:text-sidebar-primary-foreground"
              render={<Link href="/dashboard" />}
            >
              <div className="flex size-9 items-center justify-center rounded-xl bg-white/15">
                <ShieldCheck className="size-5" />
              </div>
              <div className="grid flex-1 text-left">
                <span className="font-semibold">MobileShop CMS</span>
                <span className="text-xs text-sidebar-primary-foreground/80">
                  Admin control center
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <NavMain items={navItems} pathname={pathname} />
        <NavSecondary items={secondaryItems} pathname={pathname} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border/70 p-4">
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
