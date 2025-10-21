import { Outlet } from "react-router-dom";
import Logo from "@/components/Logo";
import Navbar from "@/components/Navbar";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AppLayout() {
  return (
    <>
      <header className="bg-[#2B6CB0] py-5">
        <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center px-10">
          <div className="w-64">
            <Logo />
          </div>
          <div>
            <Navbar />
          </div>
        </div>
      </header>

      <section className="bg-[#EAF3FF] ">
        <Outlet />
      </section>

      <footer className="bg-[#2B6CB0] text-white py-10">
        <div className="max-w-screen-2xl mx-auto px-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Sección izquierda */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold tracking-wide">Planify</h2>
            <p className="text-sm text-blue-100 mt-1">
              Sistema automático de horarios académicos
            </p>
          </div>

          {/* Sección central */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold tracking-wide">Explorar</h2>
            <ul className="text-sm text-blue-100 mt-1 space-y-1">
              <li className="hover:text-white transition-colors cursor-pointer">
                Inicio
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Horarios
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Contacto
              </li>
            </ul>
          </div>

          {/* Sección derecha */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold tracking-wide">Sígueme</h2>
            <div className="flex justify-center gap-5 mt-3">
              <a
                href="https://github.com/tuusuario"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-200 transition-colors"
              >
                <FaGithub size={24} />
              </a>
              <a
                href="https://linkedin.com/in/tuusuario"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-200 transition-colors"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="mailto:tuemail@gmail.com"
                className="hover:text-blue-200 transition-colors"
              >
                <FaEnvelope size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-blue-300/30 mt-8 pt-4 text-center text-sm text-blue-100">
          <p>
            &copy; {new Date().getFullYear()} Planify. Todos los derechos
            reservados.
          </p>
        </div>
      </footer>

      <ToastContainer />
    </>
  );
}
