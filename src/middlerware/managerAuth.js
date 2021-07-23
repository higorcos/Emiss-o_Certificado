// função para apenas usuários autenticados entrar nas rotas administrativas 
// o middleware está entre o usuário e a rota por isso o método next() é usado para passar a autenticação em diante 
const Authorization = require('../model/Authorization');

 function  managerAuth(req, res, next) {
    
     if (req.session.user != undefined) { // quando está logado 
        const userId = req.session.user.id;    
        //pesquisar no banco de dados a permissão
        // tem que ter a permissão de moderador 
        
        const moderador = 1;
        Authorization.findAll({ where: { userId: userId } }).then(result => {
            if(result.length != 0){
                
                console.log(userId,result,typeof(result))

                next(); // dar continuidade
 
            }else{
              //res.redirect('') //quando não está logado é redirecionado 
                res.redirect('/event');
            }
        }).catch(err => { console.log('não autorizado')
        res.redirect('/event');
    })

         
    } else {

        res.redirect('/') //quando não está logado é redirecionado 
    }
}
module.exports = managerAuth