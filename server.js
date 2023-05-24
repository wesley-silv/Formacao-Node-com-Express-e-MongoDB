// Criando um servidor local como módulos nativos do Node

const http = require('http')
const port = 3000

const rotas = {
  '/': 'Curso de NodeJS',
  '/livros': 'Entrando na página de livros',
  '/autores': 'Listagem de autores',
  '/editora': 'Página da editora',
  '/desenvolvedores': 'Desenvolvedores da aplicação '
}

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end(rotas[req.url])
})

server.listen(port, () => {
  console.log(`Servidor executando em http://localhost:${port}`)
})
