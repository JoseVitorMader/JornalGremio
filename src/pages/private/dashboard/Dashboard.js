import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import Sidebar from '../../../components/layout/Sidebar';
import { useAuth } from '../../../contexts/AuthContext';
import { 
  readNoticias, 
  readEventos, 
  readAvisos, 
  readCollection,
  readDestaques,
  listenToCollection
} from '../../../services/realtimeDatabase';
import { FaNewspaper, FaCalendarAlt, FaImages, FaBullhorn, FaStar, FaEdit, FaChartBar, FaSpinner } from 'react-icons/fa';

// Componente do Dashboard para membros do grêmio
const Dashboard = () => {
  const { currentUser } = useAuth();
  
  // Estados para armazenar estatísticas
  const [estatisticas, setEstatisticas] = useState({
    noticias: 0,
    eventos: 0,
    galeria: 0,
    avisos: 0,
    destaques: 0
  });
  
  // Estado para armazenar atividades recentes
  const [atividades, setAtividades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  
  // Carrega dados do Firebase
  useEffect(() => {
    carregarDadosDashboard();
  }, []);
  
  const carregarDadosDashboard = async () => {
    try {
      setLoading(true);
      setErro('');
      
      // Carrega estatísticas
      console.log('🔥 Carregando dados do dashboard...');
      const [noticiasResult, eventosResult, avisosResult, galeriaResult, destaquesResult] = await Promise.all([
        readNoticias(),
        readEventos(),
        readAvisos(),
        readCollection('galeria'),
        readDestaques()
      ]);
      
      console.log('📊 Resultados do dashboard:', {
        noticias: noticiasResult,
        eventos: eventosResult,
        avisos: avisosResult,
        galeria: galeriaResult,
        destaques: destaquesResult
      });
      
      // Atualiza estatísticas
      setEstatisticas({
        noticias: noticiasResult.success ? (noticiasResult.data?.length || 0) : 0,
        eventos: eventosResult.success ? (eventosResult.data?.length || 0) : 0,
        galeria: galeriaResult.success ? (galeriaResult.data?.length || 0) : 0,
        avisos: avisosResult.success ? (avisosResult.data?.length || 0) : 0,
        destaques: destaquesResult.success ? (destaquesResult.data?.length || 0) : 0
      });
      
      // Carrega atividades recentes
      const atividadesRecentes = [];
      
      // Adiciona notícias recentes
      if (noticiasResult.success && noticiasResult.data) {
        noticiasResult.data.slice(0, 3).forEach(noticia => {
          atividadesRecentes.push({
            id: `noticia_${noticia.id}`,
            tipo: 'noticia',
            titulo: noticia.titulo,
            autor: noticia.autor || 'Autor desconhecido',
            data: formatarDataAtividade(noticia.createdAt),
            acao: 'criou',
            link: `/noticias/${noticia.id}`
          });
        });
      }
      
      // Adiciona eventos recentes
      if (eventosResult.success && eventosResult.data) {
        eventosResult.data.slice(0, 2).forEach(evento => {
          atividadesRecentes.push({
            id: `evento_${evento.id}`,
            tipo: 'evento',
            titulo: evento.titulo,
            autor: evento.autor || 'Autor desconhecido',
            data: formatarDataAtividade(evento.createdAt),
            acao: 'criou',
            link: `/eventos/${evento.id}`
          });
        });
      }
      
      // Adiciona avisos recentes
      if (avisosResult.success && avisosResult.data) {
        avisosResult.data.slice(0, 2).forEach(aviso => {
          atividadesRecentes.push({
            id: `aviso_${aviso.id}`,
            tipo: 'aviso',
            titulo: aviso.titulo,
            autor: aviso.autor || 'Autor desconhecido',
            data: formatarDataAtividade(aviso.createdAt),
            acao: 'criou',
            link: `/avisos/${aviso.id}`
          });
        });
      }
      
      // Ordena atividades por data (mais recentes primeiro)
      atividadesRecentes.sort((a, b) => new Date(b.data) - new Date(a.data));
      
      setAtividades(atividadesRecentes.slice(0, 10));
      
    } catch (error) {
      console.error('Erro ao carregar dados do dashboard:', error);
      setErro('Erro ao carregar dados do dashboard');
    } finally {
      setLoading(false);
    }
  };
  
  const formatarDataAtividade = (timestamp) => {
    if (!timestamp) return new Date().toLocaleDateString('pt-BR');
    const data = new Date(timestamp);
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };
  
  return (
    <PageContainer>
      <Header />
      <DashboardContainer>
        <Sidebar />
        <MainContent>
          <PageHeader>
            <PageTitle><FaChartBar /> Dashboard</PageTitle>
            <PageDescription>
              Bem-vindo(a), {currentUser?.email}! Gerencie o conteúdo do jornal digital UniCEDUP.
            </PageDescription>
          </PageHeader>
          
          {loading ? (
            <LoadingContainer>
              <FaSpinner style={{ animation: 'spin 2s linear infinite', fontSize: '2rem', color: '#1a4b8c' }} />
              <LoadingText>Carregando dados do dashboard...</LoadingText>
            </LoadingContainer>
          ) : erro ? (
            <ErrorContainer>
              <ErrorText>❌ {erro}</ErrorText>
              <RetryButton onClick={carregarDadosDashboard}>
                Tentar novamente
              </RetryButton>
            </ErrorContainer>
          ) : (
            <>
              <EstatisticasGrid>
                <EstatisticaCard to="/editor/noticias">
                  <EstatisticaIcone><FaNewspaper /></EstatisticaIcone>
                  <EstatisticaNumero>{estatisticas.noticias}</EstatisticaNumero>
                  <EstatisticaTitulo>Notícias</EstatisticaTitulo>
                </EstatisticaCard>
                
                <EstatisticaCard to="/editor/eventos">
                  <EstatisticaIcone><FaCalendarAlt /></EstatisticaIcone>
                  <EstatisticaNumero>{estatisticas.eventos}</EstatisticaNumero>
                  <EstatisticaTitulo>Eventos</EstatisticaTitulo>
                </EstatisticaCard>
                
                <EstatisticaCard to="/editor/galeria">
                  <EstatisticaIcone><FaImages /></EstatisticaIcone>
                  <EstatisticaNumero>{estatisticas.galeria}</EstatisticaNumero>
                  <EstatisticaTitulo>Imagens</EstatisticaTitulo>
                </EstatisticaCard>
                
                <EstatisticaCard to="/editor/avisos">
                  <EstatisticaIcone><FaBullhorn /></EstatisticaIcone>
                  <EstatisticaNumero>{estatisticas.avisos}</EstatisticaNumero>
                  <EstatisticaTitulo>Avisos</EstatisticaTitulo>
                </EstatisticaCard>
                
                <EstatisticaCard to="/editor/destaques">
                  <EstatisticaIcone><FaStar /></EstatisticaIcone>
                  <EstatisticaNumero>{estatisticas.destaques}</EstatisticaNumero>
                  <EstatisticaTitulo>Destaques</EstatisticaTitulo>
                </EstatisticaCard>
              </EstatisticasGrid>
              
              <AcoesContainer>
                <AcaoTitulo>Ações Rápidas</AcaoTitulo>
                <AcoesGrid>
                  <AcaoBotao to="/editor/noticias">
                    <FaNewspaper /> Nova Notícia
                  </AcaoBotao>
                  <AcaoBotao to="/editor/eventos">
                    <FaCalendarAlt /> Novo Evento
                  </AcaoBotao>
                  <AcaoBotao to="/editor/galeria">
                    <FaImages /> Nova Imagem
                  </AcaoBotao>
                  <AcaoBotao to="/editor/avisos">
                    <FaBullhorn /> Novo Aviso
                  </AcaoBotao>
                  <AcaoBotao to="/editor/destaques">
                    <FaStar /> Novo Destaque
                  </AcaoBotao>
                </AcoesGrid>
              </AcoesContainer>
              
              <AtividadesContainer>
                <AtividadesTitulo>Atividades Recentes</AtividadesTitulo>
                {atividades.length > 0 ? (
                  <AtividadesLista>
                    {atividades.map(atividade => (
                      <AtividadeItem key={atividade.id}>
                        <AtividadeIcone tipo={atividade.tipo}>
                          {atividade.tipo === 'noticia' ? <FaNewspaper /> : 
                           atividade.tipo === 'evento' ? <FaCalendarAlt /> : 
                           atividade.tipo === 'galeria' ? <FaImages /> : 
                           atividade.tipo === 'aviso' ? <FaBullhorn /> : <FaStar />}
                        </AtividadeIcone>
                        <AtividadeConteudo>
                          <AtividadeTexto>
                            <AtividadeAutor>{atividade.autor}</AtividadeAutor> {atividade.acao} <AtividadeTipo>{atividade.tipo}</AtividadeTipo>: <AtividadeTitulo>{atividade.titulo}</AtividadeTitulo>
                          </AtividadeTexto>
                          <AtividadeData>{atividade.data}</AtividadeData>
                        </AtividadeConteudo>
                        <AtividadeAcao>
                          <FaEdit />
                        </AtividadeAcao>
                      </AtividadeItem>
                    ))}
                  </AtividadesLista>
                ) : (
                  <NoActivitiesMessage>
                    Nenhuma atividade recente encontrada.
                  </NoActivitiesMessage>
                )}
              </AtividadesContainer>
            </>
          )}
        </MainContent>
      </DashboardContainer>
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

const DashboardContainer = styled.div`
  display: flex;
  flex: 1;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem 1rem 2rem 270px;
  
  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const PageHeader = styled.div`
  margin-bottom: 2rem;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  color: #1a4b8c;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const PageDescription = styled.p`
  font-size: 1rem;
  color: #555;
`;

const EstatisticasGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const EstatisticaCard = styled(Link)`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease;
  text-decoration: none;
  color: inherit;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const EstatisticaIcone = styled.div`
  font-size: 2rem;
  color: #1a4b8c;
  margin-bottom: 0.5rem;
`;

const EstatisticaNumero = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #1a4b8c;
  margin-bottom: 0.5rem;
`;

const EstatisticaTitulo = styled.div`
  font-size: 1rem;
  color: #555;
`;

const AcoesContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const AcaoTitulo = styled.h2`
  font-size: 1.5rem;
  color: #1a4b8c;
  margin-bottom: 1.5rem;
`;

const AcoesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;

const AcaoBotao = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: #1a4b8c;
  color: white;
  padding: 0.8rem;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #2c5ea0;
  }
`;

const AtividadesContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const AtividadesTitulo = styled.h2`
  font-size: 1.5rem;
  color: #1a4b8c;
  margin-bottom: 1.5rem;
`;

const AtividadesLista = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const AtividadeItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-radius: 4px;
  background-color: #f9f9f9;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #f0f5ff;
  }
`;

const AtividadeIcone = styled.div`
  font-size: 1.5rem;
  margin-right: 1rem;
  color: ${props => 
    props.tipo === 'noticia' ? '#1a4b8c' : 
    props.tipo === 'evento' ? '#2c5ea0' : 
    props.tipo === 'galeria' ? '#3a6eaf' : 
    props.tipo === 'aviso' ? '#ff9800' : '#f44336'
  };
`;

const AtividadeConteudo = styled.div`
  flex: 1;
`;

const AtividadeTexto = styled.div`
  margin-bottom: 0.3rem;
`;

const AtividadeAutor = styled.span`
  font-weight: bold;
  color: #1a4b8c;
`;

const AtividadeTipo = styled.span`
  font-style: italic;
`;

const AtividadeTitulo = styled.span`
  font-weight: bold;
`;

const AtividadeData = styled.div`
  font-size: 0.8rem;
  color: #666;
`;

const AtividadeAcao = styled.div`
  color: #1a4b8c;
  cursor: pointer;
  
  &:hover {
    color: #2c5ea0;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  text-align: center;
`;

const LoadingText = styled.p`
  margin-top: 1rem;
  color: #1a4b8c;
  font-size: 1.1rem;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  text-align: center;
  background-color: #ffebee;
  border-radius: 8px;
  margin: 2rem 0;
`;

const ErrorText = styled.p`
  color: #d32f2f;
  font-size: 1.1rem;
  margin-bottom: 1rem;
`;

const RetryButton = styled.button`
  background-color: #1a4b8c;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #2c5ea0;
  }
`;

const NoActivitiesMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
  font-style: italic;
`;

export default Dashboard;
