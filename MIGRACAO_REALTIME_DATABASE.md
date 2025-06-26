# Migração para Firebase Realtime Database com Imagens Base64

Este documento descreve a migração do sistema do Firestore para o Firebase Realtime Database, incluindo o novo sistema de armazenamento de imagens em base64.

## Principais Mudanças

### 1. Configuração do Firebase

**Antes (firebase.js):**
```javascript
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

export const db = getFirestore(app);
export const storage = getStorage(app);
```

**Depois (firebase.js):**
```javascript
import { getDatabase } from 'firebase/database';

export const database = getDatabase(app);
```

### 2. Sistema de Banco de Dados

#### Firestore (Anterior)
- Coleções e documentos
- Consultas complexas com where, orderBy
- Upload de imagens para Storage

#### Realtime Database (Atual)
- Estrutura hierárquica JSON
- Consultas com orderByChild, equalTo
- Imagens armazenadas em base64

### 3. Operações CRUD

#### Criar Documento
**Antes:**
```javascript
import { addDoc, collection } from 'firebase/firestore';

const docRef = await addDoc(collection(db, 'noticias'), data);
```

**Depois:**
```javascript
import { createNoticia } from '../services/realtimeDatabase';

const result = await createNoticia(data);
```

#### Ler Documentos
**Antes:**
```javascript
import { getDocs, collection } from 'firebase/firestore';

const querySnapshot = await getDocs(collection(db, 'noticias'));
```

**Depois:**
```javascript
import { readNoticias } from '../services/realtimeDatabase';

const result = await readNoticias({ limit: 10 });
```

#### Atualizar Documento
**Antes:**
```javascript
import { updateDoc, doc } from 'firebase/firestore';

await updateDoc(doc(db, 'noticias', id), data);
```

**Depois:**
```javascript
import { updateNoticia } from '../services/realtimeDatabase';

const result = await updateNoticia(id, data);
```

#### Excluir Documento
**Antes:**
```javascript
import { deleteDoc, doc } from 'firebase/firestore';

await deleteDoc(doc(db, 'noticias', id));
```

**Depois:**
```javascript
import { deleteNoticia } from '../services/realtimeDatabase';

const result = await deleteNoticia(id);
```

### 4. Sistema de Imagens

#### Storage (Anterior)
```javascript
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const storageRef = ref(storage, 'images/' + file.name);
const snapshot = await uploadBytes(storageRef, file);
const downloadURL = await getDownloadURL(snapshot.ref);
```

#### Base64 (Atual)
```javascript
import { convertImageToBase64, resizeAndCompressImage } from '../services/realtimeDatabase';

// Conversão simples
const base64 = await convertImageToBase64(file);

// Com compressão
const base64Compressed = await resizeAndCompressImage(file, 800, 600, 0.8);
```

### 5. Componente de Upload de Imagens

```javascript
import ImageUploader from '../components/ui/ImageUploader';

function MeuComponente() {
  const [imagem, setImagem] = useState(null);

  const handleImagemChange = (base64) => {
    setImagem(base64);
  };

  return (
    <ImageUploader
      onImageChange={handleImagemChange}
      initialImage={imagem}
      maxSize={2 * 1024 * 1024} // 2MB
      compress={true}
      maxWidth={800}
      maxHeight={600}
      quality={0.8}
    />
  );
}
```

### 6. Listeners em Tempo Real

```javascript
import { listenToCollection } from '../services/realtimeDatabase';

useEffect(() => {
  const unsubscribe = listenToCollection('noticias', (result) => {
    if (result.success) {
      setNoticias(result.data);
    }
  }, { 
    orderBy: 'createdAt',
    limit: 20 
  });

  return () => unsubscribe();
}, []);
```

## Estrutura de Dados

### Realtime Database Structure
```
{
  "noticias": {
    "noticia1_id": {
      "id": "noticia1_id",
      "titulo": "Título da Notícia",
      "categoria": "Geral",
      "resumo": "Resumo da notícia",
      "conteudo": "Conteúdo completo",
      "autor": "autor@email.com",
      "imagem": "data:image/jpeg;base64,/9j/4AAQ...", // Base64
      "createdAt": 1703123456789,
      "updatedAt": 1703123456789,
      "status": "publicada"
    }
  },
  "eventos": {
    "evento1_id": {
      "id": "evento1_id",
      "titulo": "Nome do Evento",
      "tipo": "academico",
      "data": "2025-06-15",
      "horario": "14:00 - 18:00",
      "local": "Local do Evento",
      "descricao": "Descrição do evento",
      "imagem": "data:image/jpeg;base64,/9j/4AAQ...",
      "createdAt": 1703123456789,
      "updatedAt": 1703123456789
    }
  },
  "avisos": {
    "aviso1_id": {
      "id": "aviso1_id",
      "titulo": "Título do Aviso",
      "tipo": "informativo",
      "conteudo": "Conteúdo do aviso",
      "autor": "autor@email.com",
      "createdAt": 1703123456789,
      "updatedAt": 1703123456789
    }
  },
  "galeria": {
    "item1_id": {
      "id": "item1_id",
      "titulo": "Título da Foto",
      "descricao": "Descrição da foto",
      "categoria": "eventos",
      "imagem": "data:image/jpeg;base64,/9j/4AAQ...", // Obrigatório
      "createdAt": 1703123456789,
      "updatedAt": 1703123456789
    }
  },
  "destaques": {
    "destaque1_id": {
      "id": "destaque1_id",
      "titulo": "Título do Destaque",
      "descricao": "Descrição do destaque",
      "link": "https://example.com",
      "imagem": "data:image/jpeg;base64,/9j/4AAQ...",
      "createdAt": 1703123456789,
      "updatedAt": 1703123456789
    }
  }
}
```

