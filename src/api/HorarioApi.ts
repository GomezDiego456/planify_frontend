import api from "@/lib/axios";
import { isAxiosError } from "axios";
import type { GenerarHorarioPayload, HorarioGenerado } from "@/types/index";
import { generatedHorarioSchema } from "@/types/index";

/**
 * Llama al endpoint POST /horarios/generar
 * Recibe payload tipado GenerarHorarioPayload
 * Devuelve HorarioGenerado (array de HorarioItem)
 */
export async function generarHorario(
  payload: GenerarHorarioPayload
): Promise<HorarioGenerado> {
  try {
    const { data } = await api.post("/horarios/generar", payload);

    const parsed = generatedHorarioSchema.safeParse(data);
    if (!parsed.success) {
      console.error("Zod validation failed:", parsed.error.format());
      throw new Error("Respuesta del servidor no válida");
    }

    return parsed.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const msg =
        (error.response.data && error.response.data.error) ||
        (error.response.data && error.response.data.message);
      throw new Error(msg ?? "Error en la petición");
    }
    throw new Error("Error desconocido al generar el horario");
  }
}

/**
 * Llama al endpoint DELETE /horarios/eliminar
 * Elimina todos los horarios y devuelve un mensaje
 */
export async function eliminarHorario(): Promise<{ message: string }> {
  try {
    const { data } = await api.delete("/horarios/eliminar");
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const msg =
        (error.response.data && error.response.data.error) ||
        (error.response.data && error.response.data.message);
      throw new Error(msg ?? "Error en la petición");
    }
    throw new Error("Error desconocido al eliminar el horario");
  }
}
