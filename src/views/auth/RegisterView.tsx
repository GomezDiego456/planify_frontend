"use client";

import { useForm } from "react-hook-form";
import type { UserRegistrationForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createAccount } from "@/api/AuthApi";
import { toast } from "react-toastify";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function RegisterView() {
  const initialValues: UserRegistrationForm = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<UserRegistrationForm>({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: createAccount,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      reset();
    },
  });

  const password = watch("password");

  const handleRegister = (formData: UserRegistrationForm) => {
    mutate(formData);
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl mt-5 py-10 px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Crear cuenta
          </h1>
          <p className="text-slate-600">
            Únete a Planify y optimiza tus horarios
          </p>
        </div>

        <form
          onSubmit={handleSubmit(handleRegister)}
          className="space-y-5"
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
                  required: "El Email es obligatorio",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "E-mail no válido",
                  },
                })}
              />
            </div>
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </div>

          {/* Nombre */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-900">
              Nombre
            </label>
            <div className="relative">
              <User
                className="absolute left-3 top-3.5 text-slate-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Tu nombre"
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                {...register("name", {
                  required: "El nombre es obligatorio",
                })}
              />
            </div>
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-900">
              Contraseña
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-3.5 text-slate-400"
                size={20}
              />
              <input
                type="password"
                placeholder="Mínimo 8 caracteres"
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                {...register("password", {
                  required: "La contraseña es obligatoria",
                  minLength: {
                    value: 8,
                    message: "Mínimo 8 caracteres",
                  },
                })}
              />
            </div>
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </div>

          {/* Confirmar Password */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-900">
              Confirmar contraseña
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-3.5 text-slate-400"
                size={20}
              />
              <input
                id="password_confirmation"
                type="password"
                placeholder="Repite tu contraseña"
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                {...register("password_confirmation", {
                  required: "Confirmar contraseña es obligatorio",
                  validate: (value) =>
                    value === password || "Las contraseñas no coinciden",
                })}
              />
            </div>
            {errors.password_confirmation && (
              <ErrorMessage>
                {errors.password_confirmation.message}
              </ErrorMessage>
            )}
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Registrarme
            <ArrowRight size={18} />
          </motion.button>
        </form>

        {/* Links */}
        <div className="mt-8 space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-slate-600">O</span>
            </div>
          </div>

          <Link
            to="/auth/login"
            className="block text-center bg-slate-100 text-slate-900 font-semibold py-3 rounded-lg hover:bg-slate-200 transition-colors"
          >
            Ya tengo cuenta
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
