import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import Sidebar from '../../../components/layout/Sidebar';
import { useAuth } from '../../../contexts/AuthContext';
import { FaNewspaper, FaCalendarAlt, FaImages, FaBullhorn, FaStar, FaEdit, FaChartBar } from 'react-icons/fa';

// Componente do Dashboard para membros do grêmio
const Dashboard = () => {
  const { currentUser } = useAuth();
  
  // Estados para armazenar estatísticas (simulado por enquanto)
  const [estatisticas, setEstatisticas] = useState({
    noticias: 0,
    eventos: 0,
    galeria: 0,
    avisos: 0,
    destaques: 0
  });
  
  // Estado para armazenar atividades recentes (simulado por enquanto)
  const [atividades, setAtividades] = useState([]);
  
  // Simula carregamento de dados do Firebase (será implementado posteriormente)
  useEffect(() => {
    // Dados simulados - serão substituídos pela integração com Firebase
    const estatisticasMock = {
      noticias: 15,
      eventos: 8,
      galeria: 24,
      avisos: 5,
      destaques: 6
    };
    
    const atividadesMock = [
      {
        id: 1,
        tipo: 'noticia',
        titulo: 'Semana da Ciência e Tecnologia',
        autor: 'Ana Silva',
        data: '18 de Maio, 2025',
        acao: 'criou'
      },
      {
        id: 2,
        tipo: 'evento',
        titulo: 'Festival Cultural',
        autor: 'Pedro Santos',
        data: '17 de Maio, 2025',
        acao: 'editou'
      },
      {
        id: 3,
        tipo: 'aviso',
        titulo: 'Alteração no calendário acadêmico',
        autor: 'Carla Oliveira',
        data: '16 de Maio, 2025',
        acao: 'criou'
      },
      {
        id: 4,
        tipo: 'galeria',
        titulo: 'Fotos do Campeonato Interclasses',
        autor: 'Lucas Mendes',
        data: '15 de Maio, 2025',
        acao: 'adicionou'
      },
      {
        id: 5,
        tipo: 'destaque',
        titulo: 'Novos Laboratórios de Informática',
        autor: 'Ana Silva',
        data: '14 de Maio, 2025',
        acao: 'definiu'
      }
    ];
    
    setEstatisticas(estatisticasMock);
    setAtividades(atividadesMock);
  }, []);
  
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
          </AtividadesContainer>
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

export default Dashboard;
