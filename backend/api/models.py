from django.db import models
from django.contrib.auth.models import User

class Cliente(models.Model):
    # Relaciona o cliente ao usuário que o criou
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='clientes')
    
    # Campos do seu formulário React
    codigo = models.CharField(max_length=100)
    razaoSocial = models.CharField(max_length=255)
    nomeFantasia = models.CharField(max_length=255, blank=True, null=True)
    endereco = models.CharField(max_length=255)
    bairro = models.CharField(max_length=100, blank=True, null=True)
    cidade = models.CharField(max_length=100)
    cep = models.CharField(max_length=20, blank=True, null=True)
    estado = models.CharField(max_length=50)
    cpfCnpj = models.CharField(max_length=20)
    telefone = models.CharField(max_length=20, blank=True, null=True)
    inscricaoEstadual = models.CharField(max_length=50, blank=True, null=True)
    email = models.EmailField(max_length=255, blank=True, null=True)
    tipoPessoa = models.CharField(max_length=50, blank=True, null=True)
    tipo = models.CharField(max_length=50, blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.razaoSocial