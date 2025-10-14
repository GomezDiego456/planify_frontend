import { motion } from "framer-motion";
import { FaClock, FaCog, FaTable, FaCheckCircle } from "react-icons/fa";

export default function DashboardView() {
  return (
    <main className="bg-[#EAF3FF] ">
      {/* HERO */}
      <section className="text-center py-20 px-6 bg-gradient-to-b text-[#1E4E8C]">
        <motion.h1
          className="text-4xl md:text-6xl font-semibold mb-4"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Organiza tus horarios en segundos con{" "}
          <span className="text-[#1E4E8C] font-bold">Planify</span>
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl mb-8 text-[#1E4E8C] max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Genera automáticamente horarios académicos optimizados para docentes y
          estudiantes. sin conflictos, sin estrés.
        </motion.p>
        <motion.button
          className="bg-white text-[#2B6CB0] font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-blue-100 transition-colors cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Empezar ahora
        </motion.button>
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="bg-[#2B6CB0] py-20 px-6 mx-auto text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-[#1A365D]">
          {[
            {
              icon: <FaTable size={36} />,
              title: "1. Ingresa tus materias",
              desc: "Añade asignaturas, salones y profesores fácilmente.",
            },
            {
              icon: <FaCog size={36} />,
              title: "2. Planify genera horarios",
              desc: "El sistema calcula automáticamente combinaciones óptimas.",
            },
            {
              icon: <FaCheckCircle size={36} />,
              title: "3. Exporta y comparte",
              desc: "Visualiza y descarga los horarios sin conflictos.",
            },
          ].map((step, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-md p-8"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div className="text-[#2B6CB0] mb-4">{step.icon}</div>
              <h3 className="font-semibold text-xl mb-2">{step.title}</h3>
              <p className="text-[#1E4E8C]">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* BENEFICIOS */}
      <section id="beneficios" className="py-15 px-6 text-center">
        <h2 className="text-3xl font-bold mb-12 text-[#1A365D]">
          Beneficios de usar Planify
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: <FaClock size={32} />,
              title: "Ahorra tiempo",
              desc: "Genera horarios en minutos.",
            },
            {
              icon: <FaCog size={32} />,
              title: "Evita conflictos",
              desc: "Detecta choques de materias o profesores automáticamente.",
            },
            {
              icon: <FaTable size={32} />,
              title: "Flexible",
              desc: "Se adapta a distintos programas académicos.",
            },
            {
              icon: <FaCheckCircle size={32} />,
              title: "Accesible",
              desc: "Disponible desde cualquier dispositivo.",
            },
          ].map((benefit, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-md p-8"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-[#2B6CB0] mb-4">{benefit.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
              <p className="text-[#1E4E8C]">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="pb-20 pt-10 px-6 text-[#1A365D] text-center">
        <h2 className="text-4xl font-bold mb-6">Empieza a usar Planify hoy</h2>
        <p className="text-[#1E4E8C] mb-8">
          Optimiza la creación de horarios y dedica más tiempo a lo que importa:
          enseñar y aprender.
        </p>
        <button className="bg-white text-[#2B6CB0] font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-blue-100 transition-colors cursor-pointer">
          ¡Probar Planify!
        </button>
      </section>
    </main>
  );
}
