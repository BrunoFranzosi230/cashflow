from django.contrib.auth.models import User
from rest_framework import serializers
# 1. IMPORTAR O SERIALIZER DE TOKEN PADRÃO
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

# Serializer para criar usuários (JÁ EXISTE)
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

# --- 2. ADICIONE ESTA NOVA CLASSE ---
# Serializer customizado para o Token
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        # Pega o token padrão
        token = super().get_token(user)

        # Adiciona nossos dados customizados ao payload do token
        token['username'] = user.username
        token['email'] = user.email
        # (Você pode adicionar mais dados aqui, se quiser)

        return token