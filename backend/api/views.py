from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status, viewsets # 1. Importe 'viewsets'

from rest_framework_simplejwt.views import TokenObtainPairView
# 2. IMPORTE O MODELO E SERIALIZER DO CLIENTE
from .serializers import ProdutoSerializer, UserSerializer, MyTokenObtainPairSerializer, ClienteSerializer, FornecedorSerializer, ContaReceberSerializer, ContaPagarSerializer
from .models import Cliente, Fornecedor, Produto, ContaReceber, ContaPagar

# (View de Token - Você já tem)
class MyTokenObtainPairView(TokenObtainPairView):
    """
    Usa o nosso serializer customizado para incluir
    username e email no token.
    """
    serializer_class = MyTokenObtainPairSerializer

# (View de Registro - Você já tem)
@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# (View Protegida - Você já tem)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def protected_view(request):
    return Response(data={"message": f"Olá, {request.user.username}! Você está autenticado."})


# --- 3. ADICIONE ESTE NOVO VIEWSET ---
class ClienteViewSet(viewsets.ModelViewSet):
    """
    API endpoint que permite clientes serem vistos ou editados.
    """
    serializer_class = ClienteSerializer
    permission_classes = [IsAuthenticated] # Só usuários logados podem acessar

    def get_queryset(self):
        """
        Esta view deve retornar uma lista de todos os clientes
        apenas para o usuário logado no momento.
        """
        return Cliente.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        """
        Define o usuário do novo cliente como o usuário logado.
        """
        serializer.save(user=self.request.user)

class FornecedorViewSet(viewsets.ModelViewSet):
    """
    API endpoint que permite fornecedores serem vistos ou editados.
    """
    serializer_class = FornecedorSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Retorna uma lista de fornecedores apenas
        para o usuário logado no momento.
        """
        return Fornecedor.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        """
        Define o usuário do novo fornecedor como o usuário logado.
        """
        serializer.save(user=self.request.user)
    
class ProdutoViewSet(viewsets.ModelViewSet):
    """
    API endpoint que permite produtos serem vistos ou editados.
    """
    serializer_class = ProdutoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Retorna uma lista de produtos apenas
        para o usuário logado no momento.
        """
        return Produto.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        """
        Define o usuário do novo produto como o usuário logado.
        """
        serializer.save(user=self.request.user)

class ContaReceberViewSet(viewsets.ModelViewSet):
    serializer_class = ContaReceberSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Retorna apenas as contas do usuário logado
        return ContaReceber.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Define o usuário logado como dono da conta
        serializer.save(user=self.request.user)

class ContaPagarViewSet(viewsets.ModelViewSet):
    serializer_class = ContaPagarSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Retorna apenas as contas do usuário logado
        return ContaPagar.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Define o usuário logado como dono da conta
        serializer.save(user=self.request.user)