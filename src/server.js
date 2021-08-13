const express = require('express')
const routes = require('./router')
const path = require('path')
const database = require('../src/database/db')
const server = express();
const session = require('express-session')

//usar o template engine 
server.set('view engine', 'ejs')
//localização da pasta view
server.set('views', path.join(__dirname, 'views'))
//habilita arquivos statics
server.use(express.static('public'))
//usar o req.body
server.use(express.urlencoded({ extended: true }))
//seções 
server.use(session({
    secret: "a37f4b1dc00c407faf06349fe71b6fb2",  //texto aleatório para aumentar a segurança
    cookie: { maxAge: 86400000 } //max age 1 dia 86400000
})) 
//conexão com o banco de dados 
database
    .authenticate()
    .then(() => {
        console.log('<<<<<<<<<<Conectado ao Banco de dados')
    }).catch((err) => {
        console.log(err)
        console.log("Erro no banco de dados")
    })

//rotas
server.use(routes)

const port = 8080
server.listen(port, () => console.log(`Server Online, port ${port}`))