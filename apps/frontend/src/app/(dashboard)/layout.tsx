"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "../../store/auth-store";
import {
  Smartphone,
  LayoutDashboard,
  ClipboardList,
  Users,
  UserCheck,
  Settings as SettingsIcon,
  LogOut,
  Menu,
  X,
  Bell,
  User
} from "lucide-react";
import Link from "next/link";

const sidebarItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Complaints", href: "/complaints", icon: ClipboardList },
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Staff Management", href: "/staff", icon: UserCheck },
  { name: "Settings", href: "/settings", icon: SettingsIcon },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, checkAuth, logout, isAuthenticated, isLoading } = useAuthStore();
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Fetch and check authentication
    checkAuth();
  }, [checkAuth]);

  // Handle redirect if not authenticated after checking auth
  useEffect(() => {
    if (mounted && !isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [mounted, isLoading, isAuthenticated, router]);

  if (!mounted || isLoading || !isAuthenticated || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-10 h-10 border-4 rounded-full border-t-primary border-slate-800 animate-spin" />
          <p className="text-sm font-medium text-slate-400">Loading secure workspace...</p>
        </div>
      </div>
    );
  }

  const roleColors = {
    ADMIN: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    STAFF: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    TECHNICIAN: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  };

  return (
    <div className="flex min-h-screen bg-slate-950 font-sans">
      
      {/* BACKGROUND ACCENTS */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />

      {/* MOBILE SIDEBAR DRAWER OVERLAY */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* SIDEBAR SIDE PANEL */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col w-64 border-r bg-slate-900/40 border-white/5 backdrop-blur-xl transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header Logo */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-white/5">
          <Link href="/dashboard" className="flex items-center space-x-2.5">
            <div className="flex items-center justify-center w-9 h-9 text-white rounded-lg bg-gradient-to-tr from-primary to-indigo-500 shadow-md shadow-primary/20">
              <Smartphone className="w-5 h-5" />
            </div>
            <span className="font-bold text-white tracking-wide text-sm">
              RepairManager
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1 text-slate-400 transition-colors hover:text-white lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
                  isActive
                    ? "bg-primary text-white shadow-lg shadow-primary/10"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className={`w-4 h-4 mr-3 ${isActive ? "text-white" : "text-slate-400 group-hover:text-white"}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Footer User Info Panel */}
        <div className="p-4 border-t border-white/5 bg-slate-900/20">
          <div className="flex items-center space-x-3 mb-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-800 border border-white/10 text-slate-300">
              <User className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">
                {user.name}
              </p>
              <p className="text-[10px] text-slate-400 truncate">
                {user.email}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className={`text-[10px] font-bold px-2 py-0.5 border rounded-full ${roleColors[user.role as keyof typeof roleColors] || "bg-slate-800 text-slate-400"}`}>
              {user.role}
            </span>
            <button
              onClick={logout}
              className="flex items-center text-xs text-slate-400 transition-colors hover:text-rose-400 font-medium cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5 mr-1" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* RIGHT MAIN CONTAINER */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Top Navbar Header */}
        <header className="flex items-center justify-between h-16 px-6 border-b bg-slate-950/50 border-white/5 backdrop-blur-md">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-1 text-slate-400 transition-colors hover:text-white lg:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-sm font-semibold tracking-tight text-white capitalize">
              {pathname === "/dashboard" ? "Control Panel Summary" : pathname.split("/")[1]}
            </h2>
          </div>

          <div className="flex items-center space-x-4">
            {/* Quick Notify Bell */}
            <button className="relative p-1.5 text-slate-400 hover:text-white transition-colors bg-white/5 rounded-lg border border-white/5">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-primary" />
            </button>

            {/* Profile Avatar Card */}
            <div className="flex items-center space-x-3 pl-3 border-l border-white/5">
              <span className="hidden text-xs font-semibold text-slate-300 md:inline-block">
                {user.name}
              </span>
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-500 to-indigo-500 flex items-center justify-center text-white text-xs font-bold border border-white/20">
                {user.name.split(" ").map(w => w[0]).join("")}
              </div>
            </div>
          </div>
        </header>

        {/* Content Body Router view */}
        <main className="flex-1 p-6 overflow-y-auto relative">
          {children}
        </main>
      </div>

    </div>
  );
}