## Funções Disponíveis

### Funções Genéricas
- `createDocument(path, data)` - Cria documento
- `readDocument(path, id)` - Lê documento específico
- `readCollection(path, options)` - Lê coleção completa
- `updateDocument(path, id, data)` - Atualiza documento
- `deleteDocument(path, id)` - Exclui documento
- `listenToCollection(path, callback, options)` - Escuta mudanças em coleção
- `listenToDocument(path, id, callback)` - Escuta mudanças em documento

### Funções Específicas por Tipo
#### Notícias
- `createNoticia(data)`
- `readNoticias(options)`
- `updateNoticia(id, data)`
- `deleteNoticia(id)`

#### Eventos
- `createEvento(data)`
- `readEventos(options)`
- `updateEvento(id, data)`
- `deleteEvento(id)`

#### Avisos
- `createAviso(data)`
- `readAvisos(options)`
- `updateAviso(id, data)`
- `deleteAviso(id)`

#### Galeria
- `createGaleriaItem(data)`
- `readGaleria(options)`
- `updateGaleriaItem(id, data)`
- `deleteGaleriaItem(id)`

#### Destaques
- `createDestaque(data)`
- `readDestaques(options)`
- `updateDestaque(id, data)`
- `deleteDestaque(id)`

### Funções de Imagem
- `convertImageToBase64(file)` - Converte arquivo para base64
- `resizeAndCompressImage(file, maxWidth, maxHeight, quality)` - Redimensiona e comprime

## Exemplo de Uso Completo

### Componente Editor
```javascript
import React, { useState } from 'react';
import ImageUploader from '../components/ui/ImageUploader';
import { createNoticia } from '../services/realtimeDatabase';

function EditorNoticias() {
  const [titulo, setTitulo] = useState('');
  const [categoria, setCategoria] = useState('Geral');
  const [resumo, setResumo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [imagem, setImagem] = useState(null);
  const [enviando, setEnviando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);

    try {
      const result = await createNoticia({
        titulo,
        categoria,
        resumo,
        conteudo,
        imagem,
        autor: 'usuario@email.com'
      });

      if (result.success) {
        alert('Notícia criada com sucesso!');
        // Limpar formulário
        setTitulo('');
        setCategoria('Geral');
        setResumo('');
        setConteudo('');
        setImagem(null);
      } else {
        alert('Erro: ' + result.message);
      }
    } catch (error) {
      alert('Erro: ' + error.message);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Título"
        required
      />
      
      <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
        <option value="Geral">Geral</option>
        <option value="Acadêmico">Acadêmico</option>
        <option value="Esportes">Esportes</option>
        <option value="Cultura">Cultura</option>
        <option value="Tecnologia">Tecnologia</option>
      </select>
      
      <textarea
        value={resumo}
        onChange={(e) => setResumo(e.target.value)}
        placeholder="Resumo"
        required
      />
      
      <textarea
        value={conteudo}
        onChange={(e) => setConteudo(e.target.value)}
        placeholder="Conteúdo"
        required
      />
      
      <ImageUploader
        onImageChange={setImagem}
        initialImage={imagem}
        compress={true}
        maxWidth={800}
        maxHeight={600}
      />
      
      <button type="submit" disabled={enviando}>
        {enviando ? 'Enviando...' : 'Criar Notícia'}
      </button>
    </form>
  );
}
```

### Componente Listagem
```javascript
import React, { useState, useEffect } from 'react';
import { readNoticias, listenToCollection } from '../services/realtimeDatabase';

function ListaNoticias() {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Carregamento inicial
    const carregarNoticias = async () => {
      const result = await readNoticias({ limit: 10 });
      if (result.success) {
        setNoticias(result.data);
      }
      setLoading(false);
    };

    carregarNoticias();

    // Listener para atualizações em tempo real
    const unsubscribe = listenToCollection('noticias', (result) => {
      if (result.success) {
        setNoticias(result.data);
      }
    }, { limit: 10 });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      {noticias.map(noticia => (
        <div key={noticia.id}>
          <h3>{noticia.titulo}</h3>
          {noticia.imagem && (
            <img src={noticia.imagem} alt={noticia.titulo} style={{maxWidth: '200px'}} />
          )}
          <p>{noticia.resumo}</p>
          <small>
            {new Date(noticia.createdAt).toLocaleDateString()} - {noticia.autor}
          </small>
        </div>
      ))}
    </div>
  );
}
```

## Testes

Para testar o sistema:

```javascript
import { runAllTests } from '../utils/realtimeDatabaseTests';

// Executar todos os testes
runAllTests().then(results => {
  console.log('Resultados dos testes:', results);
});
```

## Vantagens da Nova Implementação

1. **Simplicidade**: Menos dependências externas
2. **Tempo Real**: Atualizações automáticas em tempo real
3. **Base64**: Imagens embutidas no documento, sem URLs externas
4. **Compressão**: Otimização automática de imagens
5. **Consistência**: Estrutura uniforme de resposta das funções
6. **TypeScript Ready**: Tipagem consistente para melhor desenvolvimento

## Considerações

- **Tamanho**: Imagens em base64 são ~33% maiores que arquivos binários
- **Limite**: Firebase Database tem limite de 16MB por documento
- **Cache**: Base64 é cacheado junto com os dados
- **Performance**: Adequado para imagens pequenas/médias (< 2MB)
