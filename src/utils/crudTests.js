// /**
//  * Arquivo de testes para validar funcionalidades CRUD
//  * 
//  * Este script contém funções para testar as operações CRUD (Create, Read, Update, Delete)
//  * no Firebase Realtime Database com suporte a imagens em base64.
//  */

// // Importações necessárias
// import { database } from '../services/firebase';
// import {
//   createDocument,
//   readDocument,
//   readCollection,
//   updateDocument,
//   deleteDocument,
//   convertImageToBase64,
//   resizeAndCompressImage,
//   createNoticia,
//   readNoticias,
//   updateNoticia,
//   deleteNoticia,
//   createEvento,
//   readEventos,
//   updateEvento,
//   deleteEvento,
//   createAviso,
//   readAvisos,
//   updateAviso,
//   deleteAviso,
//   createGaleriaItem,
//   readGaleria,
//   updateGaleriaItem,
//   deleteGaleriaItem,
//   createDestaque,
//   readDestaques,
//   updateDestaque,
//   deleteDestaque
// } from '../services/realtimeDatabase';

// /**
//  * Testa a criação de um documento no Realtime Database
//  * @param {string} collectionName - Nome da coleção
//  * @param {object} data - Dados a serem salvos
//  * @returns {Promise<object>} Resultado do teste
//  */
// export const testCreate = async (collectionName, data) => {
//   try {
//     console.log(`Testando criação em ${collectionName}:`, data);
//     const result = await createDocument(collectionName, data);
    
//     if (result.success) {
//       console.log(`Documento criado com ID: ${result.id}`);
//       return {
//         success: true,
//         docId: result.id,
//         message: `Documento criado com sucesso em ${collectionName}`
//       };
//     } else {
//       console.error(`Erro ao criar documento em ${collectionName}:`, result.error);
//       return {
//         success: false,
//         error: result.error,
//         message: result.message
//       };
//     }
//   } catch (error) {
//     console.error(`Erro ao criar documento em ${collectionName}:`, error);
//     return {
//       success: false,
//       error: error.message,
//       message: `Erro ao criar documento em ${collectionName}`
//     };
//   }
// };

// /**
//  * Testa a leitura de um documento no Realtime Database
//  * @param {string} collectionName - Nome da coleção
//  * @param {string} docId - ID do documento
//  * @returns {Promise<object>} Resultado do teste
//  */
// export const testRead = async (collectionName, docId) => {
//   try {
//     console.log(`Testando leitura em ${collectionName}, ID: ${docId}`);
//     const result = await readDocument(collectionName, docId);
    
//     if (result.success) {
//       console.log(`Documento encontrado:`, result.data);
//       return {
//         success: true,
//         data: result.data,
//         message: `Documento lido com sucesso de ${collectionName}`
//       };
//     } else {
//       console.log(`Documento não encontrado em ${collectionName}`);
//       return {
//         success: false,
//         message: result.message
//       };
//     }
//   } catch (error) {
//     console.error(`Erro ao ler documento de ${collectionName}:`, error);
//     return {
//       success: false,
//       error: error.message,
//       message: `Erro ao ler documento de ${collectionName}`
//     };
//   }
// };

// /**
//  * Testa a atualização de um documento no Realtime Database
//  * @param {string} collectionName - Nome da coleção
//  * @param {string} docId - ID do documento
//  * @param {object} data - Novos dados
//  * @returns {Promise<object>} Resultado do teste
//  */
// export const testUpdate = async (collectionName, docId, data) => {
//   try {
//     console.log(`Testando atualização em ${collectionName}, ID: ${docId}`, data);
//     const result = await updateDocument(collectionName, docId, data);
    
//     if (result.success) {
//       console.log(`Documento atualizado com sucesso`);
//       return {
//         success: true,
//         message: result.message
//       };
//     } else {
//       console.error(`Erro ao atualizar documento em ${collectionName}:`, result.error);
//       return {
//         success: false,
//         error: result.error,
//         message: result.message
//       };
//     }
//   } catch (error) {
//     console.error(`Erro ao atualizar documento em ${collectionName}:`, error);
//     return {
//       success: false,
//       error: error.message,
//       message: `Erro ao atualizar documento em ${collectionName}`
//     };
//   }
// };

