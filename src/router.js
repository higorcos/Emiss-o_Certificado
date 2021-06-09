const express = require('express')
const routes = express.Router();

const Users = require('../src/model/Users')

const FormController = require('../src/controllers/formController')

routes.get('/',(req,res)=>{ res.redirect('/createdUser')})
routes.get('/createdUser',FormController.createdUser)
routes.post('/createdUser',FormController.saveUser)
routes.get('/login', FormController.login)
routes.post('/login',FormController.loggingIn)
routes.get('/user/event/:id',FormController.showEvent)
routes.get('/event',FormController.show_event_open)


module.exports = routes