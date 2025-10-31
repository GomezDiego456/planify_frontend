import {
  dashboardAsignaturaSchema,
  type Asignatura,
  type AsignaturaFormData,
} from "../types";
import api from "@/lib/axios";
import { isAxiosError } from "axios";

// Crear una asignatura
export async function createAsignatura(formData: AsignaturaFormData) {
  try {
    const { data } = await api.post("/asignaturas", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error("Error al crear la asignatura");
    }
  }
}

// Obtener todas las asignaturas
export async function getAsignaturas() {
  try {
    const { data } = await api("/asignaturas");
    const response = dashboardAsignaturaSchema.safeParse(data);

    if (response.success) {
      return response.data;
    } else {
      console.error(
        "Error en el formato de datos de asignaturas:",
        response.error
      );
      return []; // <- Retorna un array vacío en caso de formato inválido
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.error("Error al obtener asignaturas:", error.response.data.error);
      return []; // <- Retorna array vacío también aquí
    } else {
      console.error("Error desconocido al obtener asignaturas:", error);
      return []; // <- Asegura retorno válido
    }
  }
}

// Obtener una asignatura por ID
export async function getAsignaturaById(id: Asignatura["_id"]) {
  try {
    const { data } = await api(`/asignaturas/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error("Error al obtener la asignatura");
    }
  }
}

// Tipado del update
type AsignaturaApiType = {
  formData: AsignaturaFormData;
  asignaturaId: Asignatura["_id"];
};

// Actualizar una asignatura
export async function updateAsignatura({
  formData,
  asignaturaId,
}: AsignaturaApiType) {
  try {
    const { data } = await api.put<string>(
      `/asignaturas/${asignaturaId}`,
      formData
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error("Error al actualizar la asignatura");
    }
  }
}

// Eliminar una asignatura
export async function deleteAsignatura(id: Asignatura["_id"]) {
  try {
    const { data } = await api.delete<string>(`/asignaturas/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error("Error al eliminar la asignatura");
    }
  }
}
