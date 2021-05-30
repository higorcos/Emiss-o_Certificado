const Users = require('../model/Users')

 module.exports = {
     index: (req,res) => {
        Users.create({name:'xxxxxxx',email:'xxxxxxx@email.com.br',password:"Não passe a senha por aqui",event:"XXXXX"}).then(()=>{
            res.render('form')
    
        }).catch(()=>{
            res.send('erro')
        }) 
        //res.render('form')
     } 
 }

