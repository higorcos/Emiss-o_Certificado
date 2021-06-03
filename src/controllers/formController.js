const Users = require('../model/Users')

 module.exports = {
     subs: (req,res) => { //inscrição get
/*         Users.create({name:'xxxxxxx',email:'xxxxxxx@email.com.br',password:"Não passe a senha por aqui",event:"XXXXX"}).then(()=>{
            res.render('form')
    
        }).catch(err =>{
            res.send(err)
        })  */
        res.render('form')
     },
     createSubs: (req,res) => { //inscrição post
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password //has
        const event = req.body.event

        Users.findAll({where:{email:email}}).then(result => {
            //result == array com os dados encontrados no baco de dados
           if(result != 0){ // diferente de zero == já está no banco de dados 
            res.send('esse email já foi registrado ')

           }else{
            Users.create({name:name,email:email,event:event,password:password}).then(()=>{
                res.send('sucesso')
            }).catch(err=>{
                console.log(err)
            })}
        }).catch(err=>{
            console.log(err)
        })
     },
     search: (req,res)=>{ //pesquisa get
         //pagina para colocar os dados 
         res.render('search')
     },
      DoResearch:async (req,res)=>{
        const email = req.body.email;
        const password = req.body.password;//senha não é segura

        await Users.findOne({where:{email:email, password:password}}).then(result => {

        if(result != null){ //usuario existe
            
            res.redirect(`/user/event/${result.id}`) //vai mandar para uma rota com o id do user encontrado
        }else{
            res.redirect('/search/')
        }

        }).catch(err => {console.log(err)})
     }, //pesquisa post
     
     show: (req,res) => {
         //tem que listar os evento inscritos 
        const UserId = req.params.id
    
        Users.findByPk(UserId).then(result=>{
            console.log(result)
            res.render('event', {result: result})
            //res.send('sisd')
        }).catch(err=>{console.log(err)})

     } 
 }