// /**
//  * Testa a exclusão de um documento no Realtime Database
//  * @param {string} collectionName - Nome da coleção
//  * @param {string} docId - ID do documento
//  * @returns {Promise<object>} Resultado do teste
//  */
// export const testDelete = async (collectionName, docId) => {
//   try {
//     console.log(`Testando exclusão em ${collectionName}, ID: ${docId}`);
//     const result = await deleteDocument(collectionName, docId);
    
//     if (result.success) {
//       console.log(`Documento excluído com sucesso`);
//       return {
//         success: true,
//         message: result.message
//       };
//     } else {
//       console.error(`Erro ao excluir documento de ${collectionName}:`, result.error);
//       return {
//         success: false,
//         error: result.error,
//         message: result.message
//       };
//     }
//   } catch (error) {
//     console.error(`Erro ao excluir documento de ${collectionName}:`, error);
//     return {
//       success: false,
//       error: error.message,
//       message: `Erro ao excluir documento de ${collectionName}`
//     };
//   }
// };

// /**
//  * Testa o processamento de uma imagem para base64
//  * @param {File} file - Arquivo de imagem
//  * @param {boolean} compress - Se deve comprimir a imagem
//  * @returns {Promise<object>} Resultado do teste
//  */
// export const testImageProcessing = async (file, compress = true) => {
//   try {
//     console.log(`Testando processamento de imagem:`, file.name);
    
//     let result;
//     if (compress) {
//       result = await resizeAndCompressImage(file, 800, 600, 0.8);
//     } else {
//       result = await convertImageToBase64(file);
//     }
    
//     console.log(`Imagem processada com sucesso, tamanho: ${result.length} caracteres`);
//     return {
//       success: true,
//       base64: result,
//       size: result.length,
//       message: 'Imagem processada com sucesso'
//     };
//   } catch (error) {
//     console.error('Erro ao processar imagem:', error);
//     return {
//       success: false,
//       error: error.message,
//       message: 'Erro ao processar imagem'
//     };
//   }
// };

// /**
//  * Executa todos os testes CRUD para uma coleção
//  * @param {string} collectionName - Nome da coleção
//  * @param {object} sampleData - Dados de exemplo para teste
//  * @param {object} updateData - Dados para atualização
//  * @returns {Promise<object>} Resultados dos testes
//  */
// export const runCRUDTests = async (collectionName, sampleData, updateData) => {
//   const results = {
//     create: null,
//     read: null,
//     update: null,
//     delete: null
//   };
  
//   // Teste de criação
//   results.create = await testCreate(collectionName, sampleData);
  
//   if (results.create.success) {
//     const docId = results.create.docId;
    
//     // Teste de leitura
//     results.read = await testRead(collectionName, docId);
    
//     // Teste de atualização
//     results.update = await testUpdate(collectionName, docId, updateData);
    
//     // Teste de leitura após atualização
//     const readAfterUpdate = await testRead(collectionName, docId);
    
//     // Teste de exclusão
//     results.delete = await testDelete(collectionName, docId);
//   }
  
//   console.log(`Resultados dos testes CRUD para ${collectionName}:`, results);
//   return results;
// };

// /**
//  * Executa testes CRUD em todas as coleções principais
//  * @returns {Promise<object>} Resultados de todos os testes
//  */
// export const runAllCRUDTests = async () => {
//   const allResults = {};
  
//   // Testes para coleção de notícias
//   allResults.noticias = await runCRUDTests(
//     'noticias',
//     {
//       titulo: 'Notícia de Teste',
//       categoria: 'Teste',
//       resumo: 'Resumo da notícia de teste',
//       conteudo: 'Conteúdo completo da notícia de teste',
//       autor: 'Testador',
//       imagem: null
//     },
//     {
//       titulo: 'Notícia de Teste Atualizada',
//       resumo: 'Resumo atualizado'
//     }
//   );
  
