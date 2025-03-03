import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/blog/${id}`)
      .then((response) => setBlog(response.data))
      .catch((error) => console.error("Error al obtener el blog:", error));
  }, [id]);

  if (!blog) {
    return <p className="text-center text-lg font-semibold dark:text-white">Cargando...</p>;
  }

  return (
    <div className="blog-detail-container container mx-auto mt-8 p-8 bg-container-bg dark:bg-container-bg shadow-lg rounded-lg max-w-3xl">
      <h1 className="text-4xl font-bold text-center text-text dark:text-white mb-6">
        {blog.title}
      </h1>
      <p className="text-sm text-border dark:text-gray-300 text-center mb-4">
        Por {blog.author} | Publicado el {new Date(blog.publication_date).toLocaleDateString()}
      </p>
      {blog.image_url && (
        <div className="w-full bg-card-bg dark:bg-card-bg p-4 rounded-lg shadow-md">
          <img
            src={blog.image_url}
            alt={blog.title}
            className="w-full h-80 object-cover rounded-lg"
          />
        </div>
      )}
      <div className="bg-card-bg dark:bg-card-bg p-6 rounded-lg shadow-md mt-6">
        <p className="text-lg text-text dark:text-gray-200 leading-relaxed">
          {blog.content}
        </p>
      </div>
      <div className="text-center mt-8">
        <button
          onClick={() => navigate("/blog")}
          className="bg-primary dark:bg-primary text-white px-6 py-3 rounded-md hover:bg-opacity-80"
        >
          Volver al Blog
        </button>
      </div>
    </div>
  );
}

export default BlogDetail;
