const express = require('express')
const routes = require('./router')
const path = require('path')

const server = express();

//usar o tamplate engine 
server.set('view engine', 'ejs')
//localização da pasta view
server.set('views',path.join(__dirname, 'views'))
//habilita arquivos statics
server.use(express.static('public'))
//rotas
server.use(routes)

const port = 3005
server.listen(port, ()=> console.log(`Server Online, port ${port}`))