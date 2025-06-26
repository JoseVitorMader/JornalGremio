# Configuração das Regras do Firebase Realtime Database

## ⚠️ ERRO DE PERMISSÃO RESOLVIDO

O erro `PERMISSION_DENIED` que você está enfrentando acontece porque as regras de segurança do Firebase Realtime Database estão muito restritivas ou não estão configuradas corretamente.

## 🔧 Como resolver:

### 1. Acesse o Console do Firebase

1. Vá para [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Selecione seu projeto: **unicedup**
3. No menu lateral, clique em **"Realtime Database"**
4. Clique na aba **"Regras"**

### 2. Configure as Regras de Segurança

Substitua as regras atuais por uma das opções abaixo:

#### OPÇÃO 1: Regras para Desenvolvimento (Temporária)
```json
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null"
  }
}
```

#### OPÇÃO 2: Regras para Teste (Menos segura - apenas para testes)
```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

#### OPÇÃO 3: Regras Completas com Índices (Recomendado)
```json
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null",
    "noticias": {
      ".read": true,
      ".write": "auth != null",
      ".indexOn": ["createdAt", "categoria", "autor", "updatedAt"]
    },
    "eventos": {
      ".read": true,
      ".write": "auth != null",
      ".indexOn": ["createdAt", "data", "tipo", "updatedAt"]
    },
    "avisos": {
      ".read": true,
      ".write": "auth != null", 
      ".indexOn": ["createdAt", "tipo", "autor", "updatedAt"]
    },
    "galeria": {
      ".read": true,
      ".write": "auth != null",
      ".indexOn": ["createdAt", "categoria", "updatedAt"]
    },
    "destaques": {
      ".read": true,
      ".write": "auth != null",
      ".indexOn": ["createdAt", "updatedAt"]
    }
  }
}
```

#### OPÇÃO 4: Regras para Desenvolvimento com Índices (Mais Permissiva)
```json
{
  "rules": {
    ".read": true,
    ".write": true,
    "noticias": {
      ".indexOn": ["createdAt", "categoria", "autor", "updatedAt"]
    },
    "eventos": {
      ".indexOn": ["createdAt", "data", "tipo", "updatedAt"]
    },
    "avisos": {
      ".indexOn": ["createdAt", "tipo", "autor", "updatedAt"]
    },
    "galeria": {
      ".indexOn": ["createdAt", "categoria", "updatedAt"]
    },
    "destaques": {
      ".indexOn": ["createdAt", "updatedAt"]
    }
  }
}
```

### 3. Passos para Aplicar as Regras

1. **Para resolver o erro imediatamente**, use a **OPÇÃO 4** (mais permissiva para desenvolvimento)
2. Copie o código JSON da opção escolhida
3. Cole no editor de regras do Firebase Console
4. Clique em **"Publicar"**
5. Aguarde alguns segundos para as regras serem aplicadas

### 4. Explicação dos Índices

O Firebase Realtime Database precisa de índices definidos para permitir consultas ordenadas. Os índices que adicionamos são:

- **`createdAt`**: Para ordenar por data de criação
- **`updatedAt`**: Para ordenar por data de atualização  
- **`categoria`**: Para filtrar notícias por categoria
- **`tipo`**: Para filtrar eventos e avisos por tipo
- **`autor`**: Para filtrar por autor

### 5. Como Verificar se Funcionou

Após aplicar as regras, teste novamente sua aplicação. Os erros devem desaparecer:

- ✅ `PERMISSION_DENIED` → Resolvido com regras de permissão
- ✅ `Index not defined` → Resolvido com `.indexOn`

### 6. Monitoramento

Você pode monitorar o uso das regras no Console do Firebase:
1. Vá para **Realtime Database > Uso**
2. Verifique se não há mais erros de permissão
3. Monitore o número de leituras/escritas

### 7. Regras de Produção (Para o futuro)

Quando sua aplicação estiver pronta para produção, substitua pelas regras mais seguras:

```json
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null",
    "noticias": {
      ".read": true,
      ".write": "auth != null && auth.token.email_verified == true",
      ".indexOn": ["createdAt", "categoria", "autor", "updatedAt"],
      "$noticiaId": {
        ".validate": "newData.hasChildren(['titulo', 'categoria', 'resumo', 'conteudo', 'autor'])"
      }
    },
    "eventos": {
      ".read": true,
      ".write": "auth != null && auth.token.email_verified == true",
      ".indexOn": ["createdAt", "data", "tipo", "updatedAt"],
      "$eventoId": {
        ".validate": "newData.hasChildren(['titulo', 'tipo', 'data', 'local', 'descricao'])"
      }
    },
    "avisos": {
      ".read": true,
      ".write": "auth != null && auth.token.email_verified == true",
      ".indexOn": ["createdAt", "tipo", "autor", "updatedAt"]
    },
    "galeria": {
      ".read": true,
      ".write": "auth != null && auth.token.email_verified == true",
      ".indexOn": ["createdAt", "categoria", "updatedAt"],
      "$itemId": {
        ".validate": "newData.hasChildren(['titulo', 'imagem'])"
      }
    },
    "destaques": {
      ".read": true,
      ".write": "auth != null && auth.token.email_verified == true",
      ".indexOn": ["createdAt", "updatedAt"]
    }
  }
}
```

## 🚨 AÇÃO NECESSÁRIA AGORA

Para resolver o erro **imediatamente**:

1. **Vá para**: [Firebase Console](https://console.firebase.google.com/)
2. **Selecione**: Projeto "unicedup"
3. **Clique em**: "Realtime Database" → "Regras"
4. **Cole este código** (OPÇÃO 4 - para desenvolvimento):

```json
{
  "rules": {
    ".read": true,
    ".write": true,
    "noticias": {
      ".indexOn": ["createdAt", "categoria", "autor", "updatedAt"]
    },
    "eventos": {
      ".indexOn": ["createdAt", "data", "tipo", "updatedAt"]
    },
    "avisos": {
      ".indexOn": ["createdAt", "tipo", "autor", "updatedAt"]
    },
    "galeria": {
      ".indexOn": ["createdAt", "categoria", "updatedAt"]
    },
    "destaques": {
      ".indexOn": ["createdAt", "updatedAt"]
    }
  }
}
```

5. **Clique em**: "Publicar"
6. **Teste**: Sua aplicação deve funcionar sem erros

---

**Status**: ⚠️ **AGUARDANDO CONFIGURAÇÃO DAS REGRAS NO FIREBASE**
      "$noticiaId": {
        ".validate": "newData.hasChildren(['titulo', 'categoria', 'resumo', 'conteudo', 'autor', 'createdAt', 'updatedAt'])",
        "titulo": {
          ".validate": "newData.isString() && newData.val().length > 0 && newData.val().length <= 200"
        },
        "categoria": {
          ".validate": "newData.isString() && newData.val().matches(/^(Geral|Acadêmico|Esportes|Cultura|Tecnologia)$/)"
        },
        "resumo": {
          ".validate": "newData.isString() && newData.val().length > 0 && newData.val().length <= 500"
        },
        "conteudo": {
          ".validate": "newData.isString() && newData.val().length > 0"
        },
        "autor": {
          ".validate": "newData.isString() && newData.val().length > 0"
        },
        "imagem": {
          ".validate": "newData.isString() || newData.val() == null"
        },
        "createdAt": {
          ".validate": "newData.isNumber()"
        },
        "updatedAt": {
          ".validate": "newData.isNumber()"
        }
      }
    },
    "eventos": {
      ".read": true,
      ".write": "auth != null",
      "$eventoId": {
        ".validate": "newData.hasChildren(['titulo', 'tipo', 'data', 'local', 'descricao', 'createdAt', 'updatedAt'])"
      }
    },
    "avisos": {
      ".read": true,
      ".write": "auth != null",
      "$avisoId": {
        ".validate": "newData.hasChildren(['titulo', 'tipo', 'conteudo', 'autor', 'createdAt', 'updatedAt'])"
      }
    },
    "galeria": {
      ".read": true,
      ".write": "auth != null",
      "$itemId": {
        ".validate": "newData.hasChildren(['titulo', 'descricao', 'categoria', 'imagem', 'createdAt', 'updatedAt'])"
      }
    },
    "destaques": {
      ".read": true,
      ".write": "auth != null",
      "$destaqueId": {
        ".validate": "newData.hasChildren(['titulo', 'descricao', 'createdAt', 'updatedAt'])"
      }
    }
  }
}
```

