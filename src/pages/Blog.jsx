import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/api/blog/`)
      .then((response) => setBlogs(response.data))
      .catch((error) => console.error("Error al obtener blogs:", error));
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredBlogs = blogs.filter((blog) => {
    if (filter === "all") return true;
    return blog.relation_key === filter;
  });

  if (!blogs.length) {
    return <p className="text-center text-lg font-semibold">Cargando...</p>;
  }

  return (
    <div className="blog-container container mx-auto mt-8 p-6 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center mb-6">Kfe Blog</h1>
      <div className="filters-wrapper flex justify-center mb-6">
        <label htmlFor="filter" className="mr-2 font-semibold">Filtrar por:</label>
        <select
          id="filter"
          className="border border-gray-300 dark:border-gray-600 rounded-md p-1 dark:bg-dark-card dark:text-white"
          value={filter}
          onChange={handleFilterChange}
        >
          <option value="all">Todos</option>
          <option value="product">Recetas</option>
          <option value="category">Información</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <div key={blog.id} className="blog-card bg-white dark:bg-dark-card p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">{blog.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {blog.content.length > 150 ? blog.content.substring(0, 150) + "..." : blog.content}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-300">Publicado el: {blog.publication_date}</p>
              <button
                className="bg-primary dark:bg-dark-primary text-white px-4 py-2 mt-2 rounded-md hover:bg-opacity-80"
                onClick={() => navigate(`/blog/${blog.id}`)}
              >
                Seguir leyendo
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-300 text-center col-span-3">No hay entradas en esta categoría.</p>
        )}
      </div>
    </div>
  );
}

export default Blog;
