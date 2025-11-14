import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Loading } from "./Loading";

export const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // TODO: Obtener datos del usuario desde /api/profile
  const getUserData = async () => {
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/profile", {
        credentials: "include",
      });

      if (!res.ok) {
        console.log(
          "Error durante el fetch en profile",
          res.status,
          res.statusText
        );
        setUser(null);
      }

      const userData = await res.json();

      console.log(userData);

      setUser(userData);

      await new Promise((resolve) => setTimeout(resolve, 800));

      setIsLoading(false);
    } catch (err) {
      console.log("Error trayendo los datos del usuario", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  // TODO: Implementar función handleLogout con POST a /api/logout usando credentials: 'include'

  // TODO: Después del logout exitoso, redireccionar a /login

  const handleLogout = async () => {
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/logout", {
        credentials: "include",
      });

      if (!res.ok) {
        console.log("Hubo un error en la función handleLogout");
        return;
      }

      setIsLoading(false);

      navigate("/login");
    } catch (err) {
      console.log("Error haciendo el logout", err);
    }
  };

  // TODO: Manejar errores apropiadamente

  const userName = user?.user.name; // TODO: Reemplazar con el nombre real del usuario obtenido de /api/profile

  if (isLoading) {
    return <Loading />;
  }

  return (
    <nav className="bg-gray-900 text-white h-16 left-0 right-0 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <div className="text-2xl font-bold">Superhéroes App</div>

        <div className="hidden md:flex items-center space-x-6">
          <span className="text-gray-300">
            Bienvenido,{" "}
            <span className="font-semibold text-white">{userName}</span>
          </span>

          <button
            onClick={() => {
              // TODO: Implementar handleLogout aquí
              handleLogout();
            }}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition-colors font-medium"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </nav>
  );
};