## 🚀 Passos para aplicar:

### Para resolver imediatamente (use a OPÇÃO 1 ou 2):

1. **Acesse o Firebase Console**
2. **Vá para Realtime Database > Regras**
3. **Cole uma das regras acima**
4. **Clique em "Publicar"**

### Para teste rápido (OPÇÃO 2):
Se você quiser testar rapidamente sem se preocupar com autenticação, use a OPÇÃO 2, mas **LEMBRE-SE** de mudar para regras mais seguras depois.

### Para produção (OPÇÃO 3):
Use a OPÇÃO 3 que permite leitura pública das notícias, eventos, etc., mas exige autenticação para escrita.

## 🔐 Sobre Autenticação

Se você escolher regras que exigem autenticação (`auth != null`), certifique-se de que:

1. **O usuário está logado** antes de tentar criar/editar conteúdo
2. **O AuthContext está funcionando** corretamente
3. **O Firebase Auth está configurado** no seu projeto

## 🧪 Testando as Regras

Após aplicar as regras, teste no console do navegador:

```javascript
// Teste criar uma notícia
import { createNoticia } from './services/realtimeDatabase';

const testeNoticia = {
  titulo: 'Teste de Permissão',
  categoria: 'Geral',
  resumo: 'Testando se as regras estão funcionando',
  conteudo: 'Este é um teste das novas regras do Firebase',
  autor: 'Sistema de Teste'
};

createNoticia(testeNoticia).then(result => {
  console.log('Resultado do teste:', result);
});
```

## ⚠️ IMPORTANTE

- **OPÇÃO 2** (`.read: true, .write: true`) é **INSEGURA** para produção
- Use apenas para testes e desenvolvimento
- Sempre implemente regras mais restritivas para produção
- Monitor o uso do banco para evitar abuso

## 📞 Se ainda houver problemas:

1. **Verifique se o projeto Firebase está ativo**
2. **Confirme se a databaseURL está correta** no firebase.js
3. **Verifique se não há limitações de billing/quota**
4. **Teste com um documento simples primeiro**

Aplique uma dessas configurações e teste novamente!
