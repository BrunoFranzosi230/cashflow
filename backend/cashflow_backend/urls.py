from django.contrib import admin
from django.urls import path, include # Importe 'include'
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Endpoint de Login (o React vai chamar este)
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    
    # Endpoint para renovar o token (opcional, mas bom ter)
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # Inclui todas as URLs da sua app 'api'
    path('api/', include('api.urls')),
]