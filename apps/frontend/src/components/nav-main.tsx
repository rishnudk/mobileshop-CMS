"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

type NavItem = {
  title: string;
  url: string;
  icon: LucideIcon;
};

export function NavMain({
  items,
  pathname,
}: {
  items: NavItem[];
  pathname: string;
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Operations</SidebarGroupLabel>
      <SidebarGroupContent className="space-y-3">
        <Button
          variant="outline"
          className="h-10 w-full justify-start rounded-xl border-sidebar-border bg-sidebar/30 text-sidebar-foreground hover:bg-sidebar-accent"
          render={<Link href="/customers" />}
        >
          <Plus className="size-4" />
          Register complaint
        </Button>
        <SidebarMenu>
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.url;

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  isActive={isActive}
                  tooltip={item.title}
                  className="rounded-xl"
                  render={<Link href={item.url} />}
                >
                  <Icon className="size-4" />
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
