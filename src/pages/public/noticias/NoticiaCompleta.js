import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import { readDocument } from '../../../services/realtimeDatabase';
import { FaCalendarAlt, FaUserEdit, FaArrowLeft, FaShareAlt } from 'react-icons/fa';

// Componente para visualizar uma notícia completa
const NoticiaCompleta = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [noticia, setNoticia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    carregarNoticia();
  }, [id]);

  const carregarNoticia = async () => {
    try {
      setLoading(true);
      const resultado = await readDocument('noticias', id);
      
      if (resultado.success) {
        setNoticia(resultado.data);
      } else {
        setErro('Notícia não encontrada.');
      }
    } catch (error) {
      console.error('Erro ao carregar notícia:', error);
      setErro('Erro ao carregar notícia.');
    } finally {
      setLoading(false);
    }
  };

  const formatarData = (timestamp) => {
    if (!timestamp) return '';
    const data = new Date(timestamp);
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const compartilhar = () => {
    if (navigator.share) {
      navigator.share({
        title: noticia.titulo,
        text: noticia.resumo,
        url: window.location.href
      });
    } else {
      // Fallback para copiar o link
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado para a área de transferência!');
    }
  };

  if (loading) {
    return (
      <PageContainer>
        <Header />
        <MainContent>
          <LoadingContainer>
            <p>Carregando notícia...</p>
          </LoadingContainer>
        </MainContent>
        <Footer />
      </PageContainer>
    );
  }

  if (erro || !noticia) {
    return (
      <PageContainer>
        <Header />
        <MainContent>
          <ErrorContainer>
            <h2>Ops! Algo deu errado</h2>
            <p>{erro}</p>
            <BackButton onClick={() => navigate('/noticias')}>
              <FaArrowLeft /> Voltar para notícias
            </BackButton>
          </ErrorContainer>
        </MainContent>
        <Footer />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Header />
      <MainContent>
        <NavigationBar>
          <BackButton onClick={() => navigate('/noticias')}>
            <FaArrowLeft /> Voltar para notícias
          </BackButton>
          <ShareButton onClick={compartilhar}>
            <FaShareAlt /> Compartilhar
          </ShareButton>
        </NavigationBar>

        <Article>
          <ArticleHeader>
            <Categoria>{noticia.categoria}</Categoria>
            <Titulo>{noticia.titulo}</Titulo>
            <Metadata>
              <MetadataItem>
                <FaCalendarAlt /> {formatarData(noticia.createdAt)}
              </MetadataItem>
              <MetadataItem>
                <FaUserEdit /> {noticia.autor}
              </MetadataItem>
            </Metadata>
            {noticia.resumo && (
              <Resumo>{noticia.resumo}</Resumo>
            )}
          </ArticleHeader>

          {noticia.imagem && (
            <ImagemContainer>
              <Imagem src={noticia.imagem} alt={noticia.titulo} />
            </ImagemContainer>
          )}

          <Conteudo>
            {noticia.conteudo.split('\\n').map((paragrafo, index) => (
              <p key={index}>{paragrafo}</p>
            ))}
          </Conteudo>

          <ArticleFooter>
            <TagsContainer>
              {noticia.categoria && (
                <Tag>{noticia.categoria}</Tag>
              )}
            </TagsContainer>
          </ArticleFooter>
        </Article>
      </MainContent>
      <Footer />
    </PageContainer>
  );
};

// Estilos
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem 1rem;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
`;

const LoadingContainer = styled.div`
  text-align: center;
  padding: 3rem;
  color: #666;
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 3rem;
  
  h2 {
    color: #d32f2f;
    margin-bottom: 1rem;
  }
  
  p {
    color: #666;
    margin-bottom: 2rem;
  }
`;

const NavigationBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e0e0e0;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #1a4b8c;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #f0f5ff;
  }
`;

const ShareButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #1a4b8c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #2c5ea0;
  }
`;

const Article = styled.article`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ArticleHeader = styled.header`
  padding: 2rem;
  padding-bottom: 1rem;
`;

const Categoria = styled.span`
  display: inline-block;
  background-color: #1a4b8c;
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 1rem;
`;

const Titulo = styled.h1`
  color: #1a4b8c;
  font-size: 2rem;
  line-height: 1.3;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

const Metadata = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
  color: #666;
  font-size: 0.9rem;
`;

const MetadataItem = styled.span`
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

const Resumo = styled.p`
  font-size: 1.1rem;
  color: #555;
  font-style: italic;
  line-height: 1.5;
  border-left: 4px solid #1a4b8c;
  padding-left: 1rem;
  margin: 1.5rem 0;
`;

const ImagemContainer = styled.div`
  margin: 0;
`;

const Imagem = styled.img`
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: cover;
  display: block;
`;

const Conteudo = styled.div`
  padding: 2rem;
  line-height: 1.7;
  color: #333;
  
  p {
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const ArticleFooter = styled.footer`
  padding: 1rem 2rem 2rem;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Tag = styled.span`
  background-color: #f0f5ff;
  color: #1a4b8c;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  border: 1px solid #e0ebff;
`;

export default NoticiaCompleta;
