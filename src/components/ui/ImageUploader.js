/**
 * Componente utilitário para manipulação de imagens em base64
 * 
 * Este componente fornece funcionalidades para upload, visualização e processamento
 * de imagens convertidas para base64 para uso com o Realtime Database.
 */

import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { convertImageToBase64, resizeAndCompressImage } from '../../services/realtimeDatabase';

const ImageUploaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  border: 2px dashed #ddd;
  border-radius: 8px;
  text-align: center;
  transition: border-color 0.3s ease;

  &:hover {
    border-color: #007bff;
  }

  &.drag-over {
    border-color: #007bff;
    background-color: #f8f9fa;
  }
`;

const ImagePreview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const PreviewImage = styled.img`
  max-width: 200px;
  max-height: 200px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const UploadButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
`;

const RemoveButton = styled.button`
  padding: 0.25rem 0.5rem;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c82333;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const OptionsContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 0.5rem;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  cursor: pointer;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background-color: #e9ecef;
  border-radius: 2px;
  overflow: hidden;
  margin-top: 0.5rem;

  &::after {
    content: '';
    display: block;
    width: ${props => props.progress}%;
    height: 100%;
    background-color: #007bff;
    transition: width 0.3s ease;
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

const InfoText = styled.div`
  color: #6c757d;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

/**
 * Componente para upload e processamento de imagens em base64
 */
const ImageUploader = ({ 
  onImageChange, 
  initialImage = null, 
  acceptedTypes = 'image/*',
  maxSize = 5 * 1024 * 1024, // 5MB
  compress = true,
  maxWidth = 800,
  maxHeight = 600,
  quality = 0.8,
  showPreview = true,
  showOptions = true
}) => {
  const [image, setImage] = useState(initialImage);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [compressEnabled, setCompressEnabled] = useState(compress);
  const [progress, setProgress] = useState(0);
  
  const fileInputRef = useRef();

  // Sincronizar com initialImage quando mudas
  useEffect(() => {
    setImage(initialImage);
  }, [initialImage]);

  const validateFile = (file) => {
    if (!file.type.startsWith('image/')) {
      throw new Error('Arquivo deve ser uma imagem');
    }
    
    if (file.size > maxSize) {
      throw new Error(`Arquivo muito grande. Máximo: ${(maxSize / 1024 / 1024).toFixed(1)}MB`);
    }
  };

  const processImage = async (file) => {
    setLoading(true);
    setError(null);
    setProgress(0);
    
    try {
      validateFile(file);
      setProgress(25);

      let base64;
      if (compressEnabled) {
        base64 = await resizeAndCompressImage(file, maxWidth, maxHeight, quality);
        setProgress(75);
      } else {
        base64 = await convertImageToBase64(file);
        setProgress(75);
      }

      setProgress(100);
      setImage(base64);
      
      console.log('📷 ImageUploader - Imagem processada:', {
        tamanho: base64.length,
        tipo: base64.substring(0, 30),
        comprimida: compressEnabled
      });
      
      if (onImageChange) {
        console.log('📤 ImageUploader - Enviando imagem para callback');
        onImageChange(base64);
      }
      
      setTimeout(() => setProgress(0), 1000);
    } catch (err) {
      setError(err.message);
      console.error('Erro ao processar imagem:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      processImage(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      processImage(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleRemoveImage = () => {
    setImage(null);
    setError(null);
    console.log('🗑️ ImageUploader - Imagem removida');
    if (onImageChange) {
      console.log('📤 ImageUploader - Enviando null para callback');
      onImageChange(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <ImageUploaderContainer
      className={dragOver ? 'drag-over' : ''}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <FileInput
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes}
        onChange={handleFileSelect}
      />

      {image && showPreview ? (
        <ImagePreview>
          <PreviewImage src={image} alt="Preview" />
          <div>
            <RemoveButton onClick={handleRemoveImage}>
              Remover Imagem
            </RemoveButton>
          </div>
        </ImagePreview>
      ) : (
        <div>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📷</div>
          <div>Clique para selecionar ou arraste uma imagem aqui</div>
          <UploadButton 
            onClick={handleUploadClick} 
            disabled={loading}
          >
            {loading ? 'Processando...' : 'Selecionar Imagem'}
          </UploadButton>
        </div>
      )}

      {showOptions && (
        <OptionsContainer>
          <CheckboxLabel>
            <input
              type="checkbox"
              checked={compressEnabled}
              onChange={(e) => setCompressEnabled(e.target.checked)}
            />
            Comprimir imagem
          </CheckboxLabel>
        </OptionsContainer>
      )}

      {loading && progress > 0 && (
        <ProgressBar progress={progress} />
      )}

      {error && (
        <ErrorMessage>
          {error}
        </ErrorMessage>
      )}

      {!error && !loading && image && (
        <InfoText>
          Imagem carregada com sucesso! 
          {compressEnabled && ' (Comprimida)'}
        </InfoText>
      )}

      {!image && !error && (
        <InfoText>
          Tipos aceitos: {acceptedTypes} | Tamanho máximo: {(maxSize / 1024 / 1024).toFixed(1)}MB
        </InfoText>
      )}
    </ImageUploaderContainer>
  );
};

export default ImageUploader;

/**
 * Hook personalizado para gerenciar estado de imagens em base64
 */
export const useImageUploader = (initialImage = null) => {
  const [image, setImage] = useState(initialImage);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const uploadImage = async (file, options = {}) => {
    setLoading(true);
    setError(null);

    try {
      const {
        compress = true,
        maxWidth = 800,
        maxHeight = 600,
        quality = 0.8
      } = options;

      let base64;
      if (compress) {
        base64 = await resizeAndCompressImage(file, maxWidth, maxHeight, quality);
      } else {
        base64 = await convertImageToBase64(file);
      }

      setImage(base64);
      return base64;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeImage = () => {
    setImage(null);
    setError(null);
  };

  const updateImage = (newImage) => {
    setImage(newImage);
    setError(null);
  };

  return {
    image,
    loading,
    error,
    uploadImage,
    removeImage,
    updateImage
  };
};
