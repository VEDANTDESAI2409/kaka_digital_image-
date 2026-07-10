'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  FolderOpen,
  Layers,
  Image,
  Settings,
  Briefcase,
  Camera,
} from 'lucide-react';

const menuItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Clients',
    href: '/clients',
    icon: Users,
  },
  {
    title: 'Bookings',
    href: '/bookings',
    icon: Briefcase,
  },
  {
    title: 'Events',
    href: '/events',
    icon: CalendarDays,
  },
  {
    title: 'Albums',
    href: '/albums',
    icon: FolderOpen,
  },
  {
    title: 'Sections',
    href: '/sections',
    icon: Layers,
  },
  {
    title: 'Media',
    href: '/media',
    icon: Image,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 bg-[#0F172A] text-white flex flex-col border-r border-slate-800">
      {/* Logo */}
      <div className="h-20 flex items-center px-8 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600">
            <Camera size={22} />
          </div>

          <div>
            <h1 className="font-bold text-lg">
              Kaka ERP
            </h1>

            <p className="text-xs text-slate-400">
              Digital Image
            </p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-5 py-8 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 rounded-xl px-4 py-3 transition-all ${
                active
                  ? 'bg-violet-600 text-white shadow-lg'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon size={19} />

              <span className="font-medium">
                {item.title}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Profile */}
      <div className="border-t border-slate-800 p-5">
        <div className="flex items-center gap-3 rounded-xl bg-slate-800 p-3">
          <div className="h-11 w-11 rounded-full bg-violet-600 flex items-center justify-center font-bold">
            V
          </div>

          <div>
            <p className="font-semibold">
              Vedant
            </p>

            <p className="text-sm text-slate-400">
              Administrator
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}