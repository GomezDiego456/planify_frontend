import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

export default function Navbar() {
  return (
    <nav aria-label="Menú principal de navegación">
      <ul className="flex items-center gap-6">
        <li>
          <Link
            to="/dashboard"
            className="text-white text-lg font-medium hover:border-2 rounded-full px-5 py-2"
          >
            Inicio
          </Link>
        </li>
        <li>
          <Link
            to="/horarios"
            className="text-white text-lg font-medium hover:border-2 rounded-full px-5 py-2"
          >
            Horarios
          </Link>
        </li>
        <li>
          <ScrollLink
            to="beneficios"
            smooth={true}
            duration={600}
            offset={-50} // ajusta si tu navbar tiene altura fija
            className="text-white text-lg font-medium hover:border-2 rounded-full px-5 py-2 cursor-pointer"
          >
            Beneficios
          </ScrollLink>
        </li>
        <li>
          <Link
            to="/auth/login"
            className=" bg-white text-[#2B6CB0] font-semibold px-8 py-3 rounded-full shadow-lg border-2 border-blue-500 hover:bg-blue-100 transition-colors cursor-pointer"
          >
            Iniciar sesión
          </Link>
        </li>
      </ul>
    </nav>
  );
}
