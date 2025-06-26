/**
 * Exemplos de uso do sistema Realtime Database com imagens Base64
 * 
 * Este arquivo demonstra como usar todas as funcionalidades do novo sistema.
 */

import React, { useState, useEffect } from 'react';
import {
  // Funções genéricas
  createDocument,
  readDocument,
  readCollection,
  updateDocument,
  deleteDocument,
  listenToCollection,
  
  // Funções específicas
  createNoticia,
  readNoticias,
  updateNoticia,
  deleteNoticia,
  
  // Funções de imagem
  convertImageToBase64,
  resizeAndCompressImage
} from '../services/realtimeDatabase';

import ImageUploader, { useImageUploader } from '../components/ui/ImageUploader';

// Exemplo 1: Criar uma notícia com imagem
const ExemploCreateNoticia = () => {
  const { image, uploadImage, loading, error } = useImageUploader();
  const [formData, setFormData] = useState({
    titulo: '',
    categoria: 'Geral',
    resumo: '',
    conteudo: '',
    autor: 'exemplo@email.com'
  });

  const handleImageSelect = async (file) => {
    try {
      const base64 = await uploadImage(file, {
        compress: true,
        maxWidth: 800,
        maxHeight: 600,
        quality: 0.8
      });
      console.log('Imagem carregada:', base64.substring(0, 50) + '...');
    } catch (err) {
      console.error('Erro ao carregar imagem:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const result = await createNoticia({
        ...formData,
        imagem: image
      });
      
      if (result.success) {
        console.log('Notícia criada:', result);
        alert('Notícia criada com sucesso!');
        
        // Resetar formulário
        setFormData({
          titulo: '',
          categoria: 'Geral',
          resumo: '',
          conteudo: '',
          autor: 'exemplo@email.com'
        });
      } else {
        console.error('Erro ao criar notícia:', result);
        alert('Erro: ' + result.message);
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Exemplo: Criar Notícia</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título"
          value={formData.titulo}
          onChange={(e) => setFormData({...formData, titulo: e.target.value})}
          required
        />
        
        <select
          value={formData.categoria}
          onChange={(e) => setFormData({...formData, categoria: e.target.value})}
        >
          <option value="Geral">Geral</option>
          <option value="Acadêmico">Acadêmico</option>
          <option value="Esportes">Esportes</option>
          <option value="Cultura">Cultura</option>
          <option value="Tecnologia">Tecnologia</option>
        </select>
        
        <textarea
          placeholder="Resumo"
          value={formData.resumo}
          onChange={(e) => setFormData({...formData, resumo: e.target.value})}
          required
        />
        
        <textarea
          placeholder="Conteúdo"
          value={formData.conteudo}
          onChange={(e) => setFormData({...formData, conteudo: e.target.value})}
          required
        />
        
        <div>
          <label>Imagem:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files[0] && handleImageSelect(e.target.files[0])}
          />
          {loading && <p>Processando imagem...</p>}
          {error && <p style={{color: 'red'}}>Erro: {error}</p>}
          {image && <img src={image} alt="Preview" style={{maxWidth: '200px'}} />}
        </div>
        
        <button type="submit">Criar Notícia</button>
      </form>
    </div>
  );
};

