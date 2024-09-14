// front/components/Nav.jsx
import Link from "next/link";
import "./nav.css";

export default function Nav() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container-buscador">
        <input type="text" />
      </div>
      <ul className="flex space-x-4">
        <li>
          <Link href="/home">
            <p className="text-white hover:text-gray-400">Productos</p>
          </Link>
        </li>
        <li>
          <Link href="/administrar">
            <p className="text-white hover:text-gray-400">Mis Productos</p>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
