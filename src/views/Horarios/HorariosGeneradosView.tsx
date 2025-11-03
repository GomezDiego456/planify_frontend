"use client";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaDownload, FaShare, FaEdit, FaArrowLeft } from "react-icons/fa";

export default function HorariosGeneradosView() {
  const navigate = useNavigate();

  // Mock data de horario generado
  const horariosData = [
    {
      dia: "Lunes",
      bloques: [
        {
          hora: "08:00 - 09:30",
          asignatura: "Cálculo I",
          profesor: "Juan Pérez",
          salon: "Aula 101",
        },
        {
          hora: "09:45 - 11:15",
          asignatura: "Física",
          profesor: "María García",
          salon: "Lab 2",
        },
        {
          hora: "11:30 - 13:00",
          asignatura: "Programación",
          profesor: "Carlos López",
          salon: "Aula 202",
        },
      ],
    },
    {
      dia: "Martes",
      bloques: [
        {
          hora: "08:00 - 09:30",
          asignatura: "Algebra",
          profesor: "Ana Martínez",
          salon: "Aula 103",
        },
        {
          hora: "09:45 - 11:15",
          asignatura: "Cálculo II",
          profesor: "Juan Pérez",
          salon: "Aula 101",
        },
      ],
    },
  ];

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 p-4 md:p-8 bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Header con botón atrás */}
        <motion.button
          onClick={() => navigate("/horarios")}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 font-semibold"
          whileHover={{ x: -5 }}
        >
          <FaArrowLeft /> Volver al generador
        </motion.button>

        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            Horario Académico Generado
          </h2>
          <p className="text-slate-600">
            Aquí está tu horario optimizado sin conflictos
          </p>
        </div>

        <div className="min-h-screen bg-slate-100 p-6">
          {/* Botones de acción */}
          <div className="mb-8 flex gap-3 flex-wrap">
            <motion.button
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaDownload /> Descargar PDF
            </motion.button>
            <motion.button
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaShare /> Compartir
            </motion.button>
            <motion.button
              className="flex items-center gap-2 bg-slate-600 hover:bg-slate-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaEdit /> Editar
            </motion.button>
          </div>

          {/* Horarios por día */}
          <div className="space-y-6">
            {horariosData.map((dia, index) => (
              <motion.div
                key={dia.dia}
                className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4">
                  <h3 className="text-xl font-bold">{dia.dia}</h3>
                </div>
                <div className="p-6 space-y-3">
                  {dia.bloques.map((bloque, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col md:flex-row md:items-center md:justify-between p-4 bg-slate-50 rounded-lg border border-slate-200 hover:border-blue-300 transition-colors"
                    >
                      <div className="md:w-1/4">
                        <p className="text-sm text-slate-500">Hora</p>
                        <p className="font-semibold text-slate-900">
                          {bloque.hora}
                        </p>
                      </div>
                      <div className="md:w-1/4 mt-3 md:mt-0">
                        <p className="text-sm text-slate-500">Asignatura</p>
                        <p className="font-semibold text-blue-600">
                          {bloque.asignatura}
                        </p>
                      </div>
                      <div className="md:w-1/4 mt-3 md:mt-0">
                        <p className="text-sm text-slate-500">Profesor</p>
                        <p className="font-semibold text-slate-900">
                          {bloque.profesor}
                        </p>
                      </div>
                      <div className="md:w-1/4 mt-3 md:mt-0">
                        <p className="text-sm text-slate-500">Salón</p>
                        <p className="font-semibold text-green-600">
                          {bloque.salon}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Resumen */}
          <motion.div
            className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
              <p className="text-slate-600 text-sm">Bloques generados</p>
              <p className="text-3xl font-bold text-blue-600">5</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
              <p className="text-slate-600 text-sm">Conflictos detectados</p>
              <p className="text-3xl font-bold text-green-600">0</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
              <p className="text-slate-600 text-sm">Eficiencia</p>
              <p className="text-3xl font-bold text-yellow-600">100%</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
