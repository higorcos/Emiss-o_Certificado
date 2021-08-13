 // o middleware está entre o usuário e a rota por isso o método next() é usado para passar a autenticação em diante 
// esse middleware foi feito para limitar o acesso do moderador

const Authorization = require('../model/Authorization');

const moderator = 3;//id moderator

 function  moderatorAuth(req, res, next) {
    
     if (req.session.user != undefined) { // quando está logado 
        const userId = req.session.user.id;    
        //pesquisar no banco de dados a permissão
        // tem que ter a permissão de moderador 
        
        Authorization.findAll({ where: { userId: userId,permissionId:moderator } }).then(result => {
            if(result.length != 0){
                
                next(); // dar continuidade
 
            }else{
              
                res.redirect('/event');
            }
        }).catch(err => {
        res.redirect('/event');
    })

         
    } else {

        res.redirect('/') //quando não está logado é redirecionado 
    }
}
module.exports = moderatorAuth;