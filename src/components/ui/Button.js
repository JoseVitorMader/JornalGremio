import React from 'react';
import styled from 'styled-components';

// Componente de botão reutilizável com tema azul
const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  fullWidth = false, 
  disabled = false,
  icon = null,
  onClick,
  type = 'button'
}) => {
  return (
    <StyledButton 
      variant={variant} 
      size={size} 
      fullWidth={fullWidth} 
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {icon && <ButtonIcon>{icon}</ButtonIcon>}
      {children}
    </StyledButton>
  );
};

// Estilos do botão usando styled-components e variáveis CSS
const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  font-weight: 500;
  border-radius: var(--border-radius-sm);
  transition: all var(--transition-normal);
  border: none;
  cursor: pointer;
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  
  /* Variantes de cor */
  background-color: ${props => {
    switch(props.variant) {
      case 'secondary':
        return 'transparent';
      case 'danger':
        return 'var(--danger)';
      case 'success':
        return 'var(--success)';
      case 'outline':
        return 'transparent';
      default:
        return 'var(--primary-dark)';
    }
  }};
  
  color: ${props => {
    switch(props.variant) {
      case 'secondary':
        return 'var(--primary-dark)';
      case 'outline':
        return 'var(--primary-dark)';
      default:
        return 'var(--white)';
    }
  }};
  
  border: ${props => 
    props.variant === 'outline' ? '1px solid var(--primary-dark)' : 
    props.variant === 'secondary' ? '1px solid var(--border-color)' : 'none'
  };
  
  /* Tamanhos */
  padding: ${props => {
    switch(props.size) {
      case 'small':
        return 'var(--spacing-sm) var(--spacing-md)';
      case 'large':
        return 'var(--spacing-lg) var(--spacing-xl)';
      default:
        return 'var(--spacing-md) var(--spacing-lg)';
    }
  }};
  
  font-size: ${props => {
    switch(props.size) {
      case 'small':
        return 'var(--font-size-sm)';
      case 'large':
        return 'var(--font-size-lg)';
      default:
        return 'var(--font-size-md)';
    }
  }};
  
  /* Estados */
  &:hover {
    background-color: ${props => {
      switch(props.variant) {
        case 'secondary':
          return 'var(--bg-light)';
        case 'danger':
          return '#b71c1c';
        case 'success':
          return '#0d3c1a';
        case 'outline':
          return 'var(--primary-bg)';
        default:
          return 'var(--primary)';
      }
    }};
  }
  
  &:active {
    transform: translateY(1px);
  }
  
  &:disabled {
    background-color: var(--border-color);
    color: var(--text-light);
    cursor: not-allowed;
    border-color: var(--border-color);
  }
`;

const ButtonIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Button;
