/**
 * Arquivo de testes para validar fluxos de autenticação
 * 
 * Este script contém funções para testar os principais fluxos de autenticação
 * e verificar se as rotas protegidas estão funcionando corretamente.
 */

// Importações necessárias
import { auth } from './services/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut 
} from 'firebase/auth';

/**
 * Testa o fluxo de login
 * @param {string} email - Email do usuário
 * @param {string} password - Senha do usuário
 * @returns {Promise<object>} Resultado do teste
 */
export const testLogin = async (email, password) => {
  try {
    console.log(`Testando login com email: ${email}`);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('Login bem-sucedido:', userCredential.user.uid);
    return {
      success: true,
      userId: userCredential.user.uid,
      message: 'Login realizado com sucesso'
    };
  } catch (error) {
    console.error('Erro no login:', error.code, error.message);
    return {
      success: false,
      error: error.code,
      message: error.message
    };
  }
};

/**
 * Testa o fluxo de cadastro
 * @param {string} email - Email do novo usuário
 * @param {string} password - Senha do novo usuário
 * @returns {Promise<object>} Resultado do teste
 */
export const testSignup = async (email, password) => {
  try {
    console.log(`Testando cadastro com email: ${email}`);
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log('Cadastro bem-sucedido:', userCredential.user.uid);
    return {
      success: true,
      userId: userCredential.user.uid,
      message: 'Cadastro realizado com sucesso'
    };
  } catch (error) {
    console.error('Erro no cadastro:', error.code, error.message);
    return {
      success: false,
      error: error.code,
      message: error.message
    };
  }
};

/**
 * Testa o fluxo de logout
 * @returns {Promise<object>} Resultado do teste
 */
export const testLogout = async () => {
  try {
    console.log('Testando logout');
    await signOut(auth);
    console.log('Logout bem-sucedido');
    return {
      success: true,
      message: 'Logout realizado com sucesso'
    };
  } catch (error) {
    console.error('Erro no logout:', error.code, error.message);
    return {
      success: false,
      error: error.code,
      message: error.message
    };
  }
};

/**
 * Testa o acesso a rotas protegidas
 * @param {object} history - Objeto de histórico do React Router
 * @param {string} protectedRoute - Rota protegida a ser testada
 * @returns {Promise<object>} Resultado do teste
 */
export const testProtectedRoute = async (history, protectedRoute) => {
  try {
    console.log(`Testando acesso à rota protegida: ${protectedRoute}`);
    
    // Verifica se o usuário está autenticado
    const currentUser = auth.currentUser;
    
    if (!currentUser) {
      console.log('Usuário não autenticado, redirecionando para login');
      history.push('/login');
      return {
        success: false,
        message: 'Acesso negado: usuário não autenticado'
      };
    }
    
    // Tenta acessar a rota protegida
    history.push(protectedRoute);
    console.log(`Acesso permitido à rota: ${protectedRoute}`);
    
    return {
      success: true,
      message: `Acesso permitido à rota: ${protectedRoute}`
    };
  } catch (error) {
    console.error('Erro ao testar rota protegida:', error);
    return {
      success: false,
      error: error.message,
      message: 'Erro ao testar rota protegida'
    };
  }
};

/**
 * Executa todos os testes de autenticação
 * @param {object} history - Objeto de histórico do React Router
 * @returns {Promise<object>} Resultados dos testes
 */
export const runAllAuthTests = async (history) => {
  const results = {
    login: null,
    signup: null,
    logout: null,
    protectedRoutes: {}
  };
  
  // Testes de login/logout com credenciais de teste
  results.login = await testLogin('teste@unicedup.com', 'senha123');
  
  if (results.login.success) {
    // Testa rotas protegidas
    const protectedRoutes = [
      '/dashboard',
      '/editor/noticias',
      '/editor/eventos',
      '/editor/galeria',
      '/editor/avisos',
      '/editor/destaques'
    ];
    
    for (const route of protectedRoutes) {
      results.protectedRoutes[route] = await testProtectedRoute(history, route);
    }
    
    // Testa logout
    results.logout = await testLogout();
  }
  
  console.log('Resultados dos testes de autenticação:', results);
  return results;
};
