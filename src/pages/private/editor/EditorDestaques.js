import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import Sidebar from '../../../components/layout/Sidebar';
import { useAuth } from '../../../contexts/AuthContext';
import { FaStar, FaSave, FaImage, FaTimes, FaPlus, FaEdit, FaTrash, FaSpinner } from 'react-icons/fa';
import { createDestaque, convertImageToBase64, readDestaques, deleteDestaque } from '../../../services/realtimeDatabase';

// Componente do Editor de Destaques para membros do grêmio
const EditorDestaques = () => {
  const { currentUser } = useAuth();
  
  // Estados para o formulário de destaque
  const [titulo, setTitulo] = useState('');
  const [tipo, setTipo] = useState('noticia');
  const [data, setData] = useState('');
  const [resumo, setResumo] = useState('');
  const [conteudoRelacionado, setConteudoRelacionado] = useState('');
  const [prioridade, setPrioridade] = useState('secundario');
  const [imagem, setImagem] = useState(null);
  const [previewImagem, setPreviewImagem] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [mensagem, setMensagem] = useState({ tipo: '', texto: '' });
  
  // Estados para a lista de destaques
  const [destaquesPublicados, setDestaquesPublicados] = useState([]);
  const [carregandoDestaques, setCarregandoDestaques] = useState(true);
  const [erroDestaques, setErroDestaques] = useState('');
  
  // Lista de tipos de conteúdo disponíveis
  const tiposConteudo = [
    { id: 'noticia', nome: 'Notícia' },
    { id: 'evento', nome: 'Evento' },
    { id: 'aviso', nome: 'Aviso' },
    { id: 'galeria', nome: 'Galeria' }
  ];
  
  // Carrega destaques quando o componente é montado
  useEffect(() => {
    carregarDestaquesPublicados();
  }, []);
  
  // Função para carregar destaques publicados
  const carregarDestaquesPublicados = async () => {
    try {
      setCarregandoDestaques(true);
      setErroDestaques('');
      console.log('🔥 Carregando destaques publicados...');
      
      const resultado = await readDestaques();
      console.log('📊 Resultado dos destaques:', resultado);
      
      if (resultado.success) {
        const dados = resultado.data || [];
        console.log('✅ Destaques carregados:', dados);
        setDestaquesPublicados(dados);
      } else {
        setErroDestaques('Erro ao carregar destaques: ' + resultado.message);
        console.error('❌ Erro ao carregar destaques:', resultado.error);
      }
    } catch (error) {
      setErroDestaques('Erro ao carregar destaques: ' + error.message);
      console.error('💥 Erro inesperado:', error);
    } finally {
      setCarregandoDestaques(false);
    }
  };
  
  // Função para excluir um destaque
  const handleExcluirDestaque = async (id, titulo) => {
    if (!window.confirm(`Tem certeza que deseja excluir o destaque "${titulo}"?`)) {
      return;
    }
    
    try {
      console.log('🗑️ Excluindo destaque:', id);
      const resultado = await deleteDestaque(id);
      
      if (resultado.success) {
        console.log('✅ Destaque excluído com sucesso');
        setMensagem({
          tipo: 'sucesso',
          texto: 'Destaque excluído com sucesso!'
        });
        
        // Recarrega a lista
        carregarDestaquesPublicados();
      } else {
        console.error('❌ Erro ao excluir destaque:', resultado.error);
        setMensagem({
          tipo: 'erro',
          texto: `Erro ao excluir destaque: ${resultado.message}`
        });
      }
    } catch (error) {
      console.error('💥 Erro inesperado ao excluir:', error);
      setMensagem({
        tipo: 'erro',
        texto: `Erro ao excluir destaque: ${error.message}`
      });
    }
    
    // Limpar mensagem após 5 segundos
    setTimeout(() => {
      setMensagem({ tipo: '', texto: '' });
    }, 5000);
  };
  
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
    if (!titulo || !resumo) {
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
      
      // Criar o objeto do destaque
      const destaqueData = {
        titulo,
        descricao: resumo,
        link: conteudoRelacionado || null,
        imagem: imagemBase64
      };
      
      // Enviar para o Firebase Realtime Database
      const resultado = await createDestaque(destaqueData);
      
      if (resultado.success) {
        // Sucesso - limpa o formulário
        setTitulo('');
        setTipo('noticia');
        setData('');
        setResumo('');
        setConteudoRelacionado('');
        setPrioridade('secundario');
        setImagem(null);
        setPreviewImagem('');
        
        setMensagem({
          tipo: 'sucesso',
          texto: 'Destaque publicado com sucesso!'
        });
        
        // Recarrega a lista de destaques
        carregarDestaquesPublicados();
      } else {
        // Erro no envio
        setMensagem({
          tipo: 'erro',
          texto: `Erro ao publicar destaque: ${resultado.error}`
        });
      }
    } catch (error) {
      console.error('Erro ao enviar destaque:', error);
      setMensagem({
        tipo: 'erro',
        texto: `Erro ao publicar destaque: ${error.message}`
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
            <PageTitle><FaStar /> Editor de Destaques</PageTitle>
            <PageDescription>
              Crie e gerencie conteúdos em destaque para o jornal digital UniCEDUP.
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
              <Label htmlFor="titulo">Título do Destaque *</Label>
              <Input
                type="text"
                id="titulo"
                name="titulo"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Digite o título do destaque"
                required
              />
            </FormGroup>
            
            <FormRow>
              <FormGroup>
                <Label htmlFor="tipo">Tipo de Conteúdo</Label>
                <Select
                  id="tipo"
                  name="tipo"
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                >
                  {tiposConteudo.map((tipo) => (
                    <option key={tipo.id} value={tipo.id}>{tipo.nome}</option>
                  ))}
                </Select>
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="data">Data</Label>
                <Input
                  type="date"
                  id="data"
                  name="data"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="prioridade">Prioridade</Label>
                <Select
                  id="prioridade"
                  name="prioridade"
                  value={prioridade}
                  onChange={(e) => setPrioridade(e.target.value)}
                >
                  <option value="principal">Destaque Principal</option>
                  <option value="secundario">Destaque Secundário</option>
                </Select>
              </FormGroup>
            </FormRow>
            
            <FormGroup>
              <Label htmlFor="resumo">Resumo *</Label>
              <TextArea
                id="resumo"
                name="resumo"
                value={resumo}
                onChange={(e) => setResumo(e.target.value)}
                placeholder="Digite um resumo para o destaque"
                rows={3}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="conteudoRelacionado">ID do Conteúdo Relacionado</Label>
              <Input
                type="text"
                id="conteudoRelacionado"
                name="conteudoRelacionado"
                value={conteudoRelacionado}
                onChange={(e) => setConteudoRelacionado(e.target.value)}
                placeholder="ID da notícia, evento ou aviso relacionado (opcional)"
              />
              <HelperText>
                Se este destaque se refere a um conteúdo existente, informe o ID para criar um link direto.
              </HelperText>
            </FormGroup>
            
            <FormGroup>
              <Label>Imagem do Destaque *</Label>
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
                {enviando ? 'Publicando...' : <><FaSave /> Publicar Destaque</>}
              </BotaoSubmit>
            </BotoesContainer>
          </FormContainer>
          
          <ListaDestaquesContainer>
            <ListaDestaquesHeader>
              <h2>Destaques Publicados</h2>
              <BotaoNovoDestaque onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <FaPlus /> Novo Destaque
              </BotaoNovoDestaque>
            </ListaDestaquesHeader>
            
            {carregandoDestaques ? (
              <LoadingDestaques>
                <FaSpinner style={{ animation: 'spin 2s linear infinite', fontSize: '1.5rem', color: '#1a4b8c' }} />
                <p>Carregando destaques...</p>
              </LoadingDestaques>
            ) : erroDestaques ? (
              <ErroDestaques>
                <p>❌ {erroDestaques}</p>
                <button onClick={carregarDestaquesPublicados}>Tentar novamente</button>
              </ErroDestaques>
            ) : destaquesPublicados.length > 0 ? (
              <ListaDestaques>
                {destaquesPublicados.map(destaque => (
                  <DestaqueItem key={destaque.id}>
                    {destaque.imagem && (
                      <DestaqueItemImagem 
                        src={destaque.imagem} 
                        alt={destaque.titulo}
                        onError={(e) => {e.target.style.display = 'none'}}
                      />
                    )}
                    <DestaqueItemConteudo>
                      <DestaqueItemTitulo>{destaque.titulo}</DestaqueItemTitulo>
                      <DestaqueItemDescricao>{destaque.descricao}</DestaqueItemDescricao>
                      <DestaqueItemData>
                        Criado em: {destaque.createdAt ? new Date(destaque.createdAt).toLocaleDateString('pt-BR') : 'Data não disponível'}
                      </DestaqueItemData>
                      {destaque.link && (
                        <DestaqueItemLink>
                          Link: <a href={destaque.link} target="_blank" rel="noopener noreferrer">{destaque.link}</a>
                        </DestaqueItemLink>
                      )}
                    </DestaqueItemConteudo>
                    <DestaqueItemAcoes>
                      <BotaoAcao onClick={() => handleExcluirDestaque(destaque.id, destaque.titulo)} color="danger">
                        <FaTrash />
                      </BotaoAcao>
                    </DestaqueItemAcoes>
                  </DestaqueItem>
                ))}
              </ListaDestaques>
            ) : (
              <MensagemVazia>
                Nenhum destaque publicado ainda.
                <br />
                <small>Use o formulário acima para criar seu primeiro destaque.</small>
              </MensagemVazia>
            )}
          </ListaDestaquesContainer>
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

const HelperText = styled.p`
  font-size: 0.8rem;
  color: #666;
  margin-top: 0.5rem;
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

const ListaDestaquesContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ListaDestaquesHeader = styled.div`
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

const BotaoNovoDestaque = styled.button`
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
  
  small {
    color: #666;
    font-size: 0.9rem;
  }
`;

const LoadingDestaques = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  gap: 1rem;
  
  p {
    color: #1a4b8c;
    font-size: 1rem;
    margin: 0;
  }
`;

const ErroDestaques = styled.div`
  text-align: center;
  padding: 2rem;
  background-color: #fee;
  border-radius: 8px;
  color: #d32f2f;
  
  p {
    margin-bottom: 1rem;
    font-size: 1rem;
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

const ListaDestaques = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const DestaqueItem = styled.div`
  display: flex;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 1rem;
  align-items: center;
  gap: 1rem;
  border: 1px solid #e0e0e0;
  transition: box-shadow 0.2s ease;
  
  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

const DestaqueItemImagem = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
  flex-shrink: 0;
`;

const DestaqueItemConteudo = styled.div`
  flex: 1;
  min-width: 0;
`;

const DestaqueItemTitulo = styled.h3`
  font-size: 1.1rem;
  color: #1a4b8c;
  margin: 0 0 0.5rem 0;
  font-weight: 600;
`;

const DestaqueItemDescricao = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin: 0 0 0.5rem 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const DestaqueItemData = styled.p`
  font-size: 0.8rem;
  color: #999;
  margin: 0 0 0.25rem 0;
`;

const DestaqueItemLink = styled.p`
  font-size: 0.8rem;
  color: #999;
  margin: 0;
  
  a {
    color: #1a4b8c;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const DestaqueItemAcoes = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
`;

const BotaoAcao = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s ease;
  
  ${props => props.color === 'danger' && `
    background-color: #f44336;
    color: white;
    
    &:hover {
      background-color: #d32f2f;
    }
  `}
  
  ${props => props.color === 'primary' && `
    background-color: #1a4b8c;
    color: white;
    
    &:hover {
      background-color: #2c5ea0;
    }
  `}
`;

export default EditorDestaques;
