from django.urls import path, include # 1. Importe 'include'
from rest_framework.routers import DefaultRouter # 2. Importe o 'Router'
from . import views

# 3. Crie o roteador
router = DefaultRouter()
# Registra a rota '/api/clientes/' usando o ClienteViewSet
router.register(r'clientes', views.ClienteViewSet, basename='cliente')
router.register(r'fornecedores', views.FornecedorViewSet, basename='fornecedor')
router.register(r'produtos', views.ProdutoViewSet, basename='produto')
router.register(r'contas-receber', views.ContaReceberViewSet, basename='contareceber')
router.register(r'contas-pagar', views.ContaPagarViewSet, basename='contapagar')
# 4. Adicione as rotas do router ao urlpatterns
urlpatterns = [
    # Suas rotas existentes
    path('register/', views.register_user, name='register'),
    path('test-protected/', views.protected_view, name='test_protected'),
    
    # Adiciona /api/clientes/, /api/clientes/<id>/, etc.
    path('', include(router.urls)), 
]