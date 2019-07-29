# vehiclesdata
Project for vehicle registration  

# Tecnologias


Para criar o sistema Vehiclesdata foram utilizados as seguintes ferramentas/frameworks:


- Backend com Spring-boot

- Frontend com Angular

- Banco de dados utilizando PostgresSQL na AWS com RDS

- Hospedagem da aplicação na AWS EC2
  

# Composição da Stack

  

A Stack do Vehiclesdata é composta por 2 aplicações, são elas:


- VehiclesdataAPI : serviço com conexão ao banco de dados e gerenciamento da comunicação com a tela

- VehiclesdataUI: frontend da aplicação

  

## O que preciso para subir a aplicação

  

- Sistema Operacional Linux

- Docker e docker-compose instalados

  

## Rodando a aplicação

  

Para rodar a aplicação você precisa abrir um terminal e ir até a pasta raiz do projeto e executar o arquivo start.sh, com o comando :

  

sudo ./start.sh

  

Após rodar o comando e subir todos os serviços é só acessar o endereço :

http://localhost:4200


## Documentação
Com a finalidade de documentar as APIs foi adicionado o swagger para tal. O mesmo pode ser acessado pelos endereço abaixo:

- Quando rodando local 
 http://localhost:8080/swagger-ui.html
 
- Acesso instancia rodando na AWS EC2
 http://ec2-52-67-214-31.sa-east-1.compute.amazonaws.com:8080/swagger-ui.html
 
