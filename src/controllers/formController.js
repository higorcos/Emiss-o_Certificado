const Users = require('../model/Users')
const Event = require('../model/Event')
const Subs = require('../model/Subs')

 module.exports = {
    //register
    //login 
    
    //created_event

    //show_event_open
    //subscription

    //show_event_concluded
    //print

    createdUser: (req,res) => { //criação novo usuário  get
/*         Users.create({name:'xxxxxxx',email:'xxxxxxx@email.com.br',password:"Não passe a senha por aqui",event:"XXXXX"}).then(()=>{
            res.render('form')
    
        }).catch(err =>{
            res.send(err)
        })  */  
        res.render('registerUser')
     },
    saveUser: (req,res) => { //criação novo usuário post
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password //has
        

        Users.findAll({where:{email:email}}).then(result => {
            //result == array com os dados encontrados no baco de dados
           if(result != 0){ // diferente de zero == já está no banco de dados 
            res.send('esse email já foi registrado ')

           }else{
            Users.create({name:name,email:email,password:password}).then(()=>{
                res.redirect('/login')
            }).catch(err=>{
                console.log(err)
            })}
        }).catch(err=>{
            console.log(err)
        })
     },
    login: (req,res)=>{ //login get
         //pagina para colocar os dados 
         res.render('login')
     },
    loggingIn:async (req,res)=>{ //login post
          //login
        const email = req.body.email;
        const password = req.body.password;//senha não é segura

        await Users.findOne({where:{email:email, password:password}}).then(result => {

        if(result != null){ //usuario existe
            
            res.redirect(`/user/event/${result.id}`) //vai mandar para uma rota com o id do user encontrado
        }else{
            res.redirect('/login')
        }

        }).catch(err => {console.log(err)})
     }, 
     show_event_open: (req,res)=>{ //Mostrar eventos em aberto
        Event.findAll().then(result => {
            res.render('listEvents', {result:result})
        })

     },
    showEvent: (req,res) => { //tem que listar os evento inscritos 
         // tem q adcionar segurança nessa rota 
        const UserId = req.params.id
    
        Users.findAll({where:{id:UserId}}).then(result =>{
            console.log(result,"where")

            if(result != null){
                
                res.render('event', {result: result })
               
            }else{
                res.send('Event não encontrado redirecionar para inscrição em evento')
            }
        }).catch(err =>{console.log(err)})

     } 
 } 
//subs
//createSubs
//show