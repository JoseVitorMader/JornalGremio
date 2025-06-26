/**
 * Serviços para Realtime Database do Firebase com suporte a imagens em base64
 * 
 * Este arquivo contém funções para operações CRUD no Firebase Realtime Database
 * e utilitários para conversão e manipulação de imagens em base64.
 */

import { database } from './firebase';
import { 
  ref, 
  push, 
  set, 
  get, 
  update, 
  remove, 
  child, 
  query, 
  orderByChild, 
  equalTo,
  limitToLast,
  onValue,
  off
} from 'firebase/database';

/**
 * Converte arquivo de imagem para base64
 * @param {File} file - Arquivo de imagem
 * @returns {Promise<string>} String base64 da imagem
 */
export const convertImageToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('Nenhum arquivo fornecido'));
      return;
    }

    if (!file.type.startsWith('image/')) {
      reject(new Error('Arquivo deve ser uma imagem'));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = () => {
      reject(new Error('Erro ao ler arquivo'));
    };
    reader.readAsDataURL(file);
  });
};

/**
 * Redimensiona imagem mantendo proporção
 * @param {File} file - Arquivo de imagem
 * @param {number} maxWidth - Largura máxima
 * @param {number} maxHeight - Altura máxima
 * @param {number} quality - Qualidade da compressão (0-1)
 * @returns {Promise<string>} String base64 da imagem redimensionada
 */
export const resizeAndCompressImage = (file, maxWidth = 800, maxHeight = 600, quality = 0.8) => {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Arquivo deve ser uma imagem'));
      return;
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      // Calcular novas dimensões mantendo proporção
      let { width, height } = img;
      
      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;

      // Desenhar imagem redimensionada
      ctx.drawImage(img, 0, 0, width, height);

      // Converter para base64 com compressão
      const base64 = canvas.toDataURL('image/jpeg', quality);
      resolve(base64);
    };

    img.onerror = () => {
      reject(new Error('Erro ao carregar imagem'));
    };

    // Criar URL da imagem
    img.src = URL.createObjectURL(file);
  });
};

/**
 * Cria um novo documento no Realtime Database
 * @param {string} path - Caminho no database (ex: 'noticias')
 * @param {object} data - Dados a serem salvos
 * @returns {Promise<object>} Resultado da operação
 */
export const createDocument = async (path, data) => {
  try {
    console.log('🔥 Firebase - Criando documento em:', path);
    console.log('📝 Firebase - Dados recebidos:', {
      ...data,
      imagem: data.imagem ? `Imagem presente (${data.imagem.length} chars)` : 'Sem imagem'
    });
    
    const dbRef = ref(database, path);
    const newDocRef = push(dbRef);
    
    const documentData = {
      ...data,
      id: newDocRef.key,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    console.log('💾 Firebase - Salvando documento com ID:', newDocRef.key);
    await set(newDocRef, documentData);
    
    console.log('✅ Firebase - Documento salvo com sucesso!');
    
    return {
      success: true,
      id: newDocRef.key,
      data: documentData,
      message: 'Documento criado com sucesso'
    };
  } catch (error) {
    console.error('❌ Firebase - Erro ao criar documento:', error);
    return {
      success: false,
      error: error.message,
      message: 'Erro ao criar documento'
    };
  }
};

/**
 * Lê um documento específico do Realtime Database
 * @param {string} path - Caminho no database
 * @param {string} id - ID do documento
 * @returns {Promise<object>} Resultado da operação
 */
export const readDocument = async (path, id) => {
  try {
    const dbRef = ref(database, `${path}/${id}`);
    const snapshot = await get(dbRef);
    
    if (snapshot.exists()) {
      return {
        success: true,
        data: snapshot.val(),
        message: 'Documento encontrado'
      };
    } else {
      return {
        success: false,
        message: 'Documento não encontrado'
      };
    }
  } catch (error) {
    console.error('Erro ao ler documento:', error);
    return {
      success: false,
      error: error.message,
      message: 'Erro ao ler documento'
    };
  }
};

/**
 * Lê todos os documentos de uma coleção
 * @param {string} path - Caminho no database
 * @param {object} options - Opções de consulta
 * @returns {Promise<object>} Resultado da operação
 */
export const readCollection = async (path, options = {}) => {
  try {
    let dbRef = ref(database, path);
    
    // Aplicar filtros se fornecidos
    if (options.orderBy) {
      dbRef = query(dbRef, orderByChild(options.orderBy));
    }
    
    if (options.equalTo && options.orderBy) {
      dbRef = query(dbRef, orderByChild(options.orderBy), equalTo(options.equalTo));
    }
    
    if (options.limit) {
      dbRef = query(dbRef, limitToLast(options.limit));
    }

    const snapshot = await get(dbRef);
    
    if (snapshot.exists()) {
      const data = snapshot.val();
      const documents = Object.entries(data).map(([key, value]) => ({
        id: key,
        ...value
      }));
      
      // Ordenar por data de criação (mais recente primeiro) se não houver ordenação específica
      if (!options.orderBy) {
        documents.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      }
      
      return {
        success: true,
        data: documents,
        count: documents.length,
        message: 'Documentos encontrados'
      };
    } else {
      return {
        success: true,
        data: [],
        count: 0,
        message: 'Nenhum documento encontrado'
      };
    }
  } catch (error) {
    console.error('Erro ao ler coleção:', error);
    return {
      success: false,
      error: error.message,
      message: 'Erro ao ler coleção'
    };
  }
};

/**
 * Atualiza um documento no Realtime Database
 * @param {string} path - Caminho no database
 * @param {string} id - ID do documento
 * @param {object} data - Dados a serem atualizados
 * @returns {Promise<object>} Resultado da operação
 */
export const updateDocument = async (path, id, data) => {
  try {
    const dbRef = ref(database, `${path}/${id}`);
    
    const updateData = {
      ...data,
      updatedAt: Date.now()
    };

    await update(dbRef, updateData);
    
    return {
      success: true,
      message: 'Documento atualizado com sucesso'
    };
  } catch (error) {
    console.error('Erro ao atualizar documento:', error);
    return {
      success: false,
      error: error.message,
      message: 'Erro ao atualizar documento'
    };
  }
};

/**
 * Exclui um documento do Realtime Database
 * @param {string} path - Caminho no database
 * @param {string} id - ID do documento
 * @returns {Promise<object>} Resultado da operação
 */
export const deleteDocument = async (path, id) => {
  try {
    const dbRef = ref(database, `${path}/${id}`);
    await remove(dbRef);
    
    return {
      success: true,
      message: 'Documento excluído com sucesso'
    };
  } catch (error) {
    console.error('Erro ao excluir documento:', error);
    return {
      success: false,
      error: error.message,
      message: 'Erro ao excluir documento'
    };
  }
};

/**
 * Escuta mudanças em tempo real em uma coleção
 * @param {string} path - Caminho no database
 * @param {function} callback - Função chamada quando há mudanças
 * @param {object} options - Opções de consulta
 * @returns {function} Função para parar de escutar
 */
export const listenToCollection = (path, callback, options = {}) => {
  let dbRef = ref(database, path);
  
  // Aplicar filtros se fornecidos
  if (options.orderBy) {
    dbRef = query(dbRef, orderByChild(options.orderBy));
  }
  
  if (options.limit) {
    dbRef = query(dbRef, limitToLast(options.limit));
  }

  const unsubscribe = onValue(dbRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      const documents = Object.entries(data).map(([key, value]) => ({
        id: key,
        ...value
      }));
      
      // Ordenar por data de criação (mais recente primeiro) se não houver ordenação específica
      if (!options.orderBy) {
        documents.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      }
      
      callback({
        success: true,
        data: documents,
        count: documents.length
      });
    } else {
      callback({
        success: true,
        data: [],
        count: 0
      });
    }
  }, (error) => {
    console.error('Erro ao escutar mudanças:', error);
    callback({
      success: false,
      error: error.message
    });
  });

  // Retorna função para parar de escutar
  return () => off(dbRef, 'value', unsubscribe);
};

/**
 * Escuta mudanças em tempo real em um documento específico
 * @param {string} path - Caminho no database
 * @param {string} id - ID do documento
 * @param {function} callback - Função chamada quando há mudanças
 * @returns {function} Função para parar de escutar
 */
export const listenToDocument = (path, id, callback) => {
  const dbRef = ref(database, `${path}/${id}`);

  const unsubscribe = onValue(dbRef, (snapshot) => {
    if (snapshot.exists()) {
      callback({
        success: true,
        data: snapshot.val()
      });
    } else {
      callback({
        success: false,
        message: 'Documento não encontrado'
      });
    }
  }, (error) => {
    console.error('Erro ao escutar mudanças do documento:', error);
    callback({
      success: false,
      error: error.message
    });
  });

  // Retorna função para parar de escutar
  return () => off(dbRef, 'value', unsubscribe);
};

// Funções específicas para cada tipo de conteúdo

/**
 * Cria uma nova notícia
 * @param {object} noticia - Dados da notícia
 * @returns {Promise<object>} Resultado da operação
 */
export const createNoticia = async (noticia) => {
  return await createDocument('noticias', noticia);
};

