import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import Sidebar from '../../../components/layout/Sidebar';
import { useAuth } from '../../../contexts/AuthContext';
import { FaCalendarAlt, FaSave, FaImage, FaTimes, FaPlus, FaClock, FaMapMarkerAlt, FaUsers, FaEdit, FaTrash, FaSpinner } from 'react-icons/fa';
import { createEvento, convertImageToBase64, readEventos, deleteEvento } from '../../../services/realtimeDatabase';

// Componente do Editor de Eventos para membros do grêmio
const EditorEventos = () => {
  const { currentUser } = useAuth();
  
  // Estados para o formulário de evento
  const [titulo, setTitulo] = useState('');
  const [tipo, setTipo] = useState('academico');
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');
  const [local, setLocal] = useState('');
  const [capacidade, setCapacidade] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagem, setImagem] = useState(null);
  const [previewImagem, setPreviewImagem] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [mensagem, setMensagem] = useState({ tipo: '', texto: '' });
  
  // Estados para a lista de eventos
  const [eventosPublicados, setEventosPublicados] = useState([]);
  const [carregandoEventos, setCarregandoEventos] = useState(true);
  const [erroEventos, setErroEventos] = useState('');
  
  // Lista de tipos de eventos disponíveis
  const tiposEvento = [
    { id: 'academico', nome: 'Acadêmico' },
    { id: 'cultural', nome: 'Cultural' },
    { id: 'esportivo', nome: 'Esportivo' }
  ];
  
  // Função para lidar com a seleção de imagem
  const handleImagemChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setImagem(file);
      
      // Cria uma URL para preview da imagem
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImagem(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Função para remover a imagem selecionada
  const removerImagem = () => {
    setImagem(null);
    setPreviewImagem('');
  };
  
  // Função para enviar o formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validação básica
    if (!titulo || !data || !horario || !local || !descricao) {
      setMensagem({
        tipo: 'erro',
        texto: 'Por favor, preencha todos os campos obrigatórios.'
      });
      return;
    }
    
    try {
      setEnviando(true);
      
      let imagemBase64 = null;
      
      // Converter imagem para base64 se foi selecionada
      if (imagem) {
        imagemBase64 = await convertImageToBase64(imagem);
      }
      
      // Criar o objeto do evento
      const eventoData = {
        titulo,
        tipo,
        data,
        horario,
        local,
        capacidade: capacidade || null,
        descricao,
        imagem: imagemBase64
      };
      
      // Enviar para o Firebase Realtime Database
      const resultado = await createEvento(eventoData);
      
      if (resultado.success) {
        // Sucesso - limpa o formulário
        setTitulo('');
        setTipo('academico');
        setData('');
        setHorario('');
        setLocal('');
        setCapacidade('');
        setDescricao('');
        setImagem(null);
        setPreviewImagem('');
        
        setMensagem({
          tipo: 'sucesso',
          texto: 'Evento publicado com sucesso!'
        });
      } else {
        // Erro no envio
        setMensagem({
          tipo: 'erro',
          texto: `Erro ao publicar evento: ${resultado.error}`
        });
      }
    } catch (error) {
      console.error('Erro ao enviar evento:', error);
      setMensagem({
        tipo: 'erro',
        texto: `Erro ao publicar evento: ${error.message}`
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
            <PageTitle><FaCalendarAlt /> Editor de Eventos</PageTitle>
            <PageDescription>
              Crie e edite eventos para o jornal digital UniCEDUP.
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
              <Label htmlFor="titulo">Título do Evento *</Label>
              <Input
                type="text"
                id="titulo"
                name="titulo"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Digite o título do evento"
                required
              />
            </FormGroup>
            
            <FormRow>
              <FormGroup>
                <Label htmlFor="tipo">Tipo de Evento</Label>
                <Select
                  id="tipo"
                  name="tipo"
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                >
                  {tiposEvento.map((tipo) => (
                    <option key={tipo.id} value={tipo.id}>{tipo.nome}</option>
                  ))}
                </Select>
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="data">Data *</Label>
                <Input
                  type="date"
                  id="data"
                  name="data"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  required
                />
              </FormGroup>
            </FormRow>
            
            <FormRow>
              <FormGroup>
                <Label htmlFor="horario">Horário *</Label>
                <Input
                  type="text"
                  id="horario"
                  name="horario"
                  value={horario}
                  onChange={(e) => setHorario(e.target.value)}
                  placeholder="Ex: 14:00 - 18:00"
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="local">Local *</Label>
                <Input
                  type="text"
                  id="local"
                  name="local"
                  value={local}
                  onChange={(e) => setLocal(e.target.value)}
                  placeholder="Ex: Auditório Principal"
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="capacidade">Capacidade</Label>
                <Input
                  type="number"
                  id="capacidade"
                  name="capacidade"
                  value={capacidade}
                  onChange={(e) => setCapacidade(e.target.value)}
                  placeholder="Número de pessoas"
                  min="1"
                />
              </FormGroup>
            </FormRow>
            
            <FormGroup>
              <Label htmlFor="descricao">Descrição do Evento *</Label>
              <TextArea
                id="descricao"
                name="descricao"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Digite a descrição completa do evento"
                rows={6}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Imagem do Evento</Label>
              {previewImagem ? (
                <ImagemPreviewContainer>
                  <ImagemPreview src={previewImagem} alt="Preview" />
                  <RemoverImagemButton type="button" onClick={removerImagem}>
                    <FaTimes /> Remover
                  </RemoverImagemButton>
                </ImagemPreviewContainer>
              ) : (
                <InputImagemContainer>
                  <InputImagem
                    type="file"
                    id="imagem"
                    name="imagem"
                    accept="image/*"
                    onChange={handleImagemChange}
                  />
                  <InputImagemLabel htmlFor="imagem">
                    <FaImage /> Selecionar Imagem
                  </InputImagemLabel>
                </InputImagemContainer>
              )}
            </FormGroup>
            
            <BotoesContainer>
              <BotaoSubmit type="submit" disabled={enviando}>
                {enviando ? 'Publicando...' : <><FaSave /> Publicar Evento</>}
              </BotaoSubmit>
            </BotoesContainer>
          </FormContainer>
          
          <ListaEventosContainer>
            <ListaEventosHeader>
              <h2>Eventos Publicados</h2>
              <BotaoNovoEvento>
                <FaPlus /> Novo Evento
              </BotaoNovoEvento>
            </ListaEventosHeader>
            
            {/* Lista de eventos será implementada posteriormente com dados do Firebase */}
            <MensagemVazia>
              A lista de eventos será carregada do Firebase quando a integração for implementada.
            </MensagemVazia>
          </ListaEventosContainer>
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
  width: 100%;
`;

const FormRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  
  ${FormGroup} {
    flex: 1;
    min-width: 200px;
  }
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

const Select = styled.select`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: #1a4b8c;
    box-shadow: 0 0 0 2px rgba(26, 75, 140, 0.2);
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

const InputImagemContainer = styled.div`
  display: flex;
  align-items: center;
`;

const InputImagem = styled.input`
  display: none;
`;

const InputImagemLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #f0f5ff;
  color: #1a4b8c;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #e0ebff;
  }
`;

const ImagemPreviewContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const ImagemPreview = styled.img`
  max-width: 100%;
  max-height: 300px;
  border-radius: 4px;
`;

const RemoverImagemButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background-color: rgba(255, 255, 255, 0.8);
  color: #d32f2f;
  border: none;
  border-radius: 4px;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  cursor: pointer;
  
  &:hover {
    background-color: white;
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

const ListaEventosContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ListaEventosHeader = styled.div`
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

const BotaoNovoEvento = styled.button`
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

export default EditorEventos;
