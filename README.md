## Requisitos para Rodar o Projeto

Para rodar este projeto, a pessoa precisará ter instalado:

1. **Node.js** (versão 18.x ou superior)
2. **npm** (normalmente vem com o Node.js)
3. **MySQL** (versão 8.0 ou superior)
4. Um editor de código como **Visual Studio Code** (opcional, mas recomendado)



# 🎉 Guia de Instalação do Blog Simples 🎉

Olá! Você acaba de receber um incrível blog desenvolvido com Next.js e MySQL. Vamos configurá-lo em sua máquina em poucos passos!

## 📋 Pré-requisitos

Antes de começarmos nossa aventura, precisamos garantir que você tem as ferramentas certas:

- **Node.js** - O motor que faz tudo funcionar!
- **MySQL** - Onde guardaremos todos os posts e usuários
- **Editor de código** - Visual Studio Code é uma ótima escolha


## 🚀 Passo 1: Descompactando o Tesouro

1. Localize o arquivo ZIP que você recebeu por email
2. Clique com o botão direito e selecione "Extrair tudo..."
3. Escolha uma pasta fácil de encontrar, como `C:\Projetos\blog` ou `~/Projetos/blog`


## 🔧 Passo 2: Configurando o Banco de Dados

1. Abra o MySQL Workbench (ou qualquer cliente MySQL que você use)
2. Conecte-se ao seu servidor MySQL local
3. Crie um novo banco de dados:

CREATE DATABASE blog_db;


4. Importe o arquivo de dump que está na pasta `database` do projeto:

1. No MySQL Workbench: **Server > Data Import > Import from Self-Contained File**
2. Selecione o arquivo `blog_dump.sql`
3. Escolha o banco de dados `blog_db` como destino
4. Clique em "Start Import"
5. Teste a conexão e a importação, executando consultas SQL simples:
    USE blog_simples;
    SELECT * FROM users;




## 🌱 Passo 3: Preparando o Ambiente

1. Abra um terminal (Prompt de Comando, PowerShell ou Terminal)
2. Navegue até a pasta do projeto:


cd caminho/para/a/pasta/blog


3. Instale as dependências do projeto:

npm install

(Isso pode levar alguns minutos... é um bom momento para um café! ☕)




## 🔐 Passo 4: Configurando as Variáveis de Ambiente

1. Na pasta do projeto, crie um arquivo chamado `.env.local`
2. Adicione as seguintes informações (substituindo pelos seus dados):

```plaintext
DB_HOST=localhost
DB_USER=seu_usuario_mysql
DB_PASSWORD=sua_senha_mysql
DB_NAME=blog_db
JWT_SECRET=uma_senha_secreta_bem_forte




## 🚀 Passo 5: Hora de Decolar!

1. No terminal, ainda na pasta do projeto, execute:

npm run dev


2. Abra seu navegador e acesse:

http://localhost:3000




## 🎉 Parabéns!

Você agora tem um blog funcionando em sua máquina! Aqui estão algumas informações úteis:

- **Usuário Admin**: admin
- **Senha**: a senha que definimos para você (enviada separadamente)
- Para criar novos posts, faça login e acesse a área de administração
- Para visualizar posts, não é necessário login


## 🆘 Precisa de Ajuda?

Se encontrar algum problema durante a instalação, não hesite em entrar em contato pelo WhatsApp: +55 16 99788-2058