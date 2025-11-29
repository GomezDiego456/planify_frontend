"use client";

import { useState, useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { generarHorario, eliminarHorario } from "@/api/HorarioApi";
import type { GenerarHorarioPayload, HorarioItem } from "@/types/index";
import { toast } from "react-toastify";
import { Trash2, Play } from "lucide-react";

const DIAS_SEMANA = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
const COLORES_CLASE = [
  "bg-blue-100 border-l-4 border-blue-500",
  "bg-purple-100 border-l-4 border-purple-500",
  "bg-green-100 border-l-4 border-green-500",
  "bg-pink-100 border-l-4 border-pink-500",
  "bg-yellow-100 border-l-4 border-yellow-500",
  "bg-indigo-100 border-l-4 border-indigo-500",
];

export default function GenerarHorarioView() {
  const queryClient = useQueryClient();

  const [horaInicio, setHoraInicio] = useState("07:00");
  const [horaFin, setHoraFin] = useState("18:00");

  // Obtener horarios existentes
  const { data: horarios, isPending: loadingHorarios } = useQuery({
    queryKey: ["horario"],
    queryFn: async () => {
      const res = await fetch("/api/horarios"); // tu endpoint real
      return res.json() as Promise<HorarioItem[]>;
    },
  });

  // Mutación para generar horario
  const generarMutation = useMutation({
    mutationFn: (payload: GenerarHorarioPayload) => generarHorario(payload),
    onSuccess: (data) => {
      toast.success("Horario generado correctamente");
      queryClient.setQueryData(["horario"], data); // actualizar caché
    },
    onError: (err: unknown) => {
      const msg = (err as Error).message ?? "Error al generar horario";
      toast.error(msg);
    },
  });

  // Mutación para eliminar horario
  const eliminarMutation = useMutation({
    mutationFn: () => eliminarHorario(),
    onSuccess: () => {
      toast.success("Horario eliminado");
      queryClient.invalidateQueries({ queryKey: ["horario"] });
      //recargar pagina
      window.location.reload();
    },
    onError: (err: unknown) => {
      const msg = (err as Error).message ?? "Error al eliminar horario";
      toast.error(msg);
    },
  });

  const handleGenerar = () => {
    const payload: GenerarHorarioPayload = {
      horaInicio,
      horaFin,
    };
    generarMutation.mutate(payload);
  };

  const handleEliminar = () => {
    eliminarMutation.mutate();
  };

  const horariosPorDia = useMemo(() => {
    if (!horarios) return {};
    const agrupado: Record<string, HorarioItem[]> = {};
    DIAS_SEMANA.forEach((dia) => {
      agrupado[dia] = horarios.filter((item) => item.dia === dia);
    });
    return agrupado;
  }, [horarios]);

  const horasUnicas = useMemo(() => {
    if (!horarios) return [];
    const horas = new Set<string>();
    horarios.forEach((item) => {
      horas.add(item.horaInicio);
    });
    return Array.from(horas).sort();
  }, [horarios]);

  const obtenerColor = (index: number) =>
    COLORES_CLASE[index % COLORES_CLASE.length];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Generador de Horarios
        </h1>

        <div className="p-6 bg-white shadow-md rounded-lg border border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-slate-900 mb-1">
                Hora de inicio
              </label>
              <input
                type="time"
                value={horaInicio}
                onChange={(e) => setHoraInicio(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold text-slate-900 mb-1">
                Hora de fin
              </label>
              <input
                type="time"
                value={horaFin}
                onChange={(e) => setHoraFin(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleGenerar}
                disabled={generarMutation.isPending}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg transition-all text-white font-semibold py-3 px-4 rounded-lg flex items-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                <Play size={18} />
                Generar
              </button>
              <button
                onClick={handleEliminar}
                disabled={eliminarMutation.isPending}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                <Trash2 size={18} />
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>

      {loadingHorarios ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500 text-lg">Cargando horarios...</p>
        </div>
      ) : horarios && horarios.length > 0 ? (
        <div className="space-y-6">
          {/* Resumen de estadísticas */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow">
              <p className="text-gray-600 text-sm font-medium">
                Total de clases
              </p>
              <p className="text-2xl font-bold text-blue-600 mt-1">
                {horarios.length}
              </p>
            </div>
            <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg shadow">
              <p className="text-gray-600 text-sm font-medium">Días</p>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {
                  Object.keys(horariosPorDia).filter(
                    (dia) => horariosPorDia[dia].length > 0
                  ).length
                }
              </p>
            </div>
            <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg shadow">
              <p className="text-gray-600 text-sm font-medium">Horas</p>
              <p className="text-2xl font-bold text-purple-600 mt-1">
                {horasUnicas.length}
              </p>
            </div>
            <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg shadow">
              <p className="text-gray-600 text-sm font-medium">Rango</p>
              <p className="text-lg font-bold text-orange-600 mt-1">
                {horaInicio} - {horaFin}
              </p>
            </div>
          </div>

          {/* Calendario por día */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {DIAS_SEMANA.map((dia) => (
              <div
                key={dia}
                className="p-6 bg-white shadow-md rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-4 pb-3 border-b-2 border-gray-200">
                  {dia}
                </h2>
                {horariosPorDia[dia] && horariosPorDia[dia].length > 0 ? (
                  <div className="space-y-3">
                    {horariosPorDia[dia].map((item, index) => (
                      <div
                        key={`${item.dia}-${item.horaInicio}-${item.horaFin}-${index}`}
                        className={`p-4 rounded-lg ${obtenerColor(
                          horariosPorDia[dia].indexOf(item)
                        )} transition-transform hover:scale-105 cursor-pointer`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <p className="font-bold text-gray-900 text-sm">
                              {item.asignatura.nombre}
                            </p>
                            <p className="text-xs text-gray-600 mt-1">
                              {item.horaInicio} - {item.horaFin}
                            </p>
                          </div>
                          <span className="text-xs font-semibold text-gray-700 bg-white bg-opacity-60 px-2 py-1 rounded">
                            {item.salon.nombre}
                          </span>
                        </div>
                        <p className="text-xs text-gray-700 mt-2">
                          <span className="font-semibold">Profesor:</span>{" "}
                          {item.profesor.nombreCompleto}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-center py-8">Sin clases</p>
                )}
              </div>
            ))}
          </div>

          {/* Vista de tabla alternativa para referencia */}
          <details className="mt-8">
            <summary className="cursor-pointer font-semibold text-gray-700 hover:text-gray-900 p-3 bg-gray-100 rounded-lg">
              📊 Vista detallada en tabla
            </summary>
            <div className="mt-4 p-6 bg-white shadow-md rounded-lg border border-gray-200 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">
                      Día
                    </th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">
                      Hora
                    </th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">
                      Asignatura
                    </th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">
                      Profesor
                    </th>
                    <th className="px-4 py-2 text-left font-semibold text-gray-700">
                      Salón
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {horarios.map((item, index) => (
                    <tr
                      key={`${item.dia}-${item.horaInicio}-${item.horaFin}-${index}`}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-4 py-3 text-gray-900 font-medium">
                        {item.dia}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {item.horaInicio} - {item.horaFin}
                      </td>
                      <td className="px-4 py-3 text-gray-900">
                        {item.asignatura.nombre}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {item.profesor.nombreCompleto}
                      </td>
                      <td className="px-4 py-3 font-semibold text-blue-600">
                        {item.salon.nombre}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        </div>
      ) : (
        <div className="p-16 text-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200">
          <p className="text-gray-500 text-lg">
            No hay horarios generados. Configura las horas y genera un nuevo
            horario.
          </p>
        </div>
      )}
    </div>
  );
}
