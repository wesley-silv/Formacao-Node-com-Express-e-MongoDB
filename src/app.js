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
  res.status(200).send('Curso de Node com o uso do framework Express')
})

app.get('/livros', (req, res) => {
  res.status(200).json(livros)
})

// Exporta o contúdo para fora do arquivo.
export default app
