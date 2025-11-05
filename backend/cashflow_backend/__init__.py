# Importa o app Celery que acabamos de criar
from .celery import app as celery_app

# Garante que o app seja conhecido pelo Django
__all__ = ('celery_app',)