// o middleware está entre o usuário e a rota por isso o método next() é usado para passar a autenticação em diante 
// esse middleware foi feito para determinar o acesso do adm e do usuário comum  

const Authorization = require('../model/Authorization');

const manager = 1; // id manager

 function  managerAuth(req, res, next) {
    
     if (req.session.user != undefined) { // quando está logado 
        const userId = req.session.user.id;    
        //pesquisar no banco de dados a permissão
        // tem que ter a permissão de manager
        
        Authorization.findAll({ where: { userId: userId,permissionId:manager } }).then(result => {
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
module.exports = managerAuth