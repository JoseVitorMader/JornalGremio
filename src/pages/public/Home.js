import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { readDestaques } from '../../services/realtimeDatabase';

// Componente principal da página inicial
const Home = () => {
  const [destaques, setDestaques] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarDestaques();
  }, []);

  const carregarDestaques = async () => {
    try {
      const resultado = await readDestaques();
      if (resultado.success) {
        // Pegar apenas os 3 primeiros destaques para a página inicial
        setDestaques(resultado.data.slice(0, 3));
      } else {
        console.error('Erro ao carregar destaques:', resultado.error);
      }
    } catch (error) {
      console.error('Erro ao carregar destaques:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <Header />
      <MainContent>
        <HeroSection>
          <HeroTitle>Bem-vindo ao UniCEDUP</HeroTitle>
          <HeroSubtitle>Jornal Digital do Grêmio Estudantil</HeroSubtitle>
          <HeroText>
            Seu portal de notícias, eventos e informações sobre a vida acadêmica.
            Fique por dentro de tudo que acontece em nossa instituição.
          </HeroText>
        </HeroSection>
        
        <FeaturedSection>
          <SectionTitle>Destaques</SectionTitle>
          <FeaturedGrid>
            {loading ? (
              <LoadingMessage>Carregando destaques...</LoadingMessage>
            ) : destaques.length > 0 ? (
              destaques.map(destaque => (
                <FeaturedCard key={destaque.id}>
                  {destaque.imagem && (
                    <FeaturedImage 
                      src={destaque.imagem} 
                      alt={destaque.titulo} 
                      onError={(e) => {e.target.style.display = 'none'}}
                    />
                  )}
                  <FeaturedTitle>{destaque.titulo}</FeaturedTitle>
                  <FeaturedDate>
                    {destaque.createdAt ? new Date(destaque.createdAt).toLocaleDateString('pt-BR') : ''}
                  </FeaturedDate>
                  <FeaturedExcerpt>
                    {destaque.descricao}
                  </FeaturedExcerpt>
                  {destaque.link && (
                    <FeaturedLink href={destaque.link} target="_blank" rel="noopener noreferrer">
                      Ler mais
                    </FeaturedLink>
                  )}
                </FeaturedCard>
              ))
            ) : (
              <EmptyMessage>
                Nenhum destaque disponível no momento. 
                <br />
                <small>Use o painel administrativo para adicionar destaques.</small>
              </EmptyMessage>
            )}
          </FeaturedGrid>
        </FeaturedSection>
        
        <SectionsGrid>
          <SectionCard to="/noticias">
            <SectionTitle>Notícias</SectionTitle>
            <SectionText>
              Fique por dentro das últimas notícias e acontecimentos da nossa instituição.
            </SectionText>
          </SectionCard>
          
          <SectionCard to="/eventos">
            <SectionTitle>Eventos</SectionTitle>
            <SectionText>
              Confira a agenda de eventos, palestras, workshops e atividades culturais.
            </SectionText>
          </SectionCard>
          
          <SectionCard to="/galeria">
            <SectionTitle>Galeria</SectionTitle>
            <SectionText>
              Veja fotos e vídeos dos principais momentos e eventos da nossa comunidade acadêmica.
            </SectionText>
          </SectionCard>
          
          <SectionCard to="/avisos">
            <SectionTitle>Avisos</SectionTitle>
            <SectionText>
              Comunicados importantes, prazos e informações relevantes para todos os estudantes.
            </SectionText>
          </SectionCard>
        </SectionsGrid>
      </MainContent>
      <Footer />
    </PageContainer>
  );
};

// Estilos usando styled-components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const HeroSection = styled.section`
  text-align: center;
  margin-bottom: 3rem;
  padding: 3rem 1rem;
  background-color: #f0f5ff;
  border-radius: 8px;
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  color: #1a4b8c;
  margin-bottom: 0.5rem;
`;

const HeroSubtitle = styled.h2`
  font-size: 1.5rem;
  color: #2c5ea0;
  margin-bottom: 1.5rem;
  font-weight: normal;
`;

const HeroText = styled.p`
  font-size: 1.1rem;
  max-width: 800px;
  margin: 0 auto;
  color: #333;
`;

const FeaturedSection = styled.section`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: #1a4b8c;
  margin-bottom: 1.5rem;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -0.5rem;
    width: 50px;
    height: 3px;
    background-color: #3a6eaf;
  }
`;

const FeaturedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const FeaturedCard = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const FeaturedImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const FeaturedTitle = styled.h3`
  font-size: 1.2rem;
  padding: 1rem 1rem 0.5rem;
  color: #1a4b8c;
`;

const FeaturedDate = styled.span`
  display: block;
  font-size: 0.8rem;
  color: #666;
  padding: 0 1rem 0.5rem;
`;

const FeaturedExcerpt = styled.p`
  font-size: 0.9rem;
  padding: 0 1rem 1rem;
  color: #333;
`;

const LoadingMessage = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 2rem;
  color: #666;
  font-style: italic;
`;

const EmptyMessage = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 3rem 2rem;
  color: #666;
  font-style: italic;
  
  small {
    color: #999;
    font-size: 0.8rem;
  }
`;

const FeaturedLink = styled.a`
  display: inline-block;
  margin: 0 1rem 1rem;
  padding: 0.5rem 1rem;
  background-color: #1a4b8c;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #2c5ea0;
  }
`;

const SectionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
`;

const SectionCard = styled.div`
  background-color: #f0f5ff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, background-color 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    background-color: #e0ebff;
  }
`;

const SectionText = styled.p`
  font-size: 0.9rem;
  color: #333;
`;

export default Home;
