"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaSpinner, FaCheckCircle, FaCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function HorariosView() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const navigate = useNavigate();

  const handleGenerateSchedule = () => {
    setIsGenerating(true);

    // Simular generación de horarios (sin backend por ahora)
    setTimeout(() => {
      setIsGenerating(false);
      setIsGenerated(true);
    }, 3000);
  };

  const handleViewSchedule = () => {
    // Navegar a la página del horario generado
    navigate("/horarios/view");
  };

  const handleReset = () => {
    setIsGenerated(false);
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 p-4 md:p-8 bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            Generador de Horarios
          </h2>
          <p className="text-slate-600 text-lg">
            Genera automáticamente horarios académicos optimizados sin
            conflictos
          </p>
        </div>

        {/* Main Content */}
        <div className="min-h-screen bg-slate-100 p-6 md:p-8">
          {!isGenerated ? (
            <motion.div
              className="max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
                  <div className="text-blue-600 text-2xl mb-2">12</div>
                  <p className="text-slate-600 text-sm">
                    Profesores registrados
                  </p>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
                  <div className="text-green-600 text-2xl mb-2">34</div>
                  <p className="text-slate-600 text-sm">
                    Asignaturas configuradas
                  </p>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
                  <div className="text-yellow-600 text-2xl mb-2">8</div>
                  <p className="text-slate-600 text-sm">Salones disponibles</p>
                </div>
              </div>

              {/* Generate Button Section */}
              <div className="bg-white rounded-2xl shadow-lg p-12 border border-slate-200 text-center">
                <motion.div
                  className="mb-6"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <FaCalendarAlt className="text-5xl text-blue-600 mx-auto mb-6" />
                </motion.div>

                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  ¿Listo para generar?
                </h3>
                <p className="text-slate-600 mb-8 text-lg">
                  El sistema analizará todos tus profesores, asignaturas y
                  salones para crear horarios optimizados sin conflictos.
                </p>

                <motion.button
                  onClick={handleGenerateSchedule}
                  disabled={isGenerating}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-slate-400 disabled:to-slate-400 text-white font-bold py-4 px-10 rounded-full text-lg shadow-lg transition-all transform disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isGenerating ? (
                    <span className="flex items-center gap-3 justify-center">
                      <FaSpinner className="animate-spin" />
                      Generando horarios...
                    </span>
                  ) : (
                    "Generar Horarios Automáticamente"
                  )}
                </motion.button>

                <p className="text-slate-500 text-sm mt-6">
                  Esto puede tomar entre 1-3 minutos dependiendo de la
                  complejidad
                </p>
              </div>

              {/* Features */}
              <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  className="bg-white rounded-xl shadow-md p-6 border border-slate-200"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-blue-600 text-2xl mb-3">✓</div>
                  <h4 className="font-semibold text-slate-900 mb-2">
                    Sin conflictos
                  </h4>
                  <p className="text-slate-600 text-sm">
                    El sistema valida que no haya profesores o salones
                    duplicados
                  </p>
                </motion.div>
                <motion.div
                  className="bg-white rounded-xl shadow-md p-6 border border-slate-200"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-blue-600 text-2xl mb-3">⚡</div>
                  <h4 className="font-semibold text-slate-900 mb-2">
                    Rápido y eficiente
                  </h4>
                  <p className="text-slate-600 text-sm">
                    Análisis automático de todas las restricciones y
                    preferencias
                  </p>
                </motion.div>
                <motion.div
                  className="bg-white rounded-xl shadow-md p-6 border border-slate-200"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-blue-600 text-2xl mb-3">📊</div>
                  <h4 className="font-semibold text-slate-900 mb-2">
                    Distribución óptima
                  </h4>
                  <p className="text-slate-600 text-sm">
                    Equilibrio de cargas horarias para todos los participantes
                  </p>
                </motion.div>
                <motion.div
                  className="bg-white rounded-xl shadow-md p-6 border border-slate-200"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-blue-600 text-2xl mb-3">🔄</div>
                  <h4 className="font-semibold text-slate-900 mb-2">
                    Regenerar anytime
                  </h4>
                  <p className="text-slate-600 text-sm">
                    Genera nuevos horarios en cualquier momento si necesitas
                    cambios
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            // Generated State
            <motion.div
              className="max-w-2xl mx-auto text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="mb-8"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <FaCheckCircle className="text-6xl text-green-500 mx-auto" />
              </motion.div>

              <h3 className="text-3xl font-bold text-slate-900 mb-4">
                ¡Horarios generados exitosamente!
              </h3>
              <p className="text-slate-600 mb-10 text-lg">
                Tu horario académico ha sido creado sin conflictos y está listo
                para revisar
              </p>

              <div className="space-y-3">
                <motion.button
                  onClick={handleViewSchedule}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg transition-all transform"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Ver Horario Generado
                </motion.button>
                <motion.button
                  onClick={handleReset}
                  className="w-full bg-slate-200 hover:bg-slate-300 text-slate-900 font-bold py-3 px-8 rounded-full text-lg shadow-md transition-all transform"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Generar nuevo horario
                </motion.button>
              </div>

              <div className="mt-10 bg-green-50 border border-green-200 rounded-xl p-6">
                <p className="text-green-800 text-sm">
                  <strong>Nota:</strong> Este horario es una vista previa.
                  Puedes descargarlo, compartirlo o hacer ajustes antes de
                  publicarlo.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
