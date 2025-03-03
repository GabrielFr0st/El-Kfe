import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ThemeToggle from "./components/layout/ThemeToggle";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Profile from "./pages/Profile";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "https://el-kfe-db.onrender.com";

function App() {
  const [filters, setFilters] = useState({
    category: "all",
    orderBy: "id_ASC",
  });

  const [products, setProducts] = useState(null);
  useEffect(() => {
    axios
      .get(`${API_URL}/api/products/`)
      .then((response) => setProducts(response.data))
      .catch((error) =>
        console.error("Error al obtener los productos:", error)
      );
  }, []);

  if (!products) {
    return <p className="text-center text-lg font-semibold">Cargando...</p>;
  }

  const filterProducts = () => {
    if (filters.orderBy === "price_ASC") {
      const orderedProducts = [...products].sort((a, b) => a.price - b.price);
      return orderedProducts.filter((product) => {
        if (filters.category !== "all") {
          return product.category === filters.category;
        }
        return true;
      });
    }

    if (filters.orderBy === "price_DESC") {
      const orderedProducts = [...products].sort((a, b) => b.price - a.price);
      return orderedProducts.filter((product) => {
        if (filters.category !== "all") {
          return product.category === filters.category;
        }
        return true;
      });
    }
    if (filters.orderBy === "id_ASC") {
      const orderedProducts = [...products].sort((a, b) => a.id - b.id);
      return orderedProducts.filter((product) => {
        if (filters.category !== "all") {
          return product.category === filters.category;
        }
        return true;
      });
    }

    if (filters.orderBy === "id_DESC") {
      const orderedProducts = [...products].sort((a, b) => b.id - a.id);
      return orderedProducts.filter((product) => {
        if (filters.category !== "all") {
          return product.category === filters.category;
        }
        return true;
      });
    }
  };
  const filteredProducts = filterProducts(products);

  return (
    <ThemeProvider>
      <CartProvider>
        <AuthProvider>
          <Router>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="container mx-auto flex-grow p-4">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route
                    path="/products"
                    element={
                      <Products
                        products={filteredProducts}
                        changeFilters={setFilters}
                      />
                    }
                  />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:id" element={<BlogDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </main>
              <Footer />
              <ThemeToggle />
            </div>
          </Router>
        </AuthProvider>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
