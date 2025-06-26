import { createGlobalStyle } from 'styled-components';

// Estilos globais para todo o site
const GlobalStyles = createGlobalStyle`
  :root {
    /* Paleta de cores principal */
    --primary-dark: #1a4b8c;
    --primary: #2c5ea0;
    --primary-light: #3a6eaf;
    --primary-lighter: #a3c5ff;
    --primary-lightest: #e0ebff;
    --primary-bg: #f0f5ff;
    
    /* Cores neutras */
    --text-dark: #333333;
    --text-medium: #555555;
    --text-light: #666666;
    --border-color: #dddddd;
    --bg-light: #f9f9f9;
    --white: #ffffff;
    
    /* Cores de status */
    --success: #155724;
    --success-bg: #d4edda;
    --success-border: #c3e6cb;
    --danger: #721c24;
    --danger-bg: #f8d7da;
    --danger-border: #f5c6cb;
    --warning: #ff9800;
    --info: #2196f3;
    --urgent: #d32f2f;
    
    /* Tamanhos de fonte */
    --font-size-xs: 0.8rem;
    --font-size-sm: 0.9rem;
    --font-size-md: 1rem;
    --font-size-lg: 1.1rem;
    --font-size-xl: 1.3rem;
    --font-size-2xl: 1.5rem;
    --font-size-3xl: 1.8rem;
    --font-size-4xl: 2rem;
    --font-size-5xl: 2.5rem;
    
    /* Espaçamentos */
    --spacing-xs: 0.3rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 0.8rem;
    --spacing-lg: 1rem;
    --spacing-xl: 1.5rem;
    --spacing-2xl: 2rem;
    --spacing-3xl: 3rem;
    
    /* Bordas e sombras */
    --border-radius-sm: 4px;
    --border-radius-md: 8px;
    --box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    --box-shadow-hover: 0 4px 15px rgba(0, 0, 0, 0.15);
    
    /* Transições */
    --transition-fast: 0.2s ease;
    --transition-normal: 0.3s ease;
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html, body {
    font-family: 'Roboto', 'Segoe UI', Arial, sans-serif;
    font-size: 16px;
    line-height: 1.6;
    color: var(--text-dark);
    background-color: var(--primary-bg);
    min-height: 100vh;
  }
  
  a {
    text-decoration: none;
    color: var(--primary);
    transition: color var(--transition-normal);
    
    &:hover {
      color: var(--primary-light);
    }
  }
  
  button {
    cursor: pointer;
    font-family: inherit;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.3;
    margin-bottom: 0.5rem;
    color: var(--primary-dark);
  }
  
  p {
    margin-bottom: 1rem;
  }
  
  img {
    max-width: 100%;
    height: auto;
  }
  
  /* Classes de utilidade */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    width: 100%;
  }
  
  .text-center {
    text-align: center;
  }
  
  .mb-1 {
    margin-bottom: var(--spacing-sm);
  }
  
  .mb-2 {
    margin-bottom: var(--spacing-md);
  }
  
  .mb-3 {
    margin-bottom: var(--spacing-lg);
  }
  
  .mb-4 {
    margin-bottom: var(--spacing-xl);
  }
  
  .mb-5 {
    margin-bottom: var(--spacing-2xl);
  }
  
  /* Responsividade */
  @media (max-width: 768px) {
    html {
      font-size: 15px;
    }
  }
  
  @media (max-width: 480px) {
    html {
      font-size: 14px;
    }
  }
`;

export default GlobalStyles;
