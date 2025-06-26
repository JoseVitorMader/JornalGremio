import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { FaNewspaper, FaCalendarAlt, FaImages, FaBullhorn, FaInfoCircle, FaStar, FaWikipediaW, FaUserCircle, FaBars, FaTimes, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';

// Componente de cabeçalho do site
const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  
  // Função para alternar o menu mobile
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  // Função para fechar o menu mobile
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  
  // Função para lidar com o logout
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };
  
  return (
    <HeaderContainer>
      <HeaderContent>
        <LogoContainer to="/" onClick={closeMobileMenu}>
          <LogoWrapper>
            <LogoImage
              src="/uniceduplogo.png"
              alt="Logo UniCEDUP"
            />
            <LogoTextContainer>
              <LogoText>UniCEDUP</LogoText>
              <LogoSubtext>Jornal Digital</LogoSubtext>
            </LogoTextContainer>
          </LogoWrapper>
        </LogoContainer>
        
        <MobileMenuButton onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </MobileMenuButton>
        
        <NavMenu mobileMenuOpen={mobileMenuOpen}>
          <NavItem>
            <NavLink to="/noticias" onClick={closeMobileMenu}>
              <FaNewspaper /> Notícias
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/eventos" onClick={closeMobileMenu}>
              <FaCalendarAlt /> Eventos
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/galeria" onClick={closeMobileMenu}>
              <FaImages /> Galeria
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/avisos" onClick={closeMobileMenu}>
              <FaBullhorn /> Avisos
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/wikipedia" onClick={closeMobileMenu}>
              <FaWikipediaW /> Wikipedia
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/destaques" onClick={closeMobileMenu}>
              <FaStar /> Destaques
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/sobre" onClick={closeMobileMenu}>
              <FaInfoCircle /> Sobre
            </NavLink>
          </NavItem>
          
          {currentUser ? (
            <>
              <NavItem className="auth-item">
                <NavLink to="/dashboard" onClick={closeMobileMenu}>
                  <FaUserCircle /> Área do Grêmio
                </NavLink>
              </NavItem>
              <NavItem className="auth-item">
                <LogoutButton onClick={handleLogout}>
                  <FaSignOutAlt /> Sair
                </LogoutButton>
              </NavItem>
            </>
          ) : (
            <NavItem className="auth-item">
              <NavLink to="/login" onClick={closeMobileMenu}>
                <FaUserCircle /> Login
              </NavLink>
            </NavItem>
          )}
        </NavMenu>
      </HeaderContent>
    </HeaderContainer>
  );
};

// Estilos usando styled-components
const HeaderContainer = styled.header`
  background-color: var(--primary-dark);
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

const LogoContainer = styled(Link)`
  text-decoration: none;
  color: white;
  display: flex;
  align-items: center;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const LogoImage = styled.img`
  height: 45px;
  width: auto;
`;

const LogoTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.2;
`;

const LogoText = styled.h1`
  font-size: 1.4rem;
  font-weight: bold;
  margin: 0;
  color: white;
`;

const LogoSubtext = styled.span`
  font-size: 0.75rem;
  opacity: 0.9;
  color: #e3f2fd;
  margin-top: -2px;
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const NavMenu = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  
  @media (max-width: 768px) {
    display: ${props => (props.mobileMenuOpen ? 'flex' : 'none')};
    flex-direction: column;
    width: 100%;
    margin-top: 1rem;
    background-color: var(--primary-dark);
  }
`;

const NavItem = styled.li`
  margin: 0 0.5rem;
  
  &.auth-item {
    margin-left: 1rem;
    
    @media (max-width: 768px) {
      margin-left: 0.5rem;
    }
  }
  
  @media (max-width: 768px) {
    margin: 0;
    width: 100%;
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  transition: all 0.2s ease;
  
  &:hover {
    color: var(--primary-lighter);
  }
  
  @media (max-width: 768px) {
    padding: 1rem 0.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: white;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    color: var(--primary-lighter);
  }
  
  @media (max-width: 768px) {
    padding: 1rem 0.5rem;
    width: 100%;
    text-align: left;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

export default Header;
