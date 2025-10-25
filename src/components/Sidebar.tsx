"use client";

import { Home, Users, BookOpen, Building2, Settings, X } from "lucide-react";

const menuItems = [
  { icon: Home, label: "Panel principal", href: "#" },
  { icon: Users, label: "Profesores", href: "#" },
  { icon: BookOpen, label: "Asignaturas", href: "#" },
  { icon: Building2, label: "Salones", href: "#" },
  { icon: Settings, label: "Restricciones", href: "#" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 h-screen shadow-md p-4">
      <nav className="p-6 space-y-2 h-full flex flex-col">
        <button
          className="md:hidden self-end p-2 hover:bg-slate-800 rounded-lg mb-4"
          aria-label="Close menu"
        >
          <X size={20} />
        </button>

        {menuItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-200 hover:bg-blue-600 hover:text-white transition-all duration-200 font-medium group"
          >
            <item.icon
              size={20}
              className="group-hover:scale-110 transition-transform"
            />
            <span>{item.label}</span>
          </a>
        ))}

        <div className="flex-1" />

        <div className="border-t border-slate-700 pt-4 mt-4">
          <p className="text-xs text-slate-400 text-center">Planify © 2025</p>
        </div>
      </nav>
    </aside>
  );
}