//   // Testes para coleção de eventos
//   allResults.eventos = await runCRUDTests(
//     'eventos',
//     {
//       titulo: 'Evento de Teste',
//       tipo: 'academico',
//       data: '2025-06-15',
//       horario: '14:00 - 18:00',
//       local: 'Local de Teste',
//       descricao: 'Descrição do evento de teste',
//       imagem: null
//     },
//     {
//       titulo: 'Evento de Teste Atualizado',
//       local: 'Novo Local'
//     }
//   );
  
//   // Testes para coleção de avisos
//   allResults.avisos = await runCRUDTests(
//     'avisos',
//     {
//       titulo: 'Aviso de Teste',
//       tipo: 'informativo',
//       conteudo: 'Conteúdo do aviso de teste',
//       autor: 'Testador'
//     },
//     {
//       titulo: 'Aviso de Teste Atualizado',
//       tipo: 'importante'
//     }
//   );
  
//   // Testes para coleção de destaques
//   allResults.destaques = await runCRUDTests(
//     'destaques',
//     {
//       titulo: 'Destaque de Teste',
//       descricao: 'Descrição do destaque de teste',
//       link: 'https://example.com',
//       imagem: null
//     },
//     {
//       titulo: 'Destaque de Teste Atualizado',
//       descricao: 'Descrição atualizada'
//     }
//   );
  
//   // Testes para coleção de galeria
//   allResults.galeria = await runCRUDTests(
//     'galeria',
//     {
//       titulo: 'Foto de Teste',
//       descricao: 'Descrição da foto de teste',
//       categoria: 'teste',
//       imagem: null
//     },
//     {
//       titulo: 'Foto de Teste Atualizada',
//       descricao: 'Descrição atualizada'
//     }
//   );
  
//   console.log('Resultados de todos os testes CRUD:', allResults);
//   return allResults;
// };
// export const testRead = async (collectionName, docId) => {
//   try {
//     console.log(`Testando leitura em ${collectionName}, ID: ${docId}`);
//     const result = await readDocument(collectionName, docId);
    
//     if (result.success) {
//       console.log(`Documento encontrado:`, result.data);
//       return {
//         success: true,
//         data: result.data,
//         message: `Documento lido com sucesso de ${collectionName}`
//       };
//     } else {
//       console.log(`Documento não encontrado em ${collectionName}`);
//       return {
//         success: false,
//         message: result.message
//       };
//     }
//   } catch (error) {
//     console.error(`Erro ao ler documento de ${collectionName}:`, error);
//     return {
//       success: false,
//       error: error.message,
//       message: `Erro ao ler documento de ${collectionName}`
//     };
//   }
// };

// /**
//  * Testa a atualização de um documento no Realtime Database
//  * @param {string} collectionName - Nome da coleção
//  * @param {string} docId - ID do documento
//  * @param {object} data - Novos dados
//  * @returns {Promise<object>} Resultado do teste
//  */
// export const testUpdate = async (collectionName, docId, data) => {
//   try {
//     console.log(`Testando atualização em ${collectionName}, ID: ${docId}`, data);
//     const result = await updateDocument(collectionName, docId, data);
    
//     if (result.success) {
//       console.log(`Documento atualizado com sucesso`);
//       return {
//         success: true,
//         message: result.message
//       };
//     } else {
//       console.error(`Erro ao atualizar documento em ${collectionName}:`, result.error);
//       return {
//         success: false,
//         error: result.error,
//         message: result.message
//       };
//     }
//   } catch (error) {
//     console.error(`Erro ao atualizar documento em ${collectionName}:`, error);
//     return {    };
//   }
// };

// /**
//  * Testa a exclusão de um documento no Realtime Database
//  * @param {string} collectionName - Nome da coleção
//  * @param {string} docId - ID do documento
//  * @returns {Promise<object>} Resultado do teste
//  */
// export const testDelete = async (collectionName, docId) => {
//   try {
//     console.log(`Testando exclusão em ${collectionName}, ID: ${docId}`);
//     const result = await deleteDocument(collectionName, docId);
    
