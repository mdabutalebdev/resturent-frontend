"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaUtensils, FaClipboardList, FaUsers, FaArrowLeft, FaSignOutAlt } from "react-icons/fa";
import { useGetMeQuery } from "@/store/api/authApi";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: user } = useGetMeQuery(undefined);

  const sidebarLinks = [
    {
      name: "Dashboard Home",
      path: "/dashboard",
      icon: <FaHome className="text-lg" />,
    },
    {
      name: "View Live Site",
      path: "/",
      icon: <FaArrowLeft className="text-lg text-emerald-400 animate-pulse" />,
    },
  ];

  return (
    <div className="flex h-screen bg-[#0B0F19] text-white font-montserrat overflow-hidden">
      {/* Sidebar */}
      <aside className="w-80 bg-[#101A24] border-r border-[#2C2F24]/30 flex flex-col justify-between shrink-0 shadow-2xl">
        <div>
          {/* Brand Header */}
          <div className="p-8 border-b border-[#2C2F24]/20 flex flex-col items-center gap-4 bg-gradient-to-b from-[#101A24] to-[#0B0F19]/40">
            <Link href="/" className="flex items-center gap-3">
              <img src="/assets/logo6.png" alt="Gourmet Grill" className="h-14 w-auto object-contain hover:scale-105 duration-300 drop-shadow-[0_0_8px_rgba(195,28,30,0.5)]" />
            </Link>
            <div className="text-center">
              <h1 className="text-xl font-bold font-serif tracking-wider text-white">Gourmet Grill</h1>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#C31C1E] bg-[#C31C1E]/10 px-2 py-0.5 rounded-full mt-1.5 inline-block">
                Admin Panel
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-6 flex flex-col gap-2">
            {sidebarLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`flex items-center gap-4 px-5 py-4 rounded-xl font-medium tracking-wide transition-all duration-300 ${
                    isActive
                      ? "bg-[#C31C1E] text-white shadow-[0_4px_20px_rgba(195,28,30,0.45)] scale-[1.02]"
                      : "text-slate-400 hover:text-white hover:bg-[#474747]/40"
                  }`}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Footer Profile in Sidebar */}
        <div className="p-6 border-t border-[#2C2F24]/20 bg-[#0B0F19]/50 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-[#C31C1E] to-[#EA6D27] flex items-center justify-center font-bold font-serif text-white uppercase text-base shrink-0 shadow-md">
              {user?.first_name ? user.first_name[0] : "A"}
            </div>
            <div className="overflow-hidden">
              <h4 className="text-sm font-semibold truncate text-white leading-tight">
                {user?.first_name ? `${user.first_name} ${user.last_name || ""}` : "Gourmet Admin"}
              </h4>
              <p className="text-[11px] text-slate-400 truncate mt-0.5">
                {user?.email || "admin@gourmetgrill.com"}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header Bar */}
        <header className="h-20 bg-[#101A24] border-b border-[#2C2F24]/20 flex items-center justify-between px-10 shrink-0 shadow-md">
          <div>
            <h2 className="text-xl font-bold font-serif tracking-wide text-white">Homepage Content Manager</h2>
            <p className="text-xs text-slate-400 mt-0.5 font-medium">Dynamically configure all website widgets & APIs in real-time</p>
          </div>
          <div className="flex items-center gap-6">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase bg-[#474747]/30 px-3 py-1.5 rounded-lg border border-[#474747]/20">
              API Connection Active
            </span>
          </div>
        </header>

        {/* Main Panel Content (Scrollable) */}
        <main className="flex-1 overflow-y-auto p-10 bg-[#0B0F19]">
          {children}
        </main>
      </div>
    </div>
  );
}
