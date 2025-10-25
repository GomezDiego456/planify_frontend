"use client";

import type React from "react";

import { Eye, Plus } from "lucide-react";

interface CardProps {
  title: string;
  count: number;
  onView: () => void;
  onAdd: () => void;
  icon?: React.ReactNode;
}

export default function Card({ title, count, onView, onAdd, icon }: CardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col items-center text-center border border-slate-100">
      {icon && <div className="mb-4 text-4xl">{icon}</div>}

      <h3 className="text-lg font-semibold text-slate-800 mb-2">{title}</h3>
      <p className="text-4xl font-bold text-blue-600 mb-6">{count}</p>

      <div className="flex gap-3 w-full">
        <button
          onClick={onView}
          className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors font-medium"
        >
          <Eye size={18} />
          <span className="hidden sm:inline">Ver</span>
        </button>
        <button
          onClick={onAdd}
          className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors font-medium"
        >
          <Plus size={18} />
          <span className="hidden sm:inline">Agregar</span>
        </button>
      </div>
    </div>
  );
}
