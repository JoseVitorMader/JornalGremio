# UniCEDUP - Jornal Digital do Grêmio Estudantil

Este projeto é um site completo para o jornal digital do grêmio estudantil "UniCEDUP", desenvolvido com React, React Router DOM e Firebase.

## Características Principais

- **Design Responsivo**: Interface adaptável para dispositivos móveis e desktop, com tema em tonalidades de azul
- **Sistema de Autenticação**: Acesso restrito para membros do grêmio estudantil via Firebase Authentication
- **Áreas Públicas e Privadas**: Separação clara entre conteúdo público e áreas administrativas
- **Gerenciamento de Conteúdo**: Formulários para criação e edição de notícias, eventos, avisos, galeria e destaques
- **Upload de Imagens**: Suporte para upload e gerenciamento de imagens via Firebase Storage
- **Armazenamento de Dados**: Integração com Firebase Firestore para persistência de dados

## Estrutura do Projeto

O projeto segue uma arquitetura modular e organizada, seguindo princípios de Clean Code:

```
unicedup-jornal/
├── src/
│   ├── assets/           # Recursos estáticos (imagens, estilos)
│   ├── components/       # Componentes reutilizáveis
│   │   ├── layout/       # Componentes de layout (Header, Footer, Sidebar)
│   │   ├── ui/           # Componentes de interface (Button, Card, etc.)
│   │   ├── auth/         # Componentes relacionados à autenticação
│   │   └── forms/        # Componentes de formulários
│   ├── contexts/         # Contextos React (AuthContext, etc.)
│   ├── hooks/            # Hooks personalizados
│   ├── pages/            # Páginas da aplicação
│   │   ├── public/       # Páginas públicas
│   │   └── private/      # Páginas restritas (requerem autenticação)
│   ├── routes/           # Configuração de rotas
│   ├── services/         # Serviços (Firebase, etc.)
│   └── utils/            # Funções utilitárias
├── public/               # Arquivos públicos
└── package.json          # Dependências do projeto
```

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces
- **React Router DOM**: Gerenciamento de rotas e navegação
- **Firebase**: Plataforma de desenvolvimento de aplicativos
  - Authentication: Sistema de autenticação
  - Firestore: Banco de dados NoSQL
  - Storage: Armazenamento de arquivos
- **Styled Components**: Estilização com CSS-in-JS
- **React Icons**: Biblioteca de ícones

## Páginas Públicas

- **Home**: Página inicial com visão geral e destaques
- **Notícias**: Artigos e informações organizados por categorias
- **Eventos**: Calendário e detalhes de eventos
- **Galeria**: Fotos e imagens de atividades
- **Avisos**: Comunicados importantes
- **Sobre**: Informações sobre o jornal e o grêmio
- **Destaques**: Conteúdos em evidência
- **Wikipedia**: Base de conhecimento colaborativa

## Área Administrativa

- **Dashboard**: Visão geral de estatísticas e atividades recentes
- **Editor de Notícias**: Criação e edição de artigos
- **Editor de Eventos**: Gerenciamento de eventos
- **Editor de Galeria**: Upload e organização de imagens
- **Editor de Avisos**: Publicação de comunicados
- **Editor de Destaques**: Definição de conteúdos em destaque

## Configuração e Instalação

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório:
   ```
   git clone https://github.com/seu-usuario/unicedup-jornal.git
   cd unicedup-jornal
   ```

2. Instale as dependências:
   ```
   npm install
   ```

3. Configure o Firebase:
   - Crie um projeto no [Firebase Console](https://console.firebase.google.com/)
   - Ative Authentication, Firestore e Storage
   - Copie as credenciais de configuração
   - Atualize o arquivo `src/services/firebase.js` com suas credenciais

4. Inicie o servidor de desenvolvimento:
   ```
   npm start
   ```

5. Acesse a aplicação em `http://localhost:3000`

## Implantação

Para implantar em produção:

1. Construa a versão otimizada:
   ```
   npm run build
   ```

2. Implante os arquivos da pasta `build` em seu servidor web ou plataforma de hospedagem preferida.

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para detalhes.

## Contato

Para dúvidas ou sugestões, entre em contato com a equipe do grêmio estudantil UniCEDUP.