//     if (result.success) {
//       console.log(`Documento excluído com sucesso`);
//       return {
//         success: true,
//         message: result.message
//       };
//     } else {
//       console.error(`Erro ao excluir documento de ${collectionName}:`, result.error);
//       return {
//         success: false,
//         error: result.error,
//         message: result.message
//       };
//     }
//   } catch (error) {
//     console.error(`Erro ao excluir documento de ${collectionName}:`, error);
//     return {
//       success: false,
//       error: error.message,
//       message: `Erro ao excluir documento de ${collectionName}`
//     };
//   }
// };
//     return {
//       success: true,
//       message: `Documento excluído com sucesso de ${collectionName}`
//     };
//   }
// };

// /**
//  * Testa o upload de uma imagem para o Firebase Storage
//  * @param {File} file - Arquivo de imagem
//  * @param {string} path - Caminho no Storage
//  * @returns {Promise<object>} Resultado do teste
//  */
// export const testImageUpload = async (file, path) => {
//   try {
//     console.log(`Testando upload de imagem para ${path}`);
//     const storageRef = ref(storage, path);
    
//     const snapshot = await uploadBytes(storageRef, file);
//     const downloadURL = await getDownloadURL(snapshot.ref);
    
//     console.log(`Imagem enviada com sucesso, URL:`, downloadURL);
//     return {
//       success: true,
//       url: downloadURL,
//       message: 'Imagem enviada com sucesso'
//     };
//   } catch (error) {
//     console.error('Erro ao enviar imagem:', error);
//     return {
//       success: false,
//       error: error.message,
//       message: 'Erro ao enviar imagem'
//     };
//   }
// };

// /**
//  * Executa todos os testes CRUD para uma coleção
//  * @param {string} collectionName - Nome da coleção
//  * @param {object} sampleData - Dados de exemplo para teste
//  * @param {object} updateData - Dados para atualização
//  * @returns {Promise<object>} Resultados dos testes
//  */
// export const runCRUDTests = async (collectionName, sampleData, updateData) => {
//   const results = {
//     create: null,
//     read: null,
//     update: null,
//     delete: null
//   };
  
//   // Teste de criação
//   results.create = await testCreate(collectionName, sampleData);
  
//   if (results.create.success) {
//     const docId = results.create.docId;
    
//     // Teste de leitura
//     results.read = await testRead(collectionName, docId);
    
//     // Teste de atualização
//     results.update = await testUpdate(collectionName, docId, updateData);
    
//     // Teste de leitura após atualização
//     const readAfterUpdate = await testRead(collectionName, docId);
    
//     // Teste de exclusão
//     results.delete = await testDelete(collectionName, docId);
//   }
  
//   console.log(`Resultados dos testes CRUD para ${collectionName}:`, results);
//   return results;
// };

// /**
//  * Executa testes CRUD em todas as coleções principais
//  * @returns {Promise<object>} Resultados de todos os testes
//  */
// export const runAllCRUDTests = async () => {
//   const allResults = {};
  
//   // Testes para coleção de notícias
//   allResults.noticias = await runCRUDTests(
//     'noticias',
//     {
//       titulo: 'Notícia de Teste',
//       categoria: 'Teste',
//       resumo: 'Resumo da notícia de teste',
//       conteudo: 'Conteúdo completo da notícia de teste',
//       autor: 'Testador'
//     },
//     {
//       titulo: 'Notícia de Teste Atualizada',
//       resumo: 'Resumo atualizado'
//     }
//   );
  
//   // Testes para coleção de eventos
//   allResults.eventos = await runCRUDTests(
//     'eventos',
//     {
//       titulo: 'Evento de Teste',
//       tipo: 'academico',
//       data: '2025-06-15',
//       horario: '14:00 - 18:00',
//       local: 'Local de Teste',
//       descricao: 'Descrição do evento de teste'
//     },
//     {
//       titulo: 'Evento de Teste Atualizado',
//       local: 'Novo Local'
//     }
//   );
  
//   // Testes para coleção de avisos
//   allResults.avisos = await runCRUDTests(
//     'avisos',
//     {
//       titulo: 'Aviso de Teste',
//       tipo: 'informativo',
//       conteudo: 'Conteúdo do aviso de teste',
//       autor: 'Testador'
//     },
//     {
//       titulo: 'Aviso de Teste Atualizado',
//       tipo: 'importante'
//     }
//   );
  
//   console.log('Resultados de todos os testes CRUD:', allResults);
//   return allResults;
// };
