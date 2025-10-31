import type { Asignatura, AsignaturaFormData, Profesor } from "@/types/index";
import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/ErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateAsignatura } from "@/api/AsignaturaApi";

type EditAsignaturaFormProps = {
  data: AsignaturaFormData;
  asignaturaId: Asignatura["_id"];
  profesores: Profesor[];
};

export default function EditAsignaturaForm({
  data,
  asignaturaId,
  profesores,
}: EditAsignaturaFormProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AsignaturaFormData>({
    defaultValues: {
      nombre: data.nombre,
      codigo: data.codigo,
      departamento: data.departamento,
      profesor:
        typeof data.profesor === "object" ? data.profesor._id : data.profesor,
      creditos: data.creditos,
      duracionHoras: data.duracionHoras,
    },
  });

  const { mutate } = useMutation({
    mutationFn: updateAsignatura,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["asignaturas"] });
      queryClient.invalidateQueries({
        queryKey: ["editAsignatura", asignaturaId],
      });
      toast.success(data);
      navigate("/asignaturas");
    },
  });

  const handleForm = (formData: AsignaturaFormData) => {
    mutate({ formData, asignaturaId });
  };

  return (
    <div className="my-10">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-4xl font-black text-slate-800 mb-4 text-center">
          Editar Asignatura
        </h1>
        <p className="text-lg text-gray-500 mb-8">
          Modifica los campos necesarios y guarda los cambios
        </p>

        <form onSubmit={handleSubmit(handleForm)} className="space-y-6">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-1">
              Nombre de la Asignatura
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Ej: Programación Avanzada"
              {...register("nombre", { required: "El nombre es obligatorio" })}
            />
            {errors.nombre && (
              <ErrorMessage>{errors.nombre.message}</ErrorMessage>
            )}
          </div>

          {/* Código */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-1">
              Código
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Ej: INF-101"
              {...register("codigo", { required: "El código es obligatorio" })}
            />
            {errors.codigo && (
              <ErrorMessage>{errors.codigo.message}</ErrorMessage>
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
              placeholder="Ej: Ingeniería de Sistemas"
              {...register("departamento")}
            />
          </div>

          {/* Profesor */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-1">
              Profesor
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              {...register("profesor", { required: "Selecciona un profesor" })}
            >
              <option value="">Selecciona un profesor</option>
              {profesores.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.nombreCompleto}
                </option>
              ))}
            </select>
            {errors.profesor && (
              <ErrorMessage>{errors.profesor.message}</ErrorMessage>
            )}
          </div>

          {/* Créditos y duración */}
          <div className="flex gap-6">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-slate-900 mb-1">
                Créditos
              </label>
              <input
                type="number"
                min={1}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Ej: 3"
                {...register("creditos", {
                  required: "Los créditos son obligatorios",
                })}
              />
              {errors.creditos && (
                <ErrorMessage>{errors.creditos.message}</ErrorMessage>
              )}
            </div>

            <div className="flex-1">
              <label className="block text-sm font-semibold text-slate-900 mb-1">
                Duración (horas)
              </label>
              <input
                type="number"
                min={1}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Ej: 48"
                {...register("duracionHoras", {
                  required: "La duración es obligatoria",
                })}
              />
              {errors.duracionHoras && (
                <ErrorMessage>{errors.duracionHoras.message}</ErrorMessage>
              )}
            </div>
          </div>

          {/* Botón */}
          <div className="text-center">
            <input
              type="submit"
              value="Guardar Cambios"
              className="w-md bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all cursor-pointer"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
