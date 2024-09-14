// front/components/Nav.jsx
import Link from "next/link";

export default function Nav() {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <li>
          <Link href="/home">
            <p className="text-white hover:text-gray-400">Productos</p>
          </Link>
        </li>
        <li>
          <Link href="/administrar">
            <p className="text-white hover:text-gray-400">
              Modificar Productos
            </p>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
