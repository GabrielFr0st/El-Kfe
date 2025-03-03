import { useCart } from "../context/CartContext";
import { useState } from "react";

function Products({ products, changeFilters }) {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setSelectedCategory(value);
    changeFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const filteredProducts = selectedCategory === "all"
    ? products
    : products.filter((product) => product.category.toLowerCase() === selectedCategory);

  return (
    <div className="products-container container mx-auto mt-8 p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">Catálogo de Productos</h1>
      <div className="filters-wrapper flex flex-col md:flex-row gap-8 p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold">Filtros</h3>
        <div>
          <label htmlFor="category">Categoría: </label>
          <select
            id="category"
            className="border border-gray-300 dark:border-gray-600 rounded-md p-1 dark:bg-dark-card dark:text-white"
            name="category"
            onChange={handleFilterChange}
          >
            <option value="all">Todos</option>
            <option value="cafe">Cafés</option>
            <option value="accesorios">Accesorios</option>
          </select>
        </div>
        <div>
          <label htmlFor="order-by">Ordenar por: </label>
          <select
            id="orderBy"
            name="orderBy"
            className="border border-gray-300 dark:border-gray-600 rounded-md p-1 dark:bg-dark-card dark:text-white"
            onChange={handleFilterChange}
          >
            <option value="id_ASC">ID Ascendente</option>
            <option value="id_DESC">ID Descendente</option>
            <option value="price_ASC">Precio Ascendente</option>
            <option value="price_DESC">Precio Descendente</option>
          </select>
        </div>
      </div>
      <div className="products-wrapper grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 p-4 rounded-lg shadow-md">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card bg-white dark:bg-dark-card p-4 rounded-lg shadow-md">
              <img src={product.image_url} alt={product.name} className="w-full h-48 object-cover mb-4 rounded-lg" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{product.name}</h3>
              <p className="text-gray-600 dark:text-gray-400">{product.description}</p>
              <p className="text-gray-600 dark:text-gray-300">${product.price}</p>
              <button className="bg-primary dark:bg-dark-primary text-white px-4 py-2 mt-1 rounded-md hover:bg-opacity-80" onClick={() => addToCart(product)}>
                Agregar al carrito
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-300 text-center col-span-3">No hay productos en esta categoría.</p>
        )}
      </div>
    </div>
  );
}

export default Products;
