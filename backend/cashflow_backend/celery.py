import os
from celery import Celery

# Define a variável de ambiente das settings do Django para o Celery
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'cashflow_backend.settings')

app = Celery('cashflow_backend')

# Lê as configurações do Celery a partir do settings.py
app.config_from_object('django.conf:settings', namespace='CELERY')

# Carrega automaticamente tarefas de todos os apps registrados no Django
app.autodiscover_tasks()