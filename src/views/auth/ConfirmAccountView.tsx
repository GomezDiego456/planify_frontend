"use client";

import { Link } from "react-router-dom";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useState } from "react";
import type { ConfirmToken } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { confirmAccount } from "@/api/AuthApi";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function ConfirmAccountView() {
  const [token, setToken] = useState<ConfirmToken["token"]>("");

  const { mutate } = useMutation({
    mutationFn: confirmAccount,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
    },
  });

  const handleChange = (token: ConfirmToken["token"]) => {
    setToken(token);
  };

  const handleComplete = (token: ConfirmToken["token"]) => {
    mutate({ token });
    // console.log("Token completo:", token);
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl mt-5 py-10 px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 p-4 rounded-full">
              <CheckCircle className="text-blue-600" size={40} />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Confirma tu cuenta
          </h1>
          <p className="text-slate-600">
            Ingresa el código de 6 dígitos que recibiste por email
          </p>
        </div>

        <form className="space-y-8">
          <div className="flex justify-center gap-3">
            <PinInput
              value={token}
              onChange={handleChange}
              onComplete={handleComplete}
            >
              <PinInputField className="w-12 h-12 text-center text-2xl font-bold border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" />
              <PinInputField className="w-12 h-12 text-center text-2xl font-bold border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" />
              <PinInputField className="w-12 h-12 text-center text-2xl font-bold border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" />
              <PinInputField className="w-12 h-12 text-center text-2xl font-bold border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" />
              <PinInputField className="w-12 h-12 text-center text-2xl font-bold border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" />
              <PinInputField className="w-12 h-12 text-center text-2xl font-bold border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" />
            </PinInput>
          </div>
        </form>

        {/* Links */}
        <div className="mt-8 space-y-4">
          <Link
            to="/auth/request-code"
            className="block text-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            ¿No recibiste el código? Solicitar uno nuevo
          </Link>

          <Link
            to="/auth/login"
            className="block text-center bg-slate-100 text-slate-900 font-semibold py-3 rounded-lg hover:bg-slate-200 transition-colors"
          >
            Volver al inicio de sesión
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
