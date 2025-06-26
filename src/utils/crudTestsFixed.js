/**
 * Arquivo de testes para validar funcionalidades CRUD
 * 
 * Este script contém funções para testar as operações CRUD (Create, Read, Update, Delete)
 * no Firebase Realtime Database com suporte a imagens em base64.
 */

// Importações necessárias
import { database } from '../services/firebase';
import {
  createDocument,
  readDocument,
  readCollection,
  updateDocument,
  deleteDocument,
  convertImageToBase64,
  resizeAndCompressImage,
  createNoticia,
  readNoticias,
  updateNoticia,
  deleteNoticia,
  createEvento,
  readEventos,
  updateEvento,
  deleteEvento,
  createAviso,
  readAvisos,
  updateAviso,
  deleteAviso,
  createGaleriaItem,
  readGaleria,
  updateGaleriaItem,
  deleteGaleriaItem,
  createDestaque,
  readDestaques,
  updateDestaque,
  deleteDestaque
} from '../services/realtimeDatabase';

/**
 * Testa a criação de um documento no Realtime Database
 * @param {string} collectionName - Nome da coleção
 * @param {object} data - Dados a serem salvos
 * @returns {Promise<object>} Resultado do teste
 */
export const testCreate = async (collectionName, data) => {
  try {
    console.log(`Testando criação em ${collectionName}:`, data);
    const result = await createDocument(collectionName, data);
    
    if (result.success) {
      console.log(`Documento criado com ID: ${result.id}`);
      return {
        success: true,
        docId: result.id,
        message: `Documento criado com sucesso em ${collectionName}`
      };
    } else {
      console.error(`Erro ao criar documento em ${collectionName}:`, result.error);
      return {
        success: false,
        error: result.error,
        message: result.message
      };
    }
  } catch (error) {
    console.error(`Erro ao criar documento em ${collectionName}:`, error);
    return {
      success: false,
      error: error.message,
      message: `Erro ao criar documento em ${collectionName}`
    };
  }
};

/**
 * Testa a leitura de um documento no Realtime Database
 * @param {string} collectionName - Nome da coleção
 * @param {string} docId - ID do documento
 * @returns {Promise<object>} Resultado do teste
 */
export const testRead = async (collectionName, docId) => {
  try {
    console.log(`Testando leitura em ${collectionName}, ID: ${docId}`);
    const result = await readDocument(collectionName, docId);
    
    if (result.success) {
      console.log(`Documento encontrado:`, result.data);
      return {
        success: true,
        data: result.data,
        message: `Documento lido com sucesso de ${collectionName}`
      };
    } else {
      console.log(`Documento não encontrado em ${collectionName}`);
      return {
        success: false,
        message: result.message
      };
    }
  } catch (error) {
    console.error(`Erro ao ler documento de ${collectionName}:`, error);
    return {
      success: false,
      error: error.message,
      message: `Erro ao ler documento de ${collectionName}`
    };
  }
};

/**
 * Testa a atualização de um documento no Realtime Database
 * @param {string} collectionName - Nome da coleção
 * @param {string} docId - ID do documento
 * @param {object} data - Novos dados
 * @returns {Promise<object>} Resultado do teste
 */
export const testUpdate = async (collectionName, docId, data) => {
  try {
    console.log(`Testando atualização em ${collectionName}, ID: ${docId}`, data);
    const result = await updateDocument(collectionName, docId, data);
    
    if (result.success) {
      console.log(`Documento atualizado com sucesso`);
      return {
        success: true,
        message: result.message
      };
    } else {
      console.error(`Erro ao atualizar documento em ${collectionName}:`, result.error);
      return {
        success: false,
        error: result.error,
        message: result.message
      };
    }
  } catch (error) {
    console.error(`Erro ao atualizar documento em ${collectionName}:`, error);
    return {
      success: false,
      error: error.message,
      message: `Erro ao atualizar documento em ${collectionName}`
    };
  }
};

