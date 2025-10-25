"use client";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
import Footer from "../components/Footer";
import { useState } from "react";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Header onMenuToggle={setIsSidebarOpen} />
      <div className="flex flex-1">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <div className="flex-1 flex flex-col">
          <main className="flex-1 p-4 md:p-8 bg-gradient-to-br from-slate-50 to-slate-100">
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                Panel Principal
              </h2>
              <p className="text-slate-600">
                Gestiona todos los elementos de tu sistema de horarios
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card
                title="Profesores"
                count={12}
                icon="👨‍🏫"
                onView={() => console.log("Ver profesores")}
                onAdd={() => console.log("Agregar profesor")}
              />
              <Card
                title="Asignaturas"
                count={20}
                icon="📘"
                onView={() => console.log("Ver asignaturas")}
                onAdd={() => console.log("Agregar asignatura")}
              />
              <Card
                title="Salones"
                count={8}
                icon="🏫"
                onView={() => console.log("Ver salones")}
                onAdd={() => console.log("Agregar salón")}
              />
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6 border border-slate-100">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">
                  Horarios Generados
                </h3>
                <p className="text-4xl font-bold text-blue-600">5</p>
                <p className="text-sm text-slate-600 mt-2">Esta semana</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 border border-slate-100">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">
                  Conflictos Resueltos
                </h3>
                <p className="text-4xl font-bold text-green-600">98%</p>
                <p className="text-sm text-slate-600 mt-2">Tasa de éxito</p>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
