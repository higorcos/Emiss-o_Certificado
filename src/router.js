const express = require('express')
const routes = express.Router();

const Users = require('../src/model/Users')

const FormController = require('../src/controllers/formController')

routes.get('/',(req,res)=>{ res.redirect('/subscription')})
routes.get('/subscription',FormController.subs)
routes.post('/subscription',FormController.createSubs)
routes.get('/search', FormController.search)
routes.post('/search',FormController.DoResearch)
routes.get('/user/event/:id',FormController.show)


module.exports = routes