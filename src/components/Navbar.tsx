import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <ul className="flex items-center gap-6">
        <li>
          <Link
            to="/"
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
          <Link
            to="#beneficios"
            className="text-white text-lg font-medium hover:border-2 rounded-full px-5 py-2"
          >
            Beneficios
          </Link>
        </li>
        <li>
          <Link
            to="/iniciar-sesion"
            className="bg-[#1E4E8C] border-2 border-[#1A365D] text-white px-5 py-2 rounded-full text-lg font-semibold hover:bg-[#1A365D] transition-colors"
          >
            Iniciar sesión
          </Link>
        </li>
      </ul>
    </nav>
  );
}
