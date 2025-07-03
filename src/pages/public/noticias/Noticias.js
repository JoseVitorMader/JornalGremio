import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import { readNoticias } from '../../../services/realtimeDatabase';
import { FaNewspaper, FaCalendarAlt, FaUserEdit, FaSpinner } from 'react-icons/fa';

// Componente da página de Notícias
const Noticias = () => {
  // Estado para armazenar as notícias
  const [noticias, setNoticias] = useState([]);
  const [noticiasCarregando, setNoticiasCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [categorias, setCategorias] = useState(['Todas', 'Geral', 'Acadêmico', 'Esportes', 'Cultura', 'Tecnologia']);
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todas');
  
  // Carrega notícias do Realtime Database
  useEffect(() => {
    const carregarNoticias = async () => {
      try {
        setNoticiasCarregando(true);
        setErro(null);
        
        const result = await readNoticias();
        
        if (result.success) {
          setNoticias(result.data || []);
        } else {
          setErro('Erro ao carregar notícias: ' + result.message);
        }
      } catch (error) {
        setErro('Erro ao carregar notícias: ' + error.message);
        console.error('Erro ao carregar notícias:', error);
      } finally {
        setNoticiasCarregando(false);
      }
    };

    carregarNoticias();
  }, []);

  // Função para formatar timestamp em data legível
  const formatarData = (timestamp) => {
    if (!timestamp) return 'Data não disponível';
    
    const data = new Date(timestamp);
    return data.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Filtrar notícias por categoria
  const noticiasFiltradas = categoriaAtiva === 'Todas' 
    ? noticias    : noticias.filter(noticia => 
        noticia.categoria?.toLowerCase() === categoriaAtiva.toLowerCase()
      );
  
  return (
    <PageContainer>
      <Header />
      <MainContent>
        <PageHeader>
          <PageTitle><FaNewspaper /> Notícias</PageTitle>
          <PageDescription>
            Fique por dentro das últimas notícias e acontecimentos da nossa instituição.
          </PageDescription>
        </PageHeader>
        
        <CategoriasFiltro>
          {categorias.map(categoria => (
            <CategoriaButton 
              key={categoria}
              active={categoriaAtiva === categoria}
              onClick={() => setCategoriaAtiva(categoria)}
            >
              {categoria}
            </CategoriaButton>
          ))}
        </CategoriasFiltro>
          <NoticiasGrid>
          {noticiasCarregando ? (
            <LoadingContainer>
              <FaSpinner style={{ animation: 'spin 2s linear infinite', fontSize: '2rem', color: '#1a4b8c' }} />
              <p>Carregando notícias...</p>
            </LoadingContainer>
          ) : erro ? (
            <ErrorContainer>
              <p>❌ {erro}</p>
              <button onClick={() => window.location.reload()}>Tentar novamente</button>
            </ErrorContainer>
          ) : noticiasFiltradas.length > 0 ? (
            noticiasFiltradas.map(noticia => (
              <NoticiaCard key={noticia.id}>
                {noticia.imagem && (
                  <NoticiaImagem 
                    src={noticia.imagem} 
                    alt={noticia.titulo}
                    onError={(e) => {
                      console.log('Erro ao carregar imagem para:', noticia.titulo);
                      e.target.style.display = 'none';
                    }}
                  />
                )}
                <NoticiaCategoria>{noticia.categoria}</NoticiaCategoria>
                <NoticiaConteudo>
                  <NoticiaTitulo>{noticia.titulo}</NoticiaTitulo>
                  <NoticiaMetadata>
                    <NoticiaData>
                      <FaCalendarAlt /> {formatarData(noticia.createdAt)}
                    </NoticiaData>
                    <NoticiaAutor>
                      <FaUserEdit /> {noticia.autor}
                    </NoticiaAutor>
                  </NoticiaMetadata>
                  <NoticiaResumo>{noticia.resumo}</NoticiaResumo>
                  <NoticiaLink to={`/noticias/${noticia.id}`}>Ler mais</NoticiaLink>
                </NoticiaConteudo>
              </NoticiaCard>
            ))
          ) : (
            <MensagemVazia>
              {categoriaAtiva === 'Todas' 
                ? 'Nenhuma notícia disponível no momento.' 
                : `Nenhuma notícia encontrada para a categoria "${categoriaAtiva}".`
              }
            </MensagemVazia>
          )}
        </NoticiasGrid>
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

const CategoriasFiltro = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
  justify-content: center;
`;

const CategoriaButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${props => props.active ? '#1a4b8c' : '#f0f5ff'};
  color: ${props => props.active ? 'white' : '#1a4b8c'};
  border: 1px solid #1a4b8c;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.active ? '#1a4b8c' : '#e0ebff'};
  }
`;

const NoticiasGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
`;

const NoticiaCard = styled.article`
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

const NoticiaImagem = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const NoticiaCategoria = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: #1a4b8c;
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
`;

const NoticiaConteudo = styled.div`
  padding: 1.5rem;
`;

const NoticiaTitulo = styled.h3`
  font-size: 1.3rem;
  color: #1a4b8c;
  margin-bottom: 0.5rem;
`;

const NoticiaMetadata = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 0.8rem;
  color: #666;
`;

const NoticiaData = styled.span`
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

const NoticiaAutor = styled.span`
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

const NoticiaResumo = styled.p`
  font-size: 0.9rem;
  color: #333;
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const NoticiaLink = styled(Link)`
  display: inline-block;
  color: #1a4b8c;
  font-weight: bold;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const MensagemVazia = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 3rem;
  background-color: #f0f5ff;
  border-radius: 8px;
  color: #1a4b8c;
  font-size: 1.1rem;
`;

const LoadingContainer = styled.div`
  grid-column: 1 / -1;
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
  grid-column: 1 / -1;
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

export default Noticias;
