"use client";

import { Home, Users, BookOpen, Building2, Settings } from "lucide-react";

const menuItems = [
  { icon: Home, label: "Panel principal", href: "/dashboard" },
  { icon: Users, label: "Profesores", href: "/profesores/create" },
  { icon: BookOpen, label: "Asignaturas", href: "/asignaturas/create" },
  { icon: Building2, label: "Salones", href: "/salones/create" },
  { icon: Settings, label: "Restricciones", href: "#" },
];

export default function Sidebar() {
  return (
    <aside>
      <nav className="p-6 space-y-2 sticky top-0 z-30">
        {menuItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-200 hover:bg-gradient-to-r from-blue-600 to-indigo-600 hover:text-white transition-all duration-200 font-medium group"
          >
            <item.icon
              size={20}
              className="group-hover:scale-110 transition-transform"
            />
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
}
