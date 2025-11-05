from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer

@api_view(['POST'])
@permission_classes([AllowAny]) # Qualquer um pode se registrar
def register_user(request):
    """
    Cria um novo usuário.
    Espera "username" e "password" no body.
    """
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated]) # Só usuários logados (com token)
def protected_view(request):
    """
    Uma view de teste que só pode ser acessada se um
    token JWT válido for enviado no Header 'Authorization'.
    """
    return Response(data={"message": f"Olá, {request.user.username}! Você está autenticado."})