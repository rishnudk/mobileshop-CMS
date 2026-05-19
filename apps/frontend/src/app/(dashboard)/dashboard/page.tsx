"use client";

import { useAuthStore } from "../../../store/auth-store";
import {
  Wrench,
  CheckCircle,
  Clock,
  Plus,
  Search,
  UserPlus,
  TrendingUp,
  Activity,
  ArrowUpRight
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { user } = useAuthStore();

  const stats = [
    {
      name: "Pending Diagnosis",
      value: "14",
      change: "+2 today",
      icon: Clock,
      color: "from-amber-500 to-orange-500",
      shadow: "shadow-amber-500/10",
    },
    {
      name: "Under Repair",
      value: "8",
      change: "-1 today",
      icon: Wrench,
      color: "from-indigo-500 to-violet-500",
      shadow: "shadow-indigo-500/10",
    },
    {
      name: "Ready for Pickup",
      value: "21",
      change: "+6 today",
      icon: CheckCircle,
      color: "from-emerald-500 to-teal-500",
      shadow: "shadow-emerald-500/10",
    },
    {
      name: "Delivered (This Month)",
      value: "148",
      change: "+12% vs last month",
      icon: TrendingUp,
      color: "from-blue-500 to-cyan-500",
      shadow: "shadow-blue-500/10",
    },
  ];

  const recentComplaints = [
    { id: "RC-1024", name: "Rishnu DK", device: "iPhone 15 Pro Max", issue: "Broken Screen, Touch unresponsive", status: "REPAIRING", cost: "$249.00" },
    { id: "RC-1023", name: "Ananya R", device: "Samsung Galaxy S24 Ultra", issue: "Battery drain, heating up", status: "PENDING", cost: "$89.00" },
    { id: "RC-1022", name: "John Doe", device: "OnePlus 12", issue: "Camera lens cracked", status: "READY", cost: "$120.00" },
    { id: "RC-1021", name: "Sarah Smith", device: "Google Pixel 8 Pro", issue: "Water damage, no boot", status: "DIAGNOSING", cost: "$180.00" },
  ];

  const statusColors = {
    PENDING: "bg-amber-500/15 text-amber-400 border-amber-500/20",
    DIAGNOSING: "bg-blue-500/15 text-blue-400 border-blue-500/20",
    REPAIRING: "bg-indigo-500/15 text-indigo-400 border-indigo-500/20",
    READY: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    DELIVERED: "bg-slate-500/15 text-slate-400 border-slate-500/20",
    CANCELLED: "bg-rose-500/15 text-rose-400 border-rose-500/20",
  };

  return (
    <div className="space-y-8 font-sans">
      
      {/* Welcome Banner Card */}
      <div className="relative overflow-hidden p-6 shadow-xl rounded-2xl glass border-white/5">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-primary/10 blur-[80px]" />
        
        <div className="relative z-10 flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
          <div>
            <h1 className="text-xl font-bold text-white md:text-2xl">
              Welcome back, {user?.name}!
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Today is {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}. Here is your shop summary.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/complaints/new"
              className="flex items-center px-4 py-2 text-xs font-semibold text-white bg-primary rounded-lg shadow-lg hover:bg-primary/95 transition-all shadow-primary/25 active:scale-[0.98] cursor-pointer"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              New Complaint
            </Link>
            <button className="flex items-center px-4 py-2 text-xs font-semibold text-slate-300 bg-white/5 border border-white/5 rounded-lg hover:bg-white/10 hover:text-white transition-all active:scale-[0.98] cursor-pointer">
              <Search className="w-4 h-4 mr-1.5" />
              Find Ticket
            </button>
          </div>
        </div>
      </div>

      {/* Grid of 4 Stat Widgets */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className={`relative overflow-hidden p-5 transition-all duration-300 shadow-lg rounded-xl glass border-white/5 hover:border-white/10 hover:translate-y-[-2px] ${stat.shadow}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">{stat.name}</span>
                <div className={`flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr ${stat.color} text-white shadow-md shadow-white/5`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              
              <div className="mt-4">
                <span className="text-2xl font-bold tracking-tight text-white">{stat.value}</span>
                <p className="mt-1 text-[10px] font-medium text-slate-400">
                  {stat.change}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Recent Activity & Quick Links */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column: Recent Repair Table */}
        <div className="lg:col-span-2 shadow-lg rounded-xl glass border-white/5 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-bold text-white">Active Repairs Queue</h3>
            </div>
            <Link
              href="/complaints"
              className="text-xs font-semibold text-primary hover:text-primary/80 flex items-center"
            >
              View Full Queue
              <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/5 text-slate-400 font-semibold">
                  <th className="pb-3 pl-1">Ticket ID</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Device Model</th>
                  <th className="pb-3">Estimated Cost</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300 font-medium">
                {recentComplaints.map((item, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors group">
                    <td className="py-3 pl-1 font-bold text-primary">{item.id}</td>
                    <td className="py-3 text-white">{item.name}</td>
                    <td className="py-3">{item.device}</td>
                    <td className="py-3">{item.cost}</td>
                    <td className="py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 border text-[10px] font-semibold rounded-full ${statusColors[item.status as keyof typeof statusColors]}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Quick Operations Shortcuts */}
        <div className="shadow-lg rounded-xl glass border-white/5 p-6 space-y-5">
          <h3 className="text-sm font-bold text-white">Quick Actions Console</h3>
          
          <div className="grid gap-3">
            <Link
              href="/complaints/new"
              className="flex items-center p-3 text-xs text-slate-300 transition-all border border-white/5 rounded-lg bg-slate-900/40 hover:bg-slate-900/70 hover:border-white/10 hover:text-white"
            >
              <div className="flex items-center justify-center w-8 h-8 mr-3 text-white rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <Plus className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-bold">Register Device</p>
                <p className="text-[10px] text-slate-500">Record a new complaint ticket</p>
              </div>
            </Link>

            <button className="flex items-center p-3 text-xs text-slate-300 transition-all border border-white/5 rounded-lg bg-slate-900/40 hover:bg-slate-900/70 hover:border-white/10 hover:text-white cursor-pointer">
              <div className="flex items-center justify-center w-8 h-8 mr-3 text-white rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                <UserPlus className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-bold">Register Customer</p>
                <p className="text-[10px] text-slate-500">Add detailed contact parameters</p>
              </div>
            </button>

            <button className="flex items-center p-3 text-xs text-slate-300 transition-all border border-white/5 rounded-lg bg-slate-900/40 hover:bg-slate-900/70 hover:border-white/10 hover:text-white cursor-pointer">
              <div className="flex items-center justify-center w-8 h-8 mr-3 text-white rounded-lg bg-violet-500/10 border border-violet-500/20">
                <UserPlus className="w-4 h-4 text-violet-400" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-bold">Staff Onboarding</p>
                <p className="text-[10px] text-slate-500">Provision login accounts for staff</p>
              </div>
            </button>
          </div>

          <div className="p-4 border border-white/5 rounded-lg bg-slate-900/20 text-center">
            <span className="text-[10px] text-slate-400 font-semibold block mb-1">SYSTEM INSTANCE HEALTH</span>
            <div className="flex items-center justify-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs text-slate-300 font-semibold">PostgreSQL Connected</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
