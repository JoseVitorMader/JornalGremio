/**
 * Arquivo de testes para validar responsividade e experiência do usuário
 * 
 * Este script contém funções para testar a responsividade e experiência do usuário
 * em diferentes dispositivos e tamanhos de tela.
 */

// Tamanhos de tela comuns para testes de responsividade
const screenSizes = {
  mobile: {
    width: 375,
    height: 667,
    name: 'Mobile (iPhone 8)'
  },
  mobileL: {
    width: 414,
    height: 896,
    name: 'Mobile Large (iPhone 11)'
  },
  tablet: {
    width: 768,
    height: 1024,
    name: 'Tablet (iPad)'
  },
  laptop: {
    width: 1366,
    height: 768,
    name: 'Laptop'
  },
  desktop: {
    width: 1920,
    height: 1080,
    name: 'Desktop'
  }
};

/**
 * Testa a responsividade de uma página em diferentes tamanhos de tela
 * @param {string} pageUrl - URL da página a ser testada
 * @param {object} window - Objeto window do navegador
 * @returns {object} Resultados dos testes
 */
export const testResponsiveness = (pageUrl, window) => {
  const results = {};
  
  console.log(`Testando responsividade para: ${pageUrl}`);
  
  // Para cada tamanho de tela
  Object.keys(screenSizes).forEach(size => {
    const { width, height, name } = screenSizes[size];
    
    console.log(`Testando em ${name} (${width}x${height})`);
    
    // Simula o redimensionamento da janela
    // Nota: Em um ambiente real, isso seria feito com ferramentas como Cypress ou Playwright
    window.innerWidth = width;
    window.innerHeight = height;
    
    // Dispara evento de redimensionamento
    const resizeEvent = window.document.createEvent('UIEvents');
    resizeEvent.initUIEvent('resize', true, false, window, 0);
    window.dispatchEvent(resizeEvent);
    
    // Verifica elementos críticos
    const header = window.document.querySelector('header');
    const footer = window.document.querySelector('footer');
    const mainContent = window.document.querySelector('main');
    
    results[size] = {
      size: name,
      dimensions: `${width}x${height}`,
      headerVisible: !!header && window.getComputedStyle(header).display !== 'none',
      footerVisible: !!footer && window.getComputedStyle(footer).display !== 'none',
      mainContentVisible: !!mainContent && window.getComputedStyle(mainContent).display !== 'none',
      overflowIssues: window.document.body.scrollWidth > width,
      notes: []
    };
    
    // Verifica problemas comuns de responsividade
    if (window.document.body.scrollWidth > width) {
      results[size].notes.push('Conteúdo ultrapassando a largura da tela (overflow horizontal)');
    }
    
    // Verifica se o menu está adaptado para mobile em telas pequenas
    if (width < 768) {
      const mobileMenu = window.document.querySelector('.mobile-menu, [data-mobile-menu]');
      results[size].mobileMenuPresent = !!mobileMenu;
      
      if (!mobileMenu) {
        results[size].notes.push('Menu mobile não encontrado em tela pequena');
      }
    }
    
    // Verifica se os textos estão legíveis
    const smallTexts = window.document.querySelectorAll('p, span, a');
    let tooSmallTextFound = false;
    
    smallTexts.forEach(text => {
      const fontSize = parseFloat(window.getComputedStyle(text).fontSize);
      if (fontSize < 12) {
        tooSmallTextFound = true;
      }
    });
    
    if (tooSmallTextFound) {
      results[size].notes.push('Textos com tamanho menor que 12px encontrados');
    }
    
    console.log(`Teste em ${name} concluído:`, results[size]);
  });
  
  return results;
};

/**
 * Testa a acessibilidade básica da página
 * @param {object} document - Objeto document do navegador
 * @returns {object} Resultados dos testes de acessibilidade
 */
export const testAccessibility = (document) => {
  const results = {
    issues: [],
    passed: []
  };
  
  console.log('Testando acessibilidade básica');
  
  // Verifica se todas as imagens têm atributo alt
  const images = document.querySelectorAll('img');
  let imagesWithoutAlt = 0;
  
  images.forEach(img => {
    if (!img.hasAttribute('alt')) {
      imagesWithoutAlt++;
    }
  });
  
  if (imagesWithoutAlt > 0) {
    results.issues.push(`${imagesWithoutAlt} imagens sem atributo alt`);
  } else if (images.length > 0) {
    results.passed.push('Todas as imagens possuem atributo alt');
  }
  
  // Verifica se os formulários têm labels associados
  const formInputs = document.querySelectorAll('input, textarea, select');
  let inputsWithoutLabel = 0;
  
  formInputs.forEach(input => {
    const id = input.getAttribute('id');
    if (id) {
      const label = document.querySelector(`label[for="${id}"]`);
      if (!label) {
        inputsWithoutLabel++;
      }
    } else if (input.type !== 'hidden' && input.type !== 'submit' && input.type !== 'button') {
      inputsWithoutLabel++;
    }
  });
  
  if (inputsWithoutLabel > 0) {
    results.issues.push(`${inputsWithoutLabel} campos de formulário sem labels associados`);
  } else if (formInputs.length > 0) {
    results.passed.push('Todos os campos de formulário possuem labels associados');
  }
  
  // Verifica contraste de cores (simplificado)
  const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, a, span, label');
  let lowContrastElements = 0;
  
  textElements.forEach(element => {
    const style = window.getComputedStyle(element);
    const color = style.color;
    const backgroundColor = style.backgroundColor;
    
    // Implementação simplificada - em um teste real, usaríamos bibliotecas específicas
    if (color === backgroundColor) {
      lowContrastElements++;
    }
  });
  
  if (lowContrastElements > 0) {
    results.issues.push(`${lowContrastElements} elementos com possível baixo contraste`);
  } else {
    results.passed.push('Nenhum problema óbvio de contraste detectado');
  }
  
  console.log('Teste de acessibilidade concluído:', results);
  return results;
};

/**
 * Executa todos os testes de UI/UX
 * @param {object} window - Objeto window do navegador
 * @returns {object} Resultados de todos os testes
 */
export const runAllUITests = (window) => {
  const document = window.document;
  const results = {
    responsiveness: {},
    accessibility: null
  };
  
  // Páginas a serem testadas
  const pagesToTest = [
    '/',
    '/noticias',
    '/eventos',
    '/galeria',
    '/avisos',
    '/sobre',
    '/destaques',
    '/login',
    '/dashboard'
  ];
  
  // Testa responsividade em cada página
  pagesToTest.forEach(page => {
    // Em um ambiente real, navegaríamos para cada página
    // Aqui, simulamos apenas para a página atual
    results.responsiveness[page] = testResponsiveness(page, window);
  });
  
  // Testa acessibilidade na página atual
  results.accessibility = testAccessibility(document);
  
  console.log('Resultados de todos os testes de UI/UX:', results);
  return results;
};
