import React from 'react';
import styled from 'styled-components';

// Componente de card reutilizável com tema azul
const Card = ({ 
  children, 
  variant = 'default', 
  padding = 'medium',
  elevation = 'medium',
  onClick,
  className
}) => {
  return (
    <StyledCard 
      variant={variant} 
      padding={padding} 
      elevation={elevation}
      onClick={onClick}
      className={className}
    >
      {children}
    </StyledCard>
  );
};

// Estilos do card usando styled-components e variáveis CSS
const StyledCard = styled.div`
  background-color: var(--white);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  transition: transform var(--transition-normal), box-shadow var(--transition-normal);
  
  /* Variantes */
  border-left: ${props => 
    props.variant === 'highlight' ? '5px solid var(--primary-dark)' : 
    props.variant === 'warning' ? '5px solid var(--warning)' : 
    props.variant === 'danger' ? '5px solid var(--danger)' : 
    props.variant === 'success' ? '5px solid var(--success)' : 'none'
  };
  
  /* Padding */
  padding: ${props => {
    switch(props.padding) {
      case 'small':
        return 'var(--spacing-md)';
      case 'large':
        return 'var(--spacing-2xl)';
      case 'none':
        return '0';
      default:
        return 'var(--spacing-xl)';
    }
  }};
  
  /* Elevação (sombra) */
  box-shadow: ${props => {
    switch(props.elevation) {
      case 'low':
        return '0 1px 3px rgba(0, 0, 0, 0.08)';
      case 'high':
        return '0 4px 20px rgba(0, 0, 0, 0.15)';
      case 'none':
        return 'none';
      default:
        return 'var(--box-shadow)';
    }
  }};
  
  /* Interatividade */
  cursor: ${props => props.onClick ? 'pointer' : 'default'};
  
  &:hover {
    ${props => props.onClick && `
      transform: translateY(-5px);
      box-shadow: var(--box-shadow-hover);
    `}
  }
`;

export default Card;
