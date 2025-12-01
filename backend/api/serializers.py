from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
# 1. IMPORTE O NOVO MODELO
from .models import Cliente, Fornecedor, Produto, ContaReceber, ContaPagar

# (Serializer de User - Você já tem)
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user

# (Serializer de Token - Você já tem)
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['email'] = user.email
        return token


# --- 2. ADICIONE ESTE NOVO SERIALIZER ---
class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        # Lista todos os campos que a API vai usar
        fields = [
            'id', 'codigo', 'razaoSocial', 'nomeFantasia', 'endereco', 
            'bairro', 'cidade', 'cep', 'estado', 'cpfCnpj', 'telefone', 
            'inscricaoEstadual', 'email', 'tipoPessoa', 'tipo', 'user'
        ]
        # Torna o 'user' apenas leitura. O backend vai preencher automaticamente.
        read_only_fields = ('user',)

class FornecedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fornecedor
        fields = [
            'id', 'codigo', 'razaoSocial', 'nomeFantasia', 'endereco', 
            'bairro', 'cidade', 'cep', 'estado', 'cpfCnpj', 'telefone', 
            'inscricaoEstadual', 'email', 'tipoPessoa', 'tipo', 'user'
        ]
        read_only_fields = ('user',)

class ProdutoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produto
        # Lista todos os campos que a API vai usar
        fields = [
            'id', 'codigo', 'descricao', 'tipo', 'unidade', 
            'ncm', 'ean', 'precoVenda', 'ipi', 'user'
        ]
        # Torna o 'user' apenas leitura
        read_only_fields = ('user',)  

class ContaReceberSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContaReceber
        fields = [
            'id', 'prefixo', 'numeroTitulo', 'tipo', 'dataEmissao', 
            'cliente', 'valorTitulo', 'vencimento', 'status', 'user'
        ]
        read_only_fields = ('user',)

class ContaPagarSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContaPagar
        fields = [
            'id', 'prefixo', 'numeroTitulo', 'tipo', 'dataEmissao', 
            'fornecedor', 'valorTitulo', 'vencimento', 'status', 'user'
        ]
        read_only_fields = ('user',)