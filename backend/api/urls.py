from django.urls import path, include # 1. Importe 'include'
from rest_framework.routers import DefaultRouter # 2. Importe o 'Router'
from . import views

# 3. Crie o roteador
router = DefaultRouter()
# Registra a rota '/api/clientes/' usando o ClienteViewSet
router.register(r'clientes', views.ClienteViewSet, basename='cliente')

# 4. Adicione as rotas do router ao urlpatterns
urlpatterns = [
    # Suas rotas existentes
    path('register/', views.register_user, name='register'),
    path('test-protected/', views.protected_view, name='test_protected'),
    
    # Adiciona /api/clientes/, /api/clientes/<id>/, etc.
    path('', include(router.urls)), 
]