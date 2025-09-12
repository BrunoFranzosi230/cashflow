FROM node:18-alpine AS frontend-build

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

# --- ETAPA 2: Servidor (Serve) ---
FROM nginx:stable-alpine

# Copia os arquivos construídos do React para a pasta do Nginx
COPY --from=frontend-build /app/dist /usr/share/nginx/html

# --- MUDANÇA AQUI ---
# Remove a configuração padrão do Nginx...
RUN rm /etc/nginx/conf.d/default.conf
# ...e copia a nossa configuração personalizada para o lugar dela.
COPY nginx.conf /etc/nginx/conf.d

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]