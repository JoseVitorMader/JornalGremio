import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaEdit, FaNewspaper, FaCalendarAlt, FaImages, FaBullhorn, FaStar } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';

// Componente de barra lateral para navegação em áreas administrativas
const Sidebar = () => {
  const { currentUser } = useAuth();

  // Se não houver usuário autenticado, não renderiza a sidebar
  if (!currentUser) {
    return null;
  }

  return (
    <SidebarContainer>
      <SidebarHeader>
        <SidebarTitle>Painel Administrativo</SidebarTitle>
        <SidebarSubtitle>Área restrita do grêmio</SidebarSubtitle>
      </SidebarHeader>
      
      <SidebarNav>
        <SidebarLink to="/dashboard">
          <FaEdit /> Visão Geral
        </SidebarLink>
        <SidebarLink to="/editor/noticias">
          <FaNewspaper /> Editor de Notícias
        </SidebarLink>
        <SidebarLink to="/editor/eventos">
          <FaCalendarAlt /> Editor de Eventos
        </SidebarLink>
        <SidebarLink to="/editor/galeria">
          <FaImages /> Editor de Galeria
        </SidebarLink>
        <SidebarLink to="/editor/avisos">
          <FaBullhorn /> Editor de Avisos
        </SidebarLink>
        <SidebarLink to="/editor/destaques">
          <FaStar /> Editor de Destaques
        </SidebarLink>
      </SidebarNav>
      
      <SidebarFooter>
        <SidebarText>
          Logado como: <br />
          <strong>{currentUser.email}</strong>
        </SidebarText>
      </SidebarFooter>
    </SidebarContainer>
  );
};

// Estilos usando styled-components
const SidebarContainer = styled.aside`
  background-color: #1a4b8c;
  color: white;
  width: 250px;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  padding-top: 60px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  z-index: 100;
  
  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    position: relative;
    padding-top: 0;
  }
`;

const SidebarHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const SidebarTitle = styled.h3`
  font-size: 1.2rem;
  margin: 0;
`;

const SidebarSubtitle = styled.p`
  font-size: 0.8rem;
  margin: 0.5rem 0 0;
  color: #a3c5ff;
`;

const SidebarNav = styled.nav`
  padding: 1rem 0;
`;

const SidebarLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  color: white;
  text-decoration: none;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #2c5ea0;
  }
  
  &.active {
    background-color: #2c5ea0;
    border-left: 4px solid #a3c5ff;
  }
`;

const SidebarFooter = styled.div`
  padding: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  position: absolute;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    position: relative;
  }
`;

const SidebarText = styled.p`
  font-size: 0.8rem;
  margin: 0;
  color: #a3c5ff;
`;

export default Sidebar;
