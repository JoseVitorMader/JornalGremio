import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import { FaBullhorn, FaCalendarAlt, FaExclamationCircle, FaSpinner } from 'react-icons/fa';
import { readAvisos } from '../../../services/realtimeDatabase';

// Componente da página de Avisos
const Avisos = () => {
  const [avisos, setAvisos] = useState([]);
  const [filtro, setFiltro] = useState('todos');
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  
  useEffect(() => {
    carregarAvisos();
  }, []);

  const carregarAvisos = async () => {
    try {
      setLoading(true);
      setErro('');
      console.log('🔥 Carregando avisos do Firebase...');
      
      const resultado = await readAvisos();
      console.log('📊 Resultado dos avisos:', resultado);
      
      if (resultado.success) {
        const dadosAvisos = resultado.data || [];
        console.log('✅ Avisos carregados:', dadosAvisos);
        setAvisos(dadosAvisos);
      } else {
        setErro('Erro ao carregar avisos: ' + resultado.message);
        console.error('❌ Erro ao carregar avisos:', resultado.error);
      }
    } catch (error) {
      setErro('Erro ao carregar avisos: ' + error.message);
      console.error('💥 Erro inesperado:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Filtra avisos pelo tipo selecionado
  const avisosFiltrados = filtro === 'todos' 
    ? avisos 
    : avisos.filter(aviso => aviso.tipo === filtro);
  
  return (
    <PageContainer>
      <Header />
      <MainContent>
        <PageHeader>
          <PageTitle><FaBullhorn /> Avisos</PageTitle>
          <PageDescription>
            Comunicados importantes, prazos e informações relevantes para todos os estudantes.
          </PageDescription>
        </PageHeader>
        
        <FiltrosContainer>
          <FiltroButton 
            active={filtro === 'todos'} 
            onClick={() => setFiltro('todos')}
          >
            Todos
          </FiltroButton>
          <FiltroButton 
            active={filtro === 'urgente'} 
            onClick={() => setFiltro('urgente')}
            tipo="urgente"
          >
            Urgentes
          </FiltroButton>
          <FiltroButton 
            active={filtro === 'importante'} 
            onClick={() => setFiltro('importante')}
            tipo="importante"
          >
            Importantes
          </FiltroButton>
          <FiltroButton 
            active={filtro === 'informativo'} 
            onClick={() => setFiltro('informativo')}
            tipo="informativo"
          >
            Informativos
          </FiltroButton>
        </FiltrosContainer>
        
        <AvisosContainer>
          {loading ? (
            <LoadingContainer>
              <FaSpinner style={{ animation: 'spin 2s linear infinite', fontSize: '2rem', color: '#1a4b8c' }} />
              <p>Carregando avisos...</p>
            </LoadingContainer>
          ) : erro ? (
            <ErrorContainer>
              <p>❌ {erro}</p>
              <button onClick={carregarAvisos}>Tentar novamente</button>
            </ErrorContainer>
          ) : avisosFiltrados.length > 0 ? (
            avisosFiltrados.map(aviso => (
              <AvisoCard key={aviso.id} tipo={aviso.tipo} as={Link} to={`/avisos/${aviso.id}`}>
                <AvisoHeader>
                  <AvisoTipo tipo={aviso.tipo}>
                    <FaExclamationCircle />
                    {aviso.tipo === 'urgente' ? 'Urgente' : 
                     aviso.tipo === 'importante' ? 'Importante' : 'Informativo'}
                  </AvisoTipo>
                  <AvisoData>
                    <FaCalendarAlt /> 
                    {aviso.createdAt ? new Date(aviso.createdAt).toLocaleDateString('pt-BR') : 'Data não disponível'}
                  </AvisoData>
                </AvisoHeader>
                <AvisoTitulo>{aviso.titulo}</AvisoTitulo>
                {aviso.autor && <AvisoAutor>Por: {aviso.autor}</AvisoAutor>}
                <AvisoConteudo>{aviso.conteudo || aviso.descricao}</AvisoConteudo>
              </AvisoCard>
            ))
          ) : (
            <MensagemVazia>
              {filtro === 'todos' 
                ? 'Nenhum aviso disponível no momento.' 
                : `Nenhum aviso encontrado para a categoria "${filtro}".`
              }
            </MensagemVazia>
          )}
        </AvisosContainer>
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
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
  justify-content: center;
`;

const FiltroButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${props => {
    if (props.active) {
      return props.tipo === 'urgente' ? '#d32f2f' : 
             props.tipo === 'importante' ? '#ff9800' : 
             props.tipo === 'informativo' ? '#2196f3' : '#1a4b8c';
    }
    return '#f0f5ff';
  }};
  color: ${props => props.active ? 'white' : '#1a4b8c'};
  border: 1px solid ${props => 
    props.tipo === 'urgente' ? '#d32f2f' : 
    props.tipo === 'importante' ? '#ff9800' : 
    props.tipo === 'informativo' ? '#2196f3' : '#1a4b8c'
  };
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => {
      if (props.active) {
        return props.tipo === 'urgente' ? '#d32f2f' : 
               props.tipo === 'importante' ? '#ff9800' : 
               props.tipo === 'informativo' ? '#2196f3' : '#1a4b8c';
      }
      return '#e0ebff';
    }};
  }
`;

const AvisosContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const AvisoCard = styled.article`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-left: 5px solid ${props => 
    props.tipo === 'urgente' ? '#d32f2f' : 
    props.tipo === 'importante' ? '#ff9800' : '#2196f3'
  };
  padding: 1.5rem;
  text-decoration: none;
  color: inherit;
  display: block;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  }
`;

const AvisoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const AvisoTipo = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: bold;
  color: ${props => 
    props.tipo === 'urgente' ? '#d32f2f' : 
    props.tipo === 'importante' ? '#ff9800' : '#2196f3'
  };
`;

const AvisoData = styled.span`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.9rem;
  color: #666;
`;

const AvisoTitulo = styled.h3`
  font-size: 1.3rem;
  color: #1a4b8c;
  margin-bottom: 0.5rem;
`;

const AvisoAutor = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1rem;
  font-style: italic;
`;

const AvisoConteudo = styled.p`
  font-size: 1rem;
  color: #333;
  line-height: 1.5;
`;

const MensagemVazia = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: #f0f5ff;
  border-radius: 8px;
  color: #1a4b8c;
  font-size: 1.1rem;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: #f0f5ff;
  border-radius: 8px;
  color: #666;
  font-style: italic;
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

export default Avisos;
