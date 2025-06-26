/**
 * Exemplos de uso das funções de teste CRUD
 * 
 * Este arquivo contém exemplos práticos de como usar as funções de teste
 * para validar o funcionamento do sistema com Firebase Realtime Database.
 */

import {
  runQuickValidation,
  testNoticiasSpecific,
  testDatabaseConnection,
  runAllCRUDTests,
  testImageProcessing
} from './crudTestsFixed';

// Exemplo 1: Validação rápida do sistema
export const exemploValidacaoRapida = async () => {
  console.log('=== EXEMPLO: Validação Rápida ===');
  
  const resultado = await runQuickValidation();
  
  if (resultado.overall) {
    console.log('✅ Sistema validado com sucesso!');
    console.log('Você pode prosseguir com o desenvolvimento.');
  } else {
    console.log('❌ Sistema apresenta problemas:');
    if (!resultado.connection.success) {
      console.log('- Problema de conexão com Firebase');
    }
    if (!resultado.noticias.success) {
      console.log('- Problema nas operações de notícias');
    }
    if (!resultado.eventos.success) {
      console.log('- Problema nas operações de eventos');
    }
  }
  
  return resultado;
};

// Exemplo 2: Teste específico de notícias
export const exemploTesteNoticias = async () => {
  console.log('=== EXEMPLO: Teste de Notícias ===');
  
  const resultado = await testNoticiasSpecific();
  
  if (resultado.success) {
    console.log('✅ Todas as operações de notícias funcionaram:');
    console.log(`- Criar: ${resultado.operations.create ? '✅' : '❌'}`);
    console.log(`- Ler: ${resultado.operations.read ? '✅' : '❌'}`);
    console.log(`- Atualizar: ${resultado.operations.update ? '✅' : '❌'}`);
    console.log(`- Deletar: ${resultado.operations.delete ? '✅' : '❌'}`);
  } else {
    console.log('❌ Falha no teste de notícias:', resultado.error);
  }
  
  return resultado;
};

// Exemplo 3: Teste de conectividade
export const exemploTesteConectividade = async () => {
  console.log('=== EXEMPLO: Teste de Conectividade ===');
  
  const resultado = await testDatabaseConnection();
  
  if (resultado.success) {
    console.log('✅ Conexão com Firebase estabelecida');
    console.log(`📊 Documentos encontrados: ${resultado.dataCount}`);
  } else {
    console.log('❌ Falha na conexão:', resultado.error);
    console.log('💡 Dicas para resolver:');
    console.log('1. Verifique se as regras do Firebase estão configuradas');
    console.log('2. Confirme se a databaseURL está correta');
    console.log('3. Verifique se o projeto Firebase está ativo');
  }
  
  return resultado;
};

// Exemplo 4: Teste completo de todas as coleções
export const exemploTestesCompletos = async () => {
  console.log('=== EXEMPLO: Testes Completos ===');
  console.log('⚠️  ATENÇÃO: Este teste criará e deletará dados em todas as coleções');
  console.log('Use apenas em ambiente de desenvolvimento!');
  
  const resultado = await runAllCRUDTests();
  
  console.log('📊 Resumo dos testes:');
  Object.keys(resultado).forEach(colecao => {
    const testes = resultado[colecao];
    console.log(`\n📁 ${colecao.toUpperCase()}:`);
    console.log(`- Criar: ${testes.create?.success ? '✅' : '❌'}`);
    console.log(`- Ler: ${testes.read?.success ? '✅' : '❌'}`);
    console.log(`- Atualizar: ${testes.update?.success ? '✅' : '❌'}`);
    console.log(`- Deletar: ${testes.delete?.success ? '✅' : '❌'}`);
  });
  
  return resultado;
};

// Exemplo 5: Teste de processamento de imagem (mock)
export const exemploTesteImagem = async () => {
  console.log('=== EXEMPLO: Teste de Processamento de Imagem ===');
  console.log('ℹ️  Para testar com imagem real, use um input file no navegador');
  
  // Simular um arquivo de imagem para demonstração
  const mockImageFile = new File(['dados-mock-da-imagem'], 'test.jpg', { type: 'image/jpeg' });
  
  try {
    const resultado = await testImageProcessing(mockImageFile, true);
    
    if (resultado.success) {
      console.log('✅ Processamento de imagem funcionou');
      console.log(`📊 Tamanho base64: ${resultado.size} caracteres`);
    } else {
      console.log('❌ Falha no processamento:', resultado.error);
    }
    
    return resultado;
  } catch (error) {
    console.log('❌ Erro no teste de imagem:', error.message);
    console.log('💡 Use um arquivo real de imagem para teste completo');
    return { success: false, error: error.message };
  }
};

// Função principal para executar todos os exemplos
export const executarExemplos = async () => {
  console.log('🚀 INICIANDO EXEMPLOS DE TESTE DO SISTEMA');
  console.log('=====================================');
  
  try {
    // 1. Teste de conectividade primeiro
    await exemploTesteConectividade();
    console.log('\n' + '='.repeat(50) + '\n');
    
    // 2. Validação rápida
    await exemploValidacaoRapida();
    console.log('\n' + '='.repeat(50) + '\n');
    
    // 3. Teste específico de notícias
    await exemploTesteNoticias();
    console.log('\n' + '='.repeat(50) + '\n');
    
    // 4. Teste de imagem (mock)
    await exemploTesteImagem();
    console.log('\n' + '='.repeat(50) + '\n');
    
    console.log('✅ Todos os exemplos executados!');
    console.log('📝 Para executar testes completos, chame exemploTestesCompletos()');
    
  } catch (error) {
    console.error('❌ Erro durante execução dos exemplos:', error);
  }
};

// Instruções para uso no console do navegador
console.log(`
🎯 COMO USAR ESTAS FUNÇÕES:

1. No console do navegador, importe as funções:
   import * as testes from './src/utils/exemplosTestes.js';

2. Execute uma validação rápida:
   testes.exemploValidacaoRapida();

3. Teste conectividade:
   testes.exemploTesteConectividade();

4. Teste notícias específico:
   testes.exemploTesteNoticias();

5. Execute todos os exemplos:
   testes.executarExemplos();

6. Para testes completos (CUIDADO - modifica dados):
   testes.exemploTestesCompletos();

💡 DICAS:
- Use exemploValidacaoRapida() para verificar se tudo está funcionando
- Use exemploTesteConectividade() se houver problemas de conexão
- Os testes criam e deletam dados temporários
- Em produção, desabilite ou remova estes arquivos de teste
`);
