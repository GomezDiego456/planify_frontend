import { dashboardSalonSchema, type Salon, type SalonFormData } from "../types";
import api from "@/lib/axios";
import { isAxiosError } from "axios";

export async function createSalon(formData: SalonFormData) {
  try {
    const { data } = await api.post("/salones", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getSalon() {
  try {
    const { data } = await api("/salones");
    const response = dashboardSalonSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getSalonById(id: Salon["_id"]) {
  try {
    const { data } = await api(`/salones/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

type SalonApiType = {
  formData: SalonFormData;
  salonId: Salon["_id"];
};

export async function updateSalon({ formData, salonId }: SalonApiType) {
  try {
    const { data } = await api.put<string>(`/salones/${salonId}`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function deleteSalon(id: Salon["_id"]) {
  try {
    const { data } = await api.delete<string>(`/salones/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
