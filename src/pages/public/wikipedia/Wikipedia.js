import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import { FaWikipediaW, FaSearch, FaBookOpen, FaHistory, FaLink } from 'react-icons/fa';

// Componente da página Wikipedia
const Wikipedia = () => {
  // Estado para armazenar os artigos (simulado por enquanto)
  const [artigos, setArtigos] = useState([]);
  const [termoBusca, setTermoBusca] = useState('');
  const [resultadosBusca, setResultadosBusca] = useState([]);
  
  // Simula carregamento de artigos (será substituído pela integração com Firebase)
  useEffect(() => {
    // Dados simulados - serão substituídos pela integração com Firebase
    const artigosMock = [
      {
        id: 1,
        titulo: 'História da Instituição',
        categoria: 'Institucional',
        autor: 'Equipe de Documentação',
        dataAtualizacao: '10 de Abril, 2025',
        resumo: 'Um breve histórico sobre a fundação e desenvolvimento da nossa instituição ao longo dos anos.',
        conteudo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.'
      },
      {
        id: 2,
        titulo: 'Regimento Interno',
        categoria: 'Documentos',
        autor: 'Coordenação Pedagógica',
        dataAtualizacao: '15 de Março, 2025',
        resumo: 'Documento que estabelece as normas e diretrizes para o funcionamento da instituição.',
        conteudo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.'
      },
      {
        id: 3,
        titulo: 'Grêmio Estudantil',
        categoria: 'Organizações',
        autor: 'Diretoria do Grêmio',
        dataAtualizacao: '20 de Abril, 2025',
        resumo: 'Informações sobre a estrutura, funcionamento e história do grêmio estudantil.',
        conteudo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.'
      },
      {
        id: 4,
        titulo: 'Laboratórios',
        categoria: 'Infraestrutura',
        autor: 'Departamento de TI',
        dataAtualizacao: '5 de Maio, 2025',
        resumo: 'Descrição dos laboratórios disponíveis na instituição e seus recursos.',
        conteudo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.'
      },
      {
        id: 5,
        titulo: 'Projetos de Extensão',
        categoria: 'Acadêmico',
        autor: 'Coordenação de Extensão',
        dataAtualizacao: '12 de Abril, 2025',
        resumo: 'Lista e descrição dos projetos de extensão desenvolvidos pela instituição.',
        conteudo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.'
      }
    ];
    
    setArtigos(artigosMock);
    setResultadosBusca(artigosMock);
  }, []);
  
  // Função para realizar a busca
  const realizarBusca = () => {
    if (termoBusca.trim() === '') {
      setResultadosBusca(artigos);
      return;
    }
    
    const resultados = artigos.filter(artigo => 
      artigo.titulo.toLowerCase().includes(termoBusca.toLowerCase()) ||
      artigo.categoria.toLowerCase().includes(termoBusca.toLowerCase()) ||
      artigo.resumo.toLowerCase().includes(termoBusca.toLowerCase())
    );
    
    setResultadosBusca(resultados);
  };
  
  // Efeito para realizar a busca quando o termo muda
  useEffect(() => {
    realizarBusca();
  }, [termoBusca]);
  
  return (
    <PageContainer>
      <Header />
      <MainContent>
        <PageHeader>
          <PageTitle><FaWikipediaW /> Wikipedia UniCEDUP</PageTitle>
          <PageDescription>
            Base de conhecimento colaborativa com informações sobre a instituição, 
            procedimentos, história e documentos importantes.
          </PageDescription>
        </PageHeader>
        
        <BuscaContainer>
          <BuscaInput 
            type="text" 
            placeholder="Buscar artigos..." 
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
          />
          <BuscaButton onClick={realizarBusca}>
            <FaSearch /> Buscar
          </BuscaButton>
        </BuscaContainer>
        
        <ArtigosContainer>
          {resultadosBusca.length > 0 ? (
            resultadosBusca.map(artigo => (
              <ArtigoCard key={artigo.id}>
                <ArtigoHeader>
                  <ArtigoCategoria>{artigo.categoria}</ArtigoCategoria>
                  <ArtigoData>Atualizado em: {artigo.dataAtualizacao}</ArtigoData>
                </ArtigoHeader>
                <ArtigoTitulo>
                  <FaBookOpen /> {artigo.titulo}
                </ArtigoTitulo>
                <ArtigoAutor>Por: {artigo.autor}</ArtigoAutor>
                <ArtigoResumo>{artigo.resumo}</ArtigoResumo>
                <ArtigoLink href={`/wikipedia/artigo/${artigo.id}`}>
                  <FaLink /> Ler artigo completo
                </ArtigoLink>
              </ArtigoCard>
            ))
          ) : (
            <MensagemVazia>
              Nenhum artigo encontrado para o termo de busca.
            </MensagemVazia>
          )}
        </ArtigosContainer>
        
        <ContribuirSection>
          <ContribuirTitulo>
            <FaHistory /> Contribua com a Wikipedia
          </ContribuirTitulo>
          <ContribuirTexto>
            A Wikipedia UniCEDUP é um projeto colaborativo. Se você é membro do grêmio estudantil, 
            pode contribuir criando ou editando artigos para enriquecer nossa base de conhecimento.
          </ContribuirTexto>
          <ContribuirBotao href="/login">Fazer login para contribuir</ContribuirBotao>
        </ContribuirSection>
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

const BuscaContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
  max-width: 800px;
  margin: 0 auto 2rem;
`;

const BuscaInput = styled.input`
  flex: 1;
  padding: 0.8rem 1rem;
  border: 2px solid #ddd;
  border-radius: 4px 0 0 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #1a4b8c;
  }
`;

const BuscaButton = styled.button`
  background-color: #1a4b8c;
  color: white;
  border: none;
  padding: 0 1.5rem;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: #2c5ea0;
  }
`;

const ArtigosContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const ArtigoCard = styled.article`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  padding: 1.5rem;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const ArtigoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const ArtigoCategoria = styled.span`
  background-color: #f0f5ff;
  color: #1a4b8c;
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
`;

const ArtigoData = styled.span`
  font-size: 0.8rem;
  color: #666;
`;

const ArtigoTitulo = styled.h3`
  font-size: 1.3rem;
  color: #1a4b8c;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ArtigoAutor = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1rem;
  font-style: italic;
`;

const ArtigoResumo = styled.p`
  font-size: 1rem;
  color: #333;
  margin-bottom: 1.5rem;
  line-height: 1.5;
`;

const ArtigoLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
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

const ContribuirSection = styled.section`
  background-color: #f0f5ff;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
`;

const ContribuirTitulo = styled.h2`
  font-size: 1.5rem;
  color: #1a4b8c;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const ContribuirTexto = styled.p`
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 1.5rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const ContribuirBotao = styled.a`
  display: inline-block;
  background-color: #1a4b8c;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  
  &:hover {
    background-color: #2c5ea0;
  }
`;

export default Wikipedia;
