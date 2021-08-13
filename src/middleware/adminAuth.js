//Esse middleware vai juntas as rotas em que o gerenciador e moderador tem acesso em comum 
const Authorization = require('../model/Authorization');

const manager = 1; // id gerenciador
const moderator = 3;  // id moderador

function adminAuth(req, res, next) {
    if (req.session.user != undefined) { // quando está logado 
        const userId = req.session.user.id;
        //pesquisar no banco de dados as permissões
     
        Authorization.findAll({ where: { userId: userId,permissionId:moderator } }).then(result => {
            if(result.length != 0){
                
                next(); // dar continuidade
 
            }else{
                Authorization.findAll({ where: { userId: userId,permissionId:manager } }).then(result => {
                    if(result.length != 0){
                        
                        next(); // dá continuidade

                    }else{
                        res.redirect('/event');
                    }
                }).catch(err => { 
                res.redirect('/event');
            })
            }
        }).catch(err => { 
        res.redirect('/event');
    }) 
    } else {

        res.redirect('/') //quando não está logado é redirecionado  
    }
}
module.exports = adminAuth