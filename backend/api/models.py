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

class Fornecedor(models.Model):
    # Relaciona o fornecedor ao usuário que o criou
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='fornecedores')
    
    # Campos do seu formulário (idênticos ao de Cliente)
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
    
class Produto(models.Model):
    # Relaciona o produto ao usuário que o criou
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='produtos')
    
    # Campos do seu formulário (baseado na imagem)
    codigo = models.CharField(max_length=100)
    descricao = models.CharField(max_length=255)
    tipo = models.CharField(max_length=100, blank=True, null=True)
    unidade = models.CharField(max_length=50, blank=True, null=True)
    ncm = models.CharField(max_length=100, blank=True, null=True)
    ean = models.CharField(max_length=100, blank=True, null=True)
    precoVenda = models.CharField(max_length=50, blank=True, null=True) # Usando CharField para manter simples como no frontend
    ipi = models.CharField(max_length=50, blank=True, null=True) # Usando CharField

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.descricao

class ContaReceber(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='contas_receber')
    
    prefixo = models.CharField(max_length=50, blank=True, null=True)
    numeroTitulo = models.CharField(max_length=100)
    tipo = models.CharField(max_length=100)
    dataEmissao = models.DateField()
    cliente = models.CharField(max_length=255) # Armazena o nome do cliente
    valorTitulo = models.CharField(max_length=50) # CharField para aceitar formatação monetária simples
    vencimento = models.DateField()
    
    # Status com opções fixas
    STATUS_CHOICES = [
        ('Aberto', 'Aberto'),
        ('Recebido', 'Recebido'),
        ('Pendente', 'Pendente'),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Aberto')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.numeroTitulo} - {self.cliente}"

class ContaPagar(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='contas_pagar')
    
    prefixo = models.CharField(max_length=50, blank=True, null=True)
    numeroTitulo = models.CharField(max_length=100)
    tipo = models.CharField(max_length=100)
    dataEmissao = models.DateField()
    fornecedor = models.CharField(max_length=255) # Armazena o nome do fornecedor
    valorTitulo = models.CharField(max_length=50)
    vencimento = models.DateField()
    
    # Status com opções fixas
    STATUS_CHOICES = [
        ('Aberto', 'Aberto'),
        ('Pago', 'Pago'),
        ('Vencido', 'Vencido'),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Aberto')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.numeroTitulo} - {self.fornecedor}"