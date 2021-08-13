const express = require('express')
const routes = express.Router();
const FormController = require('../src/controllers/formController');

//middleware
const userAuth = require('../src/middleware/userAuth')
const managerAuth = require('../src/middleware/managerAuth')
const moderatorAuth = require('../src/middleware/moderatorAuth')
const adminAuth = require('../src/middleware/adminAuth'); //middleware para gerenciador e moderador a mesmo tempo


routes.get('/', (req, res) => { res.redirect('/login') });
routes.get('/createdUser', FormController.createdUser);
routes.post('/createdUser', FormController.saveUser);
routes.get('/login', FormController.login);
routes.post('/login', FormController.loggingIn);

routes.get('/event/:idUser?', FormController.show_event_open); //Mostra eventos em aberto
routes.post('/event/sub/:idEvent',userAuth, FormController.subscriptionEvent); //inscrição em evento
routes.get('/user/event',userAuth, FormController.showEvent);  // lista os evento inscrito
routes.get('/user/event/print/:idEvent',userAuth, FormController.printCertificate) //Página html com certificado 
routes.get('/user/event/print/emit/:idEvent',userAuth, FormController.emitCertificate) //emissão do pdf (certificado)


routes.get('/admin/event/new',adminAuth, FormController.newEvent); //criar evento
routes.post('/admin/event/save',adminAuth, FormController.saveEvent);

//rotas permissões(duas permissões)
// (a criação de novas categorias não afetara o acesso as rotas apenas
//  se houver o delete dos mesmos)
routes.get('/admin/permissions',managerAuth, FormController.permissionsShow); // Página para mostrar todas as permissões criadas
routes.get('/admin/permissions/new',managerAuth, FormController.permissionsNew); // Página para criar permissões
routes.post('/admin/permissions/save',managerAuth, FormController.permissionsSave); //rota post criação permissões 
routes.post('/admin/permissions/delete',managerAuth,FormController.permissionsDelete);

//rotas autorização 
routes.get('/admin/authorization',adminAuth, FormController.authorizationShow);
routes.get('/admin/authorization/new',managerAuth, FormController.authorizationNew);
routes.post('/admin/authorization/save',managerAuth, FormController.authorizationSave);
routes.post('/admin/authorization/delete',managerAuth,FormController.authorizationDelete);



module.exports = routes