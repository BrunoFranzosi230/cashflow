from django.urls import path
from . import views

urlpatterns = [
    # Rota para /api/register/
    path('register/', views.register_user, name='register'),
    # Rota para /api/test-protected/
    path('test-protected/', views.protected_view, name='test_protected'),
]
from django.urls import path
from . import views

urlpatterns = [
    # Rota para /api/register/
    path('register/', views.register_user, name='register'),
    # Rota para /api/test-protected/
    path('test-protected/', views.protected_view, name='test_protected'),
]