import type { UseFormRegister, FieldErrors } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import type { SalonFormData } from "types";

type SalonFormProps = {
  register: UseFormRegister<SalonFormData>;
  errors: FieldErrors<SalonFormData>;
};

export default function SalonForm({ errors, register }: SalonFormProps) {
  return (
    <>
      {/* Nombre */}
      <div>
        <label className="block text-sm font-semibold text-slate-900 mb-1">
          Nombre
        </label>

        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
          {...register("nombre", {
            required: "El nombre es obligatorio",
          })}
        />
        {errors.nombre && <ErrorMessage>{errors.nombre.message}</ErrorMessage>}
      </div>

      {/* Tipo */}
      <div>
        <label className="block text-sm font-semibold text-slate-900 mb-1">
          Tipo
        </label>
        <select
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
          {...register("tipo", {
            required: "El tipo es obligatorio",
          })}
        >
          <option value="Aula">Aula</option>
          <option value="Laboratorio">Laboratorio</option>
          <option value="Auditorio">Auditorio</option>
          <option value="Sala de Cómputo">Sala de Cómputo</option>
          <option value="Otro">Otro</option>
        </select>
        {errors.tipo && <ErrorMessage>{errors.tipo.message}</ErrorMessage>}
      </div>

      {/* Capacidad */}
      <div>
        <label className="block text-sm font-semibold text-slate-900 mb-1">
          Capacidad
        </label>
        <input
          type="number"
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
          {...register("capacidad", {
            required: "La capacidad es obligatoria",
          })}
        />
        {errors.capacidad && (
          <ErrorMessage>{errors.capacidad.message}</ErrorMessage>
        )}
      </div>

      {/* Ubicación */}
      <div>
        <label className="block text-sm font-semibold text-slate-900 mb-1">
          Ubicación
        </label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
          {...register("ubicacion", {
            required: "La ubicación es obligatoria",
          })}
        />
        {errors.ubicacion && (
          <ErrorMessage>{errors.ubicacion.message}</ErrorMessage>
        )}
      </div>

      {/* Recursos */}
      <div>
        <label className="block text-sm font-semibold text-slate-900 mb-1">
          Recursos
        </label>
        <input
          type="text"
          placeholder="Ej: Proyector, Tablero, Aire acondicionado"
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
          {...register("recursos", {
            required: "Los recursos son obligatorios",
          })}
        />
        {errors.recursos && (
          <ErrorMessage>{errors.recursos.message}</ErrorMessage>
        )}
      </div>

      {/* Botón */}
      <div className="text-center">
        <input
          type="submit"
          value="Crear Salón"
          className="w-md bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all cursor-pointer"
        />
      </div>
    </>
  );
}
