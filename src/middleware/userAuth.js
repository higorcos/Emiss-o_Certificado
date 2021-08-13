// middleware para verificar de tá logado

function adminAuth(req, res, next) {
    if (req.session.user != undefined) { // quando está logado 

        next(); // dar continuidade

    } else {

        res.redirect('/login') //quando não está logado é redirecionado 
    }
}
module.exports = adminAuth