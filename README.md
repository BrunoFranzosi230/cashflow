<h1>CashFlow - Platarforma de Fluxo  de Caixa</h1>

### PAC - Projeto de Aprendizagem Colaborativa Extensionista
**Curso:** Engenharia de Software - Católica de Santa Catarina  
**Entidade Beneficiada:** Madeireira Araquari

**Autores:**
* Bruno Franzosi.
* Fernando Lucas Moraes da Luz.

**Professores Orientadores:**
* Luiz Carlos Camargo
* Claudinei Dias

<p>A CahFlow é uma solução intuitiva e eficiente para gerenciar o fluxo de caixa da empresa madeirra Araquari. Com uma interface simples e funcionalidades avançadas, o sistema permite acompanhar entradas e saídas financeiras, gerando relatórios detalhados para uma melhor tomada de decisão.</p>

<h2>Objetivo</h2>
<p>Facilitar a gestão financeira, oferecendo uma ferramenta confiável e acessível para otimizar o controle do fluxo de caixa, ajudando a Madereira Araquari a manter a saúde financeira em dia.</p>


<h2>Stacks</h2>

* Python
* Django
* Django REST Framework (DRF) (API REST)
* PostgreSQL 
* Celery + Redis
* React.js
* Vite
* Tailwind CSS 

## Como executar o projeto

### Pré-requisitos
* Docker e Docker Compose instalados.

### Passo a passo
1. Clone o repositório:
   ```bash
   git clone [https://github.com/seu-usuario/cashflow.git](https://github.com/seu-usuario/cashflow.git)

2. Acesse a pasta do projeto e suba os containers:
   ```
   cd cashflow
   docker-compose up --build
3. Acesse a aplicação em http://localhost:5173 (frontend) e a API em http://localhost:8000 (backend).


 #### 3. Prints das Telas
Substitua ou complemente o link do Figma por imagens reais se o sistema já estiver implementado. Exemplo:


## 📱 Telas do Sistema

### Tela de Login

*Permite o acesso seguro de administradores e funcionários.*

### Dashboard Financeiro

*Visão geral das entradas, saídas e gráficos de desempenho.*


<h2>Requisitos:</h2>
<p> 
<h3>Requisitos Funcionais:</h3>

RF01- Permitir o registro de receitas e despesas com categorização personalizadas. 

RF02- Possibilitar a edição e exclusão de transações. 

RF03- Apresentar um fluxo de caixa diário, semanal e mensal . 

RF04- Alertar sobre saldo crítico abaixo de um limite configurável pelo usuário. 

RF05- Implementar autenticação segura para os usuários. 

RF06- Criar perfis de usuário com permissões diferenciadas (administrador, financeiro, visualização).

RF07- Gerar gráficos de receitas e despesas por categoria . 

RF08- Enviar notificações sobre contas a pagar e vencimentos programados . 

RF09- Criar ferramenta para correção de inconsistências nos dados importados.

<h3>Requisitos Não Funcionais:</h3>

RFN01- Interface intuitiva e responsiva para facilitar o uso por diferentes perfis de usuários.

RFN02- Processamento ágil de grandes volumes de dados sem comprometer a usabilidade.

RFN03- A estrutura deve estar preparada para o aumento do volume de dados e usuários sem perda de desempenho.

RFN04- Compatível com múltiplos dispositivos (computadores,tablets, smartphones). 

RFN05- Integração estável e segura entre a API REST do Django.

RFN06- Código-fonte estruturado para facilitar manutenções futuras atualizações e correções. 

RFN07- Sistema deve estar disponível 24 horas, salvo períodos programados de manutenção.
</p>

<h1>Justificativa da Adoção da Arquitetura Monolítica baseada no Padrão MVC</h1>

<p>A arquitetura adotada para a implementação do sistema CashFlow é do tipo monolítica, estruturada segundo o paradigma Model-View-Controller (MVC). Esta decisão arquitetural fundamenta-se em critérios técnicos, operacionais e estratégicos, considerando o escopo atual do projeto, os requisitos funcionais e não funcionais previamente elencados, bem como os recursos disponíveis para o seu desenvolvimento, manutenção e eventual escalonamento.</p>
<p>A abordagem MVC foi escolhida por promover a separação de responsabilidades em três camadas logicamente distintas:

  * Model: responsável pela definição das entidades de domínio, regras de negócio e persistência dos dados;
    
  * View: incumbida da apresentação e interação com o usuário final;
    
  * Controller: intermediador entre as camadas de modelo e visualização, tratando requisições, processando regras e coordenando fluxos.
    
</p>
<p>Tal separação não apenas melhora a legibilidade e manutenibilidade do código-fonte, mas também viabiliza a aplicação de testes unitários e a reutilização de componentes, favorecendo boas práticas de engenharia de software.
A adoção da arquitetura monolítica, por sua vez, justifica-se pela coerência com a complexidade atual do sistema e pelos seguintes fatores técnicos:

  * Facilidade de desenvolvimento e implantação: toda a aplicação é construída, testada e distribuída como uma unidade coesa, eliminando a necessidade de orquestração entre serviços distintos.
    
  * Baixo overhead de comunicação: por compartilhar o mesmo processo e espaço de execução, os componentes da aplicação interagem com latência mínima e sem a sobrecarga de protocolos externos.
    
  * Ambiente controlado e centralizado: favorece a implementação de políticas de segurança, controle de acesso e auditoria de forma uniforme.
    
  * Menor custo de infraestrutura: especialmente vantajoso em ambientes de desenvolvimento inicial ou com restrições orçamentárias, uma vez que reduz a complexidade operacional.
  
</p>

<p>O sistema será desenvolvido com Django como framework backend, utilizando sua robusta ORM e sistema de roteamento para a camada Model e Controller, enquanto o frontend será implementado com React, consumindo os serviços disponibilizados via API RESTful, o que garante um acoplamento fraco entre as camadas e preserva a modularidade da solução.

Além disso, esta arquitetura encontra-se alinhada com os requisitos não funcionais estabelecidos — como desempenho, escalabilidade vertical, disponibilidade, segurança da informação e responsividade — e permite, futuramente, uma migração gradativa para uma arquitetura orientada a serviços ou microsserviços, conforme as demandas de escalabilidade horizontal e integração com outros sistemas evoluam.

Dessa forma, a arquitetura monolítica com estrutura MVC representa uma escolha tecnicamente sólida, condizente com os objetivos do projeto, assegurando um desenvolvimento eficaz, com aderência a padrões reconhecidos de engenharia de software e com possibilidade de evolução arquitetural planejada.</p>

<h2>Diagrama de Contexto</h2>
![image](https://github.com/user-attachments/assets/15996da6-361d-4724-811d-c9ea61cd2280)

<h2>Diagrama de Contêiner</h2>
![image](https://github.com/user-attachments/assets/201347ca-96aa-434e-9039-5c97f4d8ff45)


<h2>Protótipo de telas</h2>
https://www.figma.com/design/umXg3TnLY68jhM8TYxUi49/CashFlow?node-id=0-1&t=z7z0ZJJBgczlEwjT-1

<h2>Relatório do Projeto de Aprendizagem Extensionista</h2>
https://drive.google.com/drive/folders/1k6xyRpnSoZNVyZwLWzC67o5SZ4gpAPa5?usp=sharing

<h2>Vídeo de Apresentação</h2>
https://youtu.be/P68ZQoKhxk8

