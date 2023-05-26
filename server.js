// Criando um servidor local como módulos nativos do Node
import app from './src/app.js'

const port = process.env.port || 3000

app.listen(port, () => {
  console.log(`Servidor executando em http://localhost:${port}`)
})
