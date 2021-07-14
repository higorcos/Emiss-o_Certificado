// função para apenas usuários autenticados entrar nas rotas administrativas 
// o middlerware está entre o usuário e a rota por isso o método next() é usado para passar a autenticação em diante 

function adminAuth(req,res,next){
    if(req.session.user != undefined){ // quando está logado 
        next(); // dar continuidade
    }else{
        res.redirect('/login') //quando não está logado é redirecionado 
    }
}
module.exports = adminAuth