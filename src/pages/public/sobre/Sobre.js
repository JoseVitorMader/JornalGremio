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
           A chapa UniCEDUP tem como principal objetivo satisfazer as sugestões dos estudantes. Usando os meios criados pela mesma, como o site e as caixas de perguntas já postas nos pilares a frente da escada. A ideia de promover eventos também é objetivo da equipe, inter-classes, show de talentos e muito mais. 
          Juntamente com as demais ideias, existe a gincana, as salas entrarão em competição nos eventos escolares - por exemplo, a turma que vier mais bem vestida em um evento de festa junina ganhará pontos, somando no final e trazendo um vencedor - fazendo assim os mesmos ganharem o prêmio de uma viagem.
          Reclamações sobre a gestão escolar ou professores, serão todas encaminhadas a diretoria
          O grupo não promete coisas que não caibam a eles fazerem.
          </SectionContent>
        </SobreSection>
        
        <SobreSection>
          <SectionTitle><FaHistory /> Nossa História</SectionTitle>
          <SectionContent>
            <p>
              O jornal digital UniCEDUP foi fundado em 2025, como uma ideia para
              informativos na instituição. Com a necessidade de uma 
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
                <MembroFoto src="foto_brayan.jpg" alt="Foto do membro" />
                <MembroNome>Brayan Zwang</MembroNome>
                <MembroCargo>Presidente</MembroCargo>
                <MembroDescricao>
                  Representa o Grêmio dentro da Escola e fora dela.
                </MembroDescricao>
              </MembroCard>


              <MembroCard>
                <MembroFoto src="foto raiser.jpg" alt="Foto do membro" />
                <MembroNome>Heloísa Raiser</MembroNome>
                <MembroCargo>Vice-Presidente</MembroCargo>
                <MembroDescricao>
                  Auxilia o Presidente no exercício de suas funções.
                </MembroDescricao>
              </MembroCard>
              
              <MembroCard>
                <MembroFoto src="foto bia.jpg" alt="Foto do membro" />
                <MembroNome>Beatriz Michels</MembroNome>
                <MembroCargo>Secretária-Geral</MembroCargo>
                <MembroDescricao>
                  Elabora avisos e convocações de reuniões, encaminhando para o Coordenador de Imprensa e Divulgação.
                </MembroDescricao>
              </MembroCard>
              
              <MembroCard>
                <MembroFoto src="foto bya.jpg" alt="Foto do membro" />
                <MembroNome>Byanka Wolski</MembroNome>
                <MembroCargo>Diretora Financeira</MembroCargo>
                <MembroDescricao>
                  Mantém em dia a escrituração de todo o movimento financeiro do Grêmio;
                </MembroDescricao>
              </MembroCard>
              <MembroCard>
                <MembroFoto src="foto flavia.jpg" alt="Foto do membro"/>
                <MembroNome>Flávia Martini</MembroNome>
                <MembroCargo>Diretora Social</MembroCargo>
                <MembroDescricao>
                  Coordena o serviço de Relações Públicas do Grêmio;
                </MembroDescricao>
              </MembroCard>
              <MembroCard>
                <MembroFoto src="foto mariana.jpg" alt="Foto do membro"/>
                <MembroNome>Marianna Dancker</MembroNome>
                <MembroCargo>Diretora Cultural</MembroCargo>
                <MembroDescricao>
                  Promove a realização de conferências, exposições, concursos, recitais, festivais de música
                  e outras atividades de natureza cultural;
                </MembroDescricao>
              </MembroCard>
              <MembroCard>
                <MembroFoto src="foto jose.jpg" alt="Foto do membro"/>
                <MembroNome>José Vitor Mader</MembroNome>
                <MembroCargo>Diretor de Imprensa</MembroCargo>
                <MembroDescricao>
                   Responsável pela coordenação geral do jornal e aprovação final dos conteúdos e, responsável também por informar os estudantes sobre novidade e informações sobre alterações estudantis.
                </MembroDescricao>
              </MembroCard>
              <MembroCard>
                <MembroFoto src="foto dani.jpg" alt="Foto do membro"/>
                <MembroNome>Daniel Campregher Junior</MembroNome>
                <MembroCargo>Diretor de Esportes</MembroCargo>
                <MembroDescricao>
                  Coordena e orienta as atividades esportivas do corpo discente;
                </MembroDescricao>
              </MembroCard>
              <MembroCard>
                <MembroFoto src="foto jordana.jpg" alt="Foto do membro" />
                <MembroNome>Jordana Avila</MembroNome>
                <MembroCargo>Diretora de Saúde e Meio Ambiente</MembroCargo>
                <MembroDescricao>
                  Promove ações que visem a conscientização e a melhoria da saúde e do meio ambiente na escola e na comunidade estudantil.
                </MembroDescricao>
              </MembroCard>
              <MembroCard>
                <MembroFoto src="foto isa.jpg" alt="Foto do membro" />
                <MembroNome>Isabela Ferreira</MembroNome>
                <MembroCargo>Diretora de Relações Estudantis</MembroCargo>
                <MembroDescricao>
                  Coordena e mantém o bom relacionamento entre o grêmio, os alunos, a escola e a comunidade.
                </MembroDescricao>
              </MembroCard>
              <MembroCard>
                <MembroFoto src="foto sara.jpg" alt="Foto do membro"/>
                <MembroNome>Sarah Rosa</MembroNome>
                <MembroCargo>Secretária Adjunta</MembroCargo>
                <MembroDescricao>
                  Auxilia o 1º Secretário em todas as suas funções.
                </MembroDescricao>
              </MembroCard>
              <MembroCard>
                <MembroFoto src="foto gabriel.jpg" alt="Foto do membro" />
                <MembroNome>Gabriel Ferrari</MembroNome>
                <MembroCargo>Diretor Financeiro Adjunto</MembroCargo>
                <MembroDescricao>
                  Auxilia o 1° Tesoureiro em todas as suas funções.
                </MembroDescricao>
              </MembroCard>
              <MembroCard>
                <MembroFoto src="foto larissa.jpg" alt="Foto do membro"/>
                <MembroNome>Larissa Schneider</MembroNome>
                <MembroCargo>Suplente Social</MembroCargo>
                <MembroDescricao>
                  Auxilia o diretor social em todas as suas funções.
                </MembroDescricao>
              </MembroCard>
              <MembroCard>
                <MembroFoto src="foto cindy.jpg" alt="Foto do membro" />
                <MembroNome>Cindy Laura</MembroNome>
                <MembroCargo>Suplente Cultural</MembroCargo>
                <MembroDescricao>
                  Auxilia o diretor cultural em todas as suas funções.
                </MembroDescricao>
              </MembroCard>
              <MembroCard>
                <MembroFoto src="foto pietro.jpg" alt="Foto do membro"/>
                <MembroNome>Pietro Corrente</MembroNome>
                <MembroCargo>Suplente de Imprensa</MembroCargo>
                <MembroDescricao>
                  Auxilia o diretor de imprensa em todas as suas funções.
                </MembroDescricao>
              </MembroCard>
              <MembroCard>
                <MembroFoto src="foto rhuon.jpg" alt="Foto do membro"/>
                <MembroNome>Matheus Ruon</MembroNome>
                <MembroCargo>Suplente de Esportes</MembroCargo>
                <MembroDescricao>
                  Auxilia o diretor de esportes em todas as suas funções.
                </MembroDescricao>
              </MembroCard>
              <MembroCard>
                <MembroFoto />
                <MembroNome>Micheli</MembroNome>
                <MembroCargo>Suplente de Saúde e Meio ambiente</MembroCargo>
                <MembroDescricao>
                  Auxilia o diretor de saúde em todas as suas funções.
                </MembroDescricao>
              </MembroCard>
              <MembroCard>
                <MembroFoto src="foto natalia.jpg" alt="Foto do membro" />
                <MembroNome>Nataly Ferrari</MembroNome>
                <MembroCargo>Suplente de Relaçoes Estudantis</MembroCargo>
                <MembroDescricao>
                  Auxilia o diretor de relações estudantis em todas as suas funções.
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
              entre em contato com o grêmio estudantil, para se tornar um apoiador.
            </p>
            <p>
              Também aceitamos sugestões de pautas, feedback sobre o conteúdo e ideias para 
              melhorar nosso trabalho. Sua opinião é muito importante para nós!
            </p>
            
            <ContatoContainer>
              <ContatoItem>
                <ContatoTitulo>E-mail</ContatoTitulo>
                <ContatoInfo></ContatoInfo>
              </ContatoItem>
              
              <ContatoItem>
                <ContatoTitulo>Sala do Grêmio</ContatoTitulo>
                <ContatoInfo>Sala ao lado da cozinha</ContatoInfo>
              </ContatoItem>
              
              <ContatoItem>
                <ContatoTitulo>Horário de Atendimento</ContatoTitulo>
                <ContatoInfo>Segunda a Sexta, das 7:30h às 16:40h</ContatoInfo>
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
