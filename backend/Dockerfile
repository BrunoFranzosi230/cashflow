# Usa uma imagem oficial do Python como base
FROM python:3.11-slim

# Define variáveis de ambiente para o Python
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Instala as dependências do sistema necessárias para o psycopg2 (PostgreSQL)
RUN apt-get update && apt-get install -y libpq-dev gcc && rm -rf /var/lib/apt/lists/*

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia e instala as dependências do Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia todo o código do seu projeto para dentro do contêiner
COPY . .

# Expõe a porta 8000, onde o Django irá rodar
EXPOSE 8000

# O comando padrão para iniciar o servidor Django
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]