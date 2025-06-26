/**
 * Funções para testar a integração do Firebase
 */

import { readNoticias, createNoticia, readGaleria, createGaleriaItem } from '../services/realtimeDatabase';

// Função para testar se as notícias têm imagens
export const testNoticiasImagens = async () => {
  try {
    console.log('🔍 Testando notícias com imagens...');
    
    const resultado = await readNoticias();
    
    if (resultado.success) {
      const noticias = resultado.data;
      console.log(`📄 Total de notícias: ${noticias.length}`);
      
      const noticiasComImagem = noticias.filter(n => n.imagem);
      console.log(`🖼️ Notícias com imagem: ${noticiasComImagem.length}`);
      
      noticias.forEach(noticia => {
        console.log(`- ${noticia.titulo}: ${noticia.imagem ? '✅ Tem imagem' : '❌ Sem imagem'}`);
        if (noticia.imagem) {
          console.log(`  Tipo da imagem: ${typeof noticia.imagem}`);
          console.log(`  Tamanho da string base64: ${noticia.imagem.length} chars`);
          console.log(`  Começa com data:image: ${noticia.imagem.startsWith('data:image')}`);
        }
      });
      
      return { success: true, noticias, noticiasComImagem };
    } else {
      console.error('❌ Erro ao carregar notícias:', resultado.error);
      return { success: false, error: resultado.error };
    }
  } catch (error) {
    console.error('❌ Erro no teste:', error);
    return { success: false, error: error.message };
  }
};

// Função para criar uma notícia de teste com imagem
export const criarNoticiaComImagemTeste = async () => {
  try {
    console.log('🧪 Criando notícia de teste com imagem...');
    
    // Criar uma imagem simples em base64 (quadrado azul 100x100)
    const canvas = document.createElement('canvas');
    canvas.width = 100;
    canvas.height = 100;
    const ctx = canvas.getContext('2d');
    
    // Preencher com cor azul
    ctx.fillStyle = '#1a4b8c';
    ctx.fillRect(0, 0, 100, 100);
    
    // Adicionar texto
    ctx.fillStyle = 'white';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('TESTE', 50, 55);
    
    const imagemTeste = canvas.toDataURL('image/png');
    
    console.log('🖼️ Imagem de teste criada:', {
      tamanho: imagemTeste.length,
      tipo: imagemTeste.substring(0, 30)
    });
    
    const noticiaData = {
      titulo: 'Teste - Notícia com Imagem Real',
      categoria: 'Teste',
      resumo: 'Esta é uma notícia de teste para verificar se as imagens estão funcionando corretamente.',
      conteudo: 'Conteúdo completo da notícia de teste. Esta notícia foi criada automaticamente para verificar se as imagens em base64 estão sendo salvas e carregadas corretamente no Firebase Realtime Database. A imagem anexa é um quadrado azul gerado dinamicamente.',
      imagem: imagemTeste,
      autor: 'Sistema de Teste Automatizado',
      status: 'publicada',
      tags: 'teste'
    };
    
    const resultado = await createNoticia(noticiaData);
    
    if (resultado.success) {
      console.log('✅ Notícia de teste criada com sucesso!');
      console.log('📋 ID da notícia:', resultado.id);
      console.log('🔍 Verifique no Firebase se o campo "imagem" existe');
      return { success: true, id: resultado.id };
    } else {
      console.error('❌ Erro ao criar notícia de teste:', resultado.error);
      return { success: false, error: resultado.error };
    }
  } catch (error) {
    console.error('❌ Erro no teste:', error);
    return { success: false, error: error.message };
  }
};

// Função para testar galeria
export const testGaleriaImagens = async () => {
  try {
    console.log('🔍 Testando galeria...');
    
    const resultado = await readGaleria();
    
    if (resultado.success) {
      const itens = resultado.data;
      console.log(`🖼️ Total de itens na galeria: ${itens.length}`);
      
      itens.forEach(item => {
        console.log(`- ${item.titulo}: ${item.imagem ? '✅ Tem imagem' : '❌ Sem imagem'}`);
        if (item.imagem) {
          console.log(`  Tipo da imagem: ${typeof item.imagem}`);
          console.log(`  Tamanho da string base64: ${item.imagem.length} chars`);
        }
      });
      
      return { success: true, itens };
    } else {
      console.error('❌ Erro ao carregar galeria:', resultado.error);
      return { success: false, error: resultado.error };
    }
  } catch (error) {
    console.error('❌ Erro no teste:', error);
    return { success: false, error: error.message };
  }
};

// Função para executar todos os testes
export const executarTodosTestes = async () => {
  console.log('🚀 Iniciando testes do Firebase...');
  
  await testNoticiasImagens();
  console.log('---');
  await testGaleriaImagens();
  console.log('---');
  
  console.log('✅ Testes concluídos!');
};

// Expor funções globalmente para uso no console
if (typeof window !== 'undefined') {
  window.testFirebase = {
    testNoticiasImagens,
    criarNoticiaComImagemTeste,
    testGaleriaImagens,
    executarTodosTestes
  };
}
