"use client";

import NewPasswordToken from "@/components/auth/NewPasswordToken";
import NewPasswordForm from "@/components/auth/NewPasswordForm";
import { useState } from "react";
import type { ConfirmToken } from "@/types/index";
import { motion } from "framer-motion";

export default function NewPasswordView() {
  const [token, setToken] = useState<ConfirmToken["token"]>("");
  const [isValidToken, setIsValidToken] = useState(false);

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl mt-5 py-10 px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">Restablecer contraseña</h1>
          <p className="text-slate-600">
            {!isValidToken
              ? "Ingresa el código que recibiste por email"
              : "Crea tu nueva contraseña"}
          </p>
        </div>

        {!isValidToken ? (
          <NewPasswordToken
            token={token}
            setToken={setToken}
            setIsValidToken={setIsValidToken}
          />
        ) : (
          <NewPasswordForm token={token} />
        )}
      </motion.div>
    </div>
  );
}
