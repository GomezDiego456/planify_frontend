"use client";

import type { AsignaturaFormData } from "@/types/index";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProfesor } from "@/api/ProfesorApi";
import {
  createAsignatura,
  deleteAsignatura,
  getAsignaturas,
} from "@/api/AsignaturaApi";
import { FaEdit, FaTrash } from "react-icons/fa";
import AsignaturaForm from "@/components/asignatura/AsignaturaForm";
import { Link } from "react-router-dom";

export default function CreateAsignaturaView() {
  const queryClient = useQueryClient();

  // 🔹 Obtener profesores para el select
  const { data: profesores, isLoading: loadingProfesores } = useQuery({
    queryKey: ["profesores"],
    queryFn: getProfesor,
  });

  // 🔹 Obtener asignaturas registradas
  const { data: asignaturas, isLoading: loadingAsignaturas } = useQuery({
    queryKey: ["asignaturas"],
    queryFn: getAsignaturas,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AsignaturaFormData>({
    defaultValues: {
      nombre: "",
      codigo: "",
      departamento: "",
      profesor: undefined,
      creditos: undefined,
      duracionHoras: undefined,
    },
  });

  // 🔹 Crear asignatura
  const { mutate } = useMutation({
    mutationFn: createAsignatura,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      reset();
      queryClient.invalidateQueries({ queryKey: ["asignaturas"] });
    },
  });

  // 🔹 Eliminar asignatura
  const { mutate: deleteMutate } = useMutation({
    mutationFn: deleteAsignatura,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["asignaturas"] });
    },
  });

  const handleForm = (formData: AsignaturaFormData) => {
    mutate(formData);
  };

  if (loadingProfesores || loadingAsignaturas) return <p>Cargando...</p>;

  return (
    <div>
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-4xl font-black text-slate-800 mb-4 text-center">
          Registrar Asignatura
        </h1>
        <p className="text-lg text-gray-500 mb-8">
          Llena el siguiente formulario para registrar una asignatura
        </p>

        {/* 🔹 Formulario */}
        <form onSubmit={handleSubmit(handleForm)} className="space-y-6">
          <AsignaturaForm
            register={register}
            errors={errors}
            profesores={profesores || []} // pasamos los profesores al form
          />
        </form>
      </div>

      {/* 🔹 Tabla de asignaturas */}
      <div className="my-20 shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-4 text-slate-800">
          Asignaturas Registradas
        </h2>

        {asignaturas && asignaturas.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-slate-800 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Nombre</th>
                  <th className="py-3 px-4 text-left">Código</th>
                  <th className="py-3 px-4 text-left">Departamento</th>
                  <th className="py-3 px-4 text-left">Profesor</th>
                  <th className="py-3 px-4 text-center">Créditos</th>
                  <th className="py-3 px-4 text-center">Duración (horas)</th>
                  <th className="py-3 px-4 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {asignaturas.map((asignatura) => (
                  <tr
                    key={asignatura._id}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-4 font-semibold text-slate-800">
                      {asignatura.nombre}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {asignatura.codigo}
                    </td>
                    <td className="py-3 px-4 text-gray-500">
                      {asignatura.departamento || "Sin departamento"}
                    </td>
                    <td className="py-3 px-4 text-gray-500">
                      {asignatura.profesor
                        ? asignatura.profesor.nombreCompleto
                        : "Sin asignar"}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {asignatura.creditos ?? "-"}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {asignatura.duracionHoras ?? "-"}
                    </td>
                    <td className="py-3 px-4 text-center flex justify-center gap-3">
                      <Link
                        to={`/asignaturas/${asignatura._id}/edit`}
                        className="text-blue-600 hover:text-blue-800 transition"
                      >
                        <FaEdit size={18} />
                      </Link>

                      <button
                        onClick={() => deleteMutate(asignatura._id)}
                        className="text-red-600 hover:text-red-800 transition cursor-pointer"
                        title="Eliminar"
                      >
                        <FaTrash size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No hay asignaturas registradas.</p>
        )}
      </div>
    </div>
  );
}
