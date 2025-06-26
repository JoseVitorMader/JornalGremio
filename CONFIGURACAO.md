# Guia de Configuração Local - UniCEDUP Jornal Digital

Este guia fornece instruções detalhadas para configurar e executar o projeto UniCEDUP Jornal Digital em seu ambiente local.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

1. **Node.js** (versão 14.0.0 ou superior)
2. **npm** (normalmente vem com o Node.js)
3. **Git** (opcional, para clonar o repositório)

Você pode verificar se já possui estas ferramentas instaladas executando no terminal:

```bash
node -v
npm -v
git --version
```

## Passo 1: Obter o código-fonte

### Opção A: Clonar o repositório (se disponível em um repositório Git)

```bash
git clone https://github.com/seu-usuario/unicedup-jornal.git
cd unicedup-jornal
```

### Opção B: Extrair o arquivo ZIP (se recebeu o código como arquivo compactado)

1. Extraia o conteúdo do arquivo ZIP para uma pasta de sua preferência
2. Abra o terminal e navegue até a pasta extraída:

```bash
cd caminho/para/unicedup-jornal
```

## Passo 2: Instalar dependências

Execute o seguinte comando para instalar todas as dependências necessárias:

```bash
npm install
```

Este processo pode levar alguns minutos, dependendo da sua conexão com a internet.

## Passo 3: Configurar o Firebase

Para que o projeto funcione corretamente, você precisa configurar sua própria instância do Firebase:

1. Acesse o [Firebase Console](https://console.firebase.google.com/)
2. Clique em "Adicionar projeto" e siga as instruções para criar um novo projeto
3. Após criar o projeto, clique em "Adicionar app" e selecione a opção Web (</> ícone)
4. Registre o app com um nome (ex: "UniCEDUP Jornal") e clique em "Registrar app"
5. Você receberá um objeto de configuração como este:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "000000000000",
  appId: "1:000000000000:web:0000000000000000000000"
};
```

6. Copie este objeto de configuração

7. No projeto, abra o arquivo `src/services/firebase.js` e substitua o objeto `firebaseConfig` pelo que você copiou

## Passo 4: Configurar serviços do Firebase

### Authentication

1. No Firebase Console, vá para "Authentication" no menu lateral
2. Clique em "Começar" ou "Get started"
3. Na aba "Sign-in method", habilite o provedor "Email/Senha"
4. Clique em "Salvar"

### Firestore Database

1. No Firebase Console, vá para "Firestore Database" no menu lateral
2. Clique em "Criar banco de dados"
3. Selecione "Iniciar no modo de teste" (para desenvolvimento)
4. Escolha a localização do servidor mais próxima de você
5. Clique em "Ativar"

### Storage

1. No Firebase Console, vá para "Storage" no menu lateral
2. Clique em "Começar" ou "Get started"
3. Selecione "Iniciar no modo de teste" (para desenvolvimento)
4. Clique em "Próximo" e depois em "Concluído"

## Passo 5: Criar usuário administrador

Para acessar as áreas restritas do site, você precisa criar pelo menos um usuário:

1. No Firebase Console, vá para "Authentication" no menu lateral
2. Clique na aba "Users" (Usuários)
3. Clique em "Add user" (Adicionar usuário)
4. Insira um email e senha para o usuário administrador
5. Clique em "Add user" (Adicionar usuário)

## Passo 6: Executar o projeto localmente

Agora você pode iniciar o servidor de desenvolvimento:

```bash
npm start
```

O projeto será aberto automaticamente em seu navegador padrão no endereço `http://localhost:3000`.

## Passo 7: Acessar o sistema

1. Acesse `http://localhost:3000` em seu navegador
2. Para entrar nas áreas restritas, clique em "Login" e use as credenciais do usuário que você criou no Firebase Authentication

## Solução de problemas comuns

### Erro de conexão com o Firebase

Se você encontrar erros relacionados à conexão com o Firebase, verifique:
- Se as credenciais no arquivo `firebase.js` estão corretas
- Se os serviços (Authentication, Firestore, Storage) foram ativados corretamente
- Se você tem uma conexão ativa com a internet

### Erro ao iniciar o servidor de desenvolvimento

Se o comando `npm start` falhar:
- Verifique se todas as dependências foram instaladas corretamente com `npm install`
- Certifique-se de que a porta 3000 não está sendo usada por outro aplicativo
- Tente limpar o cache com `npm cache clean --force` e reinstalar as dependências

### Problemas de permissão no Firestore ou Storage

Se você encontrar erros de permissão ao tentar criar/ler/atualizar dados:
- Verifique se as regras de segurança do Firestore e Storage estão configuradas para permitir acesso durante o desenvolvimento
- No modo de teste, as regras padrão permitem acesso total por um período limitado (30 dias)

## Próximos passos

Após configurar e testar o projeto localmente, você pode:

1. Personalizar o conteúdo para atender às necessidades específicas do grêmio estudantil
2. Ajustar as regras de segurança do Firebase para um ambiente de produção
3. Implantar o site em um serviço de hospedagem como Firebase Hosting, Vercel ou Netlify

## Suporte

Se você encontrar problemas durante a configuração ou tiver dúvidas sobre o projeto, entre em contato com a equipe de desenvolvimento.
