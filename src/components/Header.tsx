import { useState } from "react";
import { Menu, X, LogOut } from "lucide-react";
import Logo from "./Logo";
import { Link } from "react-router-dom";

interface HeaderProps {
  onMenuToggle?: (isOpen: boolean) => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);
    onMenuToggle?.(newState);
  };

  return (
    <header
      className="bg-[#1E4E8C] text-white px-4 md:px-6 py-4 shadow-lg flex justify-between items-center"
      role="banner"
    >
      <div className="flex items-center gap-3">
        <button
          onClick={handleMenuToggle}
          className="md:hidden p-2 hover:bg-blue-500 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <Logo />
      </div>

      <Link
        to="/"
        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition-colors font-medium"
      >
        <LogOut size={18} />
        <span className="hidden sm:inline">Cerrar sesión</span>
      </Link>
    </header>
  );
}
