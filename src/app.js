import express from 'express'

const app = express()

app.use(express.json())

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

app.get('/livros', (req, res) => {
  res.status(200).json(livros)
})

app.post('/livros', (req, res) => {
  livros.push(req.body)
  res.status(201).send('Livro foi cadastrado com sucesso.')
})

// Exporta o contúdo para fora do arquivo.
export default app
