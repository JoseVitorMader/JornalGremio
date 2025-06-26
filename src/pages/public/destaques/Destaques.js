import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import { FaStar, FaNewspaper, FaCalendarAlt, FaImages } from 'react-icons/fa';
import { readDestaques } from '../../../services/realtimeDatabase';

// Componente da página de Destaques
const Destaques = () => {
  const [destaques, setDestaques] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarDestaques();
  }, []);

  const carregarDestaques = async () => {
    try {
      const resultado = await readDestaques();
      if (resultado.success) {
        setDestaques(resultado.data);
      } else {
        console.error('Erro ao carregar destaques:', resultado.error);
      }
    } catch (error) {
      console.error('Erro ao carregar destaques:', error);
    } finally {
      setLoading(false);
    }
  };

  // Separar destaques principais (primeiros 2) dos secundários
  const destaquesPrincipais = destaques.slice(0, 2);
  const destaquesSecundarios = destaques.slice(2);
  
  return (
    <PageContainer>
      <Header />
      <MainContent>
        <PageHeader>
          <PageTitle><FaStar /> Destaques</PageTitle>
          <PageDescription>
            Conteúdos em evidência e informações importantes para a comunidade acadêmica.
          </PageDescription>
        </PageHeader>
        
        {loading ? (
          <LoadingMessage>Carregando destaques...</LoadingMessage>
        ) : destaques.length > 0 ? (
          <>
            {destaquesPrincipais.length > 0 && (
              <DestaquesPrincipais>
                {destaquesPrincipais.map(destaque => (
                  <DestaquePrincipal key={destaque.id}>
                    {destaque.imagem && (
                      <DestaquePrincipalImagem 
                        src={destaque.imagem} 
                        alt={destaque.titulo}
                        onError={(e) => {e.target.style.display = 'none'}}
                      />
                    )}
                    <DestaquePrincipalOverlay>
                      <DestaqueTipo>
                        <FaStar />
                        Destaque
                      </DestaqueTipo>
                      <DestaquePrincipalTitulo>{destaque.titulo}</DestaquePrincipalTitulo>
                      <DestaquePrincipalData>
                        {destaque.createdAt ? new Date(destaque.createdAt).toLocaleDateString('pt-BR') : ''}
                      </DestaquePrincipalData>
                      <DestaquePrincipalResumo>{destaque.descricao}</DestaquePrincipalResumo>
                      {destaque.link && (
                        <DestaquePrincipalLink href={destaque.link} target="_blank" rel="noopener noreferrer">
                          Ver mais
                        </DestaquePrincipalLink>
                      )}
                    </DestaquePrincipalOverlay>
                  </DestaquePrincipal>
                ))}
              </DestaquesPrincipais>
            )}

            {destaquesSecundarios.length > 0 && (
              <DestaquesSecundariosGrid>
                {destaquesSecundarios.map(destaque => (
                  <DestaqueSecundario key={destaque.id}>
                    {destaque.imagem && (
                      <DestaqueSecundarioImagem 
                        src={destaque.imagem} 
                        alt={destaque.titulo}
                        onError={(e) => {e.target.style.display = 'none'}}
                      />
                    )}
                    <DestaqueTipo>
                      <FaStar />
                      Destaque
                    </DestaqueTipo>
                    <DestaqueSecundarioConteudo>
                      <DestaqueSecundarioTitulo>{destaque.titulo}</DestaqueSecundarioTitulo>
                      <DestaqueSecundarioData>
                        {destaque.createdAt ? new Date(destaque.createdAt).toLocaleDateString('pt-BR') : ''}
                      </DestaqueSecundarioData>
                      <DestaqueSecundarioResumo>{destaque.descricao}</DestaqueSecundarioResumo>
                      {destaque.link && (
                        <DestaqueSecundarioLink href={destaque.link} target="_blank" rel="noopener noreferrer">
                          Ver mais
                        </DestaqueSecundarioLink>
                      )}
                    </DestaqueSecundarioConteudo>
                  </DestaqueSecundario>
                ))}
              </DestaquesSecundariosGrid>
            )}
          </>
        ) : (
          <EmptyMessage>
            Nenhum destaque disponível no momento.
            <br />
            <small>Use o painel administrativo para adicionar destaques.</small>
          </EmptyMessage>
        )}
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

const PageHeader = styled.div`
  margin-bottom: 2rem;
  text-align: center;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  color: #1a4b8c;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const PageDescription = styled.p`
  font-size: 1.1rem;
  color: #555;
  max-width: 800px;
  margin: 0 auto;
`;

const DestaquesPrincipais = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 3rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const DestaquePrincipal = styled.article`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  height: 400px;
  flex: 1;
`;

const DestaquePrincipalImagem = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  
  ${DestaquePrincipal}:hover & {
    transform: scale(1.05);
  }
`;

const DestaquePrincipalOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  color: white;
`;

const DestaqueTipo = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
  margin-bottom: 1rem;
  background-color: ${props => 
    props.tipo === 'evento' ? '#1a4b8c' : 
    props.tipo === 'noticia' ? '#2c5ea0' : 
    props.tipo === 'galeria' ? '#3a6eaf' : 
    props.tipo === 'aviso' ? '#ff9800' : '#1a4b8c'
  };
  color: white;
`;

const DestaquePrincipalTitulo = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
`;

const DestaquePrincipalData = styled.p`
  font-size: 0.9rem;
  opacity: 0.8;
  margin-bottom: 1rem;
`;

const DestaquePrincipalResumo = styled.p`
  font-size: 1rem;
  margin-bottom: 1.5rem;
  line-height: 1.5;
`;

const DestaquePrincipalLink = styled.a`
  display: inline-block;
  padding: 0.5rem 1.5rem;
  background-color: #1a4b8c;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: bold;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #2c5ea0;
  }
`;

const DestaquesSecundariosGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
`;

const DestaqueSecundario = styled.article`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  position: relative;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const DestaqueSecundarioImagem = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const DestaqueSecundarioConteudo = styled.div`
  padding: 1.5rem;
`;

const DestaqueSecundarioTitulo = styled.h3`
  font-size: 1.2rem;
  color: #1a4b8c;
  margin-bottom: 0.5rem;
`;

const DestaqueSecundarioData = styled.p`
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 0.8rem;
`;

const DestaqueSecundarioResumo = styled.p`
  font-size: 0.9rem;
  color: #333;
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const DestaqueSecundarioLink = styled.a`
  display: inline-block;
  color: #1a4b8c;
  font-weight: bold;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: #f0f5ff;
  border-radius: 8px;
  color: #666;
  font-style: italic;
  margin: 2rem 0;
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  background-color: #f0f5ff;
  border-radius: 8px;
  color: #1a4b8c;
  font-size: 1.1rem;
  margin: 2rem 0;
  
  small {
    color: #999;
    font-size: 0.8rem;
  }
`;

export default Destaques;
