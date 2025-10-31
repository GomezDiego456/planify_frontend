import {
  dashboardProfesorSchema,
  type Profesor,
  type ProfesorFormData,
} from "../types";
import api from "@/lib/axios";
import { isAxiosError } from "axios";

export async function createProfesor(formData: ProfesorFormData) {
  try {
    const { data } = await api.post("/profesores", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getProfesor() {
  try {
    const { data } = await api("/profesores");
    const response = dashboardProfesorSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getProfesorById(id: Profesor["_id"]) {
  try {
    const { data } = await api(`/profesores/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

type ProfesorApiType = {
  formData: ProfesorFormData;
  profesorId: Profesor["_id"];
};

export async function updateProfesor({
  formData,
  profesorId,
}: ProfesorApiType) {
  try {
    const { data } = await api.put<string>(
      `/profesores/${profesorId}`,
      formData
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function deleteProfesor(id: Profesor["_id"]) {
  try {
    const { data } = await api.delete<string>(`/profesores/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
