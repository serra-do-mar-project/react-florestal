# 🌲 React Florestal

Aplicativo mobile para **Manual de Procedimentos Operacionais e Administrativos** desenvolvido com React Native e Expo. Sistema completo de gerenciamento de infrações, relatórios, moderação de usuários e consulta de casos ambientais.

## 📋 Índice

- [📖 Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração do Banco de Dados](#configuração-do-banco-de-dados)
- [Executando o Projeto](#executando-o-projeto)
- [Build e Deploy](#build-e-deploy)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Funcionalidades](#funcionalidades)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Troubleshooting](#troubleshooting)

## 📖 Sobre o Projeto

O **React Florestal** é uma aplicação móvel desenvolvida para facilitar o gerenciamento de procedimentos operacionais e administrativos em áreas de conservação ambiental. O sistema oferece:

- ✅ Autenticação de usuários com CPF e senha
- ✅ Cadastro e consulta de autos de infração
- ✅ Sistema de moderação de usuários (para administradores)
- ✅ Busca avançada por categoria (Fauna, Flora, Mineração, Uso Público, etc.)
- ✅ Geração de relatórios com anexos
- ✅ Banco de dados local com SQLite
- ✅ Sincronização com API backend

## 🚀 Tecnologias Utilizadas

### Core
- **React Native** 0.76.9 - Framework para desenvolvimento mobile
- **Expo** ~52.0.46 - Plataforma de desenvolvimento
- **TypeScript** 5.3.3 - Linguagem tipada
- **Expo Router** ~4.0.21 - Roteamento baseado em arquivos

### UI & Styling
- **NativeWind** 4.1.23 - Tailwind CSS para React Native
- **TailwindCSS** 3.4.17 - Framework CSS utility-first
- **Lucide React Native** - Ícones
- **Expo Linear Gradient** - Gradientes

### Database & ORM
- **Expo SQLite** ~15.1.4 - Banco de dados local
- **Drizzle ORM** 0.43.1 - ORM TypeScript-first
- **Drizzle Kit** 0.31.1 - Migrations e gestão do schema

### State Management & Navigation
- **Zustand** 5.0.5 - Gerenciamento de estado
- **React Navigation** 7.0.14 - Navegação
- **React Native Gesture Handler** - Gestos

### Outras Bibliotecas
- **@gorhom/bottom-sheet** - Modais bottom sheet
- **@react-native-community/datetimepicker** - Seletor de data/hora
- **Expo Image** - Otimização de imagens
- **React Native Reanimated** - Animações
- **React Native SVG** - Suporte a SVG

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

### Obrigatórios
- **Node.js** 18.x ou superior ([Download](https://nodejs.org/))
- **npm** ou **yarn** (gerenciador de pacotes)
- **Git** ([Download](https://git-scm.com/))

### Para desenvolvimento mobile
- **Expo Go** (app para testar no dispositivo físico)
  - [iOS](https://apps.apple.com/app/expo-go/id982107779)
  - [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)

### Para build nativo (opcional)
- **Android Studio** (para Android) - [Download](https://developer.android.com/studio)
- **Xcode** (para iOS, apenas macOS) - [Download](https://developer.apple.com/xcode/)
- **EAS CLI** - Expo Application Services

## 🔧 Instalação

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd react-florestal
```

### 2. Instale as dependências

```bash
npm install
```

ou

```bash
yarn install
```

### 3. Instale o EAS CLI globalmente (para builds)

```bash
npm install -g eas-cli
```

### 4. Faça login no Expo (se necessário)

```bash
npx expo login
```

ou

```bash
eas login
```

## 🗄️ Configuração do Banco de Dados

O projeto utiliza **SQLite** local com **Drizzle ORM**.

### Schema do Banco

O schema está definido em [src/db/schema.ts](src/db/schema.ts) com as seguintes tabelas:

- **exemplo_de_caso_table**: Casos de exemplo com procedimentos
- **autos_de_infracao_table**: Registros de autos de infração

### Migrações

As migrações são gerenciadas automaticamente pelo Drizzle Kit e estão na pasta `drizzle/`.

#### Gerar nova migração

```bash
npx drizzle-kit generate
```

#### Aplicar migrações

As migrações são aplicadas automaticamente ao iniciar o app. O banco é criado em `db.db`.

#### Resetar banco de dados (desenvolvimento)

Para limpar o banco local durante desenvolvimento, descomente o código em [src/db/connection.ts](src/db/connection.ts):

```typescript
if (__DEV__) {
  try {
    SQLite.deleteDatabaseAsync("db.db");
    console.log("✅ Banco de dados deletado (modo dev)");
  } catch (e) {
    console.error("Erro ao deletar o banco:", e);
  }
}
```

## ▶️ Executando o Projeto

### Modo Desenvolvimento

```bash
npm start
```

ou

```bash
npx expo start
```

Isso abrirá o **Metro Bundler** com as seguintes opções:

- Pressione `a` - Abrir no emulador/dispositivo Android
- Pressione `i` - Abrir no simulador iOS (apenas macOS)
- Pressione `w` - Abrir no navegador web
- Escanear QR Code com Expo Go para testar no dispositivo

### Executar em plataformas específicas

```bash
# Android
npm run android

# iOS (apenas macOS)
npm run ios

# Web
npm run web
```

### Modo com Development Client

Para usar funcionalidades nativas personalizadas:

```bash
npx expo start --dev-client
```

## 📱 Build e Deploy

### Build com EAS (Expo Application Services)

#### 1. Configurar projeto EAS

```bash
eas build:configure
```

#### 2. Build de desenvolvimento

```bash
eas build --profile development --platform android
eas build --profile development --platform ios
```

#### 3. Build de preview (teste interno)

```bash
eas build --profile preview --platform android
eas build --profile preview --platform ios
```

#### 4. Build de produção

```bash
eas build --profile production --platform android
eas build --profile production --platform ios
```

### Build local (Android)

Para build local do APK Android:

```bash
npx expo run:android --variant release
```

### Publicar atualizações OTA

Para enviar atualizações over-the-air (sem rebuild):

```bash
eas update --branch production
```

### Submeter para lojas

#### Google Play Store

```bash
eas submit --platform android
```

#### Apple App Store

```bash
eas submit --platform ios
```

## 📁 Estrutura do Projeto

```
react-florestal/
├── assets/                    # Assets estáticos (fontes, imagens)
├── drizzle/                   # Migrations do banco de dados
│   ├── meta/                  # Metadata das migrations
│   └── *.sql                  # Arquivos SQL das migrations
├── src/
│   ├── app/                   # Rotas da aplicação (Expo Router)
│   │   ├── index.tsx          # Tela inicial
│   │   ├── loginPage.tsx      # Tela de login
│   │   ├── _layout.tsx        # Layout raiz
│   │   └── auth/              # Rotas autenticadas
│   │       ├── config.tsx     # Configurações
│   │       ├── infractions.tsx # Infrações
│   │       ├── moderation.tsx  # Moderação de usuários
│   │       ├── report.tsx      # Relatórios
│   │       └── search/         # Busca de casos
│   ├── components/            # Componentes reutilizáveis
│   │   ├── configuration/     # Componentes de configuração
│   │   ├── infractions/       # Componentes de infrações
│   │   ├── moderation/        # Componentes de moderação
│   │   ├── report/            # Componentes de relatório
│   │   └── search/            # Componentes de busca
│   ├── constants/             # Constantes (imagens, etc)
│   ├── db/                    # Configuração do banco
│   │   ├── connection.ts      # Conexão SQLite
│   │   └── schema.ts          # Schema Drizzle
│   ├── hooks/                 # Custom hooks
│   ├── lib/                   # Utilitários e funções
│   │   └── utils.ts           # Funções de API e helpers
│   ├── mock/                  # Dados de mock para testes
│   └── store/                 # Gerenciamento de estado
│       └── userStore.tsx      # Store de usuário (Zustand)
├── app.json                   # Configuração do Expo
├── eas.json                   # Configuração do EAS
├── drizzle.config.ts          # Configuração do Drizzle Kit
├── tailwind.config.js         # Configuração do Tailwind
├── tsconfig.json              # Configuração do TypeScript
└── package.json               # Dependências do projeto
```

## ✨ Funcionalidades

### 🔐 Autenticação
- Login com CPF e senha
- Validação e formatação automática de CPF
- Gerenciamento de sessão com Zustand
- Token JWT para autenticação na API

### 📊 Infrações
- Listagem de autos de infração
- Filtros por categoria e status
- Modal com detalhes completos
- Criação e edição de infrações

### 🔍 Busca de Casos
- Busca por categorias:
  - Fauna
  - Flora
  - Mineração
  - Uso Público
  - Construção
  - Pesquisa
  - Procedimentos
- Filtros avançados
- Visualização de casos de exemplo

### 📝 Relatórios
- Geração de relatórios de campo
- Formulários dinâmicos
- Anexo de documentos
- Seleção de data e hora
- Campos personalizados por tipo de ocorrência

### 👥 Moderação (Administrador)
- Cadastro de novos usuários
- Listagem de usuários
- Edição de permissões
- Exclusão de usuários

### ⚙️ Configurações
- Alteração de senha
- Informações sobre o time
- Logout

## 🔐 Variáveis de Ambiente

A API backend utilizada está configurada em [src/lib/utils.ts](src/lib/utils.ts):

```typescript
const API_URL = "https://nest-florestal-fork.onrender.com";
```

### Endpoints principais:
- **POST** `/auth/signin` - Login
- **GET** `/casos` - Listar casos
- **POST** `/autos` - Criar auto de infração
- **GET** `/usuarios` - Listar usuários (admin)
- **POST** `/usuarios` - Criar usuário (admin)

## 🐛 Troubleshooting

### Problema: Erro ao instalar dependências

**Solução:**
```bash
# Limpar cache do npm
npm cache clean --force
rm -rf node_modules package-lock.json
npm install

# Ou com yarn
yarn cache clean
rm -rf node_modules yarn.lock
yarn install
```

### Problema: App não inicia no dispositivo

**Solução:**
```bash
# Limpar cache do Expo
npx expo start -c

# Ou resetar completamente
rm -rf node_modules .expo .expo-shared
npm install
npx expo start
```

### Problema: Erro de build Android

**Solução:**
```bash
# Limpar build Android
cd android
./gradlew clean
cd ..
npx expo run:android
```

### Problema: Erro nas migrations do banco

**Solução:**

Apague o banco local e reinicie o app:

```typescript
// Em src/db/connection.ts, descomente:
if (__DEV__) {
  SQLite.deleteDatabaseAsync("db.db");
}
```

### Problema: Erro no Metro Bundler

**Solução:**
```bash
# Resetar o Metro Bundler
npx expo start -c
# Ou matar processos
npx expo start --clear
```

### Problema: TypeScript errors

**Solução:**
```bash
# Regenerar tipos do Expo Router
npx expo customize tsconfig.json
npx expo start
```

## 📞 Suporte

Para problemas ou dúvidas:
- Verifique a [documentação do Expo](https://docs.expo.dev/)
- Consulte a [documentação do React Native](https://reactnative.dev/)
- Revise os logs do console para mensagens de erro detalhadas

## 📄 Licença

Este projeto é privado e proprietário.

---

**Desenvolvido com ❤️ usando React Native e Expo**
