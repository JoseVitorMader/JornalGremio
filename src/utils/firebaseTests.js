/**
 * Teste de Conexão e Permissões do Firebase Realtime Database
 * 
 * Use este arquivo para testar se a conexão com o Firebase está funcionando
 * e se as regras de permissão estão configuradas corretamente.
 */

import { database } from '../services/firebase';
import { ref, push, set, get, remove } from 'firebase/database';

/**
 * Teste básico de conexão com o Firebase
 */
export const testeConexaoFirebase = async () => {
  console.log('🔥 Testando conexão com Firebase...');
  
  try {
    // Teste simples de leitura
    const testRef = ref(database, '.info/connected');
    const snapshot = await get(testRef);
    
    if (snapshot.exists()) {
      console.log('✅ Conexão com Firebase: OK');
      console.log('Status da conexão:', snapshot.val());
      return { success: true, connected: snapshot.val() };
    } else {
      console.log('❌ Não foi possível verificar a conexão');
      return { success: false, error: 'Não foi possível verificar a conexão' };
    }
  } catch (error) {
    console.error('❌ Erro na conexão com Firebase:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Teste de permissões de escrita
 */
export const testePermissaoEscrita = async () => {
  console.log('🔐 Testando permissões de escrita...');
  
  try {
    // Criar uma referência para teste
    const testRef = ref(database, 'teste_permissoes');
    const newTestRef = push(testRef);
    
    // Dados de teste simples
    const dadosTeste = {
      timestamp: Date.now(),
      teste: 'Teste de permissão de escrita',
      sucesso: true
    };
    
    // Tentar escrever
    await set(newTestRef, dadosTeste);
    
    console.log('✅ Escrita permitida! ID do teste:', newTestRef.key);
    
    // Tentar ler o que foi escrito
    const snapshot = await get(newTestRef);
    if (snapshot.exists()) {
      console.log('✅ Leitura confirmada:', snapshot.val());
      
      // Limpar o teste
      await remove(newTestRef);
      console.log('🧹 Dados de teste removidos');
      
      return { 
        success: true, 
        message: 'Permissões de escrita e leitura OK',
        testId: newTestRef.key 
      };
    } else {
      return { 
        success: false, 
        error: 'Escrita realizada mas leitura falhou' 
      };
    }
    
  } catch (error) {
    console.error('❌ Erro de permissão:', error);
    
    if (error.code === 'PERMISSION_DENIED') {
      return {
        success: false,
        error: 'PERMISSION_DENIED',
        message: 'Regras do Firebase não permitem escrita. Veja FIREBASE_RULES_SETUP.md'
      };
    }
    
    return { success: false, error: error.message };
  }
};

/**
 * Teste de permissões de leitura
 */
export const testePermissaoLeitura = async () => {
  console.log('📖 Testando permissões de leitura...');
  
  try {
    // Tentar ler uma coleção que pode não existir
    const testRef = ref(database, 'noticias');
    const snapshot = await get(testRef);
    
    console.log('✅ Leitura permitida!');
    console.log('Dados encontrados:', snapshot.exists() ? 'Sim' : 'Não');
    
    if (snapshot.exists()) {
      const dados = snapshot.val();
      const totalItens = Object.keys(dados).length;
      console.log(`📊 Total de notícias encontradas: ${totalItens}`);
    }
    
    return { 
      success: true, 
      hasData: snapshot.exists(),
      message: 'Permissão de leitura OK' 
    };
    
  } catch (error) {
    console.error('❌ Erro de leitura:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Teste completo do Firebase
 */
export const testeCompletoFirebase = async () => {
  console.log('🚀 Iniciando teste completo do Firebase...');
  
  const resultados = {
    conexao: null,
    leitura: null,
    escrita: null,
    timestamp: Date.now()
  };
  
  try {
    // Teste 1: Conexão
    resultados.conexao = await testeConexaoFirebase();
    
    // Teste 2: Leitura
    resultados.leitura = await testePermissaoLeitura();
    
    // Teste 3: Escrita
    resultados.escrita = await testePermissaoEscrita();
    
    // Resumo
    const todosOk = resultados.conexao.success && 
                   resultados.leitura.success && 
                   resultados.escrita.success;
    
    if (todosOk) {
      console.log('🎉 Todos os testes passaram! Firebase está configurado corretamente.');
    } else {
      console.log('⚠️ Alguns testes falharam. Verifique as configurações.');
    }
    
    console.log('📋 Resumo dos testes:', resultados);
    
    return {
      success: todosOk,
      resultados,
      message: todosOk ? 'Todos os testes OK' : 'Alguns testes falharam'
    };
    
  } catch (error) {
    console.error('💥 Erro geral nos testes:', error);
    return { 
      success: false, 
      error: error.message,
      resultados 
    };
  }
};

/**
 * Diagnóstico de problemas comuns
 */
export const diagnosticoProblemas = () => {
  console.log('🔍 Executando diagnóstico...');
  
  const problemas = [];
  const solucoes = [];
  
  // Verificar configuração do Firebase
  try {
    if (!database) {
      problemas.push('❌ Database não inicializado');
      solucoes.push('Verificar configuração em firebase.js');
    } else {
      console.log('✅ Database inicializado');
    }
    
    // Verificar URL do database
    const config = database.app.options;
    if (!config.databaseURL) {
      problemas.push('❌ databaseURL não configurada');
      solucoes.push('Adicionar databaseURL no firebaseConfig');
    } else {
      console.log('✅ databaseURL configurada:', config.databaseURL);
    }
    
    // Verificar outras configurações
    if (!config.apiKey) {
      problemas.push('❌ apiKey não configurada');
    }
    if (!config.projectId) {
      problemas.push('❌ projectId não configurado');
    }
    
  } catch (error) {
    problemas.push('❌ Erro ao verificar configuração: ' + error.message);
  }
  
  const resultado = {
    problemas,
    solucoes,
    status: problemas.length === 0 ? 'OK' : 'PROBLEMAS_ENCONTRADOS'
  };
  
  console.log('📋 Diagnóstico:', resultado);
  return resultado;
};

// Função para executar todos os testes de uma vez
export const executarTodosTestes = async () => {
  console.log('🔥 Executando bateria completa de testes Firebase...');
  
  // Diagnóstico inicial
  const diagnostico = diagnosticoProblemas();
  
  if (diagnostico.problemas.length > 0) {
    console.log('⚠️ Problemas encontrados na configuração:');
    diagnostico.problemas.forEach(p => console.log(p));
    console.log('💡 Soluções sugeridas:');
    diagnostico.solucoes.forEach(s => console.log('- ' + s));
  }
  
  // Testes funcionais
  const testesResultado = await testeCompletoFirebase();
  
  return {
    diagnostico,
    testes: testesResultado,
    recomendacoes: testesResultado.success ? [
      '✅ Firebase configurado corretamente',
      '✅ Pode prosseguir com o desenvolvimento'
    ] : [
      '❌ Configurar regras do Firebase (veja FIREBASE_RULES_SETUP.md)',
      '❌ Verificar autenticação se necessário',
      '❌ Confirmar configurações do projeto'
    ]
  };
};

// Para usar no console do navegador:
// window.testeFirebase = { testeCompletoFirebase, executarTodosTestes };
