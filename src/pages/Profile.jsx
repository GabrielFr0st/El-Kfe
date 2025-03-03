import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user } = useAuth();
  const [favoriteAddress, setFavoriteAddress] = useState("");

  useEffect(() => {
    if (user) {
      setFavoriteAddress("Calle Falsa 123, Santiago");
    }
  }, [user]);

  if (!user) {
    return <p>Por favor, inicia sesión para ver tu perfil.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Perfil</h1>
      <p>Dirección de envío favorita: {favoriteAddress}</p>
    </div>
  );
}

export default Profile;