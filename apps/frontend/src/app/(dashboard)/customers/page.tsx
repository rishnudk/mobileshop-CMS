"use client";

import { Users, UserPlus } from "lucide-react";

export default function CustomersPage() {
  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div>
          <h1 className="text-xl font-bold text-white md:text-2xl">Customers Registry</h1>
          <p className="text-xs text-slate-400">View and manage customer contact parameters</p>
        </div>
        <button className="flex items-center px-4 py-2 text-xs font-semibold text-slate-300 bg-white/5 border border-white/5 rounded-lg hover:bg-white/10 hover:text-white transition-all cursor-pointer">
          <UserPlus className="w-4 h-4 mr-1.5" />
          Add Customer
        </button>
      </div>

      <div className="flex flex-col items-center justify-center p-12 text-center shadow-lg rounded-xl glass border-white/5 bg-slate-900/10 min-h-[300px]">
        <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-slate-800 text-slate-400 border border-white/10">
          <Users className="w-5 h-5" />
        </div>
        <h3 className="text-base font-bold text-white">No customer profiles recorded</h3>
        <p className="max-w-xs mt-1.5 text-xs text-slate-400">
          Records are generated automatically when a new complaint is registered under a customer&apos;s phone number.
        </p>
      </div>
    </div>
  );
}
