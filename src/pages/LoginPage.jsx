import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, data);
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-background dark:bg-dark-background px-6">
      <div className="w-full max-w-2xl bg-white dark:bg-dark-card p-10 rounded-lg shadow-lg border dark:border-dark-border">
        <h2 className="text-3xl font-bold mb-6 text-center text-text dark:text-dark-text">Iniciar Sesión</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-text dark:text-dark-text">Correo electrónico</label>
            <input
              type="email"
              {...register("email", { required: "Este campo es obligatorio" })}
              className="w-full p-4 mt-2 border border-border dark:border-dark-border rounded focus:outline-none focus:ring-2 focus:ring-primary dark:bg-dark-input dark:text-dark-text"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-text dark:text-dark-text">Contraseña</label>
            <input
              type="password"
              {...register("password", { required: "Este campo es obligatorio" })}
              className="w-full p-4 mt-2 border border-border dark:border-dark-border rounded focus:outline-none focus:ring-2 focus:ring-primary dark:bg-dark-input dark:text-dark-text"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <button type="submit" className="w-full py-3 mt-4 bg-primary text-white rounded-lg hover:bg-opacity-80">
            Iniciar sesión
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-text dark:text-dark-text">
            ¿No tienes cuenta?{" "}
            <a href="/register" className="text-primary dark:text-dark-primary hover:underline">
              Regístrate
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
