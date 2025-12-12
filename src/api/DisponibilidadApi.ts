import api from "@/lib/axios";
import { isAxiosError } from "axios";
import {
  disponibilidadProfesorSchema,
  profesoresRestringidosSchema,
  type DisponibilidadFormData,
  type Profesor,
} from "@/types/index";

/**
 * Obtener todos los profesores con disponibilidad restringida
 */
export async function getProfesoresRestringidos() {
  try {
    const { data } = await api.get("/disponibilidad/profesores-restringidos");
    const response = profesoresRestringidosSchema.safeParse(data);

    if (response.success) {
      return response.data;
    } else {
      console.error("Error parsing profesores restringidos:", response.error);
      return [];
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw new Error("Error al obtener profesores restringidos");
  }
}

/**
 * Obtener disponibilidad de un profesor específico
 */
export async function getDisponibilidadProfesor(profesorId: Profesor["_id"]) {
  try {
    const { data } = await api.get(`/disponibilidad/${profesorId}`);
    const response = disponibilidadProfesorSchema.safeParse(data);

    if (response.success) {
      return response.data;
    }
    return null;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      // Si no existe disponibilidad, devolver null en lugar de error
      if (error.response.status === 404) {
        return null;
      }
      throw new Error(error.response.data.error);
    }
    throw new Error("Error al obtener disponibilidad");
  }
}

/**
 * Guardar disponibilidad de un profesor
 */
type GuardarDisponibilidadType = {
  profesorId: Profesor["_id"];
  formData: DisponibilidadFormData;
};

export async function guardarDisponibilidad({
  profesorId,
  formData,
}: GuardarDisponibilidadType) {
  try {
    const { data } = await api.post(`/disponibilidad/${profesorId}`, formData);
    return data.message;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw new Error("Error al guardar disponibilidad");
  }
}

/**
 * Eliminar disponibilidad de un profesor
 */
export async function eliminarDisponibilidad(profesorId: Profesor["_id"]) {
  try {
    const { data } = await api.delete(`/disponibilidad/${profesorId}`);
    return data.message;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw new Error("Error al eliminar disponibilidad");
  }
}
