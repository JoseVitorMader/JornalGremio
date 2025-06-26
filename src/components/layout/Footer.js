import React from 'react';
import styled from 'styled-components';
import { FaFacebook, FaInstagram, FaTwitter, FaEnvelope } from 'react-icons/fa';

// Componente de rodapé do site
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>UniCEDUP</FooterTitle>
          <FooterText>
            Jornal Digital do Grêmio Estudantil, criado para manter a comunidade
            acadêmica informada sobre eventos, notícias e atividades.
          </FooterText>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Links Rápidos</FooterTitle>
          <FooterLinks>
            <FooterLink href="/noticias">Notícias</FooterLink>
            <FooterLink href="/eventos">Eventos</FooterLink>
            <FooterLink href="/galeria">Galeria</FooterLink>
            <FooterLink href="/avisos">Avisos</FooterLink>
            <FooterLink href="/sobre">Sobre</FooterLink>
          </FooterLinks>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Contato</FooterTitle>
          <FooterText>
            <ContactItem>
              <FaEnvelope /> contato@unicedup.com.br
            </ContactItem>
            <SocialLinks>
              <SocialLink href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </SocialLink>
              <SocialLink href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </SocialLink>
              <SocialLink href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </SocialLink>
            </SocialLinks>
          </FooterText>
        </FooterSection>
      </FooterContent>
      
      <FooterCopyright>
        &copy; {currentYear} Desenvolvido por José Vitor Mader. Todos os direitos reservados.
      </FooterCopyright>
    </FooterContainer>
  );
};

// Estilos usando styled-components
const FooterContainer = styled.footer`
  background-color: #1a4b8c;
  color: white;
  padding: 2rem 1rem 1rem;
  margin-top: 2rem;
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const FooterSection = styled.div`
  flex: 1;
`;

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -0.5rem;
    width: 50px;
    height: 2px;
    background-color: #a3c5ff;
  }
`;

const FooterText = styled.div`
  font-size: 0.9rem;
  line-height: 1.5;
  color: #d9e6ff;
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FooterLink = styled.a`
  color: #d9e6ff;
  text-decoration: none;
  font-size: 0.9rem;
  
  &:hover {
    color: white;
    text-decoration: underline;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  color: white;
  font-size: 1.5rem;
  
  &:hover {
    color: #a3c5ff;
  }
`;

const FooterCopyright = styled.div`
  text-align: center;
  padding-top: 2rem;
  margin-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.8rem;
  color: #a3c5ff;
`;

export default Footer;
