import { Link } from "react-router-dom";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { useAuth } from "../../context/AuthContext";

function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-gray-200 p-4">
      <nav className="flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link to="/">El Kfe</Link>
        </div>
        <ul className="flex space-x-4">
          <li><Link to="/products">Productos</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          {!user ? (
            <>
              <li><Link to="/login">Iniciar Sesión</Link></li>
              <li><Link to="/register">Registrarse</Link></li>
            </>
          ) : (
            <li>
              <button onClick={logout} className="text-red-500">Cerrar Sesión</button>
            </li>
          )}
          <li>
            <Link to="/cart" className="relative">
              <ShoppingCartIcon className="w-6 h-6" />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
