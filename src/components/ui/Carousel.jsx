import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import productoBalanza from "../../assets/img/3.jpg";
import productoCafeValentina from "../../assets/img/1.png";
import productoCafePlutonio from "../../assets/img/2.jpg";

function Carousel() {
  const navigate = useNavigate();

  const productos = [
    { id: 1, name: "Café Valentina", img: productoCafeValentina },
    { id: 2, name: "Café Plutonio", img: productoCafePlutonio },
    { id: 3, name: "Balanza portátil", img: productoBalanza }
  ];

  const [index, setIndex] = useState(0);

  const siguiente = useCallback(() => {
    setIndex((prevIndex) => (prevIndex + 1) % productos.length);
  }, [productos.length]);

  const anterior = () => {
    setIndex((prevIndex) => (prevIndex - 1 + productos.length) % productos.length);
  };

  useEffect(() => {
    const interval = setInterval(siguiente, 3000);
    return () => clearInterval(interval);
  }, [siguiente]);

  const irADetalle = () => {
    const idProducto = productos[index]?.id;
    if (idProducto) {
      navigate(`/product/${idProducto}`);
    }
  };

  return (
    <div className="carousel-wrapper p-6 rounded-lg shadow-md w-4/5 mx-auto mt-12">
      <h2 className="text-3xl font-bold mb-6 text-center">Productos Destacados</h2>
      <div className="carousel-content bg-white dark:bg-dark-card p-6 rounded-lg shadow-2xl relative">
        <div className="w-full aspect-square mx-auto overflow-hidden rounded-lg cursor-pointer scale-90" onClick={irADetalle}>
          <img
            src={productos[index]?.img}
            alt={productos[index]?.name}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-2xl font-semibold mt-6 text-gray-900 dark:text-white">
          {productos[index]?.name}
        </h3>
        <button
          className="absolute top-1/2 left-6 transform -translate-y-1/2 bg-gray-400 p-4 rounded-full text-xl shadow-md"
          onClick={anterior}
        >
          ←
        </button>
        <button
          className="absolute top-1/2 right-6 transform -translate-y-1/2 bg-gray-400 p-4 rounded-full text-xl shadow-md"
          onClick={siguiente}
        >
          →
        </button>
      </div>
    </div>
  );
}

export default Carousel;
