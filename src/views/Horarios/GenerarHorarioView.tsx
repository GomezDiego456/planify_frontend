"use client";

import { useState, useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { generarHorario, eliminarHorario } from "@/api/HorarioApi";
import type { GenerarHorarioPayload, HorarioItem } from "@/types/index";
import { toast } from "react-toastify";
import { Trash2, Play, FileDown, Save, GripVertical } from "lucide-react";
import {
  exportarHorarioPorDiasPDF,
  exportarHorarioTablaExcel,
} from "@/utils/exportarHorario";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";

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
  const [activeId, setActiveId] = useState<string | null>(null);
  const [horarioLocal, setHorarioLocal] = useState<HorarioItem[]>([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [conflictos, setConflictos] = useState<string[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  // Obtener horarios existentes
  const { data: horarios, isPending: loadingHorarios } = useQuery({
    queryKey: ["horario"],
    queryFn: async () => {
      const res = await fetch("/api/horarios");
      return res.json() as Promise<HorarioItem[]>;
    },
  });

  // Sincronizar horarioLocal cuando cambian los datos del servidor
  useMemo(() => {
    if (horarios) {
      setHorarioLocal(horarios);
    }
  }, [horarios]);

  // Mutación para generar horario
  const generarMutation = useMutation({
    mutationFn: (payload: GenerarHorarioPayload) => generarHorario(payload),
    onSuccess: (data: HorarioItem[]) => {
      toast.success("Horario generado correctamente");
      queryClient.setQueryData(["horario"], data);
      setHorarioLocal(data);
      setModoEdicion(false);
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
      setHorarioLocal([]);
      setModoEdicion(false);
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

  const handleExportarPDF = () => {
    if (!horarioLocal || horarioLocal.length === 0) {
      toast.warning("No hay horarios para exportar");
      return;
    }
    try {
      exportarHorarioPorDiasPDF(horarioLocal);
      toast.success("PDF generado correctamente");
    } catch (error) {
      toast.error("Error al generar PDF");
      console.error(error);
    }
  };

  const handleExportarExcel = () => {
    if (!horarioLocal || horarioLocal.length === 0) {
      toast.warning("No hay horarios para exportar");
      return;
    }
    try {
      exportarHorarioTablaExcel(horarioLocal);
      toast.success("Excel generado correctamente");
    } catch (error) {
      toast.error("Error al generar Excel");
      console.error(error);
    }
  };

  const handleGuardarCambios = () => {
    // Aquí guardarías los cambios en el backend
    // Por ahora solo actualizamos el cache local
    queryClient.setQueryData(["horario"], horarioLocal);
    toast.success("Cambios guardados localmente");
    setModoEdicion(false);
    setConflictos([]);

    // TODO: Implementar endpoint para actualizar horario completo
    // await api.put('/horarios', horarioLocal);
  };

  const handleValidarConflictos = () => {
    const conflictosEncontrados: string[] = [];

    // Agrupar por día y hora para detectar duplicados
    const horariosPorDiaHora: Record<string, HorarioItem[]> = {};

    horarioLocal.forEach((item) => {
      const key = `${item.dia}-${item.horaInicio}`;
      if (!horariosPorDiaHora[key]) {
        horariosPorDiaHora[key] = [];
      }
      horariosPorDiaHora[key].push(item);
    });

    // Verificar conflictos
    Object.entries(horariosPorDiaHora).forEach(([key, items]) => {
      if (items.length > 1) {
        // Hay múltiples clases en el mismo día y hora
        const [dia, hora] = key.split("-");

        // Verificar si hay conflicto de profesor
        const profesores = new Set(items.map((i) => i.profesor._id));
        if (profesores.size < items.length) {
          conflictosEncontrados.push(
            `⚠️ ${dia} ${hora}: Un profesor tiene múltiples clases al mismo tiempo`
          );
        }

        // Verificar si hay conflicto de salón
        const salones = new Set(items.map((i) => i.salon._id));
        if (salones.size < items.length) {
          conflictosEncontrados.push(
            `⚠️ ${dia} ${hora}: Un salón está asignado a múltiples clases`
          );
        }
      }
    });

    setConflictos(conflictosEncontrados);

    if (conflictosEncontrados.length === 0) {
      toast.success("✅ No se encontraron conflictos en el horario");
    } else {
      toast.warning(
        `⚠️ Se encontraron ${conflictosEncontrados.length} conflictos`
      );
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over || active.id === over.id) return;

    const activeItem = horarioLocal.find(
      (item) =>
        `${item.dia}-${item.horaInicio}-${item.asignatura._id}` === active.id
    );

    if (!activeItem) return;

    const overItemId = over.id as string;

    // Verificar si el over es una zona vacía (formato: "zona-Dia-Hora")
    let overDia: string;
    let overHora: string;

    if (overItemId.startsWith("zona-")) {
      // Es una zona vacía
      const parts = overItemId.split("-");
      overDia = parts[1];
      overHora = parts[2];
    } else {
      // Es una tarjeta existente
      const parts = overItemId.split("-");
      overDia = parts[0];
      overHora = parts[1];
    }

    // Actualizar el horario local SIN validar conflictos
    setHorarioLocal((prev) =>
      prev.map((item) =>
        `${item.dia}-${item.horaInicio}-${item.asignatura._id}` === active.id
          ? { ...item, dia: overDia, horaInicio: overHora }
          : item
      )
    );

    // Limpiar conflictos previos cuando se hace un cambio
    setConflictos([]);
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const horariosPorDia = useMemo(() => {
    if (!horarioLocal) return {};
    const agrupado: Record<string, HorarioItem[]> = {};
    DIAS_SEMANA.forEach((dia) => {
      agrupado[dia] = horarioLocal.filter((item) => item.dia === dia);
    });
    return agrupado;
  }, [horarioLocal]);

  const horasUnicas = useMemo(() => {
    if (!horarioLocal) return [];
    const horas = new Set<string>();
    horarioLocal.forEach((item) => {
      horas.add(item.horaInicio);
    });
    return Array.from(horas).sort();
  }, [horarioLocal]);

  const obtenerColor = (index: number) =>
    COLORES_CLASE[index % COLORES_CLASE.length];

  const activeItem = activeId
    ? horarioLocal.find(
        (item) =>
          `${item.dia}-${item.horaInicio}-${item.asignatura._id}` === activeId
      )
    : null;

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
                disabled={modoEdicion}
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
                disabled={modoEdicion}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {!modoEdicion ? (
                <>
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
                  {horarioLocal && horarioLocal.length > 0 && (
                    <button
                      onClick={() => setModoEdicion(true)}
                      className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center gap-2"
                    >
                      <GripVertical size={18} />
                      Editar
                    </button>
                  )}
                </>
              ) : (
                <>
                  <button
                    onClick={handleValidarConflictos}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                      <line x1="12" y1="9" x2="12" y2="13" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                    Validar
                  </button>
                  <button
                    onClick={handleGuardarCambios}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center gap-2"
                  >
                    <Save size={18} />
                    Guardar
                  </button>
                  <button
                    onClick={() => {
                      setHorarioLocal(horarios || []);
                      setModoEdicion(false);
                      setConflictos([]);
                    }}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg"
                  >
                    Cancelar
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {modoEdicion && (
          <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <p className="text-purple-800 font-medium">
              🖱️ Modo edición activado: Arrastra las clases para reorganizar el
              horario. Haz clic en "Validar" para verificar conflictos.
            </p>
          </div>
        )}

        {conflictos.length > 0 && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <h3 className="text-red-800 font-semibold mb-2">
              ⚠️ Conflictos detectados ({conflictos.length}):
            </h3>
            <ul className="space-y-1">
              {conflictos.map((conflicto, index) => (
                <li key={index} className="text-red-700 text-sm">
                  {conflicto}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {loadingHorarios ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500 text-lg">Cargando horarios...</p>
        </div>
      ) : horarioLocal && horarioLocal.length > 0 ? (
        <div className="space-y-6">
          {/* Resumen de estadísticas */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow">
              <p className="text-gray-600 text-sm font-medium">
                Total de clases
              </p>
              <p className="text-2xl font-bold text-blue-600 mt-1">
                {horarioLocal.length}
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

          {/* Botón de exportar a PDF */}
          {!modoEdicion && (
            <div className="flex justify-end">
              <button
                onClick={handleExportarPDF}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:shadow-lg transition-all text-white font-semibold py-3 px-6 rounded-lg flex items-center gap-2"
              >
                <FileDown size={18} />
                Exportar a PDF
              </button>
            </div>
          )}

          {/* Calendario por día con Drag & Drop */}
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {DIAS_SEMANA.map((dia) => (
                <div
                  key={dia}
                  className="p-6 bg-white shadow-md rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <h2 className="text-xl font-bold text-gray-900 mb-4 pb-3 border-b-2 border-gray-200">
                    {dia}
                  </h2>
                  <div className="space-y-3">
                    {horariosPorDia[dia] && horariosPorDia[dia].length > 0 ? (
                      horariosPorDia[dia].map((item, index) => {
                        const itemId = `${item.dia}-${item.horaInicio}-${item.asignatura._id}`;

                        return (
                          <ClaseCard
                            key={itemId}
                            item={item}
                            itemId={itemId}
                            color={obtenerColor(index)}
                            modoEdicion={modoEdicion}
                            isDragging={activeId === itemId}
                          />
                        );
                      })
                    ) : // Crear zonas de drop vacías cuando no hay clases
                    modoEdicion && horasUnicas.length > 0 ? (
                      horasUnicas.map((hora) => (
                        <ZonaVacia
                          key={`zona-${dia}-${hora}`}
                          dia={dia}
                          hora={hora}
                        />
                      ))
                    ) : (
                      <p className="text-gray-400 text-center py-8">
                        Sin clases
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <DragOverlay>
              {activeItem ? (
                <div
                  className={`p-4 rounded-lg ${obtenerColor(
                    0
                  )} shadow-xl opacity-90`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <p className="font-bold text-gray-900 text-sm">
                        {activeItem.asignatura.nombre}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        {activeItem.horaInicio} - {activeItem.horaFin}
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-gray-700 bg-white bg-opacity-60 px-2 py-1 rounded">
                      {activeItem.salon.nombre}
                    </span>
                  </div>
                  <p className="text-xs text-gray-700 mt-2">
                    <span className="font-semibold">Profesor:</span>{" "}
                    {activeItem.profesor.nombreCompleto}
                  </p>
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>

          {/* Vista de tabla alternativa */}
          <details className="mt-8">
            <summary className="cursor-pointer font-semibold text-gray-700 hover:text-gray-900 p-3 bg-gray-100 rounded-lg">
              📊 Vista detallada en tabla
            </summary>
            <div className="mt-4 space-y-4">
              <div className="flex justify-end">
                <button
                  onClick={handleExportarExcel}
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:shadow-lg transition-all text-white font-semibold py-3 px-6 rounded-lg flex items-center gap-2"
                >
                  <FileDown size={18} />
                  Exportar a Excel
                </button>
              </div>

              <div className="p-6 bg-white shadow-md rounded-lg border border-gray-200 overflow-x-auto">
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
                    {horarioLocal.map((item, index) => (
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

// Componente separado para cada tarjeta de clase
import { useDraggable, useDroppable } from "@dnd-kit/core";

function ClaseCard({
  item,
  itemId,
  color,
  modoEdicion,
  isDragging,
}: {
  item: HorarioItem;
  itemId: string;
  color: string;
  modoEdicion: boolean;
  isDragging: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef: setDragRef,
    transform,
  } = useDraggable({
    id: itemId,
    disabled: !modoEdicion,
  });

  const { setNodeRef: setDropRef, isOver } = useDroppable({
    id: itemId,
    disabled: !modoEdicion,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: isDragging ? 0.5 : 1,
      }
    : undefined;

  return (
    <div
      ref={setDropRef}
      className={`${isOver && modoEdicion ? "ring-2 ring-blue-500" : ""}`}
    >
      <div
        ref={setDragRef}
        style={style}
        {...(modoEdicion ? listeners : {})}
        {...(modoEdicion ? attributes : {})}
        className={`p-4 rounded-lg ${color} transition-all ${
          modoEdicion
            ? "cursor-grab active:cursor-grabbing hover:scale-105"
            : "hover:scale-105"
        } ${isDragging ? "opacity-50" : ""}`}
      >
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1 flex items-start gap-2">
            {modoEdicion && (
              <GripVertical size={16} className="text-gray-500 mt-1" />
            )}
            <div>
              <p className="font-bold text-gray-900 text-sm">
                {item.asignatura.nombre}
              </p>
              <p className="text-xs text-gray-600 mt-1">
                {item.horaInicio} - {item.horaFin}
              </p>
            </div>
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
    </div>
  );
}

// Componente para zonas vacías donde se puede soltar
function ZonaVacia({ dia, hora }: { dia: string; hora: string }) {
  const { setNodeRef, isOver } = useDroppable({
    id: `zona-${dia}-${hora}`,
  });

  return (
    <div
      ref={setNodeRef}
      className={`p-4 rounded-lg border-2 border-dashed transition-all ${
        isOver ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50"
      }`}
    >
      <p className="text-gray-400 text-center text-sm">{hora} - Soltar aquí</p>
    </div>
  );
}
