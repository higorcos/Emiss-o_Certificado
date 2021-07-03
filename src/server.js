const express = require('express')
const routes = require('./router')
const path = require('path')
const database = require('../src/database/db')
const server = express();

//usar o template engine 
server.set('view engine', 'ejs')
//localização da pasta view
server.set('views',path.join(__dirname, 'views'))
//habilita arquivos statics
server.use(express.static('public'))
//usar o req.body
server.use(express.urlencoded({extended: true}))

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
server.listen(port, ()=> console.log(`Server Online, port ${port}`))