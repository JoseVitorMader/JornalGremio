import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import { FaImages, FaSearch, FaSpinner } from 'react-icons/fa';
import { readCollection } from '../../../services/realtimeDatabase';

// Componente da página de Galeria
const Galeria = () => {
  const [imagens, setImagens] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todas');
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  
  useEffect(() => {
    carregarImagens();
  }, []);

  const carregarImagens = async () => {
    try {
      setLoading(true);
      setErro('');
      const resultado = await readCollection('galeria');
      if (resultado.success) {
        setImagens(resultado.data || []);
      } else {
        setErro('Erro ao carregar galeria: ' + resultado.message);
        console.error('Erro ao carregar galeria:', resultado.error);
      }
    } catch (error) {
      setErro('Erro ao carregar galeria: ' + error.message);
      console.error('Erro ao carregar galeria:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Lista de categorias únicas
  const categorias = ['Todas', ...new Set(imagens.map(img => img.categoria))];
  
  // Filtra imagens por categoria e termo de busca
  const imagensFiltradas = imagens
    .filter(img => categoriaAtiva === 'Todas' || img.categoria === categoriaAtiva)
    .filter(img => 
      filtro === '' || 
      img.titulo.toLowerCase().includes(filtro.toLowerCase()) ||
      img.categoria.toLowerCase().includes(filtro.toLowerCase())
    );
  
  return (
    <PageContainer>
      <Header />
      <MainContent>
        <PageHeader>
          <PageTitle><FaImages /> Galeria</PageTitle>
          <PageDescription>
            Veja fotos e imagens dos principais momentos e eventos da nossa comunidade acadêmica.
          </PageDescription>
        </PageHeader>
        
        <FiltrosContainer>
          <BuscaContainer>
            <BuscaInput 
              type="text" 
              placeholder="Buscar imagens..." 
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            />
            <BuscaIcone><FaSearch /></BuscaIcone>
          </BuscaContainer>
          
          <CategoriasContainer>
            {categorias.map(categoria => (
              <CategoriaButton 
                key={categoria}
                active={categoriaAtiva === categoria}
                onClick={() => setCategoriaAtiva(categoria)}
              >
                {categoria}
              </CategoriaButton>
            ))}
          </CategoriasContainer>
        </FiltrosContainer>
        
        {loading ? (
          <LoadingContainer>
            <FaSpinner style={{ animation: 'spin 2s linear infinite', fontSize: '2rem', color: '#1a4b8c' }} />
            <p>Carregando galeria...</p>
          </LoadingContainer>
        ) : erro ? (
          <ErrorContainer>
            <p>❌ {erro}</p>
            <button onClick={carregarImagens}>Tentar novamente</button>
          </ErrorContainer>
        ) : imagensFiltradas.length > 0 ? (
          <GaleriaGrid>
            {imagensFiltradas.map(imagem => (
              <ImagemCard key={imagem.id} as={Link} to={`/galeria/${imagem.id}`}>
                <ImagemContainer>
                  <Imagem 
                    src={imagem.imagem || imagem.url} 
                    alt={imagem.titulo}
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjBGNUZGIi8+CjxwYXRoIGQ9Ik0yMDAgMTAwVjIwME0xNTAgMTUwSDI1MCIgc3Ryb2tlPSIjMUE0QjhDIiBzdHJva2Utd2lkdGg9IjIiLz4KPHRLEHU+SW1hZ2VtIG7Do28gZGlzcG9uw612ZWw8L3RleHQ+Cjwvc3ZnPgo=';
                    }}
                  />
                </ImagemContainer>
                <ImagemInfo>
                  <ImagemTitulo>{imagem.titulo}</ImagemTitulo>
                  {imagem.descricao && <ImagemDescricao>{imagem.descricao}</ImagemDescricao>}
                  <ImagemMetadata>
                    <ImagemCategoria>{imagem.categoria}</ImagemCategoria>
                    <ImagemData>
                      {imagem.createdAt ? new Date(imagem.createdAt).toLocaleDateString('pt-BR') : 'Data não disponível'}
                    </ImagemData>
                  </ImagemMetadata>
                </ImagemInfo>
              </ImagemCard>
            ))}
          </GaleriaGrid>
        ) : (
          <MensagemVazia>
            {categoriaAtiva === 'Todas' && filtro === '' 
              ? 'Nenhuma imagem disponível no momento.' 
              : 'Nenhuma imagem encontrada para os filtros selecionados.'
            }
          </MensagemVazia>
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

const FiltrosContainer = styled.div`
  margin-bottom: 2rem;
`;

const BuscaContainer = styled.div`
  position: relative;
  max-width: 500px;
  margin: 0 auto 1.5rem;
`;

const BuscaInput = styled.input`
  width: 100%;
  padding: 0.8rem 1rem 0.8rem 2.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #1a4b8c;
    box-shadow: 0 0 0 2px rgba(26, 75, 140, 0.2);
  }
`;

const BuscaIcone = styled.span`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
`;

const CategoriasContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
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

const GaleriaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const ImagemCard = styled.div`
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

const ImagemContainer = styled.div`
  position: relative;
  overflow: hidden;
  height: 200px;
`;

const Imagem = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  ${ImagemCard}:hover & {
    transform: scale(1.05);
  }
`;

const ImagemInfo = styled.div`
  padding: 1rem;
`;

const ImagemTitulo = styled.h3`
  font-size: 1.1rem;
  color: #1a4b8c;
  margin-bottom: 0.5rem;
`;

const ImagemDescricao = styled.p`
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 0.5rem;
  line-height: 1.4;
`;

const ImagemMetadata = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: #666;
`;

const ImagemCategoria = styled.span``;

const ImagemData = styled.span``;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: #f0f5ff;
  border-radius: 8px;
  color: #666;
  font-style: italic;
`;

const MensagemVazia = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: #f0f5ff;
  border-radius: 8px;
  color: #1a4b8c;
  font-size: 1.1rem;
`;

const EmptyHint = styled.div`
  small {
    color: #999;
    font-size: 0.8rem;
  }
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

export default Galeria;