/**
 * Lê todas as notícias
 * @param {object} options - Opções de consulta
 * @returns {Promise<object>} Resultado da operação
 */
export const readNoticias = async (options = {}) => {
  return await readCollection('noticias', options);
};

/**
 * Atualiza uma notícia
 * @param {string} id - ID da notícia
 * @param {object} data - Dados a serem atualizados
 * @returns {Promise<object>} Resultado da operação
 */
export const updateNoticia = async (id, data) => {
  return await updateDocument('noticias', id, data);
};

/**
 * Exclui uma notícia
 * @param {string} id - ID da notícia
 * @returns {Promise<object>} Resultado da operação
 */
export const deleteNoticia = async (id) => {
  return await deleteDocument('noticias', id);
};

/**
 * Cria um novo evento
 * @param {object} evento - Dados do evento
 * @returns {Promise<object>} Resultado da operação
 */
export const createEvento = async (evento) => {
  return await createDocument('eventos', evento);
};

/**
 * Lê todos os eventos
 * @param {object} options - Opções de consulta
 * @returns {Promise<object>} Resultado da operação
 */
export const readEventos = async (options = {}) => {
  return await readCollection('eventos', options);
};

/**
 * Atualiza um evento
 * @param {string} id - ID do evento
 * @param {object} data - Dados a serem atualizados
 * @returns {Promise<object>} Resultado da operação
 */
export const updateEvento = async (id, data) => {
  return await updateDocument('eventos', id, data);
};

/**
 * Exclui um evento
 * @param {string} id - ID do evento
 * @returns {Promise<object>} Resultado da operação
 */
export const deleteEvento = async (id) => {
  return await deleteDocument('eventos', id);
};

/**
 * Cria um novo aviso
 * @param {object} aviso - Dados do aviso
 * @returns {Promise<object>} Resultado da operação
 */
export const createAviso = async (aviso) => {
  return await createDocument('avisos', aviso);
};

/**
 * Lê todos os avisos
 * @param {object} options - Opções de consulta
 * @returns {Promise<object>} Resultado da operação
 */
export const readAvisos = async (options = {}) => {
  return await readCollection('avisos', options);
};

/**
 * Atualiza um aviso
 * @param {string} id - ID do aviso
 * @param {object} data - Dados a serem atualizados
 * @returns {Promise<object>} Resultado da operação
 */
export const updateAviso = async (id, data) => {
  return await updateDocument('avisos', id, data);
};

/**
 * Exclui um aviso
 * @param {string} id - ID do aviso
 * @returns {Promise<object>} Resultado da operação
 */
export const deleteAviso = async (id) => {
  return await deleteDocument('avisos', id);
};

/**
 * Cria um novo item da galeria
 * @param {object} item - Dados do item da galeria
 * @returns {Promise<object>} Resultado da operação
 */
export const createGaleriaItem = async (item) => {
  return await createDocument('galeria', item);
};

/**
 * Lê todos os itens da galeria
 * @param {object} options - Opções de consulta
 * @returns {Promise<object>} Resultado da operação
 */
export const readGaleria = async (options = {}) => {
  return await readCollection('galeria', options);
};

/**
 * Atualiza um item da galeria
 * @param {string} id - ID do item
 * @param {object} data - Dados a serem atualizados
 * @returns {Promise<object>} Resultado da operação
 */
export const updateGaleriaItem = async (id, data) => {
  return await updateDocument('galeria', id, data);
};

/**
 * Exclui um item da galeria
 * @param {string} id - ID do item
 * @returns {Promise<object>} Resultado da operação
 */
export const deleteGaleriaItem = async (id) => {
  return await deleteDocument('galeria', id);
};

/**
 * Cria um novo destaque
 * @param {object} destaque - Dados do destaque
 * @returns {Promise<object>} Resultado da operação
 */
export const createDestaque = async (destaque) => {
  return await createDocument('destaques', destaque);
};

/**
 * Lê todos os destaques
 * @param {object} options - Opções de consulta
 * @returns {Promise<object>} Resultado da operação
 */
export const readDestaques = async (options = {}) => {
  return await readCollection('destaques', options);
};

/**
 * Atualiza um destaque
 * @param {string} id - ID do destaque
 * @param {object} data - Dados a serem atualizados
 * @returns {Promise<object>} Resultado da operação
 */
export const updateDestaque = async (id, data) => {
  return await updateDocument('destaques', id, data);
};

/**
 * Exclui um destaque
 * @param {string} id - ID do destaque
 * @returns {Promise<object>} Resultado da operação
 */
export const deleteDestaque = async (id) => {
  return await deleteDocument('destaques', id);
};
