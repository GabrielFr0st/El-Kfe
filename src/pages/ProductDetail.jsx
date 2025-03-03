import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/products/${id}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.error("Error al obtener el producto:", error));
  }, [id]);

  if (!product) {
    return <p className="text-center text-lg font-semibold">Cargando...</p>;
  }

  return (
    <div className="product-detail-container container mx-auto mt-8 p-6 rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2 product-image-wrapper bg-white dark:bg-dark-card p-4 rounded-lg shadow-md">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="w-full md:w-1/2 product-info-wrapper bg-white dark:bg-dark-card p-4 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{product.name}</h1>
          <p className="text-lg text-gray-700 dark:text-gray-400">{product.description}</p>
          <p className="text-sm text-gray-500 dark:text-gray-300">Categoría: {product.category}</p>
          <p className="text-2xl font-semibold text-primary mt-4">
            ${product.price} CLP
          </p>
          <button 
            className="mt-6 bg-primary dark:bg-dark-primary text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-opacity-80"
            onClick={() => addToCart(product)}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