/**
 * Testa a exclusão de um documento no Realtime Database
 * @param {string} collectionName - Nome da coleção
 * @param {string} docId - ID do documento
 * @returns {Promise<object>} Resultado do teste
 */
export const testDelete = async (collectionName, docId) => {
  try {
    console.log(`Testando exclusão em ${collectionName}, ID: ${docId}`);
    const result = await deleteDocument(collectionName, docId);
    
    if (result.success) {
      console.log(`Documento excluído com sucesso`);
      return {
        success: true,
        message: result.message
      };
    } else {
      console.error(`Erro ao excluir documento de ${collectionName}:`, result.error);
      return {
        success: false,
        error: result.error,
        message: result.message
      };
    }
  } catch (error) {
    console.error(`Erro ao excluir documento de ${collectionName}:`, error);
    return {
      success: false,
      error: error.message,
      message: `Erro ao excluir documento de ${collectionName}`
    };
  }
};

/**
 * Testa o processamento de uma imagem para base64
 * @param {File} file - Arquivo de imagem
 * @param {boolean} compress - Se deve comprimir a imagem
 * @returns {Promise<object>} Resultado do teste
 */
export const testImageProcessing = async (file, compress = true) => {
  try {
    console.log(`Testando processamento de imagem:`, file.name);
    
    let result;
    if (compress) {
      result = await resizeAndCompressImage(file, 800, 600, 0.8);
    } else {
      result = await convertImageToBase64(file);
    }
    
    console.log(`Imagem processada com sucesso, tamanho: ${result.length} caracteres`);
    return {
      success: true,
      base64: result,
      size: result.length,
      message: 'Imagem processada com sucesso'
    };
  } catch (error) {
    console.error('Erro ao processar imagem:', error);
    return {
      success: false,
      error: error.message,
      message: 'Erro ao processar imagem'
    };
  }
};

/**
 * Executa todos os testes CRUD para uma coleção
 * @param {string} collectionName - Nome da coleção
 * @param {object} sampleData - Dados de exemplo para teste
 * @param {object} updateData - Dados para atualização
 * @returns {Promise<object>} Resultados dos testes
 */
export const runCRUDTests = async (collectionName, sampleData, updateData) => {
  const results = {
    create: null,
    read: null,
    update: null,
    delete: null
  };
  
  // Teste de criação
  results.create = await testCreate(collectionName, sampleData);
  
  if (results.create.success) {
    const docId = results.create.docId;
    
    // Teste de leitura
    results.read = await testRead(collectionName, docId);
    
    // Teste de atualização
    results.update = await testUpdate(collectionName, docId, updateData);
    
    // Teste de leitura após atualização
    const readAfterUpdate = await testRead(collectionName, docId);
    
    // Teste de exclusão
    results.delete = await testDelete(collectionName, docId);
  }
  
  console.log(`Resultados dos testes CRUD para ${collectionName}:`, results);
  return results;
};

/**
 * Executa testes CRUD em todas as coleções principais
 * @returns {Promise<object>} Resultados de todos os testes
 */
