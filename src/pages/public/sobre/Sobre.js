import React from 'react';
import styled from 'styled-components';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import { FaInfoCircle, FaUsers, FaHistory, FaBookOpen, FaHandshake } from 'react-icons/fa';

// Componente da página Sobre
const Sobre = () => {
  return (
    <PageContainer>
      <Header />
      <MainContent>
        <PageHeader>
          <PageTitle><FaInfoCircle /> Sobre o UniCEDUP</PageTitle>
          <PageDescription>
            Conheça mais sobre o jornal digital do grêmio estudantil e nossa missão.
          </PageDescription>
        </PageHeader>
        
        <SobreSection>
          <SectionTitle><FaBookOpen /> Nossa Missão</SectionTitle>
          <SectionContent>
            <p>
              O UniCEDUP é o jornal digital oficial do grêmio estudantil, criado com o objetivo de 
              manter toda a comunidade acadêmica informada sobre os acontecimentos, eventos, 
              notícias e atividades da instituição.
            </p>
            <p>
              Nossa missão é promover a comunicação transparente e eficiente entre alunos, 
              professores e funcionários, além de dar voz aos estudantes e suas iniciativas.
            </p>
          </SectionContent>
        </SobreSection>
        
        <SobreSection>
          <SectionTitle><FaHistory /> Nossa História</SectionTitle>
          <SectionContent>
            <p>
              O jornal digital UniCEDUP foi fundado em 2023, como uma evolução do antigo 
              informativo impresso que circulava na instituição. Com a necessidade de uma 
              comunicação mais ágil e sustentável, o grêmio estudantil decidiu migrar para 
              o formato digital, ampliando o alcance e as possibilidades de interação.
            </p>
            <p>
              Desde então, temos trabalhado para trazer informações relevantes e atualizadas, 
              cobrindo todos os aspectos da vida acadêmica e promovendo a integração entre 
              os diversos setores da nossa comunidade.
            </p>
          </SectionContent>
        </SobreSection>
        
        <SobreSection>
          <SectionTitle><FaUsers /> Nossa Equipe</SectionTitle>
          <SectionContent>
            <p>
              O UniCEDUP é mantido por uma equipe de estudantes voluntários, membros do 
              grêmio estudantil, que se dedicam a produzir conteúdo de qualidade e manter 
              o site atualizado.
            </p>
            
            <EquipeGrid>
              <MembroCard>
                <MembroFoto src="https://via.placeholder.com/150" alt="Foto do membro" />
                <MembroNome>Ana Silva</MembroNome>
                <MembroCargo>Editora-chefe</MembroCargo>
                <MembroDescricao>
                  Responsável pela coordenação geral do jornal e aprovação final dos conteúdos.
                </MembroDescricao>
              </MembroCard>
              
              <MembroCard>
                <MembroFoto src="https://via.placeholder.com/150" alt="Foto do membro" />
                <MembroNome>Pedro Santos</MembroNome>
                <MembroCargo>Editor de Notícias</MembroCargo>
                <MembroDescricao>
                  Coordena a equipe de reportagem e a produção de conteúdo jornalístico.
                </MembroDescricao>
              </MembroCard>
              
              <MembroCard>
                <MembroFoto src="https://via.placeholder.com/150" alt="Foto do membro" />
                <MembroNome>Carla Oliveira</MembroNome>
                <MembroCargo>Editora de Eventos</MembroCargo>
                <MembroDescricao>
                  Responsável pela cobertura e divulgação dos eventos da instituição.
                </MembroDescricao>
              </MembroCard>
              
              <MembroCard>
                <MembroFoto src="https://via.placeholder.com/150" alt="Foto do membro" />
                <MembroNome>Lucas Mendes</MembroNome>
                <MembroCargo>Editor de Mídias</MembroCargo>
                <MembroDescricao>
                  Coordena a produção e edição de fotos, vídeos e conteúdo multimídia.
                </MembroDescricao>
              </MembroCard>
            </EquipeGrid>
          </SectionContent>
        </SobreSection>
        
        <SobreSection>
          <SectionTitle><FaHandshake /> Participe</SectionTitle>
          <SectionContent>
            <p>
              O UniCEDUP está sempre aberto à participação de novos colaboradores. Se você 
              é estudante da instituição e tem interesse em fazer parte da nossa equipe, 
              entre em contato com o grêmio estudantil.
            </p>
            <p>
              Também aceitamos sugestões de pautas, feedback sobre o conteúdo e ideias para 
              melhorar nosso trabalho. Sua opinião é muito importante para nós!
            </p>
            
            <ContatoContainer>
              <ContatoItem>
                <ContatoTitulo>E-mail</ContatoTitulo>
                <ContatoInfo>contato@unicedup.com.br</ContatoInfo>
              </ContatoItem>
              
              <ContatoItem>
                <ContatoTitulo>Sala do Grêmio</ContatoTitulo>
                <ContatoInfo>Bloco B, Sala 105</ContatoInfo>
              </ContatoItem>
              
              <ContatoItem>
                <ContatoTitulo>Horário de Atendimento</ContatoTitulo>
                <ContatoInfo>Segunda a Sexta, das 10h às 17h</ContatoInfo>
              </ContatoItem>
            </ContatoContainer>
          </SectionContent>
        </SobreSection>
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

const SobreSection = styled.section`
  margin-bottom: 3rem;
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: #1a4b8c;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:after {
    content: '';
    flex: 1;
    height: 2px;
    background-color: #e0ebff;
    margin-left: 1rem;
  }
`;

const SectionContent = styled.div`
  font-size: 1.1rem;
  color: #333;
  line-height: 1.6;
  
  p {
    margin-bottom: 1.5rem;
  }
  
  p:last-child {
    margin-bottom: 0;
  }
`;

const EquipeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const MembroCard = styled.div`
  background-color: #f0f5ff;
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const MembroFoto = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin: 2rem auto 1rem;
  object-fit: cover;
  border: 4px solid #1a4b8c;
`;

const MembroNome = styled.h3`
  font-size: 1.3rem;
  color: #1a4b8c;
  margin-bottom: 0.3rem;
`;

const MembroCargo = styled.h4`
  font-size: 1rem;
  color: #2c5ea0;
  margin-bottom: 1rem;
  font-weight: normal;
`;

const MembroDescricao = styled.p`
  font-size: 0.9rem;
  color: #333;
  padding: 0 1.5rem 2rem;
`;

const ContatoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  background-color: #f0f5ff;
  padding: 2rem;
  border-radius: 8px;
`;

const ContatoItem = styled.div`
  text-align: center;
`;

const ContatoTitulo = styled.h3`
  font-size: 1.2rem;
  color: #1a4b8c;
  margin-bottom: 0.5rem;
`;

const ContatoInfo = styled.p`
  font-size: 1rem;
  color: #333;
`;

export default Sobre;
