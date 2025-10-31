"use client";

import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { RequestConfirmationCodeForm } from "../../types";
import ErrorMessage from "@/components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { requestConfirmationCode } from "@/api/AuthApi";
import { toast } from "react-toastify";
import { Mail, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function RequestNewCodeView() {
  const initialValues: RequestConfirmationCodeForm = {
    email: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: requestConfirmationCode,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
    },
  });

  const handleRequestCode = (formData: RequestConfirmationCodeForm) =>
    mutate(formData);

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl mt-5 py-10 px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Solicitar código
          </h1>
          <p className="text-slate-600">
            Ingresa tu email para recibir un nuevo código de confirmación
          </p>
        </div>

        <form
          onSubmit={handleSubmit(handleRequestCode)}
          className="space-y-6"
          noValidate
        >
          {/* Email */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-900">
              Email
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-3.5 text-slate-400"
                size={20}
              />
              <input
                id="email"
                type="email"
                placeholder="tu@email.com"
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                {...register("email", {
                  required: "El email es obligatorio",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Email no válido",
                  },
                })}
              />
            </div>
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Enviar código
            <ArrowRight size={18} />
          </motion.button>
        </form>

        {/* Links */}
        <div className="mt-8 space-y-4">
          <Link
            to="/auth/login"
            className="block text-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            Volver al inicio de sesión
          </Link>

          <Link
            to="/auth/register"
            className="block text-center bg-slate-100 text-slate-900 font-semibold py-3 rounded-lg hover:bg-slate-200 transition-colors"
          >
            Crear una cuenta
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
