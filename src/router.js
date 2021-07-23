const express = require('express')
const routes = express.Router();
const adminAuth = require('../src/middlerware/adminAuth');
const managerAuth = require('../src/middlerware/managerAuth')
const FormController = require('../src/controllers/formController')

routes.get('/', (req, res) => { res.redirect('/login') });
routes.get('/createdUser', FormController.createdUser);
routes.post('/createdUser', FormController.saveUser);
routes.get('/login', FormController.login);
routes.post('/login', FormController.loggingIn);

routes.get('/event/:idUser?', FormController.show_event_open); //Mostra eventos em aberto
routes.post('/event/sub/:idEvent', FormController.subscriptionEvent); //inscrição em evento
routes.post('/user/event',managerAuth, FormController.showEvent);  // lista os evento inscrito
routes.get('/user/event/print/:idEvent', FormController.printCertificate) //Página html com certificado 
routes.get('/user/event/print/emit/:idEvent', FormController.emitCertificate) //emissão do pdf (certificado)


routes.get('/admin/event/new',managerAuth, FormController.newEvent); //criar evento
routes.post('/admin/event/save',managerAuth, FormController.saveEvent);

//rotas permissões
routes.get('/admin/permissions', FormController.permissionsShow); // Página para mostrar todas as permissões criadas
routes.get('/admin/permissions/new', FormController.permissionsNew); // Página para criar permissões
routes.post('/admin/permissions/save',FormController.permissionsSave); //rota post criação permissões 
routes.post('/admin/permissions/delete',FormController.permissionsDelete);

//rotas autorização 
routes.get('/admin/authorization', FormController.authorizationShow);
routes.get('/admin/authorization/new', FormController.authorizationNew);
routes.post('/admin/authorization/save', FormController.authorizationSave);
routes.post('/admin/authorization/delete',FormController.authorizationDelete);


routes.get('/rec',managerAuth, (req, res) => {

    res.json({
        "sd": req.session.user
    })  
})
routes.get('/white', (req, res) => {
    console.log(req.session.user)
    res.json({
        "sd": req.session.user
    })
})

module.exports = routes