"use client";

import type { ProfesorFormData } from "@/types/index";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { createProfesor, deleteProfesor, getProfesor } from "@/api/ProfesorApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import ProfesorForm from "@/components/profesor/ProfesorForm";

export default function CreateProfesorView() {
  const queryClient = useQueryClient();

  //Obtener profesores existentes
  const { data: profesores, isLoading } = useQuery({
    queryKey: ["profesores"],
    queryFn: getProfesor, // ✅ Ejecutamos la función
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

      // Refrescar la lista automáticamente
      queryClient.invalidateQueries({ queryKey: ["profesores"] });
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
    },
  });

  const handleForm = (formData: ProfesorFormData) => {
    mutate(formData);
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
                {profesores.map((profesor) => (
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
                      <span
                        className={`px-3 py-1 text-sm rounded-full ${
                          profesor.disponible
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {profesor.disponible ? "Disponible" : "No disponible"}
                      </span>
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
                ))}
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
