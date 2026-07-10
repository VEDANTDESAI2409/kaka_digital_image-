'use client';

import {
  Bell,
  Search,
  ChevronDown,
} from 'lucide-react';
import LogoutButton from "@/components/logout-button";
import { useEffect, useState } from "react";
import { userService } from "@/services/user.service";


export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
  async function loadUser() {
    try {
      const data = await userService.getMe();

      console.log("USER:", data);

      setUser(data);
    } catch (err) {
      console.error("Failed to load user", err);
    }
  }

  loadUser();
}, []);
  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8">

      {/* Search */}

      <div className="w-[420px]">
        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition focus-within:border-violet-500">
          <Search
            size={18}
            className="text-slate-400"
          />

          <input
            placeholder="Search clients, events, media..."
            className="flex-1 bg-transparent outline-none text-sm"
          />
        </div>
      </div>

      {/* Right */}

      <div className="flex items-center gap-4">

  <button className="relative rounded-xl border border-slate-200 bg-white p-3 hover:bg-slate-100 transition">
    <Bell size={20} />
    <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
  </button>

  <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-2 hover:bg-slate-100">

    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold">
      {user?.fullName?.charAt(0).toUpperCase() ?? "U"}
    </div>

    <div>
      <p className="font-semibold text-slate-900">
  {user?.fullName ?? "Loading..."}
</p>

<p className="text-sm font-medium text-slate-600">
  {user?.role ?? ""}
</p>
    </div>

    <ChevronDown size={18} />

  </div>

  <LogoutButton />

</div>

    </header>
  );
}