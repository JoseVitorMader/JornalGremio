import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import Sidebar from '../../../components/layout/Sidebar';
import { useAuth } from '../../../contexts/AuthContext';
import { FaBullhorn, FaSave, FaTimes, FaPlus, FaExclamationCircle } from 'react-icons/fa';
import { createAviso } from '../../../services/realtimeDatabase';

// Componente do Editor de Avisos para membros do grêmio
const EditorAvisos = () => {
  const { currentUser } = useAuth();
  
  // Estados para o formulário de aviso
  const [titulo, setTitulo] = useState('');
  const [tipo, setTipo] = useState('informativo');
  const [conteudo, setConteudo] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [mensagem, setMensagem] = useState({ tipo: '', texto: '' });
  
  // Lista de tipos de avisos disponíveis
  const tiposAviso = [
    { id: 'informativo', nome: 'Informativo' },
    { id: 'importante', nome: 'Importante' },
    { id: 'urgente', nome: 'Urgente' }
  ];
  
  // Função para enviar o formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validação básica
    if (!titulo || !conteudo) {
      setMensagem({
        tipo: 'erro',
        texto: 'Por favor, preencha todos os campos obrigatórios.'
      });
      return;
    }
    
    try {
      setEnviando(true);
      
      // Criar o objeto do aviso
      const avisoData = {
        titulo,
        tipo,
        conteudo,
        autor: currentUser?.email || 'Administrador'
      };
      
      // Enviar para o Firebase Realtime Database
      const resultado = await createAviso(avisoData);
      
      if (resultado.success) {
        // Sucesso - limpa o formulário
        setTitulo('');
        setTipo('informativo');
        setConteudo('');
        
        setMensagem({
          tipo: 'sucesso',
          texto: 'Aviso publicado com sucesso!'
        });
      } else {
        // Erro no envio
        setMensagem({
          tipo: 'erro',
          texto: `Erro ao publicar aviso: ${resultado.error}`
        });
      }
    } catch (error) {
      console.error('Erro ao enviar aviso:', error);
      setMensagem({
        tipo: 'erro',
        texto: `Erro ao publicar aviso: ${error.message}`
      });
    } finally {
      setEnviando(false);
      
      // Limpar mensagem após 5 segundos
      setTimeout(() => {
        setMensagem({ tipo: '', texto: '' });
      }, 5000);
    }
  };
  
  return (
    <PageContainer>
      <Header />
      <EditorContainer>
        <Sidebar />
        <MainContent>
          <PageHeader>
            <PageTitle><FaBullhorn /> Editor de Avisos</PageTitle>
            <PageDescription>
              Crie e edite avisos para o jornal digital UniCEDUP.
            </PageDescription>
          </PageHeader>
          
          {mensagem.texto && (
            <Mensagem tipo={mensagem.tipo}>
              {mensagem.texto}
              <FecharMensagem onClick={() => setMensagem({ tipo: '', texto: '' })}>
                <FaTimes />
              </FecharMensagem>
            </Mensagem>
          )}
          
          <FormContainer onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="titulo">Título do Aviso *</Label>
              <Input
                type="text"
                id="titulo"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Digite o título do aviso"
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="tipo">Tipo de Aviso</Label>
              <TiposContainer>
                {tiposAviso.map((t) => (
                  <TipoRadioContainer key={t.id}>
                    <TipoRadio
                      type="radio"
                      id={`tipo-${t.id}`}
                      name="tipo"
                      value={t.id}
                      checked={tipo === t.id}
                      onChange={() => setTipo(t.id)}
                    />
                    <TipoLabel htmlFor={`tipo-${t.id}`} tipoAviso={t.id}>
                      <FaExclamationCircle /> {t.nome}
                    </TipoLabel>
                  </TipoRadioContainer>
                ))}
              </TiposContainer>
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="conteudo">Conteúdo do Aviso *</Label>
              <TextArea
                id="conteudo"
                value={conteudo}
                onChange={(e) => setConteudo(e.target.value)}
                placeholder="Digite o conteúdo completo do aviso"
                rows={6}
                required
              />
            </FormGroup>
            
            <BotoesContainer>
              <BotaoSubmit type="submit" disabled={enviando}>
                {enviando ? 'Publicando...' : <><FaSave /> Publicar Aviso</>}
              </BotaoSubmit>
            </BotoesContainer>
          </FormContainer>
          
          <ListaAvisosContainer>
            <ListaAvisosHeader>
              <h2>Avisos Publicados</h2>
              <BotaoNovoAviso>
                <FaPlus /> Novo Aviso
              </BotaoNovoAviso>
            </ListaAvisosHeader>
            
            {/* Lista de avisos será implementada posteriormente com dados do Firebase */}
            <MensagemVazia>
              A lista de avisos será carregada do Firebase quando a integração for implementada.
            </MensagemVazia>
          </ListaAvisosContainer>
        </MainContent>
      </EditorContainer>
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

const EditorContainer = styled.div`
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

const Mensagem = styled.div`
  padding: 1rem;
  margin-bottom: 1.5rem;
  border-radius: 4px;
  background-color: ${props => props.tipo === 'sucesso' ? '#d4edda' : '#f8d7da'};
  color: ${props => props.tipo === 'sucesso' ? '#155724' : '#721c24'};
  border: 1px solid ${props => props.tipo === 'sucesso' ? '#c3e6cb' : '#f5c6cb'};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FecharMensagem = styled.button`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  font-size: 1rem;
`;

const FormContainer = styled.form`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #1a4b8c;
    box-shadow: 0 0 0 2px rgba(26, 75, 140, 0.2);
  }
`;

const TiposContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const TipoRadioContainer = styled.div`
  display: flex;
  align-items: center;
`;

const TipoRadio = styled.input`
  display: none;
`;

const TipoLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${props => 
    props.tipoAviso === 'urgente' ? 'rgba(211, 47, 47, 0.1)' : 
    props.tipoAviso === 'importante' ? 'rgba(255, 152, 0, 0.1)' : 
    'rgba(33, 150, 243, 0.1)'
  };
  color: ${props => 
    props.tipoAviso === 'urgente' ? '#d32f2f' : 
    props.tipoAviso === 'importante' ? '#ff9800' : 
    '#2196f3'
  };
  border: 1px solid ${props => 
    props.tipoAviso === 'urgente' ? '#d32f2f' : 
    props.tipoAviso === 'importante' ? '#ff9800' : 
    '#2196f3'
  };
  
  ${TipoRadio}:checked + & {
    background-color: ${props => 
      props.tipoAviso === 'urgente' ? '#d32f2f' : 
      props.tipoAviso === 'importante' ? '#ff9800' : 
      '#2196f3'
    };
    color: white;
  }
  
  &:hover {
    background-color: ${props => 
      props.tipoAviso === 'urgente' ? 'rgba(211, 47, 47, 0.2)' : 
      props.tipoAviso === 'importante' ? 'rgba(255, 152, 0, 0.2)' : 
      'rgba(33, 150, 243, 0.2)'
    };
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #1a4b8c;
    box-shadow: 0 0 0 2px rgba(26, 75, 140, 0.2);
  }
`;

const BotoesContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const BotaoSubmit = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #1a4b8c;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #2c5ea0;
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const ListaAvisosContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ListaAvisosHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  
  h2 {
    font-size: 1.5rem;
    color: #1a4b8c;
    margin: 0;
  }
`;

const BotaoNovoAviso = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #1a4b8c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #2c5ea0;
  }
`;

const MensagemVazia = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: #f0f5ff;
  border-radius: 4px;
  color: #1a4b8c;
`;

export default EditorAvisos;
