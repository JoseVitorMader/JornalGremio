import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import PrivateRoute from './PrivateRoute';

// Importação de páginas públicas (placeholder - serão implementadas depois)
import Home from '../pages/public/Home';
import Noticias from '../pages/public/noticias/Noticias';
import NoticiaCompleta from '../pages/public/noticias/NoticiaCompleta';
import Eventos from '../pages/public/eventos/Eventos';
import Galeria from '../pages/public/galeria/Galeria';
import Avisos from '../pages/public/avisos/Avisos';
import Sobre from '../pages/public/sobre/Sobre';
import Destaques from '../pages/public/destaques/Destaques';
import Wikipedia from '../pages/public/wikipedia/Wikipedia';
import Login from '../pages/public/Login';

// Importação de páginas privadas (placeholder - serão implementadas depois)
import Dashboard from '../pages/private/dashboard/Dashboard';
import EditorNoticias from '../pages/private/editor/EditorNoticias';
import EditorEventos from '../pages/private/editor/EditorEventos';
import EditorGaleria from '../pages/private/editor/EditorGaleria';
import EditorAvisos from '../pages/private/editor/EditorAvisos';
import EditorDestaques from '../pages/private/editor/EditorDestaques';

// Componente principal de rotas
const AppRouter = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Rotas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/noticias" element={<Noticias />} />
          <Route path="/noticias/:id" element={<NoticiaCompleta />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/galeria" element={<Galeria />} />
          <Route path="/avisos" element={<Avisos />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/destaques" element={<Destaques />} />
          <Route path="/wikipedia" element={<Wikipedia />} />
          <Route path="/login" element={<Login />} />
          
          {/* Rotas privadas (protegidas) */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/editor/noticias" element={<EditorNoticias />} />
            <Route path="/editor/eventos" element={<EditorEventos />} />
            <Route path="/editor/galeria" element={<EditorGaleria />} />
            <Route path="/editor/avisos" element={<EditorAvisos />} />
            <Route path="/editor/destaques" element={<EditorDestaques />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRouter;
