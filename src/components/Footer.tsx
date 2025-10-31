import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-screen-2xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 md:text-left">
        {/* Columna 1 */}
        <div className="md:text-left ">
          <h2 className="text-2xl font-bold tracking-tight text-center mb-5">
            Planify
          </h2>
          <p className="text-sm text-slate-400 mt-2 text-center">
            Sistema automático de horarios académicos
          </p>
        </div>

        {/* Columna 2 */}
        <div className=" md:text-left">
          <h2 className="text-2xl font-bold tracking-tight text-center">
            Explorar
          </h2>
          <ul className="text-sm text-slate-400 space-y-2 text-center mt-4">
            <li className="hover:text-blue-400 transition-colors cursor-pointer">
              Inicio
            </li>
            <li className="hover:text-blue-400 transition-colors cursor-pointer">
              Horarios
            </li>
            <li className="hover:text-blue-400 transition-colors cursor-pointer">
              Contacto
            </li>
          </ul>
        </div>

        {/* Columna 3 */}
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-center">
            Sígueme
          </h2>
          <div className="flex justify-center gap-6 my-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              <FaGithub size={26} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              <FaLinkedin size={26} />
            </a>
            <a
              href="mailto:contact@planify.com"
              className="hover:text-blue-400 transition-colors"
            >
              <FaEnvelope size={26} />
            </a>
          </div>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="border-t border-slate-700 mt-8 pt-6 text-center text-sm text-slate-400">
        <p>
          &copy; {new Date().getFullYear()} Planify. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
}
