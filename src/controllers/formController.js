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

    loggingIn: (req,res)=>{ //login post
          //login
        const email = req.body.email;
        const password = req.body.password;//senha não é segura

        Users.findOne({where:{email:email, password:password}}).then(result => {

        if(result != null){ //usuario existe
            res.redirect(`/event/${result.id}`) //vai mandar para uma rota com o id do user encontrado
        }else{
            res.redirect('/login')
        }

        }).catch(err => {console.log(err)})
     }, 

    show_event_open: (req,res)=>{ //Mostra eventos em aberto
        const idUser = req.params.idUser
        
        Event.findAll().then(result => { //busca eventos no banco de dados
             res.render('listEvents', {result:result, idUser:idUser})
       
        })

     },
    subscriptionEvent: (req,res) =>{ //inscrição em evento 
            const idEvent = req.body.Event;
            const idUser = req.body.userMenu;
        Subs.create({code:"00",eventId:idEvent, userId:idUser}).then(()=>{
            res.redirect(`/user/event/${idUser}`)
        }).catch(err =>{})
     },
     redirectMenu: (req,res) =>{ //vai redirecionar Para login ou para meus eventos 
       const idUser = req.body.userMenu
        
       if(idUser.length == 0){ //usuário não tá logado
            res.redirect('/login')
       }else{ 
            res.redirect(`/user/event/${idUser}`) //página com eventos inscritos 
       }
    },
    showEvent: (req,res) => { // lista os evento inscritos 
         // tem q adcionar segurança nessa rota 
         /* 
         @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
         @@@@@@@@@@@@@@@@@@
         refazer
         */
        
         const idUser = req.params.idUser
         Subs.findAll({include:[{ model: Event}]},{where: {userId: idUser }} ).then(result => {
             
             res.render("userEvents", {result:result})
         }).catch(err => {console.log(err)})
/*         
        
        Users.findAll({where:{id:idUser}}).then(result =>{
            //console.log(result,"where")

            if(result != null){
                
                res.render('event', {result: result })
               
            }else{
                res.send('Event não encontrado redirecionar para inscrição em evento')
            }
        }).catch(err =>{console.log(err)})
 */
     } 
 } 

//subs
//createSubs
//show