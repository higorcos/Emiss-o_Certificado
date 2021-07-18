const express = require('express')
const routes = express.Router();
const adminAuth = require('../src/middlerware/adminAuth');
const FormController = require('../src/controllers/formController')

routes.get('/', (req, res) => { res.redirect('/createdUser') });
routes.get('/createdUser', FormController.createdUser);
routes.post('/createdUser', FormController.saveUser);
routes.get('/login', FormController.login);
routes.post('/login', FormController.loggingIn);

routes.get('/event/:idUser?', FormController.show_event_open); //Mostra eventos em aberto

routes.post('/event/sub/:idEvent', FormController.subscriptionEvent); //inscrição em evento

routes.post('/user/redirect', FormController.redirectMenu); //Redireciona para login ou menu
routes.get('/user/event/:idUser', adminAuth, FormController.showEvent);  // lista os evento inscrito

routes.get('/admin/event/new', FormController.newEvent); //criar evento
routes.post('/admin/event/save', FormController.saveEvent);

routes.get('/user/event/print/:idEvent', FormController.printCertificate) //Página html com certificado 
routes.get('/user/event/print/emit/:idEvent', FormController.emitCertificate) //emissão do pdf (certificado)

//painel do adm
routes.get('/admin/permissions', FormController.permissionsShow) // Página para mostrar todas as permissões criadas
routes.get('/admin/permissions/new', FormController.permissionsNew) // Página para criar permissões
routes.post('/admin/permissions/save',FormController.permissionsSave); //rota post criação permissões 

routes.get('/rec', (req, res) => {
    req.session.prot = 23;
    res.send("feito")    
})
routes.get('/white', (req, res) => {

    res.json({
        "sd": req.session.prot
    })
})

module.exports = routes