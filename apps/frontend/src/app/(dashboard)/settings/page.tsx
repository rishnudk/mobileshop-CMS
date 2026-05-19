"use client";

import { Settings as SettingsIcon, Save } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div>
          <h1 className="text-xl font-bold text-white md:text-2xl">Configurations & Settings</h1>
          <p className="text-xs text-slate-400">Configure business variables, SMS notifications, and system setups</p>
        </div>
        <button className="flex items-center px-4 py-2 text-xs font-semibold text-white bg-primary rounded-lg shadow-lg hover:bg-primary/95 transition-all shadow-primary/25 cursor-pointer">
          <Save className="w-4 h-4 mr-1.5" />
          Save Settings
        </button>
      </div>

      <div className="flex flex-col items-center justify-center p-12 text-center shadow-lg rounded-xl glass border-white/5 bg-slate-900/10 min-h-[300px]">
        <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-slate-800 text-slate-400 border border-white/10">
          <SettingsIcon className="w-5 h-5" />
        </div>
        <h3 className="text-base font-bold text-white">System preferences loaded</h3>
        <p className="max-w-xs mt-1.5 text-xs text-slate-400">
          Setup options for SMS integration, multi-branch, and custom receipt parameters are configured here.
        </p>
      </div>
    </div>
  );
}