export const runAllCRUDTests = async () => {
  const allResults = {};
    // Testes para coleção de notícias
  allResults.noticias = await runCRUDTests(
    'noticias',
    {
      titulo: 'Nova Biblioteca Digital disponível para estudantes',
      categoria: 'Acadêmico',
      resumo: 'A universidade lança nova plataforma digital com acesso a milhares de livros e artigos científicos.',
      conteudo: 'A Universidade anuncia o lançamento de sua nova biblioteca digital, oferecendo aos estudantes acesso gratuito a mais de 50.000 títulos de livros acadêmicos, artigos científicos e periódicos especializados. A plataforma estará disponível 24 horas por dia e pode ser acessada de qualquer dispositivo.',
      autor: 'Coordenação Acadêmica',
      imagem: null
    },
    {
      titulo: 'Nova Biblioteca Digital - Acesso Ampliado',
      resumo: 'Plataforma digital agora inclui acesso a conteúdo internacional e novos recursos de pesquisa.'
    }
  );
    // Testes para coleção de eventos
  allResults.eventos = await runCRUDTests(
    'eventos',
    {
      titulo: 'Semana de Tecnologia e Inovação 2025',
      tipo: 'academico',
      data: '2025-07-15',
      horario: '08:00 - 18:00',
      local: 'Auditório Principal - Campus Central',
      descricao: 'Evento anual que reúne estudantes, professores e profissionais da área de tecnologia para palestras, workshops e apresentações de projetos inovadores. Inclui demonstrações de IA, robótica e desenvolvimento sustentável.',
      imagem: null
    },
    {
      titulo: 'Semana de Tecnologia e Inovação 2025 - Programação Atualizada',
      local: 'Auditório Principal e Laboratórios - Campus Central'
    }
  );
    // Testes para coleção de avisos
  allResults.avisos = await runCRUDTests(
    'avisos',
    {
      titulo: 'Alteração no calendário acadêmico - Provas finais',
      tipo: 'importante',
      conteudo: 'Informamos que as datas das provas finais foram alteradas devido ao feriado nacional. As novas datas serão divulgadas pelos coordenadores de cada curso. Consulte o portal do aluno para mais informações.',
      autor: 'Secretaria Acadêmica'
    },
    {
      titulo: 'URGENTE: Alteração no calendário acadêmico - Provas finais',
      tipo: 'urgente'
    }
  );
    // Testes para coleção de destaques
  allResults.destaques = await runCRUDTests(
    'destaques',
    {
      titulo: 'Estudante da universidade conquista prêmio internacional',
      descricao: 'João Silva, aluno do curso de Engenharia, recebeu reconhecimento mundial por sua pesquisa em energias renováveis apresentada no Congresso Internacional de Sustentabilidade.',
      link: 'https://portal.universidade.edu.br/noticias/premio-internacional-2025',
      imagem: null
    },
    {
      titulo: 'DESTAQUE: Estudante da universidade conquista prêmio internacional',
      descricao: 'João Silva, aluno de Engenharia, ganha reconhecimento mundial por pesquisa em energias renováveis. Projeto será implementado em parceria com empresas do setor.'
    }
  );
    // Testes para coleção de galeria
  allResults.galeria = await runCRUDTests(
    'galeria',
    {
      titulo: 'Formatura Engenharia Civil 2024',
      descricao: 'Cerimônia de colação de grau da turma 2024 do curso de Engenharia Civil, realizada no Teatro Municipal com a presença de familiares e autoridades acadêmicas.',
      categoria: 'formatura',
      imagem: null
    },
    {
      titulo: 'Formatura Engenharia Civil 2024 - Galeria Completa',
      descricao: 'Registro completo da cerimônia de colação de grau com fotos oficiais e momentos especiais da celebração acadêmica.'
    }
  );
  
  console.log('Resultados de todos os testes CRUD:', allResults);
  return allResults;
};

/**
 * Testa especificamente a funcionalidade de notícias
 * @returns {Promise<object>} Resultado do teste
 */
