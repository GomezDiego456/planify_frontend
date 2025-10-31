"use client";

import type { SalonFormData } from "@/types/index";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { createSalon, deleteSalon, getSalon } from "@/api/SalonApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import SalonForm from "@/components/salon/SalonForm";

export default function CreateSalonView() {
  const queryClient = useQueryClient();

  //Obtener salones existentes
  const { data: salones, isLoading } = useQuery({
    queryKey: ["salones"],
    queryFn: getSalon, // ✅ Ejecutamos la función
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SalonFormData>({
    defaultValues: {
      nombre: "",
      tipo: "",
      capacidad: 0,
      ubicacion: "",
      recursos: "",
    },
  });

  //Crear salon
  const { mutate } = useMutation({
    mutationFn: createSalon,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      reset();

      // Refrescar la lista automáticamente
      queryClient.invalidateQueries({ queryKey: ["salones"] });
    },
  });

  //eliminar salon
  const { mutate: deleteMutate } = useMutation({
    mutationFn: deleteSalon,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["salones"] });
    },
  });

  const handleForm = (formData: SalonFormData) => {
    mutate(formData);
  };

  if (isLoading) return <p>Cargando...</p>;

  return (
    <div>
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-4xl font-black text-slate-800 mb-4 text-center">
          Registrar Salón
        </h1>
        <p className="text-lg text-gray-500 mb-8">
          Llena el siguiente formulario para registrar un salón
        </p>

        {/* Formulario */}
        <form onSubmit={handleSubmit(handleForm)} className="space-y-6">
          <SalonForm register={register} errors={errors} />
        </form>
      </div>

      {/* Tabla de salones */}
      <div className="my-20 shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-4 text-slate-800">
          Salones Registrados
        </h2>

        {salones && salones.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-slate-800 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Nombre</th>
                  <th className="py-3 px-4 text-left">Tipo</th>
                  <th className="py-3 px-4 text-left">Capacidad</th>
                  <th className="py-3 px-4 text-left">Ubicación</th>
                  <th className="py-3 px-4 text-left">Recursos</th>
                  <th className="py-3 px-4 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {salones.map((salon) => (
                  <tr key={salon._id} className="hover:bg-gray-50 transition">
                    <td className="py-3 px-4 font-semibold text-slate-800">
                      {salon.nombre}
                    </td>
                    <td className="py-3 px-4 text-gray-600">{salon.tipo}</td>
                    <td className="py-3 px-4 text-gray-500">
                      {salon.capacidad || "Sin capacidad"}
                    </td>
                    <td className="py-3 px-4 text-gray-500">
                      {salon.ubicacion || "Sin ubicación"}
                    </td>
                    <td className="py-3 px-4 text-gray-500">
                      {salon.recursos || "Sin recursos"}
                    </td>
                    <td className="py-3 px-4 text-center flex justify-center gap-3">
                      <Link
                        to={`/salones/${salon._id}/edit`}
                        className="text-blue-600 hover:text-blue-800 transition"
                      >
                        <FaEdit size={18} />
                      </Link>

                      <button
                        onClick={() => deleteMutate(salon._id)}
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
