const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

// configuração do nunjucks engine
nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.set('view engine', 'njk')

// hibilita para permitir a engine lidar com dados de formulário
app.use(express.urlencoded({ extended: false }))

// dados de users fixos
const users = ['Gisiona Costa', 'Alice Costa', 'Andreia Ribeiro', 'Grazy Ferreira']

// middleware
const logMiddleware = (req, res, next) => {
  console.log(
        `HOST: ${req.headers.host} | URL: ${req.url} METHOD: ${req.method}  `
  )

  req.appNode = 'Novo Valor'
  // não bloqueia o fluxo da requisição
  return next()
}

const validaCampoUserNuloMiddleware = (req, res, next) => {
  console.log(
        `HOST: ${req.headers.host} | URL: ${req.url} METHOD: ${req.method}  `
  )

  if (req.body.user === '') {
    return res.send('O campo uuário não pode ser nulo.')
  }

  // não bloqueia o fluxo da requisição
  return next()
}

app.use(logMiddleware)

app.get('/', (req, res) => {
  // return res.render("list" , { name: req.query.name });
  return res.render('list', { users })
})

app.get('/login', (req, res) => {
  return res.send('Login')
})

app.get('/new', (req, res) => {
  return res.render('new')
})

app.post('/create', validaCampoUserNuloMiddleware, (req, res) => {
  console.log(req.body)

  // adiciona um usuário no array de usuários
  users.push(req.body.user)

  return res.redirect('/')
})

app.listen(process.env.PORT || 4000, console.log('Servidor iniciado na porta 3000'))

/*
http.createServer((req, res) => {
    return res.end("Olá Mundo");
}).listen(process.env.port || 3000);
*/
