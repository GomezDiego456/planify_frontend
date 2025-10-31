import type { Salon, SalonFormData } from "@/types/index";
import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/ErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSalon } from "@/api/SalonApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type EditSalonFormProps = {
  data: SalonFormData;
  salonId: Salon["_id"];
};

export default function EditSalonForm({ data, salonId }: EditSalonFormProps) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
  } = useForm<SalonFormData>({
    defaultValues: {
      nombre: data.nombre,
      tipo: data.tipo,
      capacidad: data.capacidad,
      ubicacion: data.ubicacion,
      recursos: data.recursos,
    },
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateSalon,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["salones"] });
      queryClient.invalidateQueries({ queryKey: ["editSalon", salonId] });
      toast.success(data);
      navigate("/salones/create");
    },
  });

  const handleForm = (formData: SalonFormData) => {
    const data = {
      formData,
      salonId,
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
          Llena el siguiente formulario para editar un salón
        </p>

        {/* Formulario */}
        <form onSubmit={handleSubmit(handleForm)} className="space-y-6">
          {/* Nombre */}
          <div>
            <label className="block text-gray-700">Nombre</label>
            <input
              type="text"
              className="w-full border rounded-lg p-2"
              {...register("nombre", {
                required: "El nombre es obligatorio",
              })}
            />
            {errors.nombre && (
              <ErrorMessage>{errors.nombre.message}</ErrorMessage>
            )}
          </div>

          {/* Tipo */}
          <div>
            <label className="block text-gray-700">Tipo</label>
            <select
              className="w-full border rounded-lg p-2"
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
            <label className="block text-gray-700">Capacidad</label>
            <input
              type="number"
              className="w-full border rounded-lg p-2"
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
            <label className="block text-gray-700">Ubicación</label>
            <input
              type="text"
              className="w-full border rounded-lg p-2"
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
            <label className="block text-gray-700">
              Recursos (separados por comas)
            </label>
            <input
              type="text"
              placeholder="Ej: Proyector, Tablero, Aire acondicionado"
              className="w-full border rounded-lg p-2"
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
        </form>
      </div>
    </div>
  );
}
