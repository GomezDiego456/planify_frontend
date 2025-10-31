import { z } from "zod";

// Auth users
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const authSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  password_confirmation: z.string(),
  token: z.string(),
});

type Auth = z.infer<typeof authSchema>;
export type UserLoginForm = Pick<Auth, "email" | "password">;
export type UserRegistrationForm = Pick<
  Auth,
  "name" | "email" | "password" | "password_confirmation"
>;
export type RequestConfirmationCodeForm = Pick<Auth, "email">;
export type ConfirmToken = Pick<Auth, "token">;
export type ForgotPasswordForm = Pick<Auth, "email">;
export type NewPasswordForm = Pick<Auth, "password" | "password_confirmation">;

//profesores
export const profesorSchema = z.object({
  _id: z.string(),
  nombreCompleto: z.string(),
  correo: z.string().email("Correo inválido"),
  departamento: z.string(),
  disponible: z.boolean(),
});

export type Profesor = z.infer<typeof profesorSchema>;
export type ProfesorFormData = Pick<
  Profesor,
  "nombreCompleto" | "correo" | "departamento" | "disponible"
>;
export const dashboardProfesorSchema = z.array(
  profesorSchema.pick({
    _id: true,
    nombreCompleto: true,
    correo: true,
    departamento: true,
    disponible: true,
  })
);

// asignaturas
export const asignaturaSchema = z.object({
  _id: z.string(),
  nombre: z.string(),
  codigo: z.string(),
  departamento: z.string().optional(),
  profesor: z
    .object({
      _id: z.string(),
      nombreCompleto: z.string(),
    })
    .optional(), // porque viene del populate
  creditos: z.number().optional(),
  duracionHoras: z.number().optional(),
});

export type Asignatura = z.infer<typeof asignaturaSchema>;

export type AsignaturaFormData = {
  nombre: string;
  codigo: string;
  departamento?: string;
  profesor: string | { _id: string; nombreCompleto: string };
  creditos: number;
  duracionHoras: number;
};

export const dashboardAsignaturaSchema = z.array(
  asignaturaSchema.pick({
    _id: true,
    nombre: true,
    codigo: true,
    departamento: true,
    profesor: true,
    creditos: true,
    duracionHoras: true,
  })
);

//salones
export const salonSchema = z.object({
  _id: z.string(),
  nombre: z.string(),
  tipo: z.string(),
  capacidad: z.number(),
  ubicacion: z.string(),
  recursos: z.string(),
});

export type Salon = z.infer<typeof salonSchema>;
export type SalonFormData = Pick<
  Salon,
  "nombre" | "tipo" | "capacidad" | "ubicacion" | "recursos"
>;
export const dashboardSalonSchema = z.array(
  salonSchema.pick({
    _id: true,
    nombre: true,
    tipo: true,
    capacidad: true,
    ubicacion: true,
    recursos: true,
  })
);
