# API Rest com Express e Mongo DB

## 1° Criando um projeto com NodeJS

Um profissional **Full Stack** é o programador capaz de conectar o front-end com o backend em uma aplicação. Há duas formas de desenvolver uma aplicação, uma criando um front e conectando as requisições e segundo construindo uma api.

## Conceitos iniciais

Para desenvolver o projeto são necessários os programas:

- Node
- Postman

**Seguir todos os procedimentos para a criação da aplicação**.

A api é uma conexão entre o cliente (usuário) e o servidor (base de dados do site), e tais requisições trafegam por meio do protocolo http. O front-end é o portão de acesso ao back-end por meio de botãoes e formulários, links entre outras funcionalidades.

Os aplicativos possuem a função de automatizar processos, o que agiliza em diversos negócios do mercado. Os dados trafegam no formato **JSON**, toda a api é construida seguindo o padrão REST, **transferência de estado representacional**.

As requisições não guardam estados **stateless**, em outras palavras, caso um recuros seja atualizado, os dados entregeus serão mantidos como sendo os realizados antes da atualização dos dados, para ver os dados atualizados basta fazer uma nova requisiçao. Métodos HTTP são `GET, POST, PUT, DELETE`

## Iniciando com rotas

Checando as versõe do Node e NPM `node -v` e `npm -v`, os quais são 16.14.02 e 8.5.0 respectivamente.

Para iniciar uso `npm init -y` para criar um package.json com as dependências do projeto, o -y responde as perguntas padrão do init.

Em seguida crie um arquivo **server.js** para conter o servidor usando apenas os módulos nativos do Node.

```
const http = require('http')
const port = 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'})
  res.end('Curso de Node JS')
})

server.listen(port, () => {
  console.log(`Servidor executando em http://localhost:${port}`)
})
```

Em seguida basta rodar o servidor com `npm start` e abrir o localhost na porta 3000, para encerrar a execução da aplicação uso o CTRL + C.

## Servidor local e Nodemon

Para evoluir as rotas vamos usar um modelo de objeto contendo propriedades para cada rota como em:

```
const rotas = {
  '/': 'Curso de NodeJS',
  '/livros': 'Entrando na página de livros',
  '/autores': 'Listagem de autores'
}
```

E modificar a resposta para que ela não seja apenas um mensagem fixa `res.end(rotas[req.url])`, a resposta agora vai referenciar as rotas seguindo a requisição da uri. Como a API é criada gradativamente, as alterações não são vistas imediatamente no servidor, sendo secessário pará-lo e executá-lo a cada alteração.

Para resolver essa questão das alterações vamos usar um biblioteca que faz um live reload no servidor a cada alteração. Essa biblioteca é o **Nodemon**, instale nas dependências do projeto com `npm i nodemon@2.0.15 -D`, o -D é identifica que esta dependência estará presente apenas no desenvolvimento do projeto e não subirá para a produção.

Para ver as dependências instaladas no projeto uso `npm list`.
E para rodar o servidor com o uso do nodemon dentro do **package.json** em script insira o caminho para rodar a aplicação `"dev": "nodemon server.js",`, e execute com `npm run dev`.

Criando o arquivo **.gitignore** com node_modules para ignorar a pasta da dependência.

## 2° Instalação e conceituação