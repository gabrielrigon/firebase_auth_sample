# Exemplo de integração Firebase Authentication

### Conteúdo

O objetivo deste material é exemplificar a integração do Firebase Authentication em um projeto web node. Nele será possível criar um usuário (c/ confirmação por e-mail), logar, deslogar, atualizar o usuário e recuperar a senha enquanto acompanha cada atualização do objeto em tempo real.

### Dependências

* Firebase
* React
* Material UI

### Uso

* Clone o projeto
* Acesse o diretório e instale as dependências com o comando abaixo (para isso você precisa ter instalado o `NodeJs v8.9.4 e Yarn v1.5.1`)
```sh
  $ yarn
```
* Renomeie o arquivo ``index.js.example`` (que está dentro da pasta src) para ``index.js``
* Dentro deste arquivo, insira os parametros de configuração fornecidos ao criar o projeto no Firebase
* No console do Firebase, vá até `Authentication` > `Métodos de Login` e habilite esta opção
* Volte ao terminal e execute o comando
```sh
  $ yarn start
```
