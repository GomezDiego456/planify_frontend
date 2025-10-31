import type { AsignaturaFormData } from "@/types/index";
import type { Profesor } from "@/types/index";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";

interface AsignaturaFormProps {
  register: UseFormRegister<AsignaturaFormData>;
  errors: FieldErrors<AsignaturaFormData>;
  profesores: Profesor[];
}

export default function AsignaturaForm({
  register,
  errors,
  profesores,
}: AsignaturaFormProps) {
  return (
    <>
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
        {errors.nombre && <ErrorMessage>{errors.nombre.message}</ErrorMessage>}
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
        {errors.codigo && <ErrorMessage>{errors.codigo.message}</ErrorMessage>}
      </div>

      {/* Departamento */}
      <div>
        <label className="block text-sm font-semibold text-slate-900 mb-1">
          Departamento
        </label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Ej: Ingeniería de Sistemas"
          {...register("departamento", {
            required: "El departamento es obligatorio",
          })}
        />
        {errors.departamento && (
          <ErrorMessage>{errors.departamento.message}</ErrorMessage>
        )}
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
            placeholder="Ej: 3"
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
          value="Registrar Asignatura"
          className="w-md bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all cursor-pointer"
        />
      </div>
    </>
  );
}
