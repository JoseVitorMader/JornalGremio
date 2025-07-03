import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import { FaStar, FaNewspaper, FaCalendarAlt, FaImages, FaSpinner } from 'react-icons/fa';
import { readDestaques } from '../../../services/realtimeDatabase';

// Componente da página de Destaques
const Destaques = () => {
  const [destaques, setDestaques] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    carregarDestaques();
  }, []);

  const carregarDestaques = async () => {
    try {
      setLoading(true);
      setErro('');
      console.log('🔥 Carregando destaques do Firebase...');
      
      const resultado = await readDestaques();
      console.log('📊 Resultado dos destaques:', resultado);
      
      if (resultado.success) {
        const dadosDestaques = resultado.data || [];
        console.log('✅ Destaques carregados:', dadosDestaques);
        setDestaques(dadosDestaques);
      } else {
        setErro('Erro ao carregar destaques: ' + resultado.message);
        console.error('❌ Erro ao carregar destaques:', resultado.error);
      }
    } catch (error) {
      setErro('Erro ao carregar destaques: ' + error.message);
      console.error('💥 Erro inesperado:', error);
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
          <LoadingContainer>
            <FaSpinner style={{ animation: 'spin 2s linear infinite', fontSize: '2rem', color: '#1a4b8c' }} />
            <p>Carregando destaques...</p>
          </LoadingContainer>
        ) : erro ? (
          <ErrorContainer>
            <p>❌ {erro}</p>
            <button onClick={carregarDestaques}>Tentar novamente</button>
          </ErrorContainer>
        ) : destaques.length > 0 ? (
          <>
            {destaquesPrincipais.length > 0 && (
              <DestaquesPrincipais>
                {destaquesPrincipais.map(destaque => (
                  <DestaquePrincipal key={destaque.id} as={Link} to={`/destaques/${destaque.id}`}>
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
                        {destaque.createdAt ? new Date(destaque.createdAt).toLocaleDateString('pt-BR') : 'Data não disponível'}
                      </DestaquePrincipalData>
                      <DestaquePrincipalResumo>{destaque.descricao}</DestaquePrincipalResumo>
                    </DestaquePrincipalOverlay>
                  </DestaquePrincipal>
                ))}
              </DestaquesPrincipais>
            )}

            {destaquesSecundarios.length > 0 && (
              <DestaquesSecundariosGrid>
                {destaquesSecundarios.map(destaque => (
                  <DestaqueSecundario key={destaque.id} as={Link} to={`/destaques/${destaque.id}`}>
                    {destaque.imagem && (
                      <DestaqueSecundarioImagem 
                        src={destaque.imagem} 
                        alt={destaque.titulo}
                        onError={(e) => {e.target.style.display = 'none'}}
                      />
                    )}
                    <DestaqueSecundarioConteudo>
                      <DestaqueTipo>
                        <FaStar />
                        Destaque
                      </DestaqueTipo>
                      <DestaqueSecundarioTitulo>{destaque.titulo}</DestaqueSecundarioTitulo>
                      <DestaqueSecundarioData>
                        {destaque.createdAt ? new Date(destaque.createdAt).toLocaleDateString('pt-BR') : 'Data não disponível'}
                      </DestaqueSecundarioData>
                      <DestaqueSecundarioResumo>{destaque.descricao}</DestaqueSecundarioResumo>
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
  margin-bottom: 3rem;
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

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  gap: 1rem;
  
  p {
    color: #1a4b8c;
    font-size: 1.1rem;
    margin: 0;
  }
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: #fee;
  border-radius: 8px;
  color: #d32f2f;
  
  p {
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }
  
  button {
    padding: 0.5rem 1rem;
    background-color: #d32f2f;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    
    &:hover {
      background-color: #b71c1c;
    }
  }
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 3rem;
  color: #666;
  font-size: 1.1rem;
  background-color: #f0f5ff;
  border-radius: 8px;
  
  small {
    color: #999;
    font-size: 0.9rem;
  }
`;

const DestaquesPrincipais = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const DestaquePrincipal = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  height: 400px;
  flex: 1;
  text-decoration: none;
  color: inherit;
  display: block;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
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
  background-color: #1a4b8c;
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

const DestaquesSecundariosGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const DestaqueSecundario = styled.article`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-decoration: none;
  color: inherit;
  display: block;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  }
`;

const DestaqueSecundarioImagem = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const DestaqueSecundarioConteudo = styled.div`
  padding: 1.5rem;
`;

const DestaqueSecundarioTitulo = styled.h3`
  font-size: 1.3rem;
  color: #1a4b8c;
  margin-bottom: 0.5rem;
`;

const DestaqueSecundarioData = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1rem;
`;

const DestaqueSecundarioResumo = styled.p`
  font-size: 0.95rem;
  color: #333;
  line-height: 1.5;
`;

export default Destaques;
