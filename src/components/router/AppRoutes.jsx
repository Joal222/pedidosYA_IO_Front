// src/router/AppRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom"; // Elimina HashRouter
import Home from "../pages/common/Home";
import QuinenesSomos from "../pages/Information/QuinenesSomos";
import ProtectedRoute from "./ProtectedRoute";
import NotAuthorized from "../pages/common/NotAuthorized";
import Productos from "../pages/principal/Productos";
import Pedido from "../pages/principal/Pedido";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quienes-somos" element={<QuinenesSomos />} />
      <Route path="/not-authorized" element={<NotAuthorized />} />
      <Route path="/productos" element={<Productos />} />
      <Route path="/productos/pedido" element={<Pedido />} />
      <Route path="*" element={<div>404 Pagina No Encontrada</div>} />

      {/* Rutas protegidas */}
      <Route element={<ProtectedRoute role="ADMIN" />}>
      </Route>
      {/* Puedes agregar más rutas protegidas según sea necesario */}
    </Routes>
  );
};

export default AppRoutes;
