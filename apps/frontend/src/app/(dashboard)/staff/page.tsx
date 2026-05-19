"use client";

import { UserCheck, UserPlus } from "lucide-react";

export default function StaffPage() {
  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div>
          <h1 className="text-xl font-bold text-white md:text-2xl">Staff Management</h1>
          <p className="text-xs text-slate-400">Control system logins, provisioning, and technician assignments</p>
        </div>
        <button className="flex items-center px-4 py-2 text-xs font-semibold text-white bg-primary rounded-lg shadow-lg hover:bg-primary/95 transition-all shadow-primary/25 cursor-pointer">
          <UserPlus className="w-4 h-4 mr-1.5" />
          Onboard Staff
        </button>
      </div>

      <div className="flex flex-col items-center justify-center p-12 text-center shadow-lg rounded-xl glass border-white/5 bg-slate-900/10 min-h-[300px]">
        <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-slate-800 text-slate-400 border border-white/10">
          <UserCheck className="w-5 h-5" />
        </div>
        <h3 className="text-base font-bold text-white">Staff listing loaded</h3>
        <p className="max-w-xs mt-1.5 text-xs text-slate-400">
          Provisioned staff can log in using their registered email and password credentials.
        </p>
      </div>
    </div>
  );
}
