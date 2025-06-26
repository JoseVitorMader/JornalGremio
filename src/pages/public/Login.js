import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaLock, FaSignInAlt } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

// Componente de página de Login
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  // Função para lidar com o envio do formulário de login
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validação básica
    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    
    try {
      setError('');
      setLoading(true);
      
      // Tenta fazer login com o Firebase Authentication
      await login(email, password);
      
      // Redireciona para o dashboard em caso de sucesso
      navigate('/dashboard');
    } catch (error) {
      console.error('Erro no login:', error);
      setError('Falha no login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <LoginHeader>
          <LoginTitle>UniCEDUP</LoginTitle>
          <LoginSubtitle>Acesso ao Jornal Digital</LoginSubtitle>
        </LoginHeader>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <LoginForm onSubmit={handleSubmit}>
          <FormGroup>
            <InputIcon>
              <FaUser />
            </InputIcon>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <InputIcon>
              <FaLock />
            </InputIcon>
            <Input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormGroup>
          
          <LoginButton type="submit" disabled={loading}>
            {loading ? 'Entrando...' : (
              <>
                <FaSignInAlt /> Entrar
              </>
            )}
          </LoginButton>
        </LoginForm>
        
        <LoginFooter>
          <InfoText>
            Acesso restrito aos membros do grêmio estudantil.
          </InfoText>
          <BackLink to="/">Voltar para o site</BackLink>
        </LoginFooter>
      </LoginCard>
    </LoginContainer>
  );
};

// Estilos usando styled-components
const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: var(--primary-bg);
`;

const LoginCard = styled(Card)`
  width: 100%;
  max-width: 400px;
  padding: 2rem;
`;

const LoginHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const LoginTitle = styled.h1`
  color: var(--primary-dark);
  margin-bottom: 0.5rem;
  font-size: 2rem;
`;

const LoginSubtitle = styled.p`
  color: var(--text-medium);
  margin: 0;
`;

const ErrorMessage = styled.div`
  background-color: var(--danger-bg);
  color: var(--danger);
  padding: 0.8rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  text-align: center;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const FormGroup = styled.div`
  position: relative;
`;

const InputIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-light);
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem 1rem 0.8rem 2.5rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 2px rgba(26, 75, 140, 0.2);
  }
`;

const LoginButton = styled(Button).attrs({
  variant: 'primary',
  fullWidth: true,
  size: 'large'
})`
  margin-top: 0.5rem;
`;

const LoginFooter = styled.div`
  text-align: center;
`;

const InfoText = styled.p`
  color: var(--text-light);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const BackLink = styled(Link)`
  color: var(--primary);
  text-decoration: none;
  font-size: 0.9rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

export default Login;
