from django.contrib import admin
from django.urls import path, include

# 1. REMOVA a importação do 'TokenObtainPairView' daqui
from rest_framework_simplejwt.views import TokenRefreshView

# 2. IMPORTE a NOSSA view customizada
from api.views import MyTokenObtainPairView 

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # 3. USE A NOSSA VIEW na rota de 'api/token/'
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/', include('api.urls')),
]