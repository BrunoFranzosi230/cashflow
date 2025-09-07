# --- ETAPA 1: Construção (Build) ---
# Usamos uma imagem Node para instalar as dependências e "buildar" o projeto
FROM node:20-alpine AS build

WORKDIR /app

# Copiamos o package.json e instalamos as dependências
COPY package*.json ./
RUN npm install

# Copiamos o resto do código do frontend
COPY . .

# Rodamos o comando de build do Vite, que gera os arquivos estáticos na pasta /dist
RUN npm run build

# --- ETAPA 2: Servidor (Serve) ---
# Agora usamos uma imagem super leve do Nginx para servir os arquivos gerados
FROM nginx:1.25-alpine

# Copiamos os arquivos da pasta /dist (da etapa anterior) para a pasta do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Se você usa React Router, precisa de uma config extra para o Nginx.
# Remova o comentário da linha abaixo se tiver um arquivo nginx.conf
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta 80, que é a porta padrão do Nginx
EXPOSE 80

# O comando para iniciar o Nginx já vem na imagem, não precisamos de CMD