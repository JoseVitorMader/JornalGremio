import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import { readDocument } from '../../../services/realtimeDatabase';
import { FaCalendarAlt, FaUserEdit, FaArrowLeft, FaShareAlt, FaMapMarkerAlt, FaClock, FaNewspaper, FaCalendar, FaImages, FaBullhorn, FaStar } from 'react-icons/fa';

// Componente universal para visualizar conteúdo completo
const NoticiaCompleta = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [conteudo, setConteudo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  
  // Determina o tipo de conteúdo baseado na URL
  const tipoConteudo = location.pathname.split('/')[1];
  
  const tiposConfig = {
    'noticias': {
      path: 'noticias',
      titulo: 'Notícia',
      icone: <FaNewspaper />,
      voltarPara: '/noticias'
    },
    'eventos': {
      path: 'eventos',
      titulo: 'Evento',
      icone: <FaCalendar />,
      voltarPara: '/eventos'
    },
    'avisos': {
      path: 'avisos',
      titulo: 'Aviso',
      icone: <FaBullhorn />,
      voltarPara: '/avisos'
    },
    'galeria': {
      path: 'galeria',
      titulo: 'Galeria',
      icone: <FaImages />,
      voltarPara: '/galeria'
    },
    'destaques': {
      path: 'destaques',
      titulo: 'Destaque',
      icone: <FaStar />,
      voltarPara: '/destaques'
    }
  };
  
  const config = tiposConfig[tipoConteudo] || tiposConfig['noticias'];

  useEffect(() => {
    carregarConteudo();
  }, [id, tipoConteudo]);

  const carregarConteudo = async () => {
    try {
      setLoading(true);
      const resultado = await readDocument(config.path, id);
      
      if (resultado.success) {
        setConteudo(resultado.data);
      } else {
        setErro(`${config.titulo} não encontrada.`);
      }
    } catch (error) {
      console.error(`Erro ao carregar ${config.titulo.toLowerCase()}:`, error);
      setErro(`Erro ao carregar ${config.titulo.toLowerCase()}.`);
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
        title: conteudo.titulo,
        text: conteudo.resumo || conteudo.descricao,
        url: window.location.href
      });
    } else {
      // Fallback para copiar o link
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado para a área de transferência!');
    }
  };

  const voltarPagina = () => {
    navigate(config.voltarPara);
  };

  if (loading) {
    return (
      <PageContainer>
        <Header />
        <MainContent>
          <LoadingContainer>
            <p>Carregando {config.titulo.toLowerCase()}...</p>
          </LoadingContainer>
        </MainContent>
        <Footer />
      </PageContainer>
    );
  }

  if (erro || !conteudo) {
    return (
      <PageContainer>
        <Header />
        <MainContent>
          <ErrorContainer>
            <h2>Ops! Algo deu errado</h2>
            <p>{erro}</p>
            <BackButton onClick={voltarPagina}>
              <FaArrowLeft /> Voltar para {config.titulo.toLowerCase()}s
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
          <BackButton onClick={voltarPagina}>
            <FaArrowLeft /> Voltar para {config.titulo.toLowerCase()}s
          </BackButton>
          <ShareButton onClick={compartilhar}>
            <FaShareAlt /> Compartilhar
          </ShareButton>
        </NavigationBar>

        <Article>
          <ArticleHeader>
            <TipoConteudo>
              {config.icone} {config.titulo}
            </TipoConteudo>
            <Titulo>{conteudo.titulo}</Titulo>
            <Metadata>
              <MetadataItem>
                <FaCalendarAlt /> {formatarData(conteudo.createdAt)}
              </MetadataItem>
              <MetadataItem>
                <FaUserEdit /> {conteudo.autor}
              </MetadataItem>
              {conteudo.local && (
                <MetadataItem>
                  <FaMapMarkerAlt /> {conteudo.local}
                </MetadataItem>
              )}
              {conteudo.horario && (
                <MetadataItem>
                  <FaClock /> {conteudo.horario}
                </MetadataItem>
              )}
            </Metadata>
            {(conteudo.resumo || conteudo.descricao) && (
              <Resumo>{conteudo.resumo || conteudo.descricao}</Resumo>
            )}
          </ArticleHeader>

          {conteudo.imagem && (
            <ImagemContainer>
              <Imagem src={conteudo.imagem} alt={conteudo.titulo} />
            </ImagemContainer>
          )}

          <Conteudo>
            {conteudo.conteudo ? (
              conteudo.conteudo.split('\\n').map((paragrafo, index) => (
                <p key={index}>{paragrafo}</p>
              ))
            ) : (
              <p>{conteudo.descricao || conteudo.resumo}</p>
            )}
          </Conteudo>

          <ArticleFooter>
            <TagsContainer>
              {conteudo.categoria && (
                <Tag>{conteudo.categoria}</Tag>
              )}
              {conteudo.tipo && (
                <Tag>{conteudo.tipo}</Tag>
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

const TipoConteudo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #1a4b8c;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 1rem;
  width: fit-content;
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
