"use client";

import type { ProfesorFormData } from "@/types/index";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { createProfesor, deleteProfesor, getProfesor } from "@/api/ProfesorApi";
import { getProfesoresRestringidos } from "@/api/DisponibilidadApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Settings } from "lucide-react";
import ProfesorForm from "@/components/profesor/ProfesorForm";

export default function CreateProfesorView() {
  const queryClient = useQueryClient();

  //Obtener profesores existentes
  const { data: profesores, isLoading } = useQuery({
    queryKey: ["profesores"],
    queryFn: getProfesor,
  });

  // Obtener profesores con restricciones configuradas
  const { data: profesoresRestringidos } = useQuery({
    queryKey: ["profesoresRestringidos"],
    queryFn: getProfesoresRestringidos,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfesorFormData>({
    defaultValues: {
      nombreCompleto: "",
      correo: "",
      departamento: "",
      disponible: false,
    },
  });

  //Crear profesor
  const { mutate } = useMutation({
    mutationFn: createProfesor,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      reset();
      queryClient.invalidateQueries({ queryKey: ["profesores"] });
      queryClient.invalidateQueries({ queryKey: ["profesoresRestringidos"] });
    },
  });

  //eliminar profesor
  const { mutate: deleteMutate } = useMutation({
    mutationFn: deleteProfesor,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["profesores"] });
      queryClient.invalidateQueries({ queryKey: ["profesoresRestringidos"] });
    },
  });

  const handleForm = (formData: ProfesorFormData) => {
    mutate(formData);
  };

  // Función para verificar si un profesor tiene restricciones configuradas
  const tieneRestriccionesConfiguradas = (profesorId: string) => {
    return profesoresRestringidos?.find(
      (p) => p._id === profesorId && p.tieneDisponibilidad
    );
  };

  if (isLoading) return <p>Cargando...</p>;

  return (
    <div>
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-4xl font-black text-slate-800 mb-4 text-center">
          Registrar Profesor
        </h1>
        <p className="text-lg text-gray-500 mb-8">
          Llena el siguiente formulario para registrar un profesor
        </p>

        {/* Formulario */}
        <form onSubmit={handleSubmit(handleForm)} className="space-y-6">
          <ProfesorForm register={register} errors={errors} />
        </form>
      </div>

      {/* Tabla de profesores */}
      <div className="my-20 shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-4 text-slate-800">
          Profesores Registrados
        </h2>

        {profesores && profesores.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-slate-800 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Nombre</th>
                  <th className="py-3 px-4 text-left">Correo</th>
                  <th className="py-3 px-4 text-left">Departamento</th>
                  <th className="py-3 px-4 text-center">Disponibilidad</th>
                  <th className="py-3 px-4 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {profesores.map((profesor) => {
                  const restricciones = tieneRestriccionesConfiguradas(
                    profesor._id
                  );
                  const disponibilidadCompleta =
                    profesor.disponible || restricciones;

                  return (
                    <tr
                      key={profesor._id}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="py-3 px-4 font-semibold text-slate-800">
                        {profesor.nombreCompleto}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {profesor.correo}
                      </td>
                      <td className="py-3 px-4 text-gray-500">
                        {profesor.departamento || "Sin departamento"}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <span
                            className={`px-3 py-1 text-xs rounded-full ${
                              disponibilidadCompleta
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {profesor.disponible
                              ? "Disponible todos los días"
                              : restricciones
                              ? `${restricciones.bloques.length} bloques configurados`
                              : "Sin configurar"}
                          </span>
                          {!profesor.disponible && !restricciones && (
                            <Link
                              to="/restricciones"
                              className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 mt-1"
                            >
                              <Settings size={12} />
                              Configurar
                            </Link>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center flex justify-center gap-3">
                        <Link
                          to={`/profesores/${profesor._id}/edit`}
                          className="text-blue-600 hover:text-blue-800 transition"
                        >
                          <FaEdit size={18} />
                        </Link>

                        <button
                          onClick={() => deleteMutate(profesor._id)}
                          className="text-red-600 hover:text-red-800 transition cursor-pointer"
                          title="Eliminar"
                        >
                          <FaTrash size={18} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No hay profesores registrados.</p>
        )}
      </div>
    </div>
  );
}
