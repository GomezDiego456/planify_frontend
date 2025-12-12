"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getProfesoresRestringidos,
  guardarDisponibilidad,
  eliminarDisponibilidad,
} from "@/api/DisponibilidadApi";
import { toast } from "react-toastify";
import { Clock, Plus, Trash2, Save, Calendar } from "lucide-react";
import type { BloqueDisponibilidad } from "@/types/index";

const DIAS_SEMANA = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
] as const;

export default function RestriccionesView() {
  const queryClient = useQueryClient();
  const [profesorSeleccionado, setProfesorSeleccionado] = useState<
    string | null
  >(null);
  const [bloques, setBloques] = useState<BloqueDisponibilidad[]>([]);

  // Obtener profesores restringidos
  const { data: profesores, isLoading } = useQuery({
    queryKey: ["profesoresRestringidos"],
    queryFn: getProfesoresRestringidos,
  });

  // Guardar disponibilidad
  const { mutate: guardarMutate, isPending: guardando } = useMutation({
    mutationFn: guardarDisponibilidad,
    onSuccess: (message) => {
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["profesoresRestringidos"] });
      setProfesorSeleccionado(null);
      setBloques([]);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // Eliminar disponibilidad
  const { mutate: eliminarMutate } = useMutation({
    mutationFn: eliminarDisponibilidad,
    onSuccess: (message) => {
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["profesoresRestringidos"] });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleSeleccionarProfesor = (profesorId: string) => {
    const profesor = profesores?.find((p) => p._id === profesorId);
    if (profesor) {
      setProfesorSeleccionado(profesorId);
      // Si ya tiene bloques, cargarlos
      if (profesor.bloques.length > 0) {
        setBloques(profesor.bloques);
      } else {
        // Iniciar con un bloque vacío
        setBloques([
          {
            dia: "Lunes",
            horaInicio: "07:00",
            horaFin: "18:00",
          },
        ]);
      }
    }
  };

  const agregarBloque = () => {
    setBloques([
      ...bloques,
      {
        dia: "Lunes",
        horaInicio: "07:00",
        horaFin: "18:00",
      },
    ]);
  };

  const eliminarBloque = (index: number) => {
    setBloques(bloques.filter((_, i) => i !== index));
  };

  const actualizarBloque = (
    index: number,
    campo: keyof BloqueDisponibilidad,
    valor: string
  ) => {
    const nuevosBloques = [...bloques];
    nuevosBloques[index] = {
      ...nuevosBloques[index],
      [campo]: valor,
    };
    setBloques(nuevosBloques);
  };

  const handleGuardar = () => {
    if (!profesorSeleccionado) {
      toast.error("Selecciona un profesor");
      return;
    }

    if (bloques.length === 0) {
      toast.error("Agrega al menos un bloque de disponibilidad");
      return;
    }

    // Validar que horaFin > horaInicio
    const bloqueInvalido = bloques.find((b) => b.horaInicio >= b.horaFin);
    if (bloqueInvalido) {
      toast.error("La hora de fin debe ser mayor a la hora de inicio");
      return;
    }

    guardarMutate({
      profesorId: profesorSeleccionado,
      formData: { bloques },
    });
  };

  const handleEliminarDisponibilidad = (profesorId: string) => {
    if (
      window.confirm(
        "¿Estás seguro de eliminar la disponibilidad de este profesor?"
      )
    ) {
      eliminarMutate(profesorId);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">Cargando profesores...</p>
      </div>
    );
  }

  const profesorActual = profesores?.find(
    (p) => p._id === profesorSeleccionado
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Configurar Disponibilidad de Profesores
        </h1>
        <p className="text-gray-600">
          Configura los días y horarios disponibles para profesores con
          restricciones horarias
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de profesores */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar size={20} />
              Profesores Restringidos
            </h2>

            {profesores && profesores.length > 0 ? (
              <div className="space-y-2">
                {profesores.map((profesor) => (
                  <div
                    key={profesor._id}
                    className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                      profesorSeleccionado === profesor._id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                    onClick={() => handleSeleccionarProfesor(profesor._id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-gray-900">
                          {profesor.nombreCompleto}
                        </p>
                        <p className="text-sm text-gray-500">
                          {profesor.correo}
                        </p>
                        <span
                          className={`inline-block mt-2 text-xs px-2 py-1 rounded-full ${
                            profesor.tieneDisponibilidad
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {profesor.tieneDisponibilidad
                            ? `${profesor.bloques.length} bloques`
                            : "Sin configurar"}
                        </span>
                      </div>
                      {profesor.tieneDisponibilidad && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEliminarDisponibilidad(profesor._id);
                          }}
                          className="text-red-600 hover:text-red-800"
                          title="Eliminar disponibilidad"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">
                No hay profesores con restricciones horarias
              </p>
            )}
          </div>
        </div>

        {/* Configuración de bloques */}
        <div className="lg:col-span-2">
          {profesorSeleccionado ? (
            <div className="bg-white shadow-lg rounded-xl p-6">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-1">
                  Configurar: {profesorActual?.nombreCompleto}
                </h2>
                <p className="text-sm text-gray-600">
                  Agrega los bloques horarios en los que este profesor está
                  disponible
                </p>
              </div>

              <div className="space-y-4 mb-6">
                {bloques.map((bloque, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Día */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Día
                          </label>
                          <select
                            value={bloque.dia}
                            onChange={(e) =>
                              actualizarBloque(index, "dia", e.target.value)
                            }
                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                          >
                            {DIAS_SEMANA.map((dia) => (
                              <option key={dia} value={dia}>
                                {dia}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Hora Inicio */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Hora Inicio
                          </label>
                          <input
                            type="time"
                            value={bloque.horaInicio}
                            onChange={(e) =>
                              actualizarBloque(
                                index,
                                "horaInicio",
                                e.target.value
                              )
                            }
                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                          />
                        </div>

                        {/* Hora Fin */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Hora Fin
                          </label>
                          <input
                            type="time"
                            value={bloque.horaFin}
                            onChange={(e) =>
                              actualizarBloque(index, "horaFin", e.target.value)
                            }
                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                          />
                        </div>
                      </div>

                      {/* Botón eliminar */}
                      <button
                        onClick={() => eliminarBloque(index)}
                        className="mt-6 text-red-600 hover:text-red-800 transition"
                        disabled={bloques.length === 1}
                        title="Eliminar bloque"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Botones de acción */}
              <div className="flex gap-3">
                <button
                  onClick={agregarBloque}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition"
                >
                  <Plus size={18} />
                  Agregar Bloque
                </button>

                <button
                  onClick={handleGuardar}
                  disabled={guardando}
                  className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg text-white font-semibold rounded-lg transition disabled:opacity-50"
                >
                  <Save size={18} />
                  {guardando ? "Guardando..." : "Guardar Disponibilidad"}
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white shadow-lg rounded-xl p-16 text-center">
              <Clock size={64} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">
                Selecciona un profesor de la lista para configurar su
                disponibilidad
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
