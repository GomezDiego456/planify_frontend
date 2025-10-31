import type { UseFormRegister, FieldErrors } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import type { ProfesorFormData } from "types";

type ProfesorFormProps = {
  register: UseFormRegister<ProfesorFormData>;
  errors: FieldErrors<ProfesorFormData>;
};

export default function ProfesorForm({ errors, register }: ProfesorFormProps) {
  return (
    <>
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
        {errors.correo && <ErrorMessage>{errors.correo.message}</ErrorMessage>}
      </div>

      {/* Departamento */}
      <div>
        <label className="block text-sm font-semibold text-slate-900 mb-1">
          Departamento
        </label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Ej: Ciencias Básicas"
          {...register("departamento", {
            required: "El departamento es obligatorio",
          })}
        />
        {errors.departamento && (
          <ErrorMessage>{errors.departamento.message}</ErrorMessage>
        )}
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
          value="Crear Profesor"
          className="w-md bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all cursor-pointer"
        />
      </div>
    </>
  );
}
