# App

GymPass style app.

## RFs (Requisitos funcionais)

- [] Deve ser possivel se cadastrar;
- [] Deve ser possivel se autenticar;
- [] Deve ser possivel obter o perfil de um usuario logado;
- [] Deve ser possivel obter o numero de check-ins realizados pelo usuario logado;
- [] Deve ser possivel o usuário obter o seu historico de check-ins;
- [] Deve ser possivel o usuario buscar academias proximas;
- [] Deve ser possivel o usuario buscar academias pelo nome;
- [] Deve ser possivel o usuario realizar check-in em uma academia;
- [] Deve ser possivel validar o check-in de um usuario;
- [] Deve ser possivel cadastrar uma academia;

## RNs (Regras de negocio)

- [] O usuario nao deve poder se cadastrar com um e-mail duplicad;
- [] O usuario nao pode fazer 2 check-ins no mesmo dia;
- [] O usuario nao pode fazer check-in se nao estiver dentro de (100m) da academia;
- [] O check-in só pode ser validado até 20 minutos após criado;
- [] O check-in só pode ser validado por administradores;
- [] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos nao-funcionais)

- [] A senha do usuário precisa estar criptografada;
- [] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [] Todas listas de dados precisam estar paginadas com 20 itens por pagina;
- [] O usuario deve ser identificado por um JWT (JSON Token)