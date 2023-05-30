import express from 'express'

const app = express()

app.use(express.json()) // Permite que o formato json dos arquivos sejam lidos.

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
  res.status(200).send('Curso de Node com o uso do framework Express')
})
// Método GET de busca geral
app.get('/livros', (req, res) => {
  res.status(200).json(livros)
})

// Método GET de busca por id
app.get('/livros/:id', (req, res) => {
  let index = buscaLivro(req.params.id)
  res.status(201).json(livros[index])
})

// Método POST de adição de livros
app.post('/livros', (req, res) => {
  livros.push(req.body)
  res.status(201).send('Livro foi cadastrado com sucesso.')
})

// Método PUT de atualização de livros por id
app.put('/livros/:id', (req, res) => {
  let index = buscaLivro(req.params.id)
  livros[index].titulo = req.body.titulo
  res.status(201).json(livros)
})

function buscaLivro(id) {
  return livros.findIndex(livro => livro.id == id)
}

// Método DELETE de exclusão do livro
app.delete('/livros/:id', (req, res) => {
  let {id} = req.params;
  let index = buscaLivro(id)
  livros.splice(index, 1);
  res.send(`livro ${id} removido com sucesso.`)
})


// Exporta o contúdo para fora do arquivo.
export default app
