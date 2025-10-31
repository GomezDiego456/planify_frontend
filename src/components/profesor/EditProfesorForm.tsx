import type { Profesor, ProfesorFormData } from "@/types/index";
import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/ErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfesor } from "@/api/ProfesorApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type EditProfesorFormProps = {
  data: ProfesorFormData;
  profesorId: Profesor["_id"];
};

export default function EditProfesorForm({
  data,
  profesorId,
}: EditProfesorFormProps) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
  } = useForm<ProfesorFormData>({
    defaultValues: {
      nombreCompleto: data.nombreCompleto,
      correo: data.correo,
      departamento: data.departamento,
      disponible: data.disponible,
    },
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateProfesor,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["profesores"] });
      queryClient.invalidateQueries({ queryKey: ["editProfesor", profesorId] });
      toast.success(data);
      navigate("/profesores/create");
    },
  });

  const handleForm = (formData: ProfesorFormData) => {
    const data = {
      formData,
      profesorId,
    };
    mutate(data);
  };
  return (
    <div className="my-10">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-4xl font-black text-slate-800 mb-4 text-center">
          Editar Profesor
        </h1>
        <p className="text-lg text-gray-500 mb-8">
          Llena el siguiente formulario para editar un profesor
        </p>

        {/* Formulario */}
        <form onSubmit={handleSubmit(handleForm)} className="space-y-6">
          {/* Nombre Completo */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-1">
              Nombre Completo
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Ej: Carlos Gómez"
              {...register("nombreCompleto", {
                required: "El nombre es obligatorio",
                minLength: {
                  value: 3,
                  message: "Debe tener al menos 3 caracteres",
                },
              })}
            />
            {errors.nombreCompleto && (
              <ErrorMessage>{errors.nombreCompleto.message}</ErrorMessage>
            )}
          </div>

          {/* Correo */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-1">
              Correo
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="profesor@universidad.edu"
              {...register("correo", {
                required: "El correo es obligatorio",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Correo no válido",
                },
              })}
            />
            {errors.correo && (
              <ErrorMessage>{errors.correo.message}</ErrorMessage>
            )}
          </div>

          {/* Departamento */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-1">
              Departamento (opcional)
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Ej: Ciencias Básicas"
              {...register("departamento")}
            />
          </div>

          {/* Disponible */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="disponible"
              className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              {...register("disponible")}
            />
            <label htmlFor="disponible" className="text-slate-800 font-medium">
              ¿Ya tiene disponibilidad configurada?
            </label>
          </div>

          {/* Botón */}
          <div className="text-center">
            <input
              type="submit"
              value="Editar Profesor"
              className="w-md bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all cursor-pointer"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
