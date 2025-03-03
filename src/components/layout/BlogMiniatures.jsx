import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

function BlogMiniatures() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/api/blog/mini`)
      .then(response => setEntries(response.data))
      .catch(error => console.error("Error al cargar las entradas del blog:", error));
  }, []);

  return (
    <div className="blog-miniatures-wrapper p-4 rounded-lg shadow-md">
      {entries.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">No hay entradas disponibles.</p>
      ) : (
        entries.map(entry => (
          <div key={entry.id} className="blog-card bg-white dark:bg-dark-card p-4 rounded-lg shadow-md mt-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{entry.title}</h3>
            <p className="text-gray-700 dark:text-gray-400 text-sm mt-1">{entry.excerpt}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default BlogMiniatures;
