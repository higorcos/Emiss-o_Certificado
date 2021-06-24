const express = require('express')
const routes = express.Router();

const Users = require('../src/model/Users')

const FormController = require('../src/controllers/formController')

routes.get('/',(req,res)=>{ res.redirect('/createdUser')});
routes.get('/createdUser',FormController.createdUser);
routes.post('/createdUser',FormController.saveUser);
routes.get('/login', FormController.login);
routes.post('/login',FormController.loggingIn);

routes.get('/event/:idUser?',FormController.show_event_open); //Mostra eventos em aberto

routes.post('/event/sub/:idEvent',FormController.subscriptionEvent); //inscrição em evento

routes.post('/user/redirect',FormController.redirectMenu); //Redireciona para login ou menu
routes.get('/user/event/:idUser',FormController.showEvent);  // lista os evento inscrito

routes.get('/admin/event/new',FormController.newEvent); //criar evento
routes.post('/admin/event/save',FormController.saveEvent);
//criar painel do adm 


module.exports = routes 