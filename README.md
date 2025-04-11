<h1>CashFlow - Platarforma de Fluxo  de Caixa</h1>

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