// Exemplo 2: Listar notícias em tempo real
const ExemploListaNoticias = () => {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Carregar notícias iniciais
    const carregarNoticias = async () => {
      try {
        const result = await readNoticias({ limit: 10 });
        if (result.success) {
          setNoticias(result.data);
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    carregarNoticias();

    // Configurar listener para tempo real
    const unsubscribe = listenToCollection('noticias', (result) => {
      if (result.success) {
        setNoticias(result.data);
        setLoading(false);
      } else {
        setError(result.error);
      }
    }, { limit: 10 });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta notícia?')) {
      try {
        const result = await deleteNoticia(id);
        if (result.success) {
          alert('Notícia excluída com sucesso!');
        } else {
          alert('Erro ao excluir: ' + result.message);
        }
      } catch (error) {
        alert('Erro: ' + error.message);
      }
    }
  };

  if (loading) return <div>Carregando notícias...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div>
      <h2>Exemplo: Lista de Notícias (Tempo Real)</h2>
      {noticias.length === 0 ? (
        <p>Nenhuma notícia encontrada</p>
      ) : (
        noticias.map(noticia => (
          <div key={noticia.id} style={{border: '1px solid #ccc', padding: '1rem', margin: '1rem 0'}}>
            <h3>{noticia.titulo}</h3>
            <p><strong>Categoria:</strong> {noticia.categoria}</p>
            <p><strong>Autor:</strong> {noticia.autor}</p>
            <p><strong>Data:</strong> {new Date(noticia.createdAt).toLocaleDateString('pt-BR')}</p>
            <p>{noticia.resumo}</p>
            {noticia.imagem && (
              <img 
                src={noticia.imagem} 
                alt={noticia.titulo} 
                style={{maxWidth: '200px', height: 'auto'}} 
              />
            )}
            <div style={{marginTop: '1rem'}}>
              <button onClick={() => handleDelete(noticia.id)} style={{color: 'red'}}>
                Excluir
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

// Exemplo 3: Usar ImageUploader component
const ExemploImageUploader = () => {
  const [imagem, setImagem] = useState(null);

  const handleImageChange = (base64Image) => {
    setImagem(base64Image);
    console.log('Nova imagem recebida:', base64Image ? base64Image.substring(0, 50) + '...' : null);
  };

  return (
    <div>
      <h2>Exemplo: ImageUploader Component</h2>
      <ImageUploader
        onImageChange={handleImageChange}
        initialImage={imagem}
        maxSize={2 * 1024 * 1024} // 2MB
        compress={true}
        maxWidth={800}
        maxHeight={600}
        quality={0.8}
        showPreview={true}
        showOptions={true}
      />
      
      {imagem && (
        <div style={{marginTop: '1rem'}}>
          <h3>Imagem Selecionada:</h3>
          <p>Tamanho: {(imagem.length / 1024).toFixed(1)} KB</p>
          <p>Formato: {imagem.split(';')[0].split(':')[1]}</p>
        </div>
      )}
    </div>
  );
};

// Exemplo 4: Operações CRUD genéricas
const ExemploOperacoesCRUD = () => {
  const [resultado, setResultado] = useState(null);

  const exemploCreateDocument = async () => {
    try {
      const result = await createDocument('exemplos', {
        titulo: 'Documento de Exemplo',
        tipo: 'teste',
        dados: {
          valor1: 'Teste',
          valor2: 123,
          valor3: true
        }
      });
      
      setResultado(result);
      console.log('Documento criado:', result);
    } catch (error) {
      console.error('Erro:', error);
      setResultado({ success: false, error: error.message });
    }
  };

  const exemploReadCollection = async () => {
    try {
      const result = await readCollection('exemplos', {
        orderBy: 'createdAt',
        limit: 5
      });
      
      setResultado(result);
      console.log('Coleção lida:', result);
    } catch (error) {
      console.error('Erro:', error);
      setResultado({ success: false, error: error.message });
    }
  };

  return (
    <div>
      <h2>Exemplo: Operações CRUD Genéricas</h2>
      <div>
        <button onClick={exemploCreateDocument}>Criar Documento</button>
        <button onClick={exemploReadCollection}>Ler Coleção</button>
      </div>
      
      {resultado && (
        <div style={{marginTop: '1rem', padding: '1rem', backgroundColor: '#f5f5f5'}}>
          <h3>Resultado:</h3>
          <pre>{JSON.stringify(resultado, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

// Exemplo 5: Processamento de imagens
const ExemploProcessamentoImagens = () => {
  const [resultados, setResultados] = useState([]);

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const novosResultados = [];

    try {
      // Conversão simples
      console.log('Convertendo imagem para base64...');
      const base64Simples = await convertImageToBase64(file);
      novosResultados.push({
        tipo: 'Base64 Simples',
        tamanho: (base64Simples.length / 1024).toFixed(1) + ' KB',
        resultado: base64Simples.substring(0, 100) + '...'
      });

      // Conversão com compressão
      console.log('Convertendo imagem com compressão...');
      const base64Comprimido = await resizeAndCompressImage(file, 400, 300, 0.7);
      novosResultados.push({
        tipo: 'Base64 Comprimido (400x300, 70%)',
        tamanho: (base64Comprimido.length / 1024).toFixed(1) + ' KB',
        resultado: base64Comprimido.substring(0, 100) + '...'
      });

      // Conversão com alta compressão
      console.log('Convertendo imagem com alta compressão...');
      const base64AltaCompressao = await resizeAndCompressImage(file, 200, 150, 0.5);
      novosResultados.push({
        tipo: 'Base64 Alta Compressão (200x150, 50%)',
        tamanho: (base64AltaCompressao.length / 1024).toFixed(1) + ' KB',
        resultado: base64AltaCompressao.substring(0, 100) + '...'
      });

      setResultados(novosResultados);
    } catch (error) {
      console.error('Erro ao processar imagem:', error);
      setResultados([{
        tipo: 'Erro',
        tamanho: '0 KB',
        resultado: error.message
      }]);
    }
  };

  return (
    <div>
      <h2>Exemplo: Processamento de Imagens</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
      />
      
      {resultados.length > 0 && (
        <div style={{marginTop: '1rem'}}>
          <h3>Resultados do Processamento:</h3>
          {resultados.map((resultado, index) => (
            <div key={index} style={{
              border: '1px solid #ccc',
              padding: '1rem',
              margin: '0.5rem 0',
              backgroundColor: '#f9f9f9'
            }}>
              <h4>{resultado.tipo}</h4>
              <p><strong>Tamanho:</strong> {resultado.tamanho}</p>
              <p><strong>Resultado:</strong> {resultado.resultado}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Componente principal que inclui todos os exemplos
const ExemplosCompletos = () => {
  const [exemploAtivo, setExemploAtivo] = useState('criar');

  const exemplos = {
    'criar': { componente: ExemploCreateNoticia, titulo: 'Criar Notícia' },
    'listar': { componente: ExemploListaNoticias, titulo: 'Listar Notícias' },
    'uploader': { componente: ExemploImageUploader, titulo: 'Image Uploader' },
    'crud': { componente: ExemploOperacoesCRUD, titulo: 'CRUD Genérico' },
    'imagens': { componente: ExemploProcessamentoImagens, titulo: 'Processamento de Imagens' }
  };

  const ExemploComponente = exemplos[exemploAtivo].componente;

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Exemplos de Uso - Realtime Database com Base64</h1>
      
      <div style={{ marginBottom: '2rem' }}>
        {Object.entries(exemplos).map(([key, { titulo }]) => (
          <button
            key={key}
            onClick={() => setExemploAtivo(key)}
            style={{
              padding: '0.5rem 1rem',
              margin: '0.25rem',
              backgroundColor: exemploAtivo === key ? '#007bff' : '#f8f9fa',
              color: exemploAtivo === key ? 'white' : 'black',
              border: '1px solid #ddd',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {titulo}
          </button>
        ))}
      </div>
      
      <div style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '2rem',
        backgroundColor: 'white'
      }}>
        <ExemploComponente />
      </div>
      
      <div style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#666' }}>
        <p><strong>Nota:</strong> Estes exemplos demonstram como usar o novo sistema Realtime Database com imagens em base64.</p>
        <p>Certifique-se de que o Firebase está configurado corretamente antes de testar.</p>
      </div>
    </div>
  );
};

export default ExemplosCompletos;

// Função utilitária para testar todas as funcionalidades
export const testarTodasFuncionalidades = async () => {
  console.log('=== Iniciando testes de todas as funcionalidades ===');
  
  const resultados = {
    imagens: {},
    crud: {},
    listeners: {}
  };
  
  try {
    // Teste de imagens (simulado)
    console.log('Testando processamento de imagens...');
    
    // Teste CRUD
    console.log('Testando operações CRUD...');
    
    // Criar documento de teste
    const createResult = await createDocument('testes', {
      nome: 'Teste Funcionalidade',
      timestamp: Date.now(),
      tipo: 'automatico'
    });
    
    resultados.crud.create = createResult;
    
    if (createResult.success) {
      // Ler documento
      const readResult = await readDocument('testes', createResult.id);
      resultados.crud.read = readResult;
      
      // Atualizar documento
      const updateResult = await updateDocument('testes', createResult.id, {
        nome: 'Teste Funcionalidade Atualizado',
        atualizado: true
      });
      resultados.crud.update = updateResult;
      
      // Excluir documento
      const deleteResult = await deleteDocument('testes', createResult.id);
      resultados.crud.delete = deleteResult;
    }
    
    // Ler coleção
    const collectionResult = await readCollection('testes', { limit: 5 });
    resultados.crud.collection = collectionResult;
    
  } catch (error) {
    console.error('Erro nos testes:', error);
    resultados.error = error.message;
  }
  
  console.log('=== Resultados dos testes ===');
  console.log(JSON.stringify(resultados, null, 2));
  
  return resultados;
};