export const testNoticiasSpecific = async () => {
  try {
    console.log('Iniciando teste específico de notícias...');
    
    // Criar uma notícia
    const noticiaData = {
      titulo: 'Inauguração do novo laboratório de pesquisa',
      categoria: 'Geral',
      resumo: 'Universidade inaugura laboratório de última geração para pesquisas em biotecnologia.',
      conteudo: 'O novo laboratório conta com equipamentos modernos e será usado para pesquisas avançadas em biotecnologia, beneficiando estudantes de graduação e pós-graduação.',
      autor: 'Assessoria de Comunicação'
    };
    
    const createResult = await createNoticia(noticiaData);
    if (!createResult.success) {
      throw new Error(`Erro ao criar notícia: ${createResult.error}`);
    }
    
    console.log('Notícia criada com sucesso:', createResult.id);
    
    // Ler todas as notícias
    const readResult = await readNoticias();
    if (!readResult.success) {
      throw new Error(`Erro ao ler notícias: ${readResult.error}`);
    }
    
    console.log(`Total de notícias encontradas: ${readResult.data.length}`);
    
    // Atualizar a notícia
    const updateData = {
      titulo: 'INAUGURADO: Novo laboratório de pesquisa em biotecnologia'
    };
    
    const updateResult = await updateNoticia(createResult.id, updateData);
    if (!updateResult.success) {
      throw new Error(`Erro ao atualizar notícia: ${updateResult.error}`);
    }
    
    console.log('Notícia atualizada com sucesso');
    
    // Deletar a notícia
    const deleteResult = await deleteNoticia(createResult.id);
    if (!deleteResult.success) {
      throw new Error(`Erro ao deletar notícia: ${deleteResult.error}`);
    }
    
    console.log('Notícia deletada com sucesso');
    
    return {
      success: true,
      message: 'Teste de notícias concluído com sucesso',
      operations: {
        create: createResult.success,
        read: readResult.success,
        update: updateResult.success,
        delete: deleteResult.success
      }
    };
    
  } catch (error) {
    console.error('Erro no teste de notícias:', error);
    return {
      success: false,
      error: error.message,
      message: 'Falha no teste de notícias'
    };
  }
};

/**
 * Testa a conectividade com o Firebase Realtime Database
 * @returns {Promise<object>} Resultado do teste de conectividade
 */
export const testDatabaseConnection = async () => {
  try {
    console.log('Testando conectividade com Firebase Realtime Database...');
    
    // Tentar ler uma coleção simples
    const result = await readCollection('noticias', 1);
    
    if (result.success) {
      console.log('Conexão com Firebase estabelecida com sucesso');
      return {
        success: true,
        message: 'Conectado ao Firebase Realtime Database',
        dataCount: result.data.length
      };
    } else {
      console.log('Problemas de conectividade:', result.error);
      return {
        success: false,
        error: result.error,
        message: 'Falha na conexão com Firebase'
      };
    }
  } catch (error) {
    console.error('Erro de conectividade:', error);
    return {
      success: false,
      error: error.message,
      message: 'Erro ao testar conectividade'
    };
  }
};

/**
 * Executa testes rápidos para validar se o sistema está funcionando
 * @returns {Promise<object>} Resultado dos testes rápidos
 */
export const runQuickValidation = async () => {
  console.log('🚀 Iniciando validação rápida do sistema...');
  
  const results = {
    connection: null,
    noticias: null,
    eventos: null,
    overall: false
  };
  
  // Teste de conectividade
  results.connection = await testDatabaseConnection();
  
  if (results.connection.success) {
    // Teste básico de notícias
    results.noticias = await testNoticiasSpecific();
    
    // Teste básico de eventos
    try {
      const eventoData = {
        titulo: 'Workshop de Validação',
        tipo: 'academico',
        data: '2025-07-01',
        horario: '10:00 - 12:00',
        local: 'Sala Virtual',
        descricao: 'Workshop para validar funcionalidades do sistema'
      };
      
      const createEvento = await createEvento(eventoData);
      if (createEvento.success) {
        await deleteEvento(createEvento.id);
        results.eventos = { success: true, message: 'Eventos funcionando corretamente' };
      } else {
        results.eventos = { success: false, error: createEvento.error };
      }
    } catch (error) {
      results.eventos = { success: false, error: error.message };
    }
  }
  
  // Determinar status geral
  results.overall = results.connection.success && 
                   results.noticias.success && 
                   results.eventos.success;
  
  console.log('📊 Resultados da validação:', results);
  
  if (results.overall) {
    console.log('✅ Sistema funcionando corretamente!');
  } else {
    console.log('❌ Sistema apresenta problemas que precisam ser corrigidos.');
  }
  
  return results;
};
