from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

# 1. IMPORTAR A VIEW DE TOKEN E NOSSOS SERIALIZERS
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import UserSerializer, MyTokenObtainPairSerializer

# --- 2. ADICIONE ESTA NOVA CLASSE VIEW ---
class MyTokenObtainPairView(TokenObtainPairView):
    """
    Usa o nosso serializer customizado para incluir
    username e email no token.
    """
    serializer_class = MyTokenObtainPairSerializer

# --- O RESTANTE DO SEU ARQUIVO views.py ---

# View de Registro (JÁ EXISTE)
@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# View Protegida (JÁ EXISTE)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def protected_view(request):
    return Response(data={"message": f"Olá, {request.user.username}! Você está autenticado."})