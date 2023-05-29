# API Rest com Express e Mongo DB

## 1° Criando um projeto com NodeJS

Um profissional **Full Stack** é o programador capaz de conectar o front-end com o back-end em uma aplicação. Há duas formas de desenvolver uma aplicação, uma criando um front e conectando as requisições e segundo construindo uma API.

## Conceitos iniciais

Para desenvolver o projeto são necessários os programas:

- Node
- Postman

**Seguir todos os procedimentos para a criação da aplicação**.

A api é uma conexão entre o cliente (usuário) e o servidor (base de dados do site), e tais requisições trafegam por meio do protocolo http. O front-end é o portão de acesso ao back-end por meio de botãoes e formulários, links entre outras funcionalidades.
Os aplicativos possuem a função de automatizar processos, o que agiliza em diversos negócios do mercado. Os dados trafegam no formato **JSON**, toda a api é construida seguindo o padrão REST, **transferência de estado representacional**.

As requisições não guardam estados **stateless**, em outras palavras, caso um recurso seja atualizado, os dados entregues serão mantidos como sendo os realizados antes da atualização dos dados, para ver os dados atualizados basta fazer uma nova requisiçao. Métodos HTTP são `GET, POST, PUT, DELETE`.

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

O Express facilita o trabalho rotas, a documentação do Express está em [_Framework Express_](https://expressjs.com 'Ir para  a documentação do Express') e o Npm [_NPM_](https://npmjs.com 'Ir para a documentação NPM').

Versão do express `npm i express@4.17.3`

Pensando no projeto como em boas práticas vamos cria um pasta **src** que é a origem, e dentro dela vamos criar um arquivo **app.js**. O uso do Express somente será possível com o uso do `import`.

Em **app.js** uso o seguinte código:

```
import express from 'express'

const app = express()

const livros = [
  {
    id: 1,
    titulo: 'Senhor dos Aneis'
  },
  {
    id: 2,
    titulo: 'O hobbit'
  }
]

app.get('/', (req, res) => {
  res.status(200).send('Curso de Node com o Oso do Express')
})

app.get('/livros', (req, res) => {
  res.status(200).json(livros)
}
)

// Exporta o contúdo para fora do arquivo.
export default app
```

Agora as rotas não podem ser rotas fixas e o **server.js** deve ser modificado para apresentar em formato json o objeto livros. Exclua todo o contúdo a seguir em **server.js**.

```
const http = require('http')

const rotas = {
  '/': 'Curso de NodeJS',
  '/livros': 'Entrando na página de livros',
  '/autores': 'Listagem de autores',
}

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end(rotas[req.url])
})
```

Importe o **app.js** dentro do **server.js** para fazer uso do mesmo, pois ele está exportado por padrão `import app from './src/app.js'`, a extensão deve ser passada manualmente para evitar erros.

E alterar a porta para `const port = process.env.port || 3000;`

E modificar o `server.listen` par `app.listen`, e rodar a aplicação, o terminal apresentará um erro de indicando que o package.json precisa ter um `"type": "module"`.

O Express possui uma forma de criar um projeto já com pastas estruturadas, consulte a documentação para entender mais do uso dessa ferramenta, o que facilita na criação da base de uma API.

## Projeto livraria

O CRUD significa `Criar, Ler, Atualizar e Deletar`. O método POST atualiza uma uri específica, e para isso deve ser especificada qual rota desejamos atualizar como no exemplo `app.post('/livros', (req, res) => {})`.

```
app.post('/livros', (req, res) => {
  livros.push(req.body)
  res.status(201).send('Livro foi cadastrado com sucesso.')
})
```

E para testar as alterações vamos usar o Postman como ferramenta de testes da api. Com as alterações seguintes o livro será cadastrado, no entanto ao verificar com o método GET o valor apresentado será NULL.

Para que os formatos sejam reconhecidos deve-se usar `app.use(express.json())`, o qual deve ser colocado logo abaixo da constante do express. Assim os valores cadastrados não serão mostrados como null.

Até aqui os métodos GET e POST estão funcionando efetivamente.

## Evoluindo as rotas

Implementando o método PUT no CRUD, no entanto para atualizar um livro será preciso indicar o identificador do livro, como o caso da nossa API é referente a uma livraria. Assim passamos por parâmetro o id do livro desejado na atualização `app.put('/livros/:id', (req, res) => {})`.

Por ainda não estarmos buscando os livros diretamento em um banco, vamos precisar de uma função que faça tal tarefa, logo abaixo do PUT usamos a seguinte função:

```
function buscaLivro(id) {
  return livros.findIndex(livro => livro.id == id)
}
```

Essa função busca os itens de um array e possui uma condicional de quando o livro buscado possuir um `atributo id igual ao id passado na busca`.

O método put vai ficar da seguinte forma:

```
app.put('/livros/:id', (req, res) => {
  let index = buscaLivro(req.params.id);
  livros[index].titulo = req.body.titulo;
  res.status(201).json(livros)
})
```

Realizando a busca por parâmetros do id. Note que apenas o parâmetro id do título será modificado, mantendo o restante do contúdo intacto. Para modificar o título com PUT passe o uri que será modificado: `http://localhost:3000/livros/3`.

O modelo foi testado com efetividade, para programar o metodo GET por id basta copiar o modelo usado no PUT.

```
// Método GET de busca por id
app.get('/livros/:id', (req, res) => {
  let index = buscaLivro(req.params.id)
  res.status(201).json(livros[index])
})
```

## Finalizando o CRUD
