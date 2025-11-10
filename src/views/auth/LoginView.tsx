"use client";

import { useForm } from "react-hook-form";
import type { UserLoginForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { authenticateUser } from "@/api/AuthApi";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginView() {
  const navigate = useNavigate();
  const initialValues: UserLoginForm = {
    email: "",
    password: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: authenticateUser,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Inicio de sesión exitoso");
      navigate("/dashboard");
    },
  });

  const handleLogin = (formData: UserLoginForm) => {
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
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Bienvenido</h1>
          <p className="text-slate-600">
            Inicia sesión en tu cuenta de Planify
          </p>
        </div>

        <form
          onSubmit={handleSubmit(handleLogin)}
          className="space-y-6"
          noValidate
        >
          {/* Email */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-slate-900"
            >
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
                aria-describedby="email-error"
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

          {/* Password */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-slate-900"
            >
              Contraseña
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-3.5 text-slate-400"
                size={20}
              />
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                {...register("password", {
                  required: "La contraseña es obligatoria",
                })}
              />
            </div>
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Iniciar Sesión
            <ArrowRight size={18} />
          </motion.button>
        </form>

        {/* Links */}
        <div className="mt-8 space-y-4">
          <Link
            to="/auth/forgot-password"
            className="block text-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            ¿Olvidaste tu contraseña?
          </Link>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-slate-600">O</span>
            </div>
          </div>

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
