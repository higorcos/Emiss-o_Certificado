// função para apenas usuários autenticados entrar nas rotas administrativas 
// o middleware está entre o usuário e a rota por isso o método next() é usado para passar a autenticação em diante 
const Authorization = require('../model/Authorization');

function adminAuth(req, res, next) {
    if (req.session.user != undefined) { // quando está logado 
        const userId = req.session.user.id;
        //pesquisar no banco de dados a permissão
        Authorization.findAll({ where: { id: userId } }).then(result => {
            console.log("logado")
            next(); // dar continuidade
        }).catch(err => { console.log('não autorizado') })
        
    } else {

        res.redirect('/') //quando não está logado é redirecionado 
    }
}
module.exports = adminAuth